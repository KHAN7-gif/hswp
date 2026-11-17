const json = (data, status = 200) => Response.json(data, {
  status,
  headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
});

const sections = {
  medals: ['gold', 'silver', 'bronze'],
  schedule: ['day', 'time', 'venue'],
};

function validDate(day) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return false;
  const date = new Date(day);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === day;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'GET' && ['/', '/admin'].includes(url.pathname)) {
      return new Response(page, {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Content-Type-Options': 'nosniff' },
      });
    }
    try {
      if (request.method === 'GET' && url.pathname === '/api/events') {
        const { results } = await env.DB.prepare('SELECT * FROM events ORDER BY id').all();
        return json(results);
      }
      const match = url.pathname.match(/^\/api\/events\/(\d+)\/(medals|schedule|entries)$/);
      if (request.method !== 'PUT' || !match) return json({ error: 'Halaman tidak ditemui.' }, 404);
      const identity = request.headers.get('oai-authenticated-user-id');
      if (!identity || identity !== env.ADMIN_USER_ID && env.ADMIN_USER_ID) return json({ error: 'Akses admin diperlukan.' }, 403);
      if (request.headers.get('Sec-Fetch-Site') && request.headers.get('Sec-Fetch-Site') !== 'same-origin') {
        return json({ error: 'Permintaan silang laman ditolak.' }, 403);
      }
      if (request.headers.get('content-type')?.split(';')[0] !== 'application/json') {
        return json({ error: 'Format data tidak sah.' }, 415);
      }
      const id = Number(match[1]);
      if (!Number.isInteger(id) || id < 1 || id > sports.length) return json({ error: 'Acara tidak ditemui.' }, 404);
      const data = await request.json().catch(() => null);
      if (match[2] === 'entries') {
        if (!data || Array.isArray(data) || typeof data !== 'object' ||
            Object.entries(data).some(([name,stage]) => !villages.includes(name) ||
              typeof stage !== 'string' || (stage && !Object.hasOwn(stages,stage)))) {
          return json({ error: 'Semak pilihan kampung dan peringkat.' }, 400);
        }
        const entries = villages.filter(name => data[name]).map(name => ({name, stage: data[name]}));
        const sql = 'INSERT INTO events (id, entries_json) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET entries_json=excluded.entries_json RETURNING *';
        return json(await env.DB.prepare(sql).bind(id, JSON.stringify(entries)).first());
      }
      const section = match[2];
      const fields = [...sections[section]];
      if (section === 'schedule' && data) {
        fields.push(...['end_day','tournament_url'].filter(field => Object.hasOwn(data,field)));
      }
      if (!data || fields.some(field => typeof data[field] !== 'string' ||
          data[field].length > (field === 'tournament_url' ? 2048 : 120))) {
        return json({ error: 'Semak ruangan yang diisi.' }, 400);
      }
      const values = fields.map(field => data[field].trim());
      if (match[2] === 'medals') {
        const legacy = values.some(value => value && !villageName(value))
          ? await env.DB.prepare('SELECT gold, silver, bronze FROM events WHERE id = ?').bind(id).first()
          : null;
        for (const [index, value] of values.entries()) {
          if (!value) continue;
          const village = villageName(value);
          if (!village && value !== legacy?.[fields[index]]) {
            return json({ error: 'Pilih kampung daripada senarai Labuan.' }, 400);
          }
          values[index] = village || value;
        }
      }
      if (section === 'schedule') {
        const [day,time] = values;
        const endIndex = fields.indexOf('end_day');
        const end = endIndex === -1
          ? (await env.DB.prepare('SELECT end_day FROM events WHERE id = ?').bind(id).first())?.end_day
          : values[endIndex];
        if ((day && !validDate(day)) || (time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) ||
            (end && (!day || !validDate(end) || end < day))) {
          return json({ error: 'Semak tarikh mula, tarikh tamat dan masa.' }, 400);
        }
        const urlIndex = fields.indexOf('tournament_url');
        if (urlIndex !== -1 && values[urlIndex]) {
          const url = tournamentUrl(values[urlIndex]);
          if (!url) return json({ error: 'Masukkan pautan kejohanan HTTP atau HTTPS yang sah.' }, 400);
          values[urlIndex] = url;
        }
      }
      const columns = fields.join(', ');
      const changes = fields.map(field => field + '=excluded.' + field).join(', ');
      const sql = 'INSERT INTO events (id, ' + columns + ') VALUES (' + ['?',...fields.map(() => '?')].join(', ') + ') ON CONFLICT(id) DO UPDATE SET ' + changes + ' RETURNING *';
      return json(await env.DB.prepare(sql).bind(id, ...values).first());
    } catch (error) {
      console.error(error);
      return json({ error: 'Data pertandingan gagal dimuatkan. Sila cuba semula.' }, 503);
    }
  },
};
