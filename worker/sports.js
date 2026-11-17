const sports = [
  'Tarik Tali', 'Lari Dalam Guni', 'Baling Selipar', 'Congkak',
  'Batu Seremban', 'Galah Panjang', 'Sepak Raga Bulatan', 'Baling Tin',
  'Isi Air Dalam Botol', 'Lari Bawa Telur dalam Sudu', 'Terompah Gergasi',
  'Kepit Belon Berpasangan', 'Esports PUBG Mobile', 'Esports eFootball Mobile',
  'Memancing', 'Menyuluh Sotong', 'Perbarisan',
];

const carnivalDays = ['2027-01-30', '2027-01-31', '2027-02-01'];

function tournamentUrl(value) {
  if (typeof value !== 'string' || !value) return '';
  try {
    const url = new URL(value);
    if ((url.protocol === 'http:' || url.protocol === 'https:') && !url.username && !url.password) return url.href;
  } catch {}
  return '';
}
