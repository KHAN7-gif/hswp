const sports = [
  'Bola Jaring',
  'Gasing Pantai',
  'Esports',
  'Bola Tampar Pantai',
  'Sepak Raga Bulatan',
  'Panjat Tiang Licin',
  'Umang Race',
  'Mewarna',
  'Gubahan Sirih',
  'Merambat',
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
