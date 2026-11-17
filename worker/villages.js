const villages = [
  'Kampung Batu Arang',
  'Kampung Batu Manikar',
  'Kampung Bebuloh',
  'Kampung Belukut',
  'Kampung Bukit Kalam',
  'Kampung Bukit Kuda',
  'Kampung Durian Tunjong',
  'Kampung Ganggarak',
  'Kampung Gersik',
  'Kampung Kerupang',
  'Kampung Nagalang',
  'Kampung Kilan',
  'Kampung Lajau',
  'Kampung Layang-Layangan',
  'Kampung Lubok Temiang',
  'Kampung Pantai',
  'Kampung Patau-Patau 1',
  'Kampung Patau-Patau 2',
  'Kampung Pohon Batu',
  'Kampung Rancha-Rancha',
  'Kampung Sungai Bangat',
  'Kampung Sungai Bedaun',
  'Kampung Sungai Buton',
  'Kampung Sungai Keling',
  'Kampung Sungai Labu',
  'Kampung Sungai Lada',
  'Kampung Sungai Miri',
  'Kampung Tanjung Aru',
];

function villageKey(value) {
  return value.normalize('NFKC').trim().toLocaleLowerCase('ms-MY')
    .replace(/^(kampung|kg\.?)\s+/,'').replace(/\s*\/\s*/g,'/').replace(/\s+/g,' ');
}

const villageNames = new Map(villages.map(name => [villageKey(name), name]));
villageNames.set('bukit kallam', 'Kampung Bukit Kalam');
villageNames.set('lubuk temiang', 'Kampung Lubok Temiang');

const villageName = value => value && villageNames.get(villageKey(value));

const stages = {
  group: 'Peringkat kumpulan',
  top32: 'Top 32',
  top16: 'Top 16',
  quarter: 'Suku akhir',
  semi: 'Separuh akhir',
};
const podiumStages = {gold:'Johan',silver:'Tempat kedua',bronze:'Tempat ketiga'};
