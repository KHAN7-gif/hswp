const sportIcons = [
  // Tarik Tali
  '<path d="M2 12h5m10 0h5M7 9l4 6m2-6l4 6M7 12c2-4 8-4 10 0s-8 4-10 0Z"/><path d="M12 4v2m0 12v2"/>',
  // Lari Dalam Guni
  '<circle cx="14" cy="5" r="2"/><path d="m8 11 4-3 4 3 3-2M7 13l2 8h8l2-8ZM2 15h3m-2 4h3"/>',
  // Baling Selipar
  '<path d="M10 20c-2-1-2-4-1-7l2-6c1-3 3-4 5-3s2 3 1 6l-2 7c-1 3-3 4-5 3Zm0-7 3-3 3 2M3 9l4-2m-3 7 3-2"/>',
  // Congkak
  '<rect x="2" y="6" width="20" height="12" rx="5"/><path d="M5 10v4m14-4v4"/><path stroke-width="2.6" stroke-linecap="round" d="M8 10h.1m4 0h.1m4 0h.1m-8 4h.1m4 0h.1m4 0h.1"/>',
  // Batu Seremban
  '<path d="m3 18 3-5 3 5Zm6 0 3-5 3 5Zm6 0 3-5 3 5ZM6 12l3-5 3 5Zm6 0 3-5 3 5Z"/>',
  // Galah Panjang
  '<path d="M4 4h16v16H4zm0 5h16M4 15h16M12 4v16"/><circle cx="8" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="12" r="1" fill="currentColor" stroke="none"/>',
  // Sepak Raga Bulatan
  '<circle cx="12" cy="12" r="9"/><path d="M7 5c1 6 5 11 12 13M4 9c4 4 10 7 17 5M15 4c-1 7-4 12-9 15m14-12c-4 7-8 11-13 13"/>',
  // Baling Tin
  '<path d="M13 8c0-2 7-2 7 0v10c0 2-7 2-7 0Zm0 0c0 2 7 2 7 0m-7 5c0 1 7 1 7 0"/><circle cx="6" cy="12" r="2.5"/><path d="M2 7h5M2 17h4"/>',
  // Isi Air Dalam Botol
  '<path d="M7 3h5v5l2 3v9H5v-9l2-3Zm-2 10c2-2 6 2 9 0m-5-10v3M18 11c4 5 4 7 1 7s-4-2-1-7Z"/>',
  // Lari Bawa Telur dalam Sudu
  '<path d="M3 14c2 5 7 5 11 1l7-7m-7 7H3m2-2c-1-3 1-7 3-7s4 4 3 7M2 20h5"/>',
  // Terompah Gergasi
  '<path d="M3 12h16l2 4H3c-2 0-2-4 0-4Zm3 0V9c0-2 5-2 5 0v3m3 0V9c0-2 4-2 4 0v3M6 19h11"/>',
  // Kepit Belon Berpasangan
  '<path d="M2 8c0-5 8-5 8 0 0 3-2 5-4 5s-4-2-4-5Zm12 0c0-5 8-5 8 0 0 3-2 5-4 5s-4-2-4-5ZM6 13l-1 4 3 4m10-8 1 4-3 4"/>',
  // Esports PUBG Mobile
  '<path d="M4 13V11a8 8 0 0 1 16 0v2l-6 1-2 4H5l-2-3Zm1 1h7l2-3h6m-5 3v4l-3 3H7"/>',
  // Esports eFootball Mobile
  '<circle cx="12" cy="12" r="9"/><path d="m12 8 4 3-2 5h-4l-2-5Zm0 0V3m4 8 4-2m-6 7 3 4m-7-4-3 4m1-9-4-2"/>',
  // Memancing
  '<path d="m3 19 9-14c2-3 7-3 8 1v8c0 3-4 3-4 0v-1m-7-2 3 2m-8 4 2 1"/><circle cx="20" cy="11" r="1.5"/>',
  // Menyuluh Sotong
  '<path d="M12 3c-3 3-6 7-6 10l3-2v4h6v-4l3 2c0-3-3-7-6-10Zm-3 12c0 3-4 3-3 6m6-6v6m3-6c0 3 4 3 3 6"/><path d="M10.5 10h.1m2.8 0h.1"/>',
  // Perbarisan
  '<path d="M5 21V3m0 1c4-3 7 3 13 0v8c-6 3-9-3-13 0m4 5h11m-8 4h8"/><path d="m18 15 2 2-2 2"/>',
];

function sportIcon(id) {
  return '<svg class="sport-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+sportIcons[id-1]+'</svg>';
}
