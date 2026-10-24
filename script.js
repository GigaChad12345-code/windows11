/* =====================================================================
   Windows 11 — desktop replica
   Plain HTML + CSS + JS. Three files: index.html, style.css, script.js
   ===================================================================== */

/* ---------------------------------------------------------------- utils */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = (n, w = 2) => String(n).padStart(w, '0');

/** icon wrapper: ic(I.search, 16) */
const ic = (svg, size = 16) =>
  `<span class="ic" style="width:${size}px;height:${size}px">${svg}</span>`;

/* ---------------------------------------------------------------- icons */
const I = {
  windows: `<svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="7.6" height="7.6" rx="1" fill="#1f8fdc"/><rect x="12.9" y="3.5" width="7.6" height="7.6" rx="1" fill="#3aa7ea"/><rect x="3.5" y="12.9" width="7.6" height="7.6" rx="1" fill="#3aa7ea"/><rect x="12.9" y="12.9" width="7.6" height="7.6" rx="1" fill="#1f8fdc"/></svg>`,
  search: `<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M15 15l4.5 4.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  taskView: `<svg viewBox="0 0 24 24"><rect x="2.5" y="7.5" width="12" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M17 7.5h4.5M17 11h4.5M17 14.5h4.5M17 18h4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  explorer: `<svg viewBox="0 0 32 32"><path d="M3 8.5A2.5 2.5 0 015.5 6h6.1l2.4 3H26.5A2.5 2.5 0 0129 11.5V24a2.5 2.5 0 01-2.5 2.5h-21A2.5 2.5 0 013 24V8.5z" fill="#ffb900"/><path d="M3 12.5h26V24a2.5 2.5 0 01-2.5 2.5h-21A2.5 2.5 0 013 24V12.5z" fill="#ffd75e"/></svg>`,
  notepad: `<svg viewBox="0 0 32 32"><path d="M7 3.5h18A1.5 1.5 0 0126.5 5v23A1.5 1.5 0 0125 29.5H7A1.5 1.5 0 015.5 28V5A1.5 1.5 0 017 3.5z" fill="#fff" stroke="#c9c9c9"/><path d="M7 3.5h18A1.5 1.5 0 0126.5 5v3.5h-21V5A1.5 1.5 0 017 3.5z" fill="#0f7ec8"/><path d="M10 13h12M10 17.5h12M10 22h8" stroke="#0f7ec8" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  calculator: `<svg viewBox="0 0 32 32"><rect x="6.5" y="2.5" width="19" height="27" rx="2.5" fill="#3b3b3b"/><rect x="9.5" y="5.5" width="13" height="5.5" rx="1" fill="#9be7a2"/><g fill="#e9e9e9"><rect x="9.5" y="14" width="3.8" height="3.8" rx=".8"/><rect x="14.1" y="14" width="3.8" height="3.8" rx=".8"/><rect x="18.7" y="14" width="3.8" height="3.8" rx=".8"/><rect x="9.5" y="19" width="3.8" height="3.8" rx=".8"/><rect x="14.1" y="19" width="3.8" height="3.8" rx=".8"/><rect x="9.5" y="24" width="3.8" height="3.8" rx=".8"/><rect x="14.1" y="24" width="3.8" height="3.8" rx=".8"/></g><rect x="18.7" y="19" width="3.8" height="8.8" rx=".8" fill="#0f7ec8"/></svg>`,
  settings: `<svg viewBox="0 0 32 32"><path d="M16 2.8l2.3 3.5 4.1-.9 1 4 3.5 2.3-2.3 3.5 2.3 3.5-3.5 2.3-1 4-4.1-.9L16 29.2l-2.3-3.6-4.1.9-1-4-3.5-2.3L7.4 16l-2.3-3.5 3.5-2.3 1-4 4.1.9L16 2.8z" fill="#5c5c5c"/><circle cx="16" cy="16" r="4.6" fill="#f3f3f3"/></svg>`,
  photos: `<svg viewBox="0 0 32 32"><rect x="3" y="6" width="26" height="20" rx="2.4" fill="#fff" stroke="#c9c9c9"/><circle cx="11.2" cy="13" r="2.5" fill="#ffb900"/><path d="M4 25.5l7.5-7.5 5 5 4.2-4.2 6.3 6.2z" fill="#4cc2ff"/></svg>`,
  terminal: `<svg viewBox="0 0 32 32"><rect x="2.5" y="4.5" width="27" height="23" rx="2" fill="#1f1f1f"/><path d="M8 12.5l4 4-4 4" stroke="#16c60c" stroke-width="1.9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.5 21.5h8" stroke="#ccc" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  store: `<svg viewBox="0 0 32 32"><path d="M7 10h18l-1.5 16.4a2 2 0 01-2 1.8H10.5a2 2 0 01-2-1.8L7 10z" fill="#0f7ec8"/><path d="M11.5 12V8.2a4.5 4.5 0 019 0V12" stroke="#0f7ec8" stroke-width="2.1" fill="none" stroke-linecap="round"/></svg>`,
  clock: `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#fff" stroke="#0f7ec8" stroke-width="1.9"/><path d="M16 8.4V16l5.8 3.2" stroke="#0f7ec8" stroke-width="2.1" fill="none" stroke-linecap="round"/></svg>`,
  edge: `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#0f7ec8"/><path d="M6.4 18.5c2.2-8 12-10.8 17.9-5.6 2.9 2.6 1.9 8-2.9 9-3.9.8-7.9-1-8.9-4" fill="none" stroke="#7fe0ff" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  recycle: `<svg viewBox="0 0 32 32"><path d="M8.5 10.5h15l-1.3 16.1a1.8 1.8 0 01-1.8 1.6h-8.8a1.8 1.8 0 01-1.8-1.6L8.5 10.5z" fill="none" stroke="#9a9a9a" stroke-width="1.9"/><path d="M12.2 10.5V7.4a3.8 3.8 0 017.6 0v3.1" stroke="#9a9a9a" stroke-width="1.9" fill="none"/><path d="M13.6 15.2l4.8 4.8M18.4 15.2l-4.8 4.8" stroke="#9a9a9a" stroke-width="1.7" stroke-linecap="round"/></svg>`,

  wifi: `<svg viewBox="0 0 24 24"><path d="M2.6 8.6a15 15 0 0118.8 0" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M5.9 12.4a10 10 0 0112.2 0" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M9.2 16.2a5 5 0 015.6 0" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><circle cx="12" cy="19.6" r="1.5" fill="currentColor"/></svg>`,
  volume: `<svg viewBox="0 0 24 24"><path d="M4 9h3.6L12.5 5v14L7.6 15H4z" fill="currentColor"/><path d="M15.6 9a4.2 4.2 0 010 6" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M18.2 6.6a7.6 7.6 0 010 10.8" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/></svg>`,
  volumeMute: `<svg viewBox="0 0 24 24"><path d="M4 9h3.6L12.5 5v14L7.6 15H4z" fill="currentColor"/><path d="M16 9.5l5 5M21 9.5l-5 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  battery: `<svg viewBox="0 0 24 24"><rect x="1.6" y="7" width="17.4" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="3.6" y="9" width="11.4" height="6" rx="1" fill="currentColor"/><rect x="20.4" y="10" width="2" height="4" rx="1" fill="currentColor"/></svg>`,
  power: `<svg viewBox="0 0 24 24"><path d="M12 2.8v9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6.9 6.4a7.6 7.6 0 1010.2 0" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
  bluetooth: `<svg viewBox="0 0 24 24"><path d="M8.4 7.6l7.4 9.2-3.7 3.6V3.6l3.7 3.6-7.4 9.2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/></svg>`,
  plane: `<svg viewBox="0 0 24 24"><path d="M3 13.2l18-7.1-7.1 18-2.5-7.1L3 13.2z" fill="currentColor"/></svg>`,
  moon: `<svg viewBox="0 0 24 24"><path d="M20.4 14.8A8.6 8.6 0 019.2 3.6a8.9 8.9 0 1011.2 11.2z" fill="currentColor"/></svg>`,
  cast: `<svg viewBox="0 0 24 24"><rect x="2.6" y="5" width="18.8" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 21h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  sun: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.4" fill="currentColor"/><g stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 1.8v2.6M12 19.6v2.6M1.8 12h2.6M19.6 12h2.6M4.8 4.8l1.9 1.9M17.3 17.3l1.9 1.9M19.2 4.8l-1.9 1.9M6.7 17.3l-1.9 1.9"/></g></svg>`,
  notifications: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6.4 16.4V11a5.6 5.6 0 0111.2 0v5.4"/><path d="M4.6 16.4h14.8"/><path d="M10.1 19.4a2.3 2.3 0 003.8 0"/></svg>`,
  notificationsOff: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6.4 16.4V11a5.6 5.6 0 0111.2 0v5.4"/><path d="M4.6 16.4h14.8"/><path d="M10.1 19.4a2.3 2.3 0 003.8 0"/><path d="M4 4l16 16"/></svg>`,
  focus: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>`,
  accessibility: `<svg viewBox="0 0 24 24"><circle cx="12" cy="4.6" r="2.1" fill="currentColor"/><path d="M4 9.2h16M12 9.2v6.2M12 15.4l-3.2 6M12 15.4l3.2 6" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round"/></svg>`,
  keyboard: `<svg viewBox="0 0 24 24"><rect x="2" y="6.4" width="20" height="11.2" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  gamepad: `<svg viewBox="0 0 24 24"><path d="M7 8h10a5 5 0 015 5v1a3 3 0 01-5.4 1.8L15 14H9l-1.6 1.8A3 3 0 012 14v-1a5 5 0 015-5z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 11v2M7 12h2M15.4 11.4h.01M17.4 13h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  privacy: `<svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.4 8.2-8 9-4.6-.8-8-4-8-9V6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  update: `<svg viewBox="0 0 24 24"><path d="M19.5 12a7.5 7.5 0 11-2.4-5.5" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M19.6 4.4v4.8h-4.8" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  network: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 12h18M12 3c2.9 3.4 2.9 14.6 0 18M12 3c-2.9 3.4-2.9 14.6 0 18" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`,
  time: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v5l3.4 2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`,
  sound: `<svg viewBox="0 0 24 24"><path d="M4 9h3.6L12.5 5v14L7.6 15H4z" fill="currentColor"/><path d="M16 9.4a4.4 4.4 0 010 5.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/></svg>`,
  cloud: `<svg viewBox="0 0 24 24"><path d="M7 18.6h10.2a4.1 4.1 0 00.3-8.2A6.2 6.2 0 005.6 11 3.8 3.8 0 007 18.6z" fill="currentColor"/></svg>`,
  weather: `<svg viewBox="0 0 24 24"><circle cx="9" cy="9" r="3.6" fill="#ffb900"/><path d="M9 2.4v1.8M2.4 9H4.2M4.4 4.4l1.3 1.3M13.6 4.4l-1.3 1.3" stroke="#ffb900" stroke-width="1.6" stroke-linecap="round"/><path d="M10.5 19.4h7.2a3.4 3.4 0 000-6.8 5 5 0 00-9.5 1.4 2.9 2.9 0 002.3 5.4z" fill="#9fd8ff"/></svg>`,
  person: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="currentColor"/><path d="M4 21a8 8 0 0116 0z" fill="currentColor"/></svg>`,
  lock: `<svg viewBox="0 0 24 24"><rect x="4.8" y="10" width="14.4" height="10" rx="2" fill="currentColor"/><path d="M8 10V7.2a4 4 0 018 0V10" stroke="currentColor" stroke-width="1.9" fill="none"/></svg>`,
  info: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 11v6M12 7.4h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  display: `<svg viewBox="0 0 24 24"><rect x="2.6" y="4" width="18.8" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 20.6h8M12 17v3.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  monitor: `<svg viewBox="0 0 24 24"><rect x="2.6" y="4" width="18.8" height="12.4" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 20h6M12 16.4V20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  laptop: `<svg viewBox="0 0 24 24"><path d="M4 6.4A1.6 1.6 0 015.6 4.8h12.8A1.6 1.6 0 0120 6.4v9.2H4z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M2 18.4h20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  drive: `<svg viewBox="0 0 24 24"><rect x="2.6" y="6" width="18.8" height="12" rx="2.2" fill="#c8c8c8"/><circle cx="17" cy="12" r="1.5" fill="#107c10"/><path d="M5 12h6" stroke="#efefef" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  folder: `<svg viewBox="0 0 24 24"><path d="M2.6 6.4a2 2 0 012-2h4.6l2.1 2.6h8.1a2 2 0 012 2v9.6a2 2 0 01-2 2H4.6a2 2 0 01-2-2V6.4z" fill="#ffb900"/></svg>`,
  newFolder: `<svg viewBox="0 0 24 24"><path d="M2.6 6.4a2 2 0 012-2h4.6l2.1 2.6h8.1a2 2 0 012 2v9.6a2 2 0 01-2 2H4.6a2 2 0 01-2-2V6.4z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 11v6M9 14h6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  file: `<svg viewBox="0 0 24 24"><path d="M6 2.8h7.6l4.4 4.4v14H6z" fill="#fff" stroke="#c9c9c9" stroke-width="1.3"/><path d="M13.6 2.8v4.4H18" fill="none" stroke="#c9c9c9" stroke-width="1.3"/></svg>`,
  image: `<svg viewBox="0 0 24 24"><rect x="2.6" y="4.6" width="18.8" height="14.8" rx="2" fill="#fff" stroke="#c9c9c9" stroke-width="1.3"/><circle cx="8.6" cy="9.6" r="1.9" fill="#ffb900"/><path d="M3.6 18.4l5.4-5.4 4 4 3.2-3.2 4.2 4.2z" fill="#4cc2ff"/></svg>`,
  gallery: `<svg viewBox="0 0 24 24"><rect x="3" y="3.4" width="18" height="12.6" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6 20.6h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  history: `<svg viewBox="0 0 24 24"><path d="M12 7v5l3.4 2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M3.6 12a8.4 8.4 0 111.9 5.3" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M3.4 8.4v4.2h4.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  chevron: `<svg viewBox="0 0 24 24"><path d="M9.5 5.5l6.5 6.5-6.5 6.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24"><path d="M5.5 9l6.5 6.5L18.5 9" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  back: `<svg viewBox="0 0 24 24"><path d="M14.5 5.5L8 12l6.5 6.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  forward: `<svg viewBox="0 0 24 24"><path d="M9.5 5.5L16 12l-6.5 6.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  up: `<svg viewBox="0 0 24 24"><path d="M5.5 15L12 8.5 18.5 15" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24"><path d="M4.5 12h14M13 6.5l5.5 5.5-5.5 5.5" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24"><path d="M19.5 12a7.5 7.5 0 11-2.4-5.5" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M19.6 4.4v4.8h-4.8" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  plus: `<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  close: `<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  more: `<svg viewBox="0 0 24 24"><circle cx="5.5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="18.5" cy="12" r="1.6" fill="currentColor"/></svg>`,
  hamburger: `<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  trash: `<svg viewBox="0 0 24 24"><path d="M4.5 7h15M9.5 7V4.8h5V7M6.4 7l1 13.2h9.2L17.6 7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  save: `<svg viewBox="0 0 24 24"><path d="M5 4h11l3 3v13H5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8.4 4v6h6.4V4M8.4 20v-6h7.2v6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  cut: `<svg viewBox="0 0 24 24"><path d="M6.6 4l10.8 14M17.4 4L6.6 18" stroke="currentColor" stroke-width="1.6"/><circle cx="6" cy="19.4" r="2.4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="19.4" r="2.4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`,
  copy: `<svg viewBox="0 0 24 24"><rect x="8.4" y="8.4" width="12.2" height="12.2" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M16 8.4V5.6a2 2 0 00-2-2H5.6a2 2 0 00-2 2V14a2 2 0 002 2h2.8" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`,
  paste: `<svg viewBox="0 0 24 24"><path d="M9 4.6H7.4a2 2 0 00-2 2v12.8a2 2 0 002 2h9.2a2 2 0 002-2V6.6a2 2 0 00-2-2H15" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="9" y="2.8" width="6" height="3.6" rx="1.2" fill="currentColor"/></svg>`,
  rename: `<svg viewBox="0 0 24 24"><path d="M3.6 20.4h16.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M6.4 16.4l9.4-9.4 2.8 2.8-9.4 9.4H6.4z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  share: `<svg viewBox="0 0 24 24"><circle cx="17.5" cy="5.6" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="6.5" cy="12" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.5" cy="18.4" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 10.7l6-3.6M9 13.3l6 3.6" stroke="currentColor" stroke-width="1.6"/></svg>`,
  sort: `<svg viewBox="0 0 24 24"><path d="M4 7h13M4 12h9M4 17h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M18 10v8M18 18l3-3M18 18l-3-3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  viewGrid: `<svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.4" y="3.4" width="7.4" height="7.4" rx="1.4"/><rect x="13.2" y="3.4" width="7.4" height="7.4" rx="1.4"/><rect x="3.4" y="13.2" width="7.4" height="7.4" rx="1.4"/><rect x="13.2" y="13.2" width="7.4" height="7.4" rx="1.4"/></g></svg>`,
  viewList: `<svg viewBox="0 0 24 24"><path d="M4 6.5h16M4 12h16M4 17.5h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  pin: `<svg viewBox="0 0 24 24"><path d="M9 3h6l-1 6 4 3v2H6v-2l4-3z" fill="currentColor"/><path d="M12 14v7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  palette: `<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 000 18c1.8 0 2.1-1.4 1.2-2.3-.9-1 .1-2.4 1.5-2.4H17a4 4 0 004-4c0-5-4.1-9.3-9-9.3z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="8" cy="10" r="1.3" fill="currentColor"/><circle cx="12" cy="7.4" r="1.3" fill="currentColor"/><circle cx="16" cy="10" r="1.3" fill="currentColor"/></svg>`,
  apps: `<svg viewBox="0 0 24 24"><g fill="currentColor"><rect x="3" y="3" width="7.2" height="7.2" rx="1.6"/><rect x="13.8" y="3" width="7.2" height="7.2" rx="1.6"/><rect x="3" y="13.8" width="7.2" height="7.2" rx="1.6"/><rect x="13.8" y="13.8" width="7.2" height="7.2" rx="1.6"/></g></svg>`,
  storage: `<svg viewBox="0 0 24 24"><rect x="3" y="4.6" width="18" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="3" y="13.4" width="18" height="6" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 7.6h.01M7 16.4h.01" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  taskmgr: `<svg viewBox="0 0 32 32"><rect x="3" y="5" width="26" height="22" rx="2.4" fill="#fff" stroke="#c9c9c9"/><rect x="3" y="5" width="26" height="5" rx="2.4" fill="#0f7ec8"/><g fill="#0f7ec8"><rect x="7" y="19" width="3.4" height="5" rx=".6"/><rect x="11.6" y="15" width="3.4" height="9" rx=".6"/><rect x="16.2" y="17.5" width="3.4" height="6.5" rx=".6"/><rect x="20.8" y="13" width="3.4" height="11" rx=".6"/></g></svg>`,
  mine: `<svg viewBox="0 0 32 32"><circle cx="16" cy="17" r="9" fill="#1b1b1b"/><circle cx="13" cy="14" r="2.6" fill="#fff"/><path d="M16 6.5V3M16 31v-3.5M5.5 17H2M30 17h-3.5M8.8 9.8L6.3 7.3M23.2 9.8l2.5-2.5M8.8 24.2l-2.5 2.5M23.2 24.2l2.5 2.5" stroke="#1b1b1b" stroke-width="2.1" stroke-linecap="round"/></svg>`,
  paint: `<svg viewBox="0 0 32 32"><path d="M16 3a13 13 0 000 26c2.6 0 3-2 1.7-3.3-1.3-1.4.2-3.5 2.2-3.5H24a5 5 0 005-5c0-7.2-5.9-14.2-13-14.2z" fill="#fff" stroke="#a9a9a9" stroke-width="1.4"/><g><circle cx="10.4" cy="14" r="2" fill="#e3008c"/><circle cx="16" cy="9.6" r="2" fill="#0f7ec8"/><circle cx="21.6" cy="14" r="2" fill="#ffb900"/><circle cx="12.6" cy="20.4" r="2" fill="#16c60c"/></g></svg>`,
  sticky: `<svg viewBox="0 0 32 32"><path d="M6 4.5h20A1.5 1.5 0 0127.5 6v14L20 27.5H6A1.5 1.5 0 014.5 26V6A1.5 1.5 0 016 4.5z" fill="#fff9b1" stroke="#e0d477"/><path d="M27.5 20L20 27.5V20z" fill="#efe08a"/><path d="M9 11h14M9 15h14M9 19h9" stroke="#8a8140" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  media: `<svg viewBox="0 0 32 32"><rect x="3" y="6" width="26" height="20" rx="2.4" fill="#1f1f1f"/><path d="M12.5 12.5v7l6-3.5z" fill="#4cc2ff"/><path d="M8 22.5h6M18 22.5h6" stroke="#6f6f6f" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  sleep: `<svg viewBox="0 0 24 24"><path d="M13 3a8.5 8.5 0 106.8 12.7A9 9 0 0113 3z" fill="currentColor"/></svg>`,
  restart: `<svg viewBox="0 0 24 24"><path d="M19.5 12a7.5 7.5 0 11-2.4-5.5" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M19.6 4.4v4.8h-4.8" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  shutdown: `<svg viewBox="0 0 24 24"><path d="M12 3v8.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6.8 6.6a7.6 7.6 0 1010.4 0" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
  volumeHigh: `<svg viewBox="0 0 24 24"><path d="M4 9h3.6L12.5 5v14L7.6 15H4z" fill="currentColor"/><path d="M15.4 9.6a3.6 3.6 0 010 4.8" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/><path d="M18 6.8a7.4 7.4 0 010 10.4" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"/></svg>`,
  drop: `<svg viewBox="0 0 24 24"><path d="M12 3.5s6 6.4 6 10.4a6 6 0 11-12 0c0-4 6-10.4 6-10.4z" fill="currentColor"/></svg>`,
  runIcon: `<svg viewBox="0 0 24 24"><path d="M3.6 4.6h16.8a1.6 1.6 0 011.6 1.6v11.6a1.6 1.6 0 01-1.6 1.6H3.6A1.6 1.6 0 012 17.8V6.2a1.6 1.6 0 011.6-1.6z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2 9h20" stroke="currentColor" stroke-width="1.5"/><path d="M7.4 13l2.2 2.2-2.2 2.2M12.4 17.4h4.4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`,
  clip: `<svg viewBox="0 0 24 24"><rect x="5" y="3.4" width="14" height="17.2" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="9" y="1.8" width="6" height="3.4" rx="1.2" fill="currentColor"/><path d="M8.6 10.5h6.8M8.6 14h6.8M8.6 17.5h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  emoji: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8.6 14.2a4.4 4.4 0 006.8 0" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="9.2" cy="9.4" r="1.2" fill="currentColor"/><circle cx="14.8" cy="9.4" r="1.2" fill="currentColor"/></svg>`,
  crop: `<svg viewBox="0 0 24 24"><path d="M6.4 2.4v15.2h15.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.4 6.4h15.2v15.2" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  snap: `<svg viewBox="0 0 24 24"><rect x="2.6" y="4" width="18.8" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 4v16" stroke="currentColor" stroke-width="1.6"/></svg>`,
  unpin: `<svg viewBox="0 0 24 24"><path d="M9 3h6l-1 6 4 3v2H6v-2l4-3z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 14v7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4 4l16 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  error: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#c42b1c"/><path d="M12 7.4v5.6M12 16.4h.01" stroke="#fff" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  bookmark: `<svg viewBox="0 0 24 24"><path d="M6.4 3.6h11.2v17l-5.6-4-5.6 4z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  globe: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 12h18M12 3c2.9 3.4 2.9 14.6 0 18M12 3c-2.9 3.4-2.9 14.6 0 18" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>`,
  news: `<svg viewBox="0 0 24 24"><path d="M3.4 5.6h14.2v13a1.8 1.8 0 001.8 1.8H5.2a1.8 1.8 0 01-1.8-1.8z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M17.6 9.4h3v9a1.8 1.8 0 01-3 1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6.4 9h8.2M6.4 12.4h8.2M6.4 15.8h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  chart: `<svg viewBox="0 0 24 24"><path d="M3.4 20.4h17.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M6.4 17V9.6M11 17V4.6M15.6 17v-5.4M20 17v-9" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/></svg>`,
  fireworks: `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="4" fill="#e3008c"/><g stroke="#ffb900" stroke-width="1.9" stroke-linecap="round"><path d="M16 6V2.6M16 29.4V26M6 16H2.6M29.4 16H26M9 9L6.6 6.6M23 23l2.4 2.4M23 9l2.4-2.4M9 23l-2.4 2.4"/></g></svg>`,
  clipart: `<svg viewBox="0 0 32 32"><rect x="3.4" y="4" width="25.2" height="24" rx="2.4" fill="#fff" stroke="#c9c9c9"/><circle cx="11" cy="12" r="3" fill="#ffb900"/><path d="M4.4 26.4l7.6-7.6 5 5 4.2-4.2 7.4 7.4z" fill="#4cc2ff"/></svg>`,
  shield: `<svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.4 8.2-8 9-4.6-.8-8-4-8-9V6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 8.4v4.2M12 15.6h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  grid: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" rx="1.4" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="13" y="3" width="8" height="8" rx="1.4" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="3" y="13" width="8" height="8" rx="1.4" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="13" y="13" width="8" height="8" rx="1.4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`,
  full: `<svg viewBox="0 0 24 24"><path d="M8.6 3.6h-5v5M15.4 3.6h5v5M8.6 20.4h-5v-5M15.4 20.4h5v-5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  win: `<svg viewBox="0 0 24 24"><rect x="3.4" y="4.6" width="17.2" height="14.8" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.4 9h17.2" stroke="currentColor" stroke-width="1.6"/></svg>`,
  freeform: `<svg viewBox="0 0 24 24"><path d="M4.6 14c1.6-6 5-7.6 7.6-5.6 2.4 1.8.6 5.6 3.2 7 2 1.1 4.4-.6 4.6-3.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  ruler: `<svg viewBox="0 0 24 24"><rect x="2.6" y="8.4" width="18.8" height="7.2" rx="1.4" fill="none" stroke="currentColor" stroke-width="1.6" transform="rotate(-20 12 12)"/></svg>`,
  timer: `<svg viewBox="0 0 24 24"><circle cx="12" cy="13.4" r="7.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 9.4v4l2.6 1.8M9.4 3h5.2" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`,
  clear: `<svg viewBox="0 0 24 24"><path d="M8.4 3.6h7.2l4.6 12.2-9.8 3.6L5.8 7.2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M3.6 20.4h16.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
};

/* ------------------------------------------------------------ app registry */
const APPS = [
  { id: 'explorer', name: 'File Explorer', icon: I.explorer, w: 920, h: 580, pinned: true, desktop: true },
  { id: 'edge', name: 'Microsoft Edge', icon: I.edge, w: 960, h: 640, pinned: true },
  { id: 'notepad', name: 'Notepad', icon: I.notepad, w: 760, h: 540, pinned: true, desktop: true },
  { id: 'calculator', name: 'Calculator', icon: I.calculator, w: 340, h: 528, pinned: true },
  { id: 'settings', name: 'Settings', icon: I.settings, w: 940, h: 620, pinned: true, desktop: true },
  { id: 'photos', name: 'Photos', icon: I.photos, w: 860, h: 580, pinned: true },
  { id: 'terminal', name: 'Terminal', icon: I.terminal, w: 820, h: 500, pinned: true },
  { id: 'store', name: 'Microsoft Store', icon: I.store, w: 920, h: 600, pinned: true },
  { id: 'clock', name: 'Clock', icon: I.clock, w: 660, h: 500, desktop: true },
  { id: 'recycle', name: 'Recycle Bin', icon: I.recycle, w: 760, h: 480, desktop: true },
  { id: 'taskmgr', name: 'Task Manager', icon: I.taskmgr, w: 900, h: 600, pinned: true },
  { id: 'minesweeper', name: 'Minesweeper', icon: I.mine, w: 520, h: 560 },
  { id: 'paint', name: 'Paint', icon: I.paint, w: 880, h: 620 },
  { id: 'mediaplayer', name: 'Media Player', icon: I.media, w: 780, h: 560 },
  { id: 'weather', name: 'Weather', icon: I.weather, w: 800, h: 560, desktop: true },
  { id: 'sticky', name: 'Sticky Notes', icon: I.sticky, w: 620, h: 520 },
];
const appById = (id) => APPS.find((a) => a.id === id) || APPS[0];

/* -------------------------------------------------------- wallpapers / accents */
const WALLPAPERS = [
  {
    id: 'bloom',
    name: 'Bloom',
    css: `url("https://images.pre.dev/generated-images/agent_generated_1790330663176_0_BB44SwaHsU.jpg") center/cover no-repeat, #06121f`,
  },
  {
    id: 'bloom-light',
    name: 'Bloom light',
    css: `url("https://images.pre.dev/generated-images/agent_generated_1790330668644_0_zgJcHYwd3X.jpg") center/cover no-repeat, #0a2740`,
  },
  { id: 'flow', name: 'Flow', css: 'linear-gradient(135deg, #0f2027 0%, #203a43 45%, #2c5364 100%)' },
  { id: 'sunrise', name: 'Sunrise', css: 'linear-gradient(160deg, #ff8a3d 0%, #d94f70 40%, #4a2b6b 75%, #14102b 100%)' },
  { id: 'glow', name: 'Glow', css: 'radial-gradient(80% 80% at 70% 30%, #7b2ff7 0%, #2b1055 50%, #0a0618 100%)' },
  { id: 'mint', name: 'Mint', css: 'linear-gradient(140deg, #0f9b8e 0%, #0b6cbf 55%, #10233f 100%)' },
  { id: 'graphite', name: 'Graphite', css: 'linear-gradient(150deg, #3a3a3a 0%, #1c1c1c 60%, #0a0a0a 100%)' },
];
const LOCK_WALLPAPER = 'https://images.pre.dev/generated-images/agent_generated_1790330668644_0_zgJcHYwd3X.jpg';
const LOCK_WALLS = [
  { id: 'bloom', name: 'Bloom', css: `url("${LOCK_WALLPAPER}")` },
  { id: 'flow', name: 'Flow', css: `url("https://images.pre.dev/generated-images/agent_generated_1790330663176_0_BB44SwaHsU.jpg")` },
  { id: 'dusk', name: 'Dusk', css: 'linear-gradient(150deg,#0a2740 0%,#123a63 45%,#2b1055 100%)' },
  { id: 'ember', name: 'Ember', css: 'linear-gradient(140deg,#3a1030 0%,#7b2ff7 55%,#ff8a3d 120%)' },
];

const ACCENTS = [
  { id: 'blue', name: 'Default blue', color: '#0078d4', hover: '#106ebe', press: '#005a9e' },
  { id: 'teal', name: 'Teal', color: '#038387', hover: '#0a9396', press: '#026a6d' },
  { id: 'purple', name: 'Purple', color: '#8764b8', hover: '#9773c9', press: '#744fa8' },
  { id: 'pink', name: 'Rose', color: '#e3008c', hover: '#f01a9d', press: '#c7007b' },
  { id: 'orange', name: 'Orange', color: '#ca5010', hover: '#dd5d1a', press: '#b0440c' },
  { id: 'green', name: 'Green', color: '#107c10', hover: '#168a16', press: '#0c6a0c' },
];

/* ------------------------------------------------------------------ state */
const LS = {
  wallpaper: 'win11.wallpaper',
  accent: 'win11.accent',
  theme: 'win11.theme',
  align: 'win11.align',
  user: 'win11.user',
  pinned: 'win11.pinned',
  widgets: 'win11.widgets',
  notepad: 'win11.notepad',
  sticky: 'win11.sticky',
  lockWall: 'win11.lockWall',
  sounds: 'win11.sounds',
  transparency: 'win11.transparency',
  run: 'win11.runHistory',
  clip: 'win11.clipboard',
  pins: 'win11.jumpPins',
  shots: 'win11.snips',
};
const store = {
  get(k, d) {
    try {
      const v = localStorage.getItem(k);
      return v === null ? d : v;
    } catch (e) {
      return d;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch (e) {
      /* ignore */
    }
  },
};

const state = {
  wallpaper: store.get(LS.wallpaper, 'bloom'),
  accent: store.get(LS.accent, 'blue'),
  theme: store.get(LS.theme, 'light'),
  align: store.get(LS.align, 'center'),
  user: store.get(LS.user, 'User'),
  widgets: store.get(LS.widgets, 'true') === 'true',
  pinned: (() => {
    try {
      const raw = store.get(LS.pinned, '');
      if (raw) return JSON.parse(raw);
    } catch (e) {
      /* ignore */
    }
    return APPS.filter((a) => a.pinned).map((a) => a.id);
  })(),
  windows: [],
  activeId: null,
  z: 10,
  cascade: 0,
  startOpen: false,
  startView: 'pinned',
  query: '',
  qs: false,
  notif: false,
  widgetsOpen: false,
  ctx: null,
  selectedIcon: null,
  volume: 68,
  brightness: 90,
  toggles: { wifi: true, bt: true, airplane: false, saver: false, night: false, access: false },
  focus: false,
  notifications: [
    { id: 1, app: 'Microsoft Store', title: 'Updates available', body: '3 apps can be updated in the background.', time: '09:41' },
    { id: 2, app: 'Windows', title: 'Welcome', body: 'Your desktop is ready. Press the Start button to explore.', time: '09:38' },
  ],
  locked: true,
  lockPhase: 'clock',
  taskView: false,
  now: new Date(),
  calMonth: new Date(),
  taskbarH: 48,
  /* --- additions --- */
  booted: false,
  lockWall: store.get(LS.lockWall, 'image'),
  sounds: store.get(LS.sounds, 'true') === 'true',
  transparency: store.get(LS.transparency, 'true') === 'true',
  board: false,
  quickLink: false,
  jump: null,
  run: null,
  runHistory: (() => {
    try {
      return JSON.parse(store.get(LS.run, '[]')) || [];
    } catch (e) {
      return [];
    }
  })(),
  clip: {
    open: false,
    items: (() => {
      try {
        return JSON.parse(store.get(LS.clip, '[]')) || [];
      } catch (e) {
        return [];
      }
    })(),
  },
  emoji: { open: false, cat: 'Smileys', q: '' },
  snip: { shots: [], sel: null, mode: 'rect', com: 0 },
  snapOverlay: false,
  banner: null,
  gpu: 7,
  search: { open: false, q: '' },
  tray: false,
  preview: null,
  altTab: { open: false, idx: 0, list: [] },
  assist: null,
  power: false,
  desktops: [{ id: 'd1', name: 'Desktop 1' }],
  activeDesktop: 0,
  toasts: [],
  sys: {
    cpu: 18, memTotal: 16, memUsed: 6.4, cores: 8, net: 42, disk: 6,
    sent: 1284, recv: 8620, uptime: '4d 6h 12m',
  },
  recycle: [
    { name: 'draft-report.docx', from: 'C:\\Documents', deleted: '9/24/2026 3:02 PM' },
    { name: 'screenshot-old.png', from: 'C:\\Pictures', deleted: '9/23/2026 11:47 AM' },
  ],
};

const pers = (key, value) => store.set(key, value);
const saveShell = () => {
  pers(LS.wallpaper, state.wallpaper);
  pers(LS.accent, state.accent);
  pers(LS.theme, state.theme);
  pers(LS.align, state.align);
  pers(LS.user, state.user);
  pers(LS.widgets, String(state.widgets));
  pers(LS.pinned, JSON.stringify(state.pinned));
};

const bg = () => (WALLPAPERS.find((w) => w.id === state.wallpaper) || WALLPAPERS[0]).css;

function applyTheme() {
  const a = ACCENTS.find((x) => x.id === state.accent) || ACCENTS[0];
  const root = document.documentElement;
  root.setAttribute('data-theme', state.theme);
  root.style.setProperty('--accent', a.color);
  root.style.setProperty('--accent-hover', a.hover);
  root.style.setProperty('--accent-press', a.press);
}

/* =====================================================================
   Desktop shell — DOM scaffold
   ===================================================================== */
const dom = {};

function mountDesktop() {
  $('#root').innerHTML = `
    <div class="lock" id="lock"></div>
    <div class="desktop" id="desktop">
      <div class="wallpaper" id="wallpaper"></div>
      <div class="desktop-icons" id="desk-icons"></div>
      <div id="win-layer"></div>
      <div id="shell-layer"></div>
      <div id="overlay-layer"></div>
      <div id="taskview-layer"></div>
      <div class="taskbar" id="taskbar">
        <div class="tb-left" id="tb-left"></div>
        <div class="tb-center" id="tb-center"></div>
        <div class="tb-right" id="tb-right"></div>
      </div>
      <div class="toast-layer" id="toast-layer"></div>
    </div>
    <div class="boot" id="boot" hidden></div>`;

  dom.lock = $('#lock');
  dom.desktop = $('#desktop');
  dom.wallpaper = $('#wallpaper');
  dom.deskIcons = $('#desk-icons');
  dom.winLayer = $('#win-layer');
  dom.shellLayer = $('#shell-layer');
  dom.overlayLayer = $('#overlay-layer');
  dom.taskviewLayer = $('#taskview-layer');
  dom.taskbar = $('#taskbar');
  dom.tbLeft = $('#tb-left');
  dom.tbCenter = $('#tb-center');
  dom.tbRight = $('#tb-right');

  dom.wallpaper.style.background = bg();

  /* desktop interactions */
  dom.desktop.addEventListener('pointerdown', (e) => {
    // shell overlays keep their own clicks: tearing them down on pointerdown
    // would remove the element before its click event can fire.
    if (e.target.closest('.taskbar') || e.target.closest('.flyout')) return;
    if (e.target.closest('.start-menu') || e.target.closest('.ctx-menu')) return;
    if (e.target.closest('.search-flyout') || e.target.closest('.assist') || e.target.closest('.tb-preview')) return;
    if (e.target.closest('.power-anchor') || e.target.closest('.toast-layer')) return;
    if (!e.target.closest('.window')) closeShell();
    if (!e.target.closest('.desk-icon')) {
      state.selectedIcon = null;
      $$('.desk-icon.selected').forEach((n) => n.classList.remove('selected'));
    }
  });

  dom.desktop.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.window') || e.target.closest('.taskbar') || e.target.closest('.flyout')) return;
    if (e.target.closest('.search-flyout') || e.target.closest('.assist') || e.target.closest('.tb-preview')) return;
    if (e.target.closest('.toast-layer')) return;
    e.preventDefault();
    const icon = e.target.closest('.desk-icon');
    closeShell();
    if (icon) {
      state.selectedIcon = icon.dataset.app;
      $$('.desk-icon').forEach((n) => n.classList.toggle('selected', n === icon));
      openCtx(e.clientX, e.clientY, { kind: 'icon', appId: icon.dataset.app });
    } else {
      openCtx(e.clientX, e.clientY, { kind: 'desktop' });
    }
  });

  dom.taskbar.addEventListener('contextmenu', (e) => {
    const appBtn = e.target.closest('[data-tb-app]');
    e.preventDefault();
    closeShell();
    /* Windows 11 shows a Jump List on the taskbar icon itself. */
    if (appBtn && !e.shiftKey) {
      state.jump = { appId: appBtn.dataset.tbApp, x: e.clientX, y: e.clientY };
      state.jumpSide = 'right';
      renderShellLayer();
      return;
    }
    if (appBtn) openCtx(e.clientX, e.clientY - 180, { kind: 'taskbar-app', appId: appBtn.dataset.tbApp });
    else openCtx(e.clientX, e.clientY - 250, { kind: 'taskbar' });
  });

  /* taskbar interactions (delegated — the bar is re-rendered often) */
  dom.taskbar.addEventListener('click', (e) => {
    const t = e.target;
    if (t.closest('[data-tb-start]')) return toggleStart();
    if (t.closest('[data-tb-search]')) return toggleSearch();
    if (t.closest('[data-tb-taskview]')) return openTaskView();
    if (t.closest('[data-tb-widgets]')) return toggleBoard();
    if (t.closest('[data-tray-group]')) return toggleQuickSettings();
    if (t.closest('[data-tray-hidden]')) return toggleTray();
    if (t.closest('[data-tray-clock]') || t.closest('[data-tray-notif]')) return toggleNotifications();
    if (t.closest('[data-show-desktop]')) return showDesktop();
    const appBtn = t.closest('[data-tb-app]');
    if (appBtn) actTaskbarApp(appBtn.dataset.tbApp);
  });

  /* Windows behaviour: click selects, double-click (or Enter) opens.
     The pair is detected manually so the gesture also works from synthetic clicks. */
  let lastClick = { app: null, t: 0 };
  const openIcon = (btn) => openApp(btn.dataset.app);
  dom.deskIcons.addEventListener('click', (e) => {
    const btn = e.target.closest('.desk-icon');
    if (!btn) return;
    state.selectedIcon = btn.dataset.app;
    $$('.desk-icon').forEach((n) => n.classList.toggle('selected', n === btn));
    const now = Date.now();
    if (lastClick.app === btn.dataset.app && now - lastClick.t < 500) {
      lastClick = { app: null, t: 0 };
      openIcon(btn);
      return;
    }
    lastClick = { app: btn.dataset.app, t: now };
  });
  dom.deskIcons.addEventListener('dblclick', (e) => {
    const btn = e.target.closest('.desk-icon');
    if (btn) openIcon(btn);
  });
  dom.deskIcons.addEventListener('keydown', (e) => {
    const btn = e.target.closest('.desk-icon');
    if (!btn) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openIcon(btn);
    }
  });

  window.addEventListener('keydown', (e) => {
    if (state.locked) {
      if (state.power) {
        if (e.key === 'Escape') {
          state.power = false;
          renderLock();
        }
        return;
      }
      if (state.lockPhase === 'clock') {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowUp' || (e.key.length === 1 && !e.ctrlKey && !e.metaKey)) {
          e.preventDefault();
          setLockPhase('signin');
        }
      } else {
        if (e.key === 'Escape') setLockPhase('clock');
      }
      return;
    }
    /* --- Alt+Tab switcher --- */
    if (e.key === 'Tab' && e.altKey) {
      e.preventDefault();
      if (state.altTab.open) cycleAltTab(1);
      else openAltTab();
      return;
    }
    /* --- Windows-key shortcuts --- */
    const meta = e.metaKey || (e.ctrlKey && e.altKey);
    if (meta) {
      const k = e.key.toLowerCase();
      if (k === 'r') { e.preventDefault(); openRun(); return; }
      if (k === 'v') { e.preventDefault(); toggleClipboard(); return; }
      if (k === 'w') { e.preventDefault(); toggleBoard(); return; }
      if (k === 'z') { e.preventDefault(); openSnapOverlay(); return; }
      if (k === '.') { e.preventDefault(); toggleEmoji(); return; }
      if (e.shiftKey && k === 's') { e.preventDefault(); startSnip(); return; }
      if (k === 'd') { e.preventDefault(); showDesktop(); return; }
      if (k === 'e') { e.preventDefault(); openApp('explorer'); return; }
      if (k === 'i') { e.preventDefault(); launchApp('settings'); return; }
      if (k === 'a') { e.preventDefault(); toggleQuickSettings(); return; }
      if (k === 'n') { e.preventDefault(); toggleNotifications(); return; }
      if (k === 'l') { e.preventDefault(); lockScreen(); return; }
      if (k === 'tab') { e.preventDefault(); toggleTaskView(); return; }
      if (k === 's') { e.preventDefault(); toggleSearch(); return; }
      if (k === 'x') { e.preventDefault(); toggleQuickLink(); return; }
      if (k === 'p') { e.preventDefault(); openApp('settings2', { page: 'system.display' }); return; }
      if (k === 'm') { e.preventDefault(); minimizeWindow(state.activeId); return; }
      if (/^[1-9]$/.test(k)) {
        const id = state.pinned[+k - 1];
        if (id) { e.preventDefault(); openApp(id); }
        return;
      }
      if (k === 'arrowleft' || k === 'arrowright' || k === 'arrowup' || k === 'arrowdown') {
        const win = activeWindow();
        if (win) {
          e.preventDefault();
          const W = window.innerWidth;
          const H = window.innerHeight - state.taskbarH;
          win.maximized = false;
          if (k === 'arrowup') { toggleMaximize(win.id); return; }
          if (k === 'arrowdown') { win.minimized = true; state.activeId = null; updateWindows(); return; }
          if (k === 'arrowleft') { win.x = 0; win.y = 0; win.w = Math.round(W / 2); win.h = H; }
          else { win.x = Math.round(W / 2); win.y = 0; win.w = Math.round(W / 2); win.h = H; }
          applyWindowBox(win);
          updateWindows();
          showSnapAssist(win);
        }
        return;
      }
    }
    if (e.altKey && e.key === 'F4') {
      const win = activeWindow();
      if (win) { e.preventDefault(); closeWindow(win.id); }
      return;
    }
    if (e.key === 'Escape') {
      if (state.taskView) return closeTaskView();
      if (state.altTab.open) { state.altTab.open = false; return renderShellLayer(); }
      closeShell();
    }
    if (e.key === 'Meta' || (e.ctrlKey && e.key === 'Escape')) {
      e.preventDefault();
      toggleStart();
    }
  });

  /* --- Alt release commits the Alt+Tab choice --- */
  window.addEventListener('keyup', (e) => {
    if (e.key === 'Alt' && state.altTab.open) commitAltTab();
  });

  /* --- taskbar hover previews --- */
  dom.taskbar.addEventListener('pointerover', (e) => {
    const btn = e.target.closest('[data-tb-app]');
    const id = btn ? btn.dataset.tbApp : null;
    const hasWin = id && state.windows.some((w) => w.appId === id);
    const next = hasWin ? id : null;
    if (next !== state.preview) {
      state.preview = next;
      renderShellLayer();
    }
  });
  dom.taskbar.addEventListener('pointerleave', () => {
    if (state.preview) {
      state.preview = null;
      renderShellLayer();
    }
  });

  renderDeskIcons();
  renderTaskbar();
  renderShellLayer();
}

function renderWallpaper() {
  if (dom.wallpaper) dom.wallpaper.style.background = bg();
}

function renderDeskIcons() {
  dom.deskIcons.innerHTML = APPS.filter((a) => a.desktop)
    .map(
      (a) => `<button class="desk-icon" data-app="${a.id}" aria-label="${esc(a.name)}">
        <span class="glyph">${a.icon}</span>
        <span class="label">${esc(a.name)}</span>
      </button>`,
    )
    .join('');
}

/* =====================================================================
   Lock screen
   ===================================================================== */
function renderLock() {
  const n = state.now;
  const time = n.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const longDate = n.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' });

  dom.lock.hidden = !state.locked;
  dom.desktop.hidden = state.locked;
  if (!state.locked) return;

  const avatar = state.user.slice(0, 1).toUpperCase();
  const lockBg = LOCK_WALLS[clamp(Number(state.lockWall) || 0, 0, LOCK_WALLS.length - 1)];
  dom.lock.style.background = `${lockBg.css} center/cover no-repeat, #0a2740`;
  dom.lock.innerHTML = `
    <div class="lock-scrim"></div>
    <div class="lock-inner">
      ${
        state.lockPhase === 'clock'
          ? `<div class="lock-time">${time}</div>
             <div class="lock-date">${esc(longDate)}</div>
             <div class="lock-hint">Click or press any key to sign in</div>`
          : `<div class="lock-signin">
               <div class="lock-avatar">${esc(avatar)}</div>
               <div class="lock-name">${esc(state.user)}</div>
               <form class="lock-field" id="lock-form">
                 <input class="lock-input" id="lock-pin" type="password" placeholder="PIN" aria-label="PIN" autocomplete="off" />
                 <button class="lock-arrow" type="submit" aria-label="Sign in" title="Sign in">${ic(I.arrowRight, 18)}</button>
               </form>
               <div class="lock-links"><button type="button" id="lock-options">Sign-in options</button></div>
             </div>`
      }
    </div>
    ${state.power ? `<div class="lock-power">${powerMenuHtml()}</div>` : ''}
    <div class="lock-tray">
      <button aria-label="Change wallpaper" title="Change wallpaper" id="lock-wall">${ic(I.image, 18)}</button>
      <button aria-label="Network" title="Network">${ic(I.wifi, 18)}</button>
      <button aria-label="Accessibility" title="Accessibility">${ic(I.accessibility, 18)}</button>
      <button aria-label="Power" title="Power" id="lock-power">${ic(I.power, 18)}</button>
    </div>`;

  dom.lock.onclick = (e) => {
    if (e.target.closest('.lock-signin') || e.target.closest('.lock-tray')) return;
    if (state.lockPhase === 'clock') setLockPhase('signin');
  };
  const form = $('#lock-form');
  if (form) {
    form.addEventListener('click', (e) => e.stopPropagation());
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      unlock();
    });
    setTimeout(() => $('#lock-pin').focus(), 30);
  }
  const power = $('#lock-power');
  if (power) power.onclick = (e) => {
    e.stopPropagation();
    state.power = !state.power;
    renderLock();
  };
  const wallBtn = $('#lock-wall');
  if (wallBtn) wallBtn.onclick = (e) => {
    e.stopPropagation();
    state.lockWall = String((clamp(Number(state.lockWall) || 0, 0, LOCK_WALLS.length - 1) + 1) % LOCK_WALLS.length);
    store.set(LS.lockWall, state.lockWall);
    renderLock();
  };
  const options = $('#lock-options');
  if (options) options.onclick = (e) => e.stopPropagation();
  $$('[data-power]', dom.lock).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      doPower(btn.dataset.power);
      renderLock();
    });
  });
}

function setLockPhase(phase) {
  state.lockPhase = phase;
  renderLock();
}

function unlock() {
  state.locked = false;
  state.lockPhase = 'clock';
  state.power = false;
  renderLock();
  sfx('startup');
  notify('Windows', `Welcome back, ${state.user}`, 'Your desktop is ready.');
}
function lockScreen() {
  state.locked = true;
  state.lockPhase = 'clock';
  state.power = false;
  closeShell();
  renderLock();
  sfx('lock');
}

/* =====================================================================
   Taskbar
   ===================================================================== */
function runningIds() {
  return new Set(state.windows.filter((w) => (w.desk || 0) === state.activeDesktop).map((w) => w.appId));
}
function activeWindow() {
  return state.windows.find((w) => w.id === state.activeId && !w.minimized && (w.desk || 0) === state.activeDesktop) || null;
}

function renderTaskbar() {
  const running = runningIds();
  const active = activeWindow();
  const n = state.now;
  const time = n.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateShort = n.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
  const t = state.toggles;

  dom.tbLeft.innerHTML = `
    <button class="tb-weather" data-tb-widgets title="Widgets" aria-label="Widgets">
      ${ic(I.weather, 24)}
      <span class="temp">21°C</span>
      ${state.widgets ? `<span class="cond" style="color:var(--text-2)">Mostly sunny</span>` : ''}
    </button>`;

  const pinnedIds = state.pinned.slice();
  state.windows
    .filter((w) => (w.desk || 0) === state.activeDesktop)
    .forEach((w) => { if (!pinnedIds.includes(w.appId)) pinnedIds.push(w.appId); });
  const barApps = pinnedIds.map(appById);

  dom.tbCenter.style.left = state.align === 'left' ? '8px' : '50%';
  dom.tbCenter.style.transform = state.align === 'left' ? 'none' : 'translateX(-50%)';

  dom.tbCenter.innerHTML = `
    <button class="tb-app ${state.startOpen ? 'active' : ''}" data-tb-start aria-label="Start" title="Start">
      ${ic(I.windows, 24)}
    </button>
    <button class="tb-search ${state.search.open ? 'active' : ''}" data-tb-search aria-label="Search" title="Search">
      ${ic(I.search, 16)}<span class="ph">Search</span>
    </button>
    <button class="tb-app" data-tb-taskview aria-label="Task view" title="Task view">
      ${ic(I.taskView, 22)}
    </button>
    ${barApps
      .map((a) => {
        const isRun = running.has(a.id);
        const isActive = active && active.appId === a.id;
        return `<button class="tb-app ${isRun ? 'running' : ''} ${isActive ? 'active' : ''}"
            data-tb-app="${a.id}" aria-label="${esc(a.name)}" title="${esc(a.name)}">
            ${ic(a.icon, 24)}<span class="indicator"></span>
          </button>`;
      })
      .join('')}`;

  dom.tbRight.innerHTML = `
    <button class="tray-btn ${state.tray ? 'active' : ''}" data-tray-hidden title="Show hidden icons" aria-label="Show hidden icons">${ic(I.up, 14)}</button>
    <button class="tray-group" data-tray-group aria-label="Network, sound and battery"
        title="${t.wifi ? 'HomeNet_5G — Internet access' : 'Not connected'}">
      ${ic(t.wifi ? I.wifi : I.network, 16)}
      ${ic(state.volume === 0 ? I.volumeMute : I.volume, 16)}
      ${ic(I.battery, 16)}
    </button>
    <button class="tray-btn" data-tray-clock aria-label="Date and time" title="${esc(n.toLocaleString())}">
      <span class="tray-clock"><span>${time}</span><span>${dateShort}</span></span>
    </button>
    <button class="tray-btn" data-tray-notif aria-label="Notifications" title="Notifications">
      ${ic(state.focus ? I.notificationsOff : I.notifications, 16)}
    </button>
    <button class="show-desktop" data-show-desktop aria-label="Show desktop" title="Show desktop"></button>`;
}

function actTaskbarApp(appId) {
  const win = state.windows.find((w) => w.appId === appId);
  if (!win) return openApp(appId);
  if (win.minimized) {
    win.minimized = false;
    focusWindow(win.id);
  } else if (state.activeId === win.id) {
    win.minimized = true;
    state.activeId = null;
    renderTaskbar();
    updateWindows();
  } else {
    focusWindow(win.id);
  }
}

function showDesktop() {
  const anyVisible = state.windows.some((w) => !w.minimized);
  state.windows.forEach((w) => { w.minimized = anyVisible; });
  state.activeId = null;
  renderTaskbar();
  updateWindows();
}

/* =====================================================================
   Task view (window overview)
   ===================================================================== */
function openTaskView() {
  state.taskView = true;
  closeShell();
  const onDesk = state.windows.filter((w) => (w.desk || 0) === state.activeDesktop);
  dom.taskviewLayer.innerHTML = `
    <div class="taskview" id="taskview">
      <div class="tv-stage">
        ${
          onDesk.length
            ? onDesk
                .map(
                  (w) => `<button class="tv-card ${w.id === state.activeId ? 'active' : ''}" data-tv="${w.id}">
                    <span class="tv-shot">${ic(appById(w.appId).icon, 72)}</span>
                    <span class="tv-name">${ic(appById(w.appId).icon, 16)}${esc(w.title)}</span>
                  </button>`,
                )
                .join('')
            : `<div class="tv-empty">No open windows on this desktop</div>`
        }
      </div>
      <div class="tv-desks">
        ${state.desktops
          .map(
            (d, i) => `<div class="tv-desk ${i === state.activeDesktop ? 'on' : ''}" data-desk="${i}">
              <button class="tv-desk-main" data-desk-go="${i}">
                <span class="tv-desk-shot">${state.windows.filter((w) => (w.desk || 0) === i).length
                  ? state.windows
                      .filter((w) => (w.desk || 0) === i)
                      .slice(0, 1)
                      .map((w) => `<span class="ic" style="width:26px;height:26px">${appById(w.appId).icon}</span>`)
                      .join('')
                  : `<span class="ic" style="width:26px;height:26px">${ic(I.monitor, 24)}</span>`}</span>
                <span class="tv-desk-name">${esc(d.name)}${i === state.activeDesktop ? ' (current)' : ''}</span>
              </button>
              ${state.desktops.length > 1 ? `<button class="tv-desk-x" data-desk-close="${i}" title="Close desktop" aria-label="Close desktop">${ic(I.close, 10)}</button>` : ''}
            </div>`,
          )
          .join('')}
        <button class="tv-new-desk" data-desk-new>${ic(I.plus, 16)}<span>New desktop</span></button>
      </div>
    </div>`;
  const layer = $('#taskview');
  layer.addEventListener('click', (e) => {
    if (e.target === layer) return closeTaskView();
    if (e.target.closest('[data-desk-new]')) return newDesktop();
    if (e.target.closest('[data-desk-close]')) {
      const close = e.target.closest('[data-desk-close]');
      return closeDesktop(Number(close.dataset.deskClose));
    }
    const go = e.target.closest('[data-desk-go]');
    if (go) return switchDesktop(Number(go.dataset.deskGo));
    const card = e.target.closest('[data-tv]');
    if (card) {
      const win = state.windows.find((w) => w.id === card.dataset.tv);
      if (win) {
        win.minimized = false;
        focusWindow(win.id);
      }
      closeTaskView();
    }
  });
}
function closeTaskView() {
  state.taskView = false;
  dom.taskviewLayer.innerHTML = '';
}
function toggleTaskView() {
  if (state.taskView) closeTaskView();
  else openTaskView();
}

/* =====================================================================
   Window manager
   ===================================================================== */
const SNAP_LAYOUTS = [
  { cols: '1fr 1fr', rows: '1fr', zones: [{ r: 1, c: 1 }, { r: 1, c: 2 }] },
  { cols: '1fr 1fr 1fr', rows: '1fr', zones: [{ r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }] },
  { cols: '1fr 1fr', rows: '1fr 1fr', zones: [{ r: 1, c: 1, tall: true }, { r: 1, c: 2 }, { r: 2, c: 2 }] },
  { cols: '1fr 1fr', rows: '1fr 1fr', zones: [{ r: 1, c: 1 }, { r: 1, c: 2 }, { r: 2, c: 1 }, { r: 2, c: 2 }] },
];

function openApp(appId, opts) {
  const existing = state.windows.find((w) => w.appId === appId);
  if (existing) {
    existing.minimized = false;
    if (opts) existing.opts = opts;
    focusWindow(existing.id);
    closeShell();
    return;
  }
  const def = appById(appId);
  const vw = window.innerWidth;
  const vh = window.innerHeight - state.taskbarH;
  const w = Math.min(def.w, Math.max(320, vw - 48));
  const h = Math.min(def.h, Math.max(260, vh - 48));
  const off = (state.cascade++ % 5) * 28;
  const win = {
    id: `${appId}-${Date.now()}`,
    appId,
    title: def.name,
    x: Math.max(8, Math.round((vw - w) / 2) + off - 56),
    y: Math.max(8, Math.round((vh - h) / 2) + off - 56),
    w,
    h,
    minW: 300,
    minH: 220,
    minimized: false,
    maximized: false,
    z: ++state.z,
    opts: opts || null,
    desk: state.activeDesktop || 0,
  };
  state.windows.push(win);
  state.activeId = win.id;
  buildWindow(win);
  closeShell();
  renderTaskbar();
  updateWindows();
  sfx('open');
}

function buildWindow(win) {
  const def = appById(win.appId);
  const frame = document.createElement('div');
  frame.className = 'window';
  frame.dataset.window = win.appId;
  frame.dataset.id = win.id;
  frame.setAttribute('role', 'dialog');
  frame.setAttribute('aria-label', def.name);

  frame.innerHTML = `
    <div class="titlebar">
      <span class="tb-icon">${def.icon}</span>
      <span class="tb-title">${esc(win.title)}</span>
      <div class="win-controls">
        <button data-win="min" aria-label="Minimize" title="Minimize">
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M0 5h10" stroke="currentColor" stroke-width="1"/></svg>
        </button>
        <button data-win="max" aria-label="Maximize" title="Maximize">
          <svg class="ico-max" width="10" height="10" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" stroke-width="1"/></svg>
          <svg class="ico-restore" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor"><rect x="0.5" y="2.5" width="7" height="7"/><path d="M2.5 2.5V0.5h7v7h-2"/></svg>
        </button>
        <button class="close" data-win="close" aria-label="Close" title="Close">
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M0 0l10 10M10 0L0 10" stroke="currentColor" stroke-width="1"/></svg>
        </button>
      </div>
      <div class="snap-popup" hidden>
        ${SNAP_LAYOUTS.map(
          (layout, li) => `<div class="snap-opt" style="grid-template-columns:${layout.cols};grid-template-rows:${layout.rows}">
            ${layout.zones
              .map(
                (z, zi) => `<button class="cell" data-snap="${li}:${zi}" title="Snap window here"
                  aria-label="Snap zone ${li + 1}-${zi + 1}" ${z.tall ? 'style="grid-row:span 2"' : ''}></button>`,
              )
              .join('')}
          </div>`,
        ).join('')}
      </div>
    </div>
    <div class="window-body"></div>
    ${['n', 's', 'w', 'e', 'nw', 'ne', 'sw', 'se']
      .map((d) => `<div class="resize-handle rh-${d}" data-rh="${d}"></div>`)
      .join('')}`;

  const body = $('.window-body', frame);
  win.__host = document.createElement('div');
  win.__host.className = 'win-host';
  body.appendChild(win.__host);
  try {
    win.__inst = APP_IMPL[win.appId] ? APP_IMPL[win.appId](win, win.opts) : { el: document.createElement('div') };
  } catch (err) {
    console.error(`[windowia] ${win.appId} failed:`, err);
    win.__inst = {
      el: h(`<div class="app-shell"><div class="app-content">
        <h3 style="margin:0 0 8px">${esc(win.title)}</h3>
        <p style="font-size:13px;color:var(--text-2)">This app hit an error and could not start: ${esc(String((err && err.message) || err))}</p>
      </div></div>`),
    };
  }
  if (win.__inst.el) win.__host.appendChild(win.__inst.el);

  /* window interactions */
  const titlebar = $('.titlebar', frame);
  titlebar.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.win-controls') || e.target.closest('.snap-popup')) return;
    focusWindow(win.id);
    if (win.maximized) return;
    const dx = e.clientX - win.x;
    const dy = e.clientY - win.y;
    const move = (ev) => {
      win.x = clamp(ev.clientX - dx, 120 - win.w, window.innerWidth - 120);
      win.y = clamp(ev.clientY - dy, 0, window.innerHeight - state.taskbarH - 40);
      win.maximized = false;
      applyWindowBox(win);
      updateWindows();
    };
    const up = (ev) => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      const W = window.innerWidth;
      if (ev.clientY <= 6) {
        toggleMaximize(win.id);
        return;
      }
      if (ev.clientX <= 6 || ev.clientX >= W - 6) {
        const half = { cols: '1fr 1fr', rows: '1fr', zones: [{ r: 1, c: 1 }, { r: 1, c: 2 }] };
        snapWindow(win, half, half.zones[ev.clientX >= W - 6 ? 1 : 0]);
        showSnapAssist(win);
      }
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  });
  titlebar.addEventListener('dblclick', (e) => {
    if (e.target.closest('.win-controls')) return;
    toggleMaximize(win.id);
  });

  $$('.resize-handle', frame).forEach((handle) => {
    handle.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      focusWindow(win.id);
      const dir = handle.dataset.rh;
      const box = { x: win.x, y: win.y, w: win.w, h: win.h };
      const sx = e.clientX;
      const sy = e.clientY;
      const move = (ev) => {
        const dx = ev.clientX - sx;
        const dy = ev.clientY - sy;
        let { x, y, w, h } = box;
        if (dir.includes('e')) w = Math.max(win.minW, box.w + dx);
        if (dir.includes('s')) h = Math.max(win.minH, box.h + dy);
        if (dir.includes('w')) { w = Math.max(win.minW, box.w - dx); x = box.x + (box.w - w); }
        if (dir.includes('n')) { h = Math.max(win.minH, box.h - dy); y = Math.max(0, box.y + (box.h - h)); }
        Object.assign(win, { x, y, w, h, maximized: false });
        applyWindowBox(win);
      };
      const up = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    });
  });

  frame.addEventListener('pointerdown', () => focusWindow(win.id));

  /* caption buttons */
  $('[data-win="min"]', frame).addEventListener('click', (e) => {
    e.stopPropagation();
    win.minimized = true;
    state.activeId = null;
    updateWindows();
    renderTaskbar();
  });
  $('[data-win="max"]', frame).addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMaximize(win.id);
    $('.snap-popup', frame).hidden = true;
  });
  $('[data-win="close"]', frame).addEventListener('click', (e) => {
    e.stopPropagation();
    closeWindow(win.id);
  });

  /* snap layouts flyout */
  const popup = $('.snap-popup', frame);
  const maxBtn = $('[data-win="max"]', frame);
  let snapTimer = null;
  const showSnap = () => {
    clearTimeout(snapTimer);
    if (!win.maximized) popup.hidden = false;
  };
  const hideSnap = () => {
    clearTimeout(snapTimer);
    snapTimer = setTimeout(() => { popup.hidden = true; }, 180);
  };
  maxBtn.addEventListener('mouseenter', showSnap);
  maxBtn.addEventListener('mouseleave', hideSnap);
  popup.addEventListener('mouseenter', () => clearTimeout(snapTimer));
  popup.addEventListener('mouseleave', hideSnap);
  popup.addEventListener('pointerdown', (e) => e.stopPropagation());
  popup.addEventListener('click', (e) => {
    const cell = e.target.closest('[data-snap]');
    if (!cell) return;
    const [li, zi] = cell.dataset.snap.split(':').map(Number);
    snapWindow(win, SNAP_LAYOUTS[li], SNAP_LAYOUTS[li].zones[zi]);
    popup.hidden = true;
  });

  dom.winLayer.appendChild(frame);
  win.__el = frame;
}

function snapWindow(win, layout, zone) {
  const W = window.innerWidth;
  const H = window.innerHeight - state.taskbarH;
  const cols = layout.cols.split(' ').length;
  const rows = layout.rows.split(' ').length;
  const cw = W / cols;
  const rh = H / rows;
  win.x = Math.round((zone.c - 1) * cw);
  win.y = Math.round((zone.r - 1) * rh);
  win.w = Math.round(cw);
  win.h = Math.round(zone.tall ? H : rh);
  win.maximized = false;
  win.minimized = false;
  applyWindowBox(win);
  focusWindow(win.id);
  showSnapAssist(win);
}

function applyWindowBox(win) {
  const el = win.__el;
  if (!el) return;
  if (win.maximized) {
    Object.assign(el.style, { left: '0px', top: '0px', width: '100%', height: `calc(100% - ${state.taskbarH}px)` });
  } else {
    Object.assign(el.style, { left: `${win.x}px`, top: `${win.y}px`, width: `${win.w}px`, height: `${win.h}px` });
  }
}

function updateWindows() {
  const active = activeWindow();
  state.windows.forEach((win) => {
    const el = win.__el;
    if (!el) return;
    el.style.zIndex = String(win.z);
    el.hidden = !!win.minimized || (win.desk || 0) !== state.activeDesktop;
    el.classList.toggle('inactive', !active || active.id !== win.id);
    el.classList.toggle('maximized', !!win.maximized);
    const maxBtn = $('[data-win="max"]', el);
    if (maxBtn) {
      const label = win.maximized ? 'Restore' : 'Maximize';
      if (maxBtn.getAttribute('aria-label') !== label) {
        maxBtn.setAttribute('aria-label', label);
        maxBtn.title = label;
      }
    }
    applyWindowBox(win);
  });
  renderTaskbar();
}

function focusWindow(id) {
  const win = state.windows.find((w) => w.id === id);
  if (!win) return;
  if (state.activeId !== id) {
    state.activeId = id;
    win.z = ++state.z;
  }
  updateWindows();
}

function closeWindow(id) {
  const win = state.windows.find((w) => w.id === id);
  if (!win) return;
  const el = win.__el;
  if (win.__inst && win.__inst.dispose) win.__inst.dispose();
  if (el) {
    el.classList.add('closing');
    setTimeout(() => el.remove(), 130);
  }
  state.windows = state.windows.filter((w) => w.id !== id);
  if (state.activeId === id) {
    const next = state.windows.filter((w) => !w.minimized).sort((a, b) => b.z - a.z)[0];
    state.activeId = next ? next.id : null;
  }
  renderTaskbar();
  updateWindows();
}

function minimizeWindow(id) {
  const win = state.windows.find((w) => w.id === id);
  if (!win) return;
  win.minimized = true;
  if (state.activeId === id) state.activeId = null;
  updateWindows();
}

function toggleMaximize(id) {
  const win = state.windows.find((w) => w.id === id);
  if (!win) return;
  if (win.maximized) {
    Object.assign(win, win.prev || { x: 90, y: 70, w: 900, h: 560 }, { maximized: false });
    delete win.prev;
  } else {
    win.prev = { x: win.x, y: win.y, w: win.w, h: win.h };
    win.maximized = true;
  }
  focusWindow(id);
}

/* =====================================================================
   Apps
   ===================================================================== */
const h = (html) => {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
};
const shell = (inner) => h(`<div class="app-shell">${inner}</div>`);
const on = (root, sel, ev, fn) => $$(sel, root).forEach((n) => n.addEventListener(ev, fn));

/* =====================================================================
   Shared virtual file system
   ===================================================================== */
const FSE = {
  'C:': { Desktop: 'd', Documents: 'd', Downloads: 'd', Pictures: 'd', Music: 'd', Videos: 'd' },
  'C:\\Desktop': { 'Project Plan.docx': 48512, 'Budget.xlsx': 22184, 'notes.txt': 512 },
  'C:\\Documents': { 'Project Plan.docx': 48512, 'Budget.xlsx': 22184, 'notes.txt': 512, Archive: 'd' },
  'C:\\Documents\\Archive': { 'old-notes.txt': 1024 },
  'C:\\Downloads': { 'windows-setup.exe': 193000000, 'wallpaper-pack.zip': 38000000 },
  'C:\\Pictures': { 'Bloom.jpg': 2500000, 'Bloom light.jpg': 1900000, 'Flow.jpg': 1900000 },
  'C:\\Music': { 'Ambient Loop.mp3': 6500000 },
  'C:\\Videos': { 'Screen Recording.mp4': 96000000 },
};

const IMG_BY_NAME = (n) => {
  const key = String(n).toLowerCase().split('.')[0].split(' ')[0];
  const hit = PHOTOS.find((p) => p.title.toLowerCase().startsWith(key));
  return hit ? hit.bg : 'linear-gradient(135deg,#0f2027,#2c5364)';
};
const isImageName = (n) => /\.(png|jpe?g|gif|bmp|webp|svg)$/i.test(n);
const isTextName = (n) => /\.(txt|md|log|json|js|css|html|csv|ini|bat|ps1)$/i.test(n);

function fmtBytes(b) {
  if (b === undefined || b === null) return '';
  if (b === 0) return '0 KB';
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1).replace(/\.0$/, '')} KB`;
  if (b < 1024 * 1024 * 1024) return `${(b / 1024 / 1024).toFixed(1).replace(/\.0$/, '')} MB`;
  return `${(b / 1024 / 1024 / 1024).toFixed(2)} GB`;
}
const fileType = (n) =>
  isImageName(n) ? 'Image file'
  : /\.txt$/.test(n) ? 'Text Document'
  : /\.md$/.test(n) ? 'Markdown file'
  : /\.docx$/.test(n) ? 'Word Document'
  : /\.xlsx$/.test(n) ? 'Excel Worksheet'
  : /\.exe$/.test(n) ? 'Application'
  : /\.zip$/.test(n) ? 'Compressed Folder'
  : /\.mp3$/.test(n) ? 'MP3 Audio'
  : /\.mp4$/.test(n) ? 'MP4 Video' : 'File';

/* ---------------------------------------------------------------- Notepad */
function notepadApp(win, opts = {}) {
  const el = shell(`
    <div class="tab-strip" data-tabs></div>
    <div class="menu-bar">
      <button class="menu-item" data-menu="file">File</button>
      <button class="menu-item" data-menu="edit">Edit</button>
      <button class="menu-item" data-menu="view">View</button>
      <span class="menu-spacer"></span>
      <button class="tool-btn" data-find-toggle title="Find">${ic(I.search, 14)}Find</button>
    </div>
    <div class="find-bar" data-find hidden>
      <input class="field" data-find-input placeholder="Find" aria-label="Find" style="width:170px" />
      <input class="field" data-replace-input placeholder="Replace" aria-label="Replace with" style="width:170px" />
      <button class="pill-btn" data-find-next>Find next</button>
      <button class="pill-btn" data-replace>Replace</button>
      <button class="pill-btn" data-replace-all>Replace all</button>
      <span class="find-count" data-find-count></span>
    </div>
    <textarea class="notepad-area" spellcheck="false" placeholder="Start typing…" aria-label="Document text"></textarea>
    <div class="status-bar">
      <span data-pos>Ln 1, Col 1</span>
      <span data-words>0 words</span>
      <span data-chars></span>
      <span style="margin-left:auto" data-zoom>100%</span>
      <span data-eol>Windows (CRLF)</span>
      <span>UTF-8</span>
    </div>`);

  const ta = $('.notepad-area', el);
  const tabsEl = $('[data-tabs]', el);
  const pos = $('[data-pos]', el);
  const words = $('[data-words]', el);
  const chars = $('[data-chars]', el);
  const zoom = $('[data-zoom]', el);
  const findBar = $('[data-find]', el);
  let tabs = [{ name: 'Untitled', value: '', path: null }];
  let active = 0;
  let wrap = true;
  let size = 100;

  const key = () => `${LS.notepad}.v2`;
  const cur = () => tabs[active];
  const save = () => store.set(key(), JSON.stringify({ tabs, active }));

  if (opts && opts.path) {
    tabs = [{ name: opts.path.split('\\').pop(), path: opts.path, value: String(FSE[opts.path] || '') }];
  } else {
    try {
      const d = JSON.parse(store.get(key(), '') || 'null');
      if (d && d.tabs && d.tabs.length) { tabs = d.tabs; active = d.active || 0; }
    } catch (err) { /* ignore */ }
  }

  const stats = () => {
    const v = ta.value;
    const upto = v.slice(0, ta.selectionStart);
    pos.textContent = `Ln ${upto.split('\n').length}, Col ${upto.length - upto.lastIndexOf('\n')}`;
    const w = v.trim() ? v.trim().split(/\s+/).length : 0;
    words.textContent = `${w} word${w === 1 ? '' : 's'}`;
    chars.textContent = `${v.length} characters`;
    $('[data-eol]', el).textContent = v.includes('\r\n') ? 'Windows (CRLF)' : 'Unix (LF)';
  };
  const paintTabs = () => {
    tabsEl.innerHTML =
      tabs
        .map(
          (t, i) => `<button class="tab ${i === active ? 'active' : ''}" data-tab="${i}">
            <span class="tab-icon">${ic(I.notepad, 16)}</span><span class="tab-label">${esc(t.name)}</span>
            <span class="tab-x" data-tabx="${i}" title="Close tab">${ic(I.close, 10)}</span></button>`,
        )
        .join('') + `<button class="tab" data-new-tab style="padding:0 12px" title="New tab">${ic(I.plus, 14)}</button>`;
  };
  const paint = () => { paintTabs(); ta.value = cur().value; stats(); save(); };

  ta.addEventListener('input', () => { cur().value = ta.value; stats(); save(); });
  ['keyup', 'click', 'select'].forEach((ev) => ta.addEventListener(ev, stats));
  on(el, '[data-tab]', 'click', (e) => { const i = +e.currentTarget.dataset.tab; if (i !== active) { active = i; paint(); } });
  on(el, '[data-tabx]', 'click', (e) => {
    e.stopPropagation();
    tabs.splice(+e.currentTarget.dataset.tabx, 1);
    if (!tabs.length) tabs = [{ name: 'Untitled', value: '', path: null }];
    active = clamp(active, 0, tabs.length - 1);
    paint();
  });
  const newTab = () => { tabs.push({ name: 'Untitled', value: '', path: null }); active = tabs.length - 1; paint(); ta.focus(); };
  paintTabs();
  $('[data-new-tab]', el).addEventListener('click', newTab);

  const fileMenu = [
    ['New tab', newTab],
    ['Open notes.txt', () => { tabs[active] = { name: 'notes.txt', path: 'C:\\Documents\\notes.txt', value: store.get(LS.notepad, '') || '' }; paint(); }],
    ['Save', () => { const c = cur(); if (c.path) FSE[c.path] = c.value; notify('Notepad', 'File saved', c.name); save(); }],
    ['Save as…', () => {
      const name = prompt('File name', 'untitled.txt');
      if (!name) return;
      const p = `C:\\Desktop\\${name}`;
      FSE[p] = ta.value;
      tabs[active] = { name, path: p, value: ta.value };
      paint();
    }],
    ['Close tab', () => { tabs.splice(active, 1); if (!tabs.length) tabs = [{ name: 'Untitled', value: '', path: null }]; active = clamp(active, 0, tabs.length - 1); paint(); }],
  ];
  const editMenu = [
    ['Undo', () => { ta.focus(); document.execCommand('undo'); }],
    ['Select all', () => { ta.focus(); ta.select(); }],
    ['Copy', () => { ta.focus(); document.execCommand('copy'); }],
    ['Cut', () => { ta.focus(); document.execCommand('cut'); }],
    ['Paste', () => { ta.focus(); document.execCommand('paste'); }],
    ['Find', () => { findBar.hidden = false; $('[data-find-input]', el).focus(); }],
  ];
  const viewMenu = [
    ['Word wrap', () => { wrap = !wrap; ta.wrap = wrap ? 'soft' : 'off'; paint(); }],
    ['Zoom in', () => { size = clamp(size + 10, 50, 300); zoom.textContent = `${size}%`; ta.style.fontSize = `${14 * (size / 100)}px`; }],
    ['Zoom out', () => { size = clamp(size - 10, 50, 300); zoom.textContent = `${size}%`; ta.style.fontSize = `${14 * (size / 100)}px`; }],
    ['Status bar', () => { const s = $('.status-bar', el); s.style.display = s.style.display === 'none' ? '' : 'none'; }],
  ];
  on(el, '[data-menu]', 'click', (e) => {
    const which = e.currentTarget.dataset.menu;
    const items = which === 'file' ? fileMenu : which === 'edit' ? editMenu : viewMenu;
    const r = e.currentTarget.getBoundingClientRect();
    state.ctx = { x: r.left, y: r.bottom, target: { kind: 'notepad-menu', items } };
    renderShellLayer();
  });

  $('[data-find-toggle]', el).addEventListener('click', () => {
    findBar.hidden = !findBar.hidden;
    if (!findBar.hidden) $('[data-find-input]', el).focus();
  });
  const findNext = () => {
    const q = $('[data-find-input]', el).value;
    if (!q) return;
    const from = ta.selectionEnd;
    let i = ta.value.toLowerCase().indexOf(q.toLowerCase(), from);
    if (i < 0) i = ta.value.toLowerCase().indexOf(q.toLowerCase());
    $('[data-find-count]', el).textContent = i < 0 ? 'No results' : `Found at ${i + 1}`;
    if (i >= 0) { ta.focus(); ta.setSelectionRange(i, i + q.length); }
  };
  $('[data-find-next]', el).addEventListener('click', findNext);
  $('[data-replace]', el).addEventListener('click', () => {
    const q = $('[data-find-input]', el).value;
    const r = $('[data-replace-input]', el).value;
    const s = ta.selectionStart;
    if (q && ta.value.slice(s, s + q.length).toLowerCase() === q.toLowerCase()) {
      ta.setRangeText(r, s, s + q.length, 'select');
      cur().value = ta.value;
      save();
      stats();
    }
    findNext();
  });
  $('[data-replace-all]', el).addEventListener('click', () => {
    const q = $('[data-find-input]', el).value;
    const r = $('[data-replace-input]', el).value;
    if (!q) return;
    const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const n = (ta.value.match(re) || []).length;
    ta.value = ta.value.replace(re, r);
    cur().value = ta.value;
    $('[data-find-count]', el).textContent = `${n} replaced`;
    save();
    stats();
  });

  paint();
  ta.focus();
  return { el };
}

/* ------------------------------------------------------------ Terminal */
function terminalApp(win, opts = {}) {
  const el = shell(`
    <div class="tab-strip">
      <button class="tab active"><span class="tab-icon">${ic(I.terminal, 16)}</span>
        <span class="tab-label">Windows PowerShell</span></button>
      <button class="tab" style="padding:0 12px" title="New tab">${ic(I.plus, 14)}</button>
    </div>
    <div class="terminal" data-term>
      <div data-lines></div>
      <div class="terminal-input-row">
        <span class="prompt" data-prompt></span>
        <input class="terminal-input" data-input spellcheck="false" aria-label="Terminal input" autofocus />
      </div>
    </div>`);

  const term = $('[data-term]', el);
  const linesEl = $('[data-lines]', el);
  const input = $('[data-input]', el);
  const promptEl = $('[data-prompt]', el);
  let cwd = (opts && opts.cwd) || 'C:\\Users\\User';
  const history = [];
  let hidx = -1;
  const dir = () => FSE[cwd] || FSE[(cwd.match(/^C:\\[^\\]+/) || [''])[0]] || {};
  const paintPrompt = () => { promptEl.innerHTML = `<span class="ps">PS</span> ${esc(cwd)}&gt;`; };
  const lines = [
    '<span class="term-dim">Windows PowerShell</span>',
    '<span class="term-dim">Copyright (C) Windowia. All rights reserved.</span>',
    '',
  ];
  const paint = () => {
    linesEl.innerHTML = lines.map((l) => `<div class="line">${l}</div>`).join('');
    term.scrollTop = term.scrollHeight;
  };

  const run = (raw) => {
    history.push(raw);
    hidx = history.length;
    const out = [`<span class="ps">PS</span> ${esc(cwd)}&gt; ${esc(raw)}`];
    const parts = raw.trim().split(/\s+/);
    const name = (parts[0] || '').toLowerCase();
    const args = parts.slice(1);
    const e = (s) => esc(s);
    switch (name) {
      case '': break;
      case 'help':
        out.push('Available commands:', '',
          '  help        dir / ls      cd <dir>    pwd         echo <text>',
          '  date        whoami        ver         hostname    cls / clear',
          '  ipconfig    ping <host>   tree        mkdir <n>   rm <file>',
          '  type <file> cat <file>    start <app> git status  neofetch', '');
        break;
      case 'dir': case 'ls': case 'gci': {
        out.push(`    Directory: ${esc(cwd)}`, '', 'Mode   LastWriteTime         Length Name', '----   -------------         ------ ----');
        Object.entries(dir()).forEach(([n, v]) => {
          out.push(v === 'd'
            ? `d----  9/25/2026  10:14 AM         <DIR> ${e(n)}`
            : `-a---  9/25/2026  10:14 AM   ${String(fmtBytes(v)).padStart(12)} ${e(n)}`);
        });
        out.push('');
        break;
      }
      case 'cd': {
        if (!args[0] || args[0] === '~') cwd = 'C:\\Users\\User';
        else if (args[0] === '..') cwd = cwd.split('\\').slice(0, -1).join('\\') || 'C:\\';
        else if (FSE[`${cwd}\\${args[0]}`]) cwd = `${cwd}\\${args[0]}`;
        else out.push(`cd : Cannot find path '${e(args[0])}' because it does not exist.`);
        paintPrompt();
        break;
      }
      case 'pwd': out.push(cwd); break;
      case 'echo': out.push(e(args.join(' '))); break;
      case 'date': out.push(new Date().toString()); break;
      case 'whoami': out.push('windowia\\user'); break;
      case 'hostname': out.push('WINDOWIA-PC'); break;
      case 'ver': out.push('Windowia OS [Version 11.0.26100.1]'); break;
      case 'tree':
        out.push('C:.');
        Object.keys(FSE['C:']).forEach((k, i, a) => out.push(`${i === a.length - 1 ? '└───' : '├───'}${e(k)}`));
        out.push('');
        break;
      case 'mkdir': case 'md':
        if (args[0]) { FSE[cwd] = FSE[cwd] || {}; FSE[cwd][args[0]] = 'd'; out.push(''); }
        break;
      case 'rm': case 'del':
        if (args[0] !== undefined && dir()[args[0]] !== undefined) { delete FSE[cwd][args[0]]; out.push(''); }
        else out.push(`Cannot find path '${e(args[0] || '')}'.`);
        break;
      case 'type': case 'cat':
        if (args[0] && typeof dir()[args[0]] === 'string') out.push(e(dir()[args[0]]));
        else out.push(`Get-Content : Cannot find path '${e(args[0] || '')}'.`);
        break;
      case 'ping':
        out.push(`Pinging ${e(args[0] || 'localhost')} [192.168.1.1] with 32 bytes of data:`);
        for (let i = 0; i < 4; i++) out.push(`Reply from 192.168.1.1: bytes=32 time=${i + 1}ms TTL=64`);
        out.push('');
        break;
      case 'ipconfig':
        out.push('Windows IP Configuration', '', 'Ethernet adapter Ethernet:',
          '   IPv4 Address. . . . . . . . . . . : 192.168.1.42',
          '   Subnet Mask . . . . . . . . . . . : 255.255.255.0',
          '   Default Gateway . . . . . . . . . : 192.168.1.1', '');
        break;
      case 'start':
        if (args[0] && APPS.some((a) => a.id === args[0])) { openApp(args[0]); out.push(''); }
        else out.push(`Start-Process : Cannot find '${e(args[0] || '')}'. Try: ${APPS.map((a) => a.id).join(', ')}`);
        break;
      case 'git':
        out.push(...(args[0] === 'status'
          ? ['On branch main', "Your branch is up to date with 'origin/main'.", '', 'nothing to commit, working tree clean']
          : ['usage: git <command>']));
        out.push('');
        break;
      case 'neofetch':
        out.push(
          '  ██████  ██████   <span class="term-accent">user@WINDOWIA-PC</span>',
          '  ██  ██  ██  ██   -----------------',
          '  ██  ██  ██  ██   OS: Windowia 11 Pro',
          '  ██████  ██████   Kernel: 11.0.26100.1',
          '                   Shell: PowerShell 7.6',
          '                   DE: Fluent',
          '                   CPU: Windowia Virtual (8) @ 3.4GHz',
          '                   Memory: 6144MiB / 16384MiB', '');
        break;
      case 'cls': case 'clear':
        lines.length = 0; input.value = ''; paint(); return;
      default:
        out.push(`${e(name)} : The term '${e(name)}' is not recognized as a name of a cmdlet, function, script file, or operable program.`);
    }
    lines.push(...out);
    input.value = '';
    paint();
  };

  input.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') run(input.value);
    else if (ev.key === 'ArrowUp') { ev.preventDefault(); if (hidx > 0) { hidx--; input.value = history[hidx] || ''; } }
    else if (ev.key === 'ArrowDown') { ev.preventDefault(); hidx = Math.min(history.length, hidx + 1); input.value = history[hidx] || ''; }
    else if (ev.key === 'Tab') {
      ev.preventDefault();
      const v = input.value.toLowerCase();
      const hit = ['help','dir','cd','echo','date','whoami','ver','cls','ipconfig','tree','mkdir','rm','type','ping','start','neofetch','git','pwd','hostname'].find((c) => c.startsWith(v));
      if (hit) input.value = hit;
    } else if (ev.key === 'c' && ev.ctrlKey) {
      lines.push(`${esc(input.value)}^C`); input.value = ''; paint();
    }
  });
  term.addEventListener('click', (e) => { if (!e.target.closest('input')) input.focus(); });
  paintPrompt();
  paint();
  setTimeout(() => input.focus(), 40);
  return { el };
}

/* ---------------------------------------------------------- Calculator */
function calculatorApp() {
  const el = shell(`
    <div class="calc">
      <div class="calc-head">
        <button class="icon-btn-sm" aria-label="Open navigation" title="Menu">${ic(I.hamburger, 16)}</button>
        <span>Standard</span>
      </div>
      <div class="calc-mem">
        <button data-mem="MC" title="Memory clear">MC</button>
        <button data-mem="MR" title="Memory recall">MR</button>
        <button data-mem="M+" title="Memory add">M+</button>
        <button data-mem="M-" title="Memory subtract">M−</button>
        <button data-mem="MS" title="Memory store">MS</button>
        <button data-mem="M^" title="Memory list">M˅</button>
      </div>
      <div class="calc-display">
        <div class="calc-expr" data-expr></div>
        <div class="calc-value" data-testid="calc-value">0</div>
      </div>
      <div class="calc-keys"></div>
    </div>`);

  const keys = [
    ['%', 'op'], ['CE', 'op'], ['C', 'op'], ['⌫', 'op'],
    ['1/x', 'op'], ['x²', 'op'], ['√x', 'op'], ['÷', 'op'],
    ['7', ''], ['8', ''], ['9', ''], ['×', 'op'],
    ['4', ''], ['5', ''], ['6', ''], ['−', 'op'],
    ['1', ''], ['2', ''], ['3', ''], ['+', 'op'],
    ['+/−', ''], ['0', ''], ['.', ''], ['=', 'eq'],
  ];
  $('.calc-keys', el).innerHTML = keys
    .map(([label, cls]) => `<button class="calc-key ${cls}" data-key="${esc(label)}">${esc(label)}</button>`)
    .join('');

  const valueEl = $('.calc-value', el);
  const exprEl = $('.calc-expr', el);
  let display = '0';
  let acc = null;
  let op = null;
  let fresh = true;
  let memory = 0;

  const calc = (a, b, o) =>
    o === '+' ? a + b : o === '−' ? a - b : o === '×' ? a * b : o === '÷' ? (b === 0 ? NaN : a / b) : b;
  const fmt = (n) => (Number.isFinite(n) ? String(Number(n.toPrecision(12))) : 'Cannot divide by zero');
  const paint = () => { valueEl.textContent = display; };

  const digit = (d) => {
    display = fresh || display === '0' ? d : display.length > 14 ? display : display + d;
    fresh = false;
    paint();
  };
  const chooseOp = (o) => {
    const cur = parseFloat(display);
    if (acc !== null && op && !fresh) {
      const r = calc(acc, cur, op);
      acc = Number.isFinite(r) ? Number(r.toPrecision(12)) : r;
      display = fmt(acc);
    } else {
      acc = cur;
    }
    op = o;
    fresh = true;
    exprEl.textContent = `${fmt(acc)} ${o}`;
    paint();
  };

  on(el, '[data-key]', 'click', (e) => {
    const k = e.currentTarget.dataset.key;
    if (/^[0-9]$/.test(k)) return digit(k);
    switch (k) {
      case '.':
        if (fresh) { display = '0.'; fresh = false; } else if (!display.includes('.')) display += '.';
        return paint();
      case 'C':
        display = '0'; acc = null; op = null; fresh = true; exprEl.textContent = '';
        return paint();
      case 'CE':
        display = '0'; fresh = true; return paint();
      case '⌫':
        display = display.length <= 1 || fresh ? '0' : display.slice(0, -1);
        return paint();
      case '+/−':
        display = display.startsWith('-') ? display.slice(1) : display === '0' ? display : '-' + display;
        return paint();
      case '%':
        display = fmt(parseFloat(display) / 100); return paint();
      case '1/x':
        display = fmt(1 / parseFloat(display)); return paint();
      case 'x²':
        display = fmt(parseFloat(display) ** 2); return paint();
      case '√x':
        display = fmt(Math.sqrt(parseFloat(display))); return paint();
      case '÷': case '×': case '−': case '+':
        return chooseOp(k);
      case '=': {
        if (acc === null || !op) return;
        const cur = parseFloat(display);
        const r = calc(acc, cur, op);
        exprEl.textContent = `${fmt(acc)} ${op} ${fmt(cur)} =`;
        display = fmt(r);
        acc = null; op = null; fresh = true;
        return paint();
      }
      default:
        return undefined;
    }
  });

  on(el, '[data-mem]', 'click', (e) => {
    const m = e.currentTarget.dataset.mem;
    const cur = parseFloat(display);
    if (m === 'MC') memory = 0;
    if (m === 'MR') { display = fmt(memory); fresh = true; paint(); }
    if (m === 'M+') memory += cur;
    if (m === 'M-') memory -= cur;
    if (m === 'MS') memory = cur;
    if (m === 'M^') { exprEl.textContent = 'Memory: ' + fmt(memory); }
  });

  return { el };
}

/* --------------------------------------------------------------- Clock */
function clockApp(win) {
  const el = shell(`
    <div class="app-toolbar">
      <button class="tool-btn on" data-tab="clock">Clock</button>
      <button class="tool-btn" data-tab="timer">Timer</button>
      <button class="tool-btn" data-tab="stopwatch">Stopwatch</button>
    </div>
    <div class="app-content" data-body style="display:flex;flex-direction:column;align-items:center;gap:16px"></div>`);

  const body = $('[data-body]', el);
  let tab = 'clock';
  let stop = 0;
  let stopRun = false;
  let laps = [];
  let timerLeft = 300;
  let timerRun = false;
  let tick = null;

  const fmtStop = (s) => `${pad(Math.floor(s / 60))}:${pad(Math.floor(s % 60))}.${Math.floor((s % 1) * 10)}`;

  const paint = () => {
    const n = new Date();
    if (tab === 'clock') {
      const y = n.getFullYear();
      const m = n.getMonth();
      const first = new Date(y, m, 1).getDay();
      const total = new Date(y, m + 1, 0).getDate();
      const cells = Array(first).fill('');
      for (let d = 1; d <= total; d++) cells.push(d);
      body.innerHTML = `
        <div style="font-size:56px;font-weight:300;letter-spacing:-1px" data-testid="clock-time">
          ${n.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
        <div style="color:var(--text-2)">${n.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
        <div style="width:100%;max-width:380px;background:var(--card);outline:1px solid var(--card-stroke);border-radius:8px;padding:16px">
          <div style="font-weight:600;margin-bottom:10px">${n.toLocaleDateString([], { month: 'long', year: 'numeric' })}</div>
          <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;font-size:12px;text-align:center">
            ${['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => `<div style="color:var(--text-2);padding-bottom:4px">${d}</div>`).join('')}
            ${cells
              .map((d) =>
                d && d === n.getDate()
                  ? `<div style="padding:6px 0;border-radius:4px;background:var(--accent);color:#fff;font-weight:600">${d}</div>`
                  : `<div style="padding:6px 0">${d}</div>`,
              )
              .join('')}
          </div>
        </div>`;
    } else if (tab === 'stopwatch') {
      body.innerHTML = `
        <div style="font-size:56px;font-weight:300;font-variant-numeric:tabular-nums">${fmtStop(stop)}</div>
        <div style="display:flex;gap:8px">
          <button class="pill-btn" data-sw="toggle">${stopRun ? 'Pause' : 'Start'}</button>
          <button class="pill-btn" data-sw="reset">Reset</button>
          <button class="pill-btn" data-sw="lap">Lap</button>
        </div>
        <div style="width:100%;max-width:320px">
          ${laps
            .map(
              (l, i) => `<div style="display:flex;justify-content:space-between;padding:6px 4px;box-shadow:inset 0 -1px 0 var(--stroke);font-size:13px">
                <span>Lap ${laps.length - i}</span><span style="font-variant-numeric:tabular-nums">${fmtStop(l)}</span></div>`,
            )
            .join('')}
        </div>`;
    } else {
      body.innerHTML = `
        <div style="font-size:56px;font-weight:300;font-variant-numeric:tabular-nums">
          ${pad(Math.floor(timerLeft / 60))}:${pad(timerLeft % 60)}
        </div>
        <div style="display:flex;gap:8px">
          <button class="pill-btn" data-tm="toggle">${timerRun ? 'Pause' : 'Start'}</button>
          <button class="pill-btn" data-tm="reset">Reset 5:00</button>
          <button class="pill-btn" data-tm="plus">+1 min</button>
        </div>`;
    }
  };

  body.addEventListener('click', (e) => {
    const sw = e.target.closest('[data-sw]');
    if (sw) {
      const a = sw.dataset.sw;
      if (a === 'toggle') stopRun = !stopRun;
      if (a === 'reset') { stopRun = false; stop = 0; laps = []; }
      if (a === 'lap' && stopRun) laps = [stop, ...laps];
      paint();
    }
    const tm = e.target.closest('[data-tm]');
    if (tm) {
      const a = tm.dataset.tm;
      if (a === 'toggle') timerRun = !timerRun;
      if (a === 'reset') { timerRun = false; timerLeft = 300; }
      if (a === 'plus') timerLeft += 60;
      paint();
    }
  });

  on(el, '[data-tab]', 'click', (e) => {
    tab = e.currentTarget.dataset.tab;
    $$('[data-tab]', el).forEach((b) => b.classList.toggle('on', b === e.currentTarget));
    paint();
  });

  tick = setInterval(() => {
    if (stopRun) stop += 0.1
    if (timerRun) timerLeft = timerLeft <= 1 ? ((timerRun = false), 0) : timerLeft - 1
    paint()
  }, 100)
  paint()

  return { el, dispose: () => clearInterval(tick) };
}

/* ------------------------------------------------------------ Terminal */


const PHOTOS = [
  { title: 'Bloom', bg: 'url("https://images.pre.dev/generated-images/agent_generated_1790330663176_0_BB44SwaHsU.jpg")' },
  { title: 'Bloom light', bg: 'url("https://images.pre.dev/generated-images/agent_generated_1790330668644_0_zgJcHYwd3X.jpg")' },
  { title: 'Flow', bg: 'linear-gradient(135deg, #0f2027 0%, #203a43 45%, #2c5364 100%)' },
  { title: 'Sunrise', bg: 'linear-gradient(160deg, #ff8a3d 0%, #d94f70 40%, #4a2b6b 75%, #14102b 100%)' },
  { title: 'Glow', bg: 'radial-gradient(80% 80% at 70% 30%, #7b2ff7 0%, #2b1055 50%, #0a0618 100%)' },
  { title: 'Mint', bg: 'linear-gradient(140deg, #0f9b8e 0%, #0b6cbf 55%, #10233f 100%)' },
];

function photosApp() {
  const el = shell(`
    <div class="app-toolbar">
      <button class="tool-btn" data-prev>${ic(I.back, 16)}Prev</button>
      <button class="tool-btn" data-next>Next${ic(I.forward, 16)}</button>
      <span style="margin-left:auto;font-size:12px;color:var(--text-2)" data-info>6 items</span>
    </div>
    <div class="app-content" data-body></div>`);
  let active = null;
  const body = $('[data-body]', el);
  const paint = () => {
    $('[data-info]', el).textContent = active === null ? `${PHOTOS.length} items` : PHOTOS[active].title;
    body.innerHTML =
      active === null
        ? `<div class="photos-grid">${PHOTOS.map(
            (p, i) => `<button class="photo-card" data-i="${i}">
              <div class="photo-thumb" style="background:${p.bg}" role="img" aria-label="${esc(p.title)}"></div>
              <div class="cap">${esc(p.title)}</div></button>`,
          ).join('')}</div>`
        : `<div class="photos-view">
            <div class="photo-thumb" style="background:${PHOTOS[active].bg};max-height:58vh;width:min(100%,720px);aspect-ratio:16/10;border-radius:8px"
              role="img" aria-label="${esc(PHOTOS[active].title)}"></div>
            <button class="pill-btn" data-back-gallery>Back to gallery</button>
          </div>`;
  };
  body.addEventListener('click', (e) => {
    const card = e.target.closest('[data-i]');
    if (card) { active = +card.dataset.i; paint(); }
    if (e.target.closest('[data-back-gallery]')) { active = null; paint(); }
  });
  $('[data-prev]', el).addEventListener('click', () => { if (active !== null) { active = (active + PHOTOS.length - 1) % PHOTOS.length; paint(); } });
  $('[data-next]', el).addEventListener('click', () => { if (active !== null) { active = (active + 1) % PHOTOS.length; paint(); } });
  paint();
  return { el };
}

/* --------------------------------------------------------------- Store */
const STORE_APPS = [
  { name: 'Spotify', pub: 'Spotify AB', icon: I.sound, rating: '4.5' },
  { name: 'WhatsApp', pub: 'WhatsApp Inc.', icon: I.person, rating: '4.2' },
  { name: 'Visual Studio Code', pub: 'Microsoft', icon: I.terminal, rating: '4.8' },
  { name: 'Discord', pub: 'Discord Inc.', icon: I.gamepad, rating: '4.4' },
  { name: 'VLC media player', pub: 'VideoLAN', icon: I.cast, rating: '4.6' },
  { name: 'Figma', pub: 'Figma Inc.', icon: I.palette, rating: '4.7' },
];

function storeApp() {
  const el = shell(`
    <div class="app-toolbar">
      <button class="tool-btn" style="font-weight:600">Home</button>
      <button class="tool-btn">Apps</button>
      <button class="tool-btn">Gaming</button>
      <button class="tool-btn">Movies &amp; TV</button>
      <button class="tool-btn" style="margin-left:auto" data-lib>Library (0)</button>
    </div>
    <div class="app-content">
      <div class="store-hero">
        <h2>Discover your next favourite app</h2>
        <p>Curated picks, updated weekly for Windowia.</p>
      </div>
      <div class="store-grid" data-grid></div>
    </div>`);
  const installed = new Set();
  const grid = $('[data-grid]', el);
  const paint = () => {
    grid.innerHTML = STORE_APPS.map((a) => {
      const isIn = installed.has(a.name);
      return `<div class="store-card">
        <span style="width:40px;height:40px;display:block;flex:0 0 40px">${a.icon}</span>
        <div class="meta"><h4>${esc(a.name)}</h4><p>${esc(a.pub)} · ★ ${a.rating}</p></div>
        <button class="pill-btn ${isIn ? '' : 'accent'}" data-get="${esc(a.name)}">${isIn ? 'Installed' : 'Get'}</button>
      </div>`;
    }).join('');
    $('[data-lib]', el).textContent = `Library (${installed.size})`;
  };
  grid.addEventListener('click', (e) => {
    const b = e.target.closest('[data-get]');
    if (!b) return;
    const n = b.dataset.get;
    if (installed.has(n)) installed.delete(n);
    else installed.add(n);
    paint();
  });
  paint();
  return { el };
}

/* ---------------------------------------------------------- Recycle Bin */
function recycleApp() {
  const el = shell(`
    <div class="app-toolbar">
      <button class="tool-btn" data-empty>${ic(I.trash, 16)}Empty Recycle Bin</button>
      <button class="tool-btn" data-restore>${ic(I.refresh, 16)}Restore</button>
      <span style="margin-left:auto;font-size:12px;color:var(--text-2)" data-info></span>
    </div>
    <div class="app-content" data-body style="padding:0"></div>`);
  let selected = null;
  const body = $('[data-body]', el);
  const paint = () => {
    const items = state.recycle;
    $('[data-info]', el).textContent = `${items.length} item${items.length === 1 ? '' : 's'}`;
    body.innerHTML = items.length
      ? `<table style="width:100%;border-collapse:collapse;font-size:12px">
          <thead><tr style="text-align:left;color:var(--text-2)">
            <th style="padding:10px 16px;font-weight:400">Name</th>
            <th style="padding:10px 16px;font-weight:400">Original location</th>
            <th style="padding:10px 16px;font-weight:400">Date deleted</th></tr></thead>
          <tbody>${items
            .map(
              (i, n) => `<tr data-i="${n}" class="${selected === i ? 'selected' : ''}">
                <td class="name-cell" style="padding:9px 16px;display:flex;align-items:center;gap:10px">${ic(I.file, 16)}${esc(i.name)}</td>
                <td style="padding:9px 16px;color:var(--text-2)">${esc(i.from)}</td>
                <td style="padding:9px 16px;color:var(--text-2)">${esc(i.deleted)}</td></tr>`,
            )
            .join('')}</tbody></table>`
      : `<div class="empty-state">Recycle Bin is empty</div>`;
  };
  body.addEventListener('click', (e) => {
    const row = e.target.closest('[data-i]');
    if (!row) return;
    selected = state.recycle[+row.dataset.i] || null;
    paint();
  });
  $('[data-empty]', el).addEventListener('click', () => {
    state.recycle.length = 0;
    selected = null;
    paint();
    notify('Recycle Bin', 'Recycle Bin emptied');
  });
  $('[data-restore]', el).addEventListener('click', () => {
    const it = selected || state.recycle[0];
    if (!it) return;
    const dir = it.from && FSE[it.from] ? it.from : 'C:\\Desktop';
    FSE[dir] = FSE[dir] || {};
    FSE[dir][it.name] = 2048;
    state.recycle = state.recycle.filter((x) => x !== it);
    selected = null;
    paint();
    notify('Recycle Bin', 'Item restored', `${it.name} → ${dir}`);
  });
  $('[data-empty]', el).insertAdjacentHTML('beforebegin', `<button class="tool-btn" data-pick>${ic(I.file, 16)}Restore selected</button>`);
  $('[data-pick]', el).addEventListener('click', () => { selected = state.recycle[0]; paint(); });
  paint();
  return { el };
}

/* --------------------------------------------------------------- Edge */
function edgeApp() {
  const el = shell(`
    <div class="app-toolbar">
      <button class="tool-btn" data-back title="Back">${ic(I.back, 16)}</button>
      <button class="tool-btn" data-refresh title="Refresh">${ic(I.refresh, 16)}</button>
      <input class="field" data-url value="windowia.local/home" aria-label="Address bar"
        style="flex:1;height:30px;border-radius:999px;padding:0 14px" />
      <button class="tool-btn" data-newtab title="New tab">${ic(I.plus, 16)}</button>
    </div>
    <div style="display:flex;gap:2px;padding:6px 8px 0;background:var(--layer-alt)" data-tabs></div>
    <div class="app-content" data-body style="background:var(--editor-bg);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px"></div>`);
  let tabs = ['New tab'];
  let activeTab = 0;
  let history = ['windowia.local/home'];

  const tabsEl = $('[data-tabs]', el);
  const body = $('[data-body]', el);
  const urlEl = $('[data-url]', el);

  const paintTabs = () => {
    tabsEl.innerHTML = tabs
      .map(
        (t, i) => `<button data-tab="${i}" style="padding:6px 14px;border-radius:6px 6px 0 0;font-size:12px;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;background:${i === activeTab ? 'var(--editor-bg)' : 'transparent'}">${esc(t)}</button>`,
      )
      .join('');
  };
  const paint = () => {
    paintTabs();
    urlEl.value = history[history.length - 1];
    const u = history[history.length - 1];
    body.innerHTML = `
      <span style="width:64px;height:64px;display:block">${I.edge}</span>
      <h2 style="margin:0">${u.startsWith('search://') ? `Search results for “${esc(u.slice(9))}”` : 'Windowia Start Page'}</h2>
      <p style="color:var(--text-2);margin:0;text-align:center;max-width:440px">
        This is a simulated browser surface inside the Windows 11 desktop replica. Type an address above and press Enter.
      </p>`;
  };
  const go = (raw) => {
    const v = raw.trim();
    if (!v) return;
    const next = v.includes('.') && !v.includes(' ') ? (v.startsWith('http') ? v : `https://${v}`) : `search://${v}`;
    history.push(next);
    tabs[activeTab] = next;
    paint();
  };

  urlEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(urlEl.value); });
  tabsEl.addEventListener('click', (e) => {
    const t = e.target.closest('[data-tab]');
    if (t) { activeTab = +t.dataset.tab; paint(); }
  });
  $('[data-back]', el).addEventListener('click', () => { if (history.length > 1) { history.pop(); paint(); } });
  $('[data-refresh]', el).addEventListener('click', paint);
  $('[data-newtab]', el).addEventListener('click', () => { tabs.push('New tab'); activeTab = tabs.length - 1; paint(); });
  paint();
  return { el };
}

/* ----------------------------------------------------------- Settings */
function settingsApp() {
  const SECTIONS = [
    { key: 'system', label: 'System', icon: I.monitor },
    { key: 'bluetooth', label: 'Bluetooth & devices', icon: I.bluetooth },
    { key: 'network', label: 'Network & internet', icon: I.network },
    { key: 'personalization', label: 'Personalization', icon: I.palette },
    { key: 'apps', label: 'Apps', icon: I.apps },
    { key: 'accounts', label: 'Accounts', icon: I.person },
    { key: 'time', label: 'Time & language', icon: I.time },
    { key: 'gaming', label: 'Gaming', icon: I.gamepad },
    { key: 'privacy', label: 'Privacy & security', icon: I.privacy },
    { key: 'update', label: 'Windows Update', icon: I.update },
  ];

  const el = shell(`
    <div class="settings">
      <div class="settings-head">
        <button class="tool-btn" data-back title="Back">${ic(I.back, 16)}</button>
        <input class="field" data-search placeholder="Find a setting" aria-label="Find a setting" style="width:260px;height:32px" />
        <span style="margin-left:auto;display:flex;align-items:center;gap:10px;font-size:12px">
          <span class="avatar" style="width:26px;height:26px;font-size:11px">${esc(state.user.slice(0, 1).toUpperCase())}</span>
          ${esc(state.user)}
        </span>
      </div>
      <div class="settings-cols">
        <div class="settings-nav" data-nav></div>
        <div class="settings-body" data-body></div>
      </div>
    </div>`);

  let section = 'system';
  const navEl = $('[data-nav]', el);
  const bodyEl = $('[data-body]', el);

  const card = (title, desc, control = '') =>
    `<div class="setting-card"><div class="info"><h4>${esc(title)}</h4>${desc ? `<p>${esc(desc)}</p>` : ''}</div>${control}</div>`;
  const toggle = (on_, label, data) =>
    `<button class="switch ${on_ ? 'on' : ''}" role="switch" aria-checked="${on_}" aria-label="${esc(label)}" data-switch="${data}"></button>`;

  const paintNav = () => {
    navEl.innerHTML =
      SECTIONS.map(
        (s) => `<button class="side-item ${s.key === section ? 'active' : ''}" data-sec="${s.key}">
          <span class="ico">${ic(s.icon, 16)}</span>${esc(s.label)}</button>`,
      ).join('');
  };

  const paintBody = () => {
    const q = $('[data-search]', el).value.trim().toLowerCase();
    if (q) {
      const matches = SECTIONS.filter((s) => s.label.toLowerCase().includes(q));
      bodyEl.innerHTML =
        `<h2 style="margin:0 0 12px;font-size:22px">Search results</h2>` +
        (matches.length
          ? matches.map((s) => card(s.label, 'Settings page')).join('')
          : `<p style="color:var(--text-2)">No settings found for “${esc(q)}”</p>`);
      return;
    }
    const sec = SECTIONS.find((s) => s.key === section);
    bodyEl.innerHTML = `<h2 style="margin:0 0 18px;font-size:22px">${esc(sec.label)}</h2>`;

    if (section === 'system') {
      bodyEl.innerHTML += card('Display', 'Brightness, resolution, night light', toggle(state.toggles.night, 'Night light', 'night')) +
        card('Sound', 'Volume, output device') +
        card('Notifications', 'Alerts from apps and system', toggle(true, 'Notifications', 'notif')) +
        card('Storage', 'Local disk (C:) — 412 GB free of 512 GB') +
        card('About', 'Windowia OS · Version 11.0.26100.1 · 64-bit');
    } else if (section === 'bluetooth') {
      bodyEl.innerHTML += card('Bluetooth', 'Discoverable as “WINDOWIA-PC”', toggle(state.toggles.bt, 'Bluetooth', 'bt')) +
        card('Surface Headphones 2+', 'Connected · Battery 78%') + card('MX Master 3S', 'Paired');
    } else if (section === 'network') {
      bodyEl.innerHTML += card('Wi-Fi', 'Connected to HomeNet_5G · Secured', toggle(state.toggles.wifi, 'Wi-Fi', 'wifi')) +
        card('Properties', 'IPv4 192.168.1.42 · Gateway 192.168.1.1 · DNS 1.1.1.1') +
        card('VPN', 'No VPN profiles configured');
    } else if (section === 'personalization') {
      bodyEl.innerHTML +=
        card('Background', 'Choose a wallpaper for your desktop') +
        `<div class="wallpaper-grid">${WALLPAPERS.map(
          (w) => `<button class="wallpaper-swatch ${state.wallpaper === w.id ? 'active' : ''}" data-wall="${w.id}"
            title="${esc(w.name)}" aria-label="Wallpaper ${esc(w.name)}" style="background:${w.css};background-size:cover"></button>`,
        ).join('')}</div><div style="height:16px"></div>` +
        card('Accent colour', 'Used across Start, taskbar and window controls') +
        `<div class="span-swatch" style="margin-bottom:16px">${ACCENTS.map(
          (a) => `<button data-accent="${a.id}" title="${esc(a.name)}" aria-label="${esc(a.name)}"
            style="width:34px;height:34px;border-radius:6px;background:${a.color};outline:${state.accent === a.id ? '2px solid var(--text)' : 'none'};outline-offset:2px"></button>`,
        ).join('')}</div>` +
        card('Dark mode', 'Switch the shell between light and dark', toggle(state.theme === 'dark', 'Dark mode', 'theme')) +
        card('Widgets', 'Show the weather widget on the taskbar', toggle(state.widgets, 'Widgets', 'widgets')) +
        card(
          'Taskbar alignment',
          'Where the app icons sit on the taskbar',
          `<span class="seg">${['center', 'left']
            .map(
              (v) => `<button data-align="${v}" class="${state.align === v ? 'on' : ''}">${v === 'center' ? 'Center' : 'Left'}</button>`,
            )
            .join('')}</span>`,
        );
    } else if (section === 'apps') {
      bodyEl.innerHTML += card('Installed apps', 'File Explorer, Notepad, Calculator, Photos, Terminal, Store, Clock, Edge') +
        card('Default apps', 'Web browser: Microsoft Edge · Music: Media Player') + card('Startup', '3 apps start automatically');
    } else if (section === 'accounts') {
      bodyEl.innerHTML += card(
        'Your account',
        'Change the display name used across Windowia',
        `<span style="display:flex;gap:8px"><input class="field" data-name value="${esc(state.user)}" aria-label="Display name" style="width:150px" />
         <button class="pill-btn accent" data-save-name>Save</button></span>`,
      ) + card('Sign-in options', 'Windows Hello, PIN, security key') + card('Family & other users', 'No other users on this device');
    } else if (section === 'time') {
      bodyEl.innerHTML += card('Date & time', new Date().toLocaleString()) +
        card('Time zone', '(UTC+00:00) Dublin, Edinburgh, Lisbon, London') +
        card('Language & region', 'English (United Kingdom) · United Kingdom');
    } else if (section === 'gaming') {
      bodyEl.innerHTML += card('Xbox Game Bar', 'Open the overlay with Win+G', toggle(false, 'Xbox Game Bar', 'gamebar')) +
        card('Captures', 'Record game clips and screenshots') + card('Game Mode', 'Optimise your PC for play');
    } else if (section === 'privacy') {
      bodyEl.innerHTML += card('Find my device', 'Track your device location') +
        card('Diagnostic data', 'Send optional diagnostic data to Windowia', toggle(false, 'Diagnostic data', 'telemetry')) +
        card('Camera & microphone', '3 apps have access');
    } else {
      bodyEl.innerHTML += card("You're up to date", 'Last checked: today, 09:41') +
        card('Update history', '2026-09 Cumulative Update for Windowia (KB5041585)') + card('Pause updates', 'Pause for up to 5 weeks');
    }
  };

  el.addEventListener('click', (e) => {
    const nav = e.target.closest('[data-sec]');
    if (nav) { section = nav.dataset.sec; paintNav(); paintBody(); $('.settings-body', el).scrollTop = 0; return; }

    const sw = e.target.closest('[data-switch]');
    if (sw) {
      const key = sw.dataset.switch;
      if (key === 'theme') { state.theme = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(); }
      else if (key === 'widgets') { state.widgets = !state.widgets; renderTaskbar(); }
      else if (key === 'notif' || key === 'gamebar' || key === 'telemetry') { /* decorative */ }
      else { state.toggles[key] = !state.toggles[key]; renderTaskbar(); renderShellLayer(); }
      saveShell();
      paintBody();
      return;
    }
    const wall = e.target.closest('[data-wall]');
    if (wall) { state.wallpaper = wall.dataset.wall; renderWallpaper(); saveShell(); paintBody(); return; }

    const acc = e.target.closest('[data-accent]');
    if (acc) { state.accent = acc.dataset.accent; applyTheme(); saveShell(); paintBody(); return; }

    const align = e.target.closest('[data-align]');
    if (align) { state.align = align.dataset.align; saveShell(); renderTaskbar(); paintBody(); return; }

    if (e.target.closest('[data-save-name]')) {
      state.user = $('[data-name]', el).value.trim() || 'User';
      saveShell();
      const av = $('.settings-head .avatar', el);
      if (av) av.textContent = state.user.slice(0, 1).toUpperCase();
      paintBody();
      return;
    }
    if (e.target.closest('[data-back]')) { section = 'system'; paintNav(); paintBody(); }
  });
  $('[data-search]', el).addEventListener('input', paintBody);

  paintNav();
  paintBody();
  return { el };
}

/* ------------------------------------------------------- File Explorer */
function fsApp(win, opts = {}) {
  const NAV = [
    { key: 'C:', label: 'Home', icon: I.monitor },
    { key: 'Gallery', label: 'Gallery', icon: I.gallery },
    { key: 'C:\\Desktop', label: 'Desktop', icon: I.folder },
    { key: 'C:\\Documents', label: 'Documents', icon: I.file },
    { key: 'C:\\Downloads', label: 'Downloads', icon: I.drive },
    { key: 'C:\\Pictures', label: 'Pictures', icon: I.image },
    { key: 'C:\\Music', label: 'Music', icon: I.sound },
    { key: 'C:\\Videos', label: 'Videos', icon: I.cast },
  ];

  const el = shell(`
    <div class="tab-strip">
      <button class="tab active"><span class="tab-icon">${ic(I.explorer, 16)}</span>
        <span class="tab-label" data-tab-label>Home</span></button>
      <button class="tab" data-newtab style="padding:0 12px" title="New tab">${ic(I.plus, 14)}</button>
      <span class="tab-strip-fill"></span>
      <button class="icon-btn-sm" data-details-toggle title="Details pane" aria-label="Details pane">${ic(I.info, 14)}</button>
    </div>
    <div class="explorer-cmd">
      <button class="tool-btn" data-new title="New">${ic(I.plus, 16)}New</button>
      <span class="cmd-sep"></span>
      <button class="tool-btn" data-op="cut" title="Cut">${ic(I.cut, 16)}</button>
      <button class="tool-btn" data-op="copy" title="Copy">${ic(I.copy, 16)}</button>
      <button class="tool-btn" data-op="paste" title="Paste">${ic(I.paste, 16)}</button>
      <button class="tool-btn" data-op="rename" title="Rename">${ic(I.rename, 16)}</button>
      <button class="tool-btn" data-op="share" title="Share">${ic(I.share, 16)}</button>
      <button class="tool-btn" data-op="delete" title="Delete">${ic(I.trash, 16)}</button>
      <button class="tool-btn" data-op="open" title="Open">${ic(I.forward, 16)}Open</button>
      <span class="cmd-sep"></span>
      <button class="tool-btn" data-op="sort" title="Sort">${ic(I.sort, 16)}Sort</button>
      <button class="tool-btn" data-view title="View">${ic(I.viewGrid, 16)}View</button>
      <button class="tool-btn" style="margin-left:auto" data-op="details" title="Details">${ic(I.more, 16)}</button>
    </div>
    <div class="explorer-body">
      <div class="explorer-nav"></div>
      <div class="explorer-main">
        <div class="breadcrumb">
          <button class="tool-btn" data-back title="Back">${ic(I.back, 16)}</button>
          <button class="tool-btn" data-forward title="Forward">${ic(I.forward, 16)}</button>
          <button class="tool-btn" data-up title="Up">${ic(I.up, 16)}</button>
          <button class="tool-btn" data-refresh title="Refresh">${ic(I.refresh, 16)}</button>
          <div class="crumb-bar" data-crumbs></div>
          <input class="field" data-search placeholder="Search" aria-label="Search files" style="width:150px" />
        </div>
        <div class="details" data-view-host></div>
        <div class="status-bar">
          <span data-count>0 items</span>
          <span data-sel></span>
          <span style="margin-left:auto" data-size></span>
        </div>
      </div>
      <aside class="details-pane" data-details hidden></aside>
    </div>`);

  let path = (opts && opts.path) || 'C:';
  let selected = null;
  let view = 'details';
  let sortBy = 'name';
  let history = [path];
  let hidx = 0;
  let clipboard = null;
  const navEl = $('.explorer-nav', el);
  const join = (p, n) => (p === 'C:' ? `C:\\${n}` : `${p}\\${n}`);

  navEl.innerHTML =
    `<div class="nav-head">Quick access</div>` +
    NAV.map((n) => `<button class="side-item" data-nav="${esc(n.key)}"><span class="ico">${ic(n.icon, 16)}</span>${esc(n.label)}</button>`).join('') +
    `<div class="nav-head">Local disk</div>
     <button class="side-item" data-nav="C:"><span class="ico">${ic(I.drive, 16)}</span>Local Disk (C:)</button>`;

  const query = () => $('[data-search]', el).value.trim().toLowerCase();
  const label = () => (path === 'C:' ? 'Home' : path.split('\\').pop());
  const entries = () => {
    let list = Object.entries(FSE[path] || {}).map(([name, v]) => ({ name, dir: v === 'd', size: v === 'd' ? null : v }));
    const q = query();
    if (q) list = list.filter((i) => i.name.toLowerCase().includes(q));
    list.sort((a, b) => (a.dir !== b.dir ? (a.dir ? -1 : 1) : a.name.localeCompare(b.name, undefined, { numeric: true })));
    if (sortBy === 'size') list.sort((a, b) => (b.size || 0) - (a.size || 0));
    if (sortBy === 'type') list.sort((a, b) => fileType(a.name).localeCompare(fileType(b.name)));
    return list;
  };
  const iconFor = (it) => (it.dir ? I.folder : isImageName(it.name) ? I.image : isTextName(it.name) ? I.notepad : I.file);
  const push = (p) => { history = history.slice(0, hidx + 1).concat([p]); hidx = history.length - 1; path = p; selected = null; paint(); };
  const sel = () => entries().find((i) => i.name === selected) || null;

  function paint() {
    $('[data-tab-label]', el).textContent = label();
    $$('[data-nav]', navEl).forEach((b) => b.classList.toggle('active', b.dataset.nav === path));
    const parts = path === 'C:' ? ['This PC'] : ['This PC', ...path.replace(/^C:\\?/, '').split('\\').filter(Boolean)];
    $('[data-crumbs]', el).innerHTML = parts
      .map((p, i) => {
        const target = i === 0 ? 'C:' : `C:\\${parts.slice(1, i + 1).join('\\')}`;
        return `<span class="crumb-sep">${ic(I.chevron, 12)}</span><button class="crumb" data-crumb="${esc(target)}">${esc(p)}</button>`;
      })
      .join('');

    const list = entries();
    const host = $('[data-view-host]', el);
    if (!list.length) host.innerHTML = `<div class="empty-state">This folder is empty</div>`;
    else if (view === 'grid') {
      host.innerHTML = `<div class="file-grid">${list
        .map(
          (n) => `<button class="file-card ${selected === n.name ? 'selected' : ''}" data-name="${esc(n.name)}">
            <span class="gal-thumb" style="${n.dir ? 'display:grid;place-items:center' : `background:${isImageName(n.name) ? IMG_BY_NAME(n.name) : 'transparent'}`}">
              ${n.dir ? ic(I.folder, 40) : isImageName(n.name) ? '' : `<span style="display:grid;place-items:center;height:100%">${ic(iconFor(n), 38)}</span>`}</span>
            <span class="name">${esc(n.name)}</span></button>`,
        )
        .join('')}</div>`;
    } else {
      host.innerHTML = `<table class="fx-table">
        <thead><tr><th style="width:42%">Name</th><th>Date modified</th><th>Type</th><th style="text-align:right">Size</th></tr></thead>
        <tbody>${list
          .map(
            (n) => `<tr data-name="${esc(n.name)}" class="${selected === n.name ? 'selected' : ''}">
              <td class="name-cell">${ic(iconFor(n), 16)}${esc(n.name)}</td>
              <td class="sec">${n.dir ? '' : '9/25/2026 10:14 AM'}</td>
              <td class="sec">${n.dir ? 'File folder' : esc(fileType(n.name))}</td>
              <td class="sec" style="text-align:right">${n.dir ? '' : fmtBytes(n.size)}</td></tr>`,
          )
          .join('')}</tbody></table>`;
    }
    $('[data-count]', el).textContent = `${list.length} items`;
    const s = sel();
    $('[data-sel]', el).textContent = s ? '1 item selected' : '';
    $('[data-size]', el).textContent = s && s.size != null ? fmtBytes(s.size) : '';
    const pane = $('[data-details]', el);
    if (!pane.hidden) {
      pane.innerHTML = s
        ? `<div class="dp-preview" style="${s.dir ? 'display:grid;place-items:center' : isImageName(s.name) ? `background:${IMG_BY_NAME(s.name)}` : 'display:grid;place-items:center'}">
             ${s.dir ? ic(I.folder, 56) : isImageName(s.name) ? '' : ic(iconFor(s), 52)}</div>
           <div class="dp-name">${esc(s.name)}</div>
           <div class="dp-row"><span>Type</span><span>${s.dir ? 'File folder' : esc(fileType(s.name))}</span></div>
           <div class="dp-row"><span>Size</span><span>${s.dir ? '—' : fmtBytes(s.size)}</span></div>
           <div class="dp-row"><span>Location</span><span>${esc(path)}</span></div>`
        : `<div class="empty-state">Select a file to see details</div>`;
    }
  }

  const openItem = (n) => {
    if (!n) return;
    if (n.dir) return push(join(path, n.name));
    if (isImageName(n.name)) return openApp('photos', { file: n.name });
    if (isTextName(n.name)) return openApp('notepad', { path: join(path, n.name) });
    notify('Windows', `Can\u2019t open \u201c${n.name}\u201d`, 'No app is registered for this file type.');
  };
  const uniqueName = (base, ext) => {
    let n = base + ext;
    let i = 1;
    while ((FSE[path] || {})[n]) n = `${base} (${i++})${ext}`;
    return n;
  };
  const doOp = (op) => {
    const s = sel();
    if (op === 'open') { if (s) openItem(s); return; }
    if (op === 'copy' || op === 'cut') { if (s) clipboard = { op, name: s.name }; return; }
    if (op === 'paste') {
      if (!clipboard) return;
      const src = clipboard.name;
      const ext = (src.match(/\.[^.]+$/) || [''])[0];
      const dst = uniqueName(src.replace(/\.[^.]+$/, ''), ext);
      FSE[path] = FSE[path] || {};
      FSE[path][dst] = FSE[path][src];
      if (clipboard.op === 'cut') { delete FSE[path][src]; clipboard = null; }
      selected = dst;
      return paint();
    }
    if (op === 'delete') {
      if (!s) return;
      state.recycle.push({ name: s.name, from: path, deleted: new Date().toLocaleString() });
      delete FSE[path][s.name];
      selected = null;
      return paint();
    }
    if (op === 'rename') {
      if (!s) return;
      const name = window.prompt('Rename', s.name);
      if (name && name !== s.name) {
        FSE[path][name] = FSE[path][s.name];
        delete FSE[path][s.name];
        selected = name;
        paint();
      }
      return;
    }
    if (op === 'sort') { sortBy = sortBy === 'name' ? 'size' : sortBy === 'size' ? 'type' : 'name'; return paint(); }
    if (op === 'details' || op === 'share') { const p = $('[data-details]', el); p.hidden = !p.hidden; return paint(); }
  };

  const host = $('[data-view-host]', el);
  host.addEventListener('click', (e) => {
    const row = e.target.closest('[data-name]');
    if (row) { selected = row.dataset.name; paint(); }
  });
  host.addEventListener('dblclick', (e) => {
    const row = e.target.closest('[data-name]');
    if (row) openItem(entries().find((i) => i.name === row.dataset.name));
  });
  host.addEventListener('contextmenu', (e) => {
    const row = e.target.closest('[data-name]');
    e.preventDefault();
    if (row) {
      selected = row.dataset.name;
      paint();
      openCtx(e.clientX, e.clientY, { kind: 'file', name: row.dataset.name, path });
    } else {
      openCtx(e.clientX, e.clientY, { kind: 'folder', path });
    }
  });
  on(el, '[data-crumb]', 'click', (e) => push(e.currentTarget.dataset.crumb));
  navEl.addEventListener('click', (e) => { const b = e.target.closest('[data-nav]'); if (b) push(b.dataset.nav); });
  $('[data-back]', el).addEventListener('click', () => { if (hidx > 0) { hidx--; path = history[hidx]; selected = null; paint(); } });
  $('[data-forward]', el).addEventListener('click', () => { if (hidx < history.length - 1) { hidx++; path = history[hidx]; selected = null; paint(); } });
  $('[data-up]', el).addEventListener('click', () => { if (path !== 'C:') push(path.split('\\').slice(0, -1).join('\\') || 'C:'); });
  $('[data-refresh]', el).addEventListener('click', paint);
  $('[data-search]', el).addEventListener('input', paint);
  $('[data-view]', el).addEventListener('click', () => { view = view === 'details' ? 'grid' : 'details'; paint(); });
  $('[data-details-toggle]', el).addEventListener('click', () => { const p = $('[data-details]', el); p.hidden = !p.hidden; paint(); });
  on(el, '[data-op]', 'click', (e) => doOp(e.currentTarget.dataset.op));
  $('[data-new]', el).addEventListener('click', () => {
    FSE[path] = FSE[path] || {};
    FSE[path][uniqueName('New folder', '')] = 'd';
    paint();
  });
  $('[data-newtab]', el).addEventListener('click', () => openApp('explorer', { path }));
  paint();
  const fileCmd = (kind) => {
    const s = sel();
    switch (kind) {
      case 'open': return openItem(s);
      case 'cut': case 'copy': case 'delete': case 'rename': case 'details': return doOp(kind);
      case 'open-tab': return openApp('explorer', { path });
      case 'new-folder': return $('[data-new]', el).click();
      case 'copy-path':
        notify('File Explorer', 'Path copied', path);
        return undefined;
      case 'terminal': return openApp('terminal', { cwd: path });
      default: return undefined;
    }
  };
  return { el, fileCmd };
}

/* ------------------------------------------------------------ Task Manager */
function taskManagerApp() {
  const el = shell(`
    <div class="app-toolbar">
      <button class="tool-btn" data-tab="processes" style="font-weight:600">Processes</button>
      <button class="tool-btn" data-tab="performance">Performance</button>
      <button class="tool-btn" data-tab="startup">Startup apps</button>
      <button class="tool-btn" data-tab="users">Users</button>
      <span style="margin-left:auto;font-size:11px;color:var(--text-2)" data-updated></span>
    </div>
    <div class="app-content" data-body></div>`);
  const body = $('[data-body]', el);
  let tab = 'processes';
  let history = { cpu: [], mem: [] };
  const sys = () => state.sys;

  const guessFor = (appId) => ({
    explorer: [1.2, 86], edge: [7.4, 512, 'Microsoft Edge (12)'], notepad: [0.2, 18],
    calculator: [0.1, 12], settings: [0.6, 42], photos: [1.4, 96], terminal: [0.3, 24],
    store: [0.9, 74], clock: [0.1, 16], recycle: [0.1, 9], taskmgr: [1.8, 42],
    paint: [0.5, 38], weather: [0.4, 52], minesweeper: [0.9, 28], sticky: [0.2, 20],
    mediaplayer: [1.6, 118], 'settings-host': [0.4, 30],
  }[appId] || [0.3, 24]);

  const paint = () => {
    const s = sys();
    $('[data-updated]', el).textContent = `Updated ${new Date().toLocaleTimeString()}`;
    if (tab === 'processes') {
      const rows = [];
      const seen = new Set();
      state.windows.forEach((w) => {
        const app = appById(w.appId);
        const g = guessFor(w.appId);
        rows.push({ name: w.title, icon: app.icon, cpu: g[0] * (w.id === state.activeId ? 1.4 : 1), mem: g[1], status: 'Running' });
        seen.add(w.appId);
      });
      rows.push({ name: 'Windows Explorer', icon: I.explorer, cpu: guessFor('explorer')[0], mem: guessFor('explorer')[1], status: 'Running' });
      rows.push({ name: 'Desktop Window Manager', icon: I.monitor, cpu: 0.8, mem: 128, status: 'Running' });
      rows.push({ name: 'Antimalware Service Executable', icon: I.privacy, cpu: 0.4, mem: 214, status: 'Running' });
      rows.push({ name: 'Service Host: Network Service', icon: I.network, cpu: 0.1, mem: 12, status: 'Running' });
      rows.push({ name: 'Widgets', icon: I.weather, cpu: 0.2, mem: 64, status: 'Suspended' });
      const total = rows.reduce((a, r) => a + r.mem, 0);
      body.innerHTML = `<table class="tm-table">
        <thead><tr><th style="width:34%">Name</th><th>Status</th><th style="text-align:right">CPU</th><th style="text-align:right">Memory</th></tr></thead>
        <tbody>${rows
          .map(
            (r) => `<tr>
              <td class="name-cell"><span style="width:16px;height:16px;display:inline-block">${r.icon}</span>${esc(r.name)}</td>
              <td class="sec">${r.status}</td>
              <td class="sec" style="text-align:right">${r.cpu.toFixed(1)}%</td>
              <td class="sec" style="text-align:right">${r.mem.toFixed(1)} MB</td></tr>`,
          )
          .join('')}</tbody></table>`;
      void total;
    } else if (tab === 'performance') {
      const spark = (arr, color, max) => {
        const w = 460;
        const h = 120;
        const pts = arr.map((v, i) => `${(i / (arr.length - 1)) * w},${h - (v / max) * h * 0.9}`).join(' ');
        return `<svg class="tm-graph" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
          <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2"/>
          <polygon points="0,${h} ${pts} ${w},${h}" fill="${color}" opacity="0.18"/></svg>`;
      };
      body.innerHTML = `
        <div class="tm-perf">
          <div class="tm-card">
            <div class="tm-card-head"><span>CPU</span><strong>${s.cpu}%</strong></div>
            <div class="tm-sub">Windowia Virtual Processor · ${s.cores} cores @ 3.4 GHz</div>
            ${spark(history.cpu, 'var(--accent)', 100)}
            <div class="tm-stats"><div><span>Processes</span><b>${state.windows.length + 96}</b></div><div><span>Threads</span><b>1842</b></div><div><span>Uptime</span><b>${s.uptime}</b></div></div>
          </div>
          <div class="tm-card">
            <div class="tm-card-head"><span>Memory</span><strong>${s.memUsed.toFixed(1)} GB</strong></div>
            <div class="tm-sub">${(s.memTotal - s.memUsed).toFixed(1)} GB available of ${s.memTotal} GB</div>
            ${spark(history.mem, '#c239b3', s.memTotal)}
            <div class="tm-mem-bar"><span style="width:${(s.memUsed / s.memTotal) * 100}%"></span></div>
            <div class="tm-stats"><div><span>In use</span><b>${s.memUsed.toFixed(1)} GB</b></div><div><span>Cached</span><b>2.4 GB</b></div><div><span>Speed</span><b>3200 MHz</b></div></div>
          </div>
          <div class="tm-card">
            <div class="tm-card-head"><span>Wi-Fi</span><strong>${s.net} Mbps</strong></div>
            <div class="tm-sub">HomeNet_5G · 802.11ax · 1.2 Gbps</div>
            ${spark(history.cpu.map((v) => v * 0.2 + 4), '#107c10', 30)}
            <div class="tm-stats"><div><span>Sent</span><b>${s.sent} MB</b></div><div><span>Received</span><b>${s.recv} MB</b></div></div>
          </div>
          <div class="tm-card">
            <div class="tm-card-head"><span>Disk 0 (C:)</span><strong>${s.disk}%</strong></div>
            <div class="tm-sub">Windowia NVMe SSD · 512 GB</div>
            ${spark(history.cpu.map((v) => v * 0.6 + 3), '#ffb900', 60)}
            <div class="tm-stats"><div><span>Free</span><b>412 GB</b></div><div><span>Active time</span><b>8%</b></div></div>
          </div>
        </div>`;
    } else if (tab === 'startup') {
      const apps = [
        ['Microsoft Edge', 'Enabled', 'Medium'],
        ['Microsoft Teams', 'Enabled', 'High'],
        ['Spotify', 'Disabled', 'Low'],
        ['OneDrive', 'Enabled', 'Medium'],
        ['Discord', 'Enabled', 'Medium'],
      ];
      body.innerHTML = `<table class="tm-table"><thead><tr><th style="width:40%">Name</th><th>Status</th><th>Startup impact</th></tr></thead>
        <tbody>${apps.map(([n, st, im]) => `<tr><td class="name-cell">${ic(I.terminal, 16)}${n}</td><td class="sec">${st}</td><td class="sec">${im}</td></tr>`).join('')}</tbody></table>
        <p style="font-size:12px;color:var(--text-2);margin-top:14px">Right-click a row to disable an app at startup.</p>`;
    } else {
      const rows = [['User', state.user, '1.4%', '2.1 GB'], ['System', '', '0.6%', '86 MB']];
      body.innerHTML = `<table class="tm-table"><thead><tr><th style="width:40%">User</th><th>Status</th><th style="text-align:right">CPU</th><th style="text-align:right">Memory</th></tr></thead>
        <tbody>${rows.map((r) => `<tr><td class="name-cell">${r[0]}</td><td class="sec">${r[1]}</td><td class="sec" style="text-align:right">${r[2]}</td><td class="sec" style="text-align:right">${r[3]}</td></tr>`).join('')}</tbody></table>`;
    }
  };

  on(el, '[data-tab]', 'click', (e) => {
    tab = e.currentTarget.dataset.tab;
    $$('[data-tab]', el).forEach((b) => { b.style.fontWeight = b === e.currentTarget ? '600' : '400'; });
    paint();
  });
  const tick = setInterval(() => {
    const s = sys();
    history.cpu.push(s.cpu); history.mem.push(s.memUsed);
    if (history.cpu.length > 60) { history.cpu.shift(); history.mem.shift(); }
    if (tab === 'performance') paint();
  }, 1000);
  if (!history.cpu.length) for (let i = 0; i < 30; i++) { history.cpu.push(sys().cpu + (Math.random() - 0.5) * 12); history.mem.push(sys().memUsed + (Math.random() - 0.5) * 0.3); }
  paint();
  return { el, dispose: () => clearInterval(tick) };
}

/* -------------------------------------------------------------- Minesweeper */
function minesweeperApp() {
  const el = shell(`
    <div class="ms-wrap">
      <div class="ms-head">
        <div class="ms-counter" data-mines>010</div>
        <button class="ms-face" data-face title="New game" aria-label="New game">🙂</button>
        <div class="ms-counter" data-time>000</div>
      </div>
      <div class="ms-board" data-board></div>
      <div class="ms-foot">
        <span class="seg">
          <button data-lvl="easy" class="on">9 × 9</button>
          <button data-lvl="medium">16 × 16</button>
          <button data-lvl="hard">30 × 16</button>
        </span>
      </div>
    </div>`);
  const LV = { easy: [9, 9, 10], medium: [16, 16, 40], hard: [30, 16, 99] };
  let lvl = 'easy';
  let cols; let rows; let mines;
  let cells; let started; let over; let flags; let revealed; let timer = 0; let tick = null;
  const board = $('[data-board]', el);
  const face = $('[data-face]', el);

  const pad3 = (n) => String(clamp(n, 0, 999)).padStart(3, '0');
  const index = (x, y) => y * cols + x;
  const neighbours = (x, y) => {
    const out = [];
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const nx = x + dx; const ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < cols && ny < rows) out.push(cells[index(nx, ny)]);
    }
    return out;
  };
  const newGame = () => {
    [cols, rows, mines] = LV[lvl];
    cells = Array.from({ length: cols * rows }, (_, i) => ({ i, x: i % cols, y: Math.floor(i / cols), mine: false, open: false, flag: false, n: 0 }));
    started = false; over = false; flags = 0; revealed = 0; timer = 0;
    clearInterval(tick);
    face.textContent = '🙂';
    paint();
  };
  const place = (safe) => {
    const banned = new Set([safe.i, ...neighbours(safe.x, safe.y).map((c) => c.i)]);
    const pool = cells.filter((c) => !banned.has(c.i));
    for (let i = 0; i < mines && pool.length; i++) {
      const k = Math.floor(Math.random() * pool.length);
      pool[k].mine = true;
      pool.splice(k, 1);
    }
    cells.forEach((c) => { c.n = neighbours(c.x, c.y).filter((m) => m.mine).length; });
  };
  const open = (c) => {
    if (c.open || c.flag || over) return;
    c.open = true; revealed++;
    if (c.mine) { over = true; face.textContent = '😵'; clearInterval(tick); revealAll(); return paint(); }
    if (c.n === 0) neighbours(c.x, c.y).forEach(open);
  };
  const revealAll = () => cells.forEach((c) => { if (c.mine) c.open = true; });
  const checkWin = () => {
    if (revealed === cells.length - mines && !over) {
      over = true; clearInterval(tick); face.textContent = '😎';
      notify('Minesweeper', 'You won!', `Cleared the board in ${timer}s.`);
    }
  };
  const paint = () => {
    board.style.gridTemplateColumns = `repeat(${cols}, 26px)`;
    board.innerHTML = cells
      .map((c) => {
        const cls = c.open ? (c.mine ? 'mine' : `open n${c.n}`) : c.flag ? 'flag' : '';
        const txt = c.open ? (c.mine ? '💣' : c.n ? c.n : '') : c.flag ? '🚩' : '';
        return `<button class="ms-cell ${cls}" data-i="${c.i}" aria-label="cell">${txt}</button>`;
      })
      .join('');
    $('[data-mines]', el).textContent = pad3(mines - flags);
    $('[data-time]', el).textContent = pad3(timer);
  };
  board.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-i]');
    if (!btn || over) return;
    const c = cells[+btn.dataset.i];
    if (!started) { started = true; place(c); tick = setInterval(() => { timer++; $('[data-time]', el).textContent = pad3(timer); }, 1000); }
    open(c);
    checkWin();
    paint();
  });
  board.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const btn = e.target.closest('[data-i]');
    if (!btn || over) return;
    const c = cells[+btn.dataset.i];
    if (c.open) return;
    c.flag = !c.flag;
    flags += c.flag ? 1 : -1;
    paint();
  });
  on(el, '[data-lvl]', 'click', (e) => {
    lvl = e.currentTarget.dataset.lvl;
    $$('[data-lvl]', el).forEach((b) => b.classList.toggle('on', b === e.currentTarget));
    newGame();
  });
  face.addEventListener('click', newGame);
  newGame();
  return { el, dispose: () => clearInterval(tick) };
}

/* ---------------------------------------------------------------- Weather */
function weatherApp() {
  const CITIES = [
    { name: 'London', temp: 21, cond: 'Mostly sunny', hi: 23, lo: 14, humid: 58, wind: 12, uv: 4, icon: I.sun },
    { name: 'Seattle', temp: 16, cond: 'Light rain', hi: 18, lo: 11, humid: 78, wind: 18, uv: 2, icon: I.cloud },
    { name: 'Tokyo', temp: 27, cond: 'Partly cloudy', hi: 29, lo: 22, humid: 64, wind: 9, uv: 6, icon: I.weather },
    { name: 'Dubai', temp: 38, cond: 'Sunny', hi: 41, lo: 29, humid: 34, wind: 15, uv: 11, icon: I.sun },
    { name: 'Reykjavík', temp: 7, cond: 'Windy', hi: 9, lo: 3, humid: 82, wind: 32, uv: 1, icon: I.cloud },
  ];
  let city = 0;
  const el = shell(`
    <div class="app-toolbar">
      <button class="tool-btn" data-city="0">London</button>
      <button class="tool-btn" data-city="1">Seattle</button>
      <button class="tool-btn" data-city="2">Tokyo</button>
      <button class="tool-btn" data-city="3">Dubai</button>
      <button class="tool-btn" data-city="4">Reykjavík</button>
      <span style="margin-left:auto;font-size:11px;color:var(--text-2)">Updated just now</span>
    </div>
    <div class="app-content" data-body></div>`);
  const body = $('[data-body]', el);
  const paint = () => {
    const c = CITIES[city];
    const hours = Array.from({ length: 8 }, (_, i) => ({
      t: `${pad((new Date().getHours() + i) % 24)}:00`,
      temp: c.temp + Math.round(Math.sin(i / 2) * 2),
      day: (new Date().getHours() + i) % 24 < 7 || (new Date().getHours() + i) % 24 > 19,
    }));
    const days = ['Today', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    body.innerHTML = `
      <div class="wx-hero">
        <div class="wx-now">
          <span class="ic" style="width:72px;height:72px">${c.icon}</span>
          <div><div class="wx-temp">${c.temp}°C</div><div class="wx-cond">${esc(c.cond)}</div></div>
        </div>
        <div class="wx-meta">
          <span>Feels like ${c.temp + 1}°</span><span>Humidity ${c.humid}%</span><span>Wind ${c.wind} km/h</span><span>UV index ${c.uv}</span>
        </div>
      </div>
      <h3 class="wx-h">Hourly forecast</h3>
      <div class="wx-hours">${hours
        .map((h) => `<div class="wx-hour"><span>${h.t}</span><span class="ic" style="width:22px;height:22px;margin:6px auto">${h.day ? I.moon : I.sun}</span><b>${h.temp}°</b></div>`)
        .join('')}</div>
      <h3 class="wx-h">6-day forecast</h3>
      <div class="wx-days">${days
        .map(
          (d, i) => `<div class="wx-day"><span>${d}</span>
            <span class="ic" style="width:22px;height:22px">${c.icon}</span>
            <span>${c.lo + (i % 3)}° / ${c.hi + (i % 2)}°</span></div>`,
        )
        .join('')}</div>`;
  };
  on(el, '[data-city]', 'click', (e) => { city = +e.currentTarget.dataset.city; paint(); });
  paint();
  return { el };
}

/* ---------------------------------------------------------------- Paint */
function paintApp() {
  const el = shell(`
    <div class="app-toolbar">
      <button class="tool-btn" data-tool="pencil" style="background:var(--hover-strong)">${ic(I.rename, 16)}Pencil</button>
      <button class="tool-btn" data-tool="eraser">${ic(I.copy, 16)}Eraser</button>
      <span class="cmd-sep"></span>
      <span class="pt-colors" data-colors></span>
      <span class="pt-size">Size <input type="range" min="1" max="40" value="4" data-size /></span>
      <button class="tool-btn" data-clear>${ic(I.trash, 16)}Clear</button>
      <button class="tool-btn" data-save style="margin-left:auto">${ic(I.save, 16)}Save</button>
    </div>
    <div class="pt-canvas-wrap"><canvas class="pt-canvas" data-canvas></canvas></div>
    <div class="status-bar"><span data-info>0 × 0</span><span style="margin-left:auto">Ready</span></div>`);
  const canvas = $('[data-canvas]', el);
  const ctx = canvas.getContext('2d');
  const COLORS = ['#000000', '#7f7f7f', '#c3c3c3', '#ffffff', '#c50f1f', '#ff8c00', '#fff100', '#16c60c', '#0f7ec8', '#886ce4', '#e3008c', '#8b572a'];
  let color = '#000000';
  let size = 4;
  let tool = 'pencil';
  let drawing = false;
  const pos = (e) => {
    const r = canvas.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * canvas.width, y: ((e.clientY - r.top) / r.height) * canvas.height };
  };
  const resize = () => {
    const wrap = $('.pt-canvas-wrap', el);
    const img = ctx.getImageData(0, 0, canvas.width || 1, canvas.height || 1);
    canvas.width = Math.max(200, wrap.clientWidth);
    canvas.height = Math.max(200, wrap.clientHeight);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    try { ctx.putImageData(img, 0, 0); } catch (e) { /* ignore */ }
    $('[data-info]', el).textContent = `${canvas.width} × ${canvas.height}`;
  };
  const paintColors = () => {
    $('[data-colors]', el).innerHTML = COLORS.map(
      (c) => `<button class="pt-color" data-color="${c}" title="${c}" style="background:${c};outline:${color === c ? '2px solid var(--text)' : 'none'}"></button>`,
    ).join('');
  };
  canvas.addEventListener('pointerdown', (e) => {
    drawing = true;
    canvas.setPointerCapture(e.pointerId);
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = tool === 'eraser' ? size * 2.5 : size;
    ctx.lineTo(p.x + 0.01, p.y);
    ctx.stroke();
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!drawing) return;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  });
  window.addEventListener('pointerup', () => { drawing = false; });
  on(el, '[data-tool]', 'click', (e) => {
    tool = e.currentTarget.dataset.tool;
    $$('[data-tool]', el).forEach((b) => { b.style.background = b === e.currentTarget ? 'var(--hover-strong)' : ''; });
  });
  on(el, '[data-color]', 'click', (e) => { color = e.currentTarget.dataset.color; paintColors(); });
  $('[data-size]', el).addEventListener('input', (e) => { size = +e.target.value; });
  $('[data-clear]', el).addEventListener('click', () => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });
  $('[data-save]', el).addEventListener('click', () => {
    const n = `drawing-${Date.now().toString().slice(-4)}.png`;
    FSE['C:\\Pictures'] = FSE['C:\\Pictures'] || {};
    FSE['C:\\Pictures'][n] = 420000;
    notify('Paint', 'Saved to Pictures', n);
  });
  paintColors();
  setTimeout(resize, 30);
  return { el, dispose: () => undefined };
}

/* ---------------------------------------------------------- Sticky Notes */
function stickyApp() {
  const el = shell(`<div class="st-wrap" data-body></div>`);
  const body = $('[data-body]', el);
  let notes = [];
  try { notes = JSON.parse(store.get(LS.sticky, '') || '[]'); } catch (e) { notes = []; }
  if (!notes.length) notes = [{ id: 1, text: 'Welcome to Sticky Notes!\n\nRight-click a note to delete it.', color: 0, x: 24, y: 20 }];
  const COLORS = ['#fff9b1', '#ffd5a3', '#c9f0c1', '#bfe4ff', '#e6ccff'];
  let z = 10;
  const save = () => store.set(LS.sticky, JSON.stringify(notes.map(({ id, text, color, x, y }) => ({ id, text, color, x, y }))));
  const paint = () => {
    body.innerHTML =
      notes
        .map(
          (n) => `<div class="st-note" data-note="${n.id}" style="left:${n.x}px;top:${n.y}px;background:${COLORS[n.color % COLORS.length]};z-index:${n.z || 1}">
            <div class="st-head" data-drag="${n.id}">
              <button class="st-new" data-add title="New note" aria-label="New note">${ic(I.plus, 12)}</button>
              <button class="st-del" data-del="${n.id}" title="Delete note" aria-label="Delete note">${ic(I.trash, 12)}</button>
            </div>
            <textarea class="st-text" data-text="${n.id}" placeholder="Write a note…">${esc(n.text)}</textarea>
          </div>`,
        )
        .join('') + `<button class="st-add" data-add>${ic(I.plus, 16)}</button>`;
  };
  const add = () => {
    notes.push({ id: Date.now(), text: '', color: notes.length % COLORS.length, x: 40 + notes.length * 26, y: 30 + notes.length * 22, z: ++z });
    save();
    paint();
    const ta = body.querySelector(`[data-text="${notes[notes.length - 1].id}"]`);
    if (ta) ta.focus();
  };
  body.addEventListener('click', (e) => {
    if (e.target.closest('[data-add]')) return add();
    const del = e.target.closest('[data-del]');
    if (del) {
      notes = notes.filter((n) => String(n.id) !== del.dataset.del);
      save();
      return paint();
    }
    const note = e.target.closest('[data-note]');
    if (note) {
      const n = notes.find((x) => String(x.id) === note.dataset.note);
      if (n) { n.z = ++z; }
    }
  });
  body.addEventListener('input', (e) => {
    const ta = e.target.closest('[data-text]');
    if (!ta) return;
    const n = notes.find((x) => String(x.id) === ta.dataset.text);
    if (n) { n.text = ta.value; save(); }
  });
  body.addEventListener('pointerdown', (e) => {
    const head = e.target.closest('[data-drag]');
    if (!head) return;
    const n = notes.find((x) => String(x.id) === head.dataset.drag);
    if (!n) return;
    const node = head.closest('[data-note]');
    const sx = e.clientX; const sy = e.clientY; const ox = n.x; const oy = n.y;
    n.z = ++z;
    node.style.zIndex = z;
    const move = (ev) => { n.x = ox + ev.clientX - sx; n.y = Math.max(0, oy + ev.clientY - sy); node.style.left = `${n.x}px`; node.style.top = `${n.y}px`; };
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); save(); };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  });
  paint();
  return { el };
}

/* ---------------------------------------------------------- Media Player */
function mediaPlayerApp() {
  const TRACKS = [
    { title: 'Ambient Loop', artist: 'Windowia Sounds', len: 214, bg: 'linear-gradient(135deg,#0f9b8e,#0b6cbf)' },
    { title: 'Bloom', artist: 'Fluent Collective', len: 187, bg: 'linear-gradient(135deg,#7b2ff7,#2b1055)' },
    { title: 'Sunrise Drive', artist: 'Aurora', len: 243, bg: 'linear-gradient(160deg,#ff8a3d,#d94f70)' },
    { title: 'Night Lights', artist: 'Mica', len: 198, bg: 'linear-gradient(140deg,#203a43,#0f2027)' },
  ];
  let idx = 0;
  let playing = false;
  let t = 0;
  const el = shell(`
    <div class="mp-wrap">
      <div class="mp-now">
        <div class="mp-art" data-art></div>
        <div class="mp-meta"><h2 data-title></h2><p data-artist></p></div>
      </div>
      <div class="mp-scrub">
        <span data-cur>0:00</span>
        <input type="range" min="0" max="100" value="0" data-seek aria-label="Seek" />
        <span data-dur>0:00</span>
      </div>
      <div class="mp-controls">
        <button class="icon-btn" data-prev aria-label="Previous">${ic(I.back, 20)}</button>
        <button class="icon-btn mp-play" data-play aria-label="Play">${ic(I.forward, 22)}</button>
        <button class="icon-btn" data-next aria-label="Next">${ic(I.forward, 20)}</button>
      </div>
      <div class="mp-list" data-list></div>
    </div>`);
  const fmt = (s) => `${Math.floor(s / 60)}:${pad(s % 60)}`;
  const paint = () => {
    const tr = TRACKS[idx];
    $('[data-art]', el).style.background = tr.bg;
    $('[data-title]', el).textContent = tr.title;
    $('[data-artist]', el).textContent = tr.artist;
    $('[data-cur]', el).textContent = fmt(t);
    $('[data-dur]', el).textContent = fmt(tr.len);
    const seek = $('[data-seek]', el);
    seek.value = String((t / tr.len) * 100);
    $('[data-play]', el).innerHTML = playing
      ? `<svg viewBox="0 0 24 24" width="22" height="22"><rect x="6" y="5" width="4" height="14" fill="currentColor"/><rect x="14" y="5" width="4" height="14" fill="currentColor"/></svg>`
      : `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M7 4l13 8-13 8z" fill="currentColor"/></svg>`;
    $('[data-list]', el).innerHTML = TRACKS.map(
      (x, i) => `<button class="mp-row ${i === idx ? 'on' : ''}" data-track="${i}">
        <span class="mp-dot" style="background:${x.bg}"></span>
        <span class="mp-t">${esc(x.title)}<small>${esc(x.artist)}</small></span>
        <span class="mp-len">${fmt(x.len)}</span></button>`,
    ).join('');
  };
  $('[data-play]', el).addEventListener('click', () => { playing = !playing; paint(); });
  $('[data-next]', el).addEventListener('click', () => { idx = (idx + 1) % TRACKS.length; t = 0; paint(); });
  $('[data-prev]', el).addEventListener('click', () => { idx = (idx - 1 + TRACKS.length) % TRACKS.length; t = 0; paint(); });
  $('[data-seek]', el).addEventListener('input', (e) => { t = Math.round((+e.target.value / 100) * TRACKS[idx].len); $('[data-cur]', el).textContent = fmt(t); });
  $('[data-list]', el).addEventListener('click', (e) => {
    const b = e.target.closest('[data-track]');
    if (!b) return;
    idx = +b.dataset.track;
    t = 0;
    playing = true;
    paint();
  });
  const tick = setInterval(() => {
    if (!playing) return;
    t++;
    if (t >= TRACKS[idx].len) { t = 0; idx = (idx + 1) % TRACKS.length; }
    paint();
  }, 1000);
  paint();
  return { el, dispose: () => clearInterval(tick) };
}

const APP_IMPL = {
  taskmgr: taskManagerApp,
  minesweeper: minesweeperApp,
  weather: weatherApp,
  paint: paintApp,
  sticky: stickyApp,
  mediaplayer: mediaPlayerApp,
  explorer: fsApp,
  notepad: notepadApp,
  calculator: calculatorApp,
  settings: settingsApp,
  photos: photosApp,
  terminal: terminalApp,
  store: storeApp,
  clock: clockApp,
  edge: edgeApp,
  recycle: recycleApp,
};

/* =====================================================================
   Shell layer — Start, quick settings, notifications, widgets, menus
   ===================================================================== */
function closeShell() {
  state.startOpen = false;
  state.qs = false;
  state.notif = false;
  state.widgetsOpen = false;
  state.ctx = null;
  state.search.open = false;
  state.tray = false;
  state.preview = null;
  state.power = false;
  state.assist = null;
  renderShellLayer();
  renderTaskbar();
}

function toggleStart() {
  const wasOpen = state.startOpen;
  state.qs = false;
  state.notif = false;
  state.widgetsOpen = false;
  state.ctx = null;
  state.startOpen = !wasOpen;
  state.startView = 'pinned';
  state.query = '';
  renderShellLayer();
  renderTaskbar();
}

function openStart(focusSearch) {
  state.startOpen = true;
  state.startView = 'pinned';
  state.query = '';
  state.qs = state.notif = state.widgetsOpen = false;
  renderShellLayer();
  renderTaskbar();
  setTimeout(() => $('#start-input') && $('#start-input').focus(), 30);
  void focusSearch;
}

function toggleQuickSettings() {
  const v = !state.qs;
  state.startOpen = state.notif = state.widgetsOpen = false;
  state.ctx = null;
  state.qs = v;
  renderShellLayer();
}

function toggleNotifications() {
  const v = !state.notif;
  state.startOpen = state.qs = state.widgetsOpen = false;
  state.ctx = null;
  state.notif = v;
  renderShellLayer();
}

function toggle(key) {
  const v = !state[key];
  state.startOpen = state.qs = state.notif = state.widgetsOpen = false;
  state.ctx = null;
  state[key] = v;
  renderShellLayer();
  renderTaskbar();
}

function openCtx(x, y, target) {
  state.ctx = { x, y, target };
  renderShellLayer();
}

const appFor = (id) => appById(id || 'explorer');

function renderStartBody() {
  const host = $('[data-start-body]');
  if (!host) return;
  const q = state.query.trim().toLowerCase();

  if (q) {
    const results = APPS.filter((a) => a.name.toLowerCase().includes(q));
    host.className = 'all-apps-list';
    host.innerHTML =
      `<div class="start-section-head" style="padding-left:0">Best match</div>` +
      (results.length
        ? results
            .map(
              (a) => `<button class="all-apps-row" data-launch="${a.id}">
                <span class="ic" style="width:20px;height:20px">${a.icon}</span>${esc(a.name)}
                <span style="margin-left:auto;color:var(--text-2)">›</span></button>`,
            )
            .join('')
        : `<div style="padding:12px 4px;color:var(--text-2);font-size:13px">No results for “${esc(state.query)}”</div>`);
    return;
  }

  if (state.startView === 'all') {
    host.className = 'all-apps-list';
    host.innerHTML =
      `<div class="start-section-head" style="padding-left:0">
        <span style="display:flex;align-items:center;gap:10px">
          <button class="icon-btn-sm" data-start-view="pinned" aria-label="Back">${ic(I.back, 16)}</button>All apps
        </span>
      </div>` +
      [...APPS]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(
          (a) => `<button class="all-apps-row" data-launch="${a.id}">
            <span class="ic" style="width:20px;height:20px">${a.icon}</span>${esc(a.name)}
            <span style="margin-left:auto;color:var(--text-3);font-size:11px">${state.pinned.includes(a.id) ? 'Pinned' : ''}</span>
          </button>`,
        )
        .join('');
    return;
  }

  host.className = 'start-grid';
  host.innerHTML = APPS.map(
    (a) => `<button class="start-tile" data-launch="${a.id}" title="${esc(a.name)} — right-click to pin to taskbar">
      <span class="ic" style="width:32px;height:32px">${a.icon}</span>
      <span class="label">${esc(a.name)}</span></button>`,
  ).join('');

  const rec = $('[data-start-recommended]');
  void rec;
}

function renderShellLayer() {
  const s = state;
  let html = '';

  /* ---- widgets ---- */
  if (s.widgetsOpen) {
    html += `<div class="flyout" style="left:8px;right:auto;width:380px" data-flyout>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <strong style="font-size:15px">Widgets</strong>
        <button class="pill-btn" data-widgets-hide>Hide widgets</button>
      </div>
      <div style="background:var(--card);outline:1px solid var(--card-stroke);border-radius:8px;padding:16px;margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:12px">
          <span class="ic" style="width:40px;height:40px">${I.weather}</span>
          <div>
            <div style="font-size:26px;font-weight:600;line-height:30px">21°C</div>
            <div style="font-size:12px;color:var(--text-2)">Mostly sunny · London</div>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:16px;font-size:11px;color:var(--text-2)">
          ${['13:00', '14:00', '15:00', '16:00', '17:00']
            .map(
              (t, i) => `<div style="text-align:center">
                <span class="ic" style="width:20px;height:20px;margin:0 auto 6px">${I.sun}</span>
                <div style="color:var(--text);font-weight:600">${21 + (i % 2)}°</div><div>${t}</div></div>`,
            )
            .join('')}
        </div>
      </div>
      <div style="background:var(--card);outline:1px solid var(--card-stroke);border-radius:8px;padding:16px">
        <div style="font-size:12px;color:var(--text-2);margin-bottom:8px">Microsoft Store · 09:41</div>
        <div style="font-size:13px;font-weight:600">Updates are available</div>
        <div style="font-size:12px;color:var(--text-2);margin-top:2px">Keep your apps up to date.</div>
      </div>
    </div>`;
  }

  /* ---- start menu ---- */
  if (s.startOpen) {
    html += `<div class="start-menu" data-flyout>
      <div class="start-search">
        ${ic(I.search, 16)}
        <input id="start-input" placeholder="Search for apps, settings and documents" aria-label="Search apps"
          value="${esc(s.query)}" autocomplete="off" />
      </div>
      <div data-start-body class="${s.query ? 'all-apps-list' : 'start-grid'}"></div>
      ${
        !s.query && s.startView === 'pinned'
          ? `<div class="start-section-head" style="padding-top:14px">
               Recommended
               <button class="pill-btn" data-start-view="all">More ›</button>
             </div>
             <div style="padding:0 24px 14px;display:grid;grid-template-columns:1fr 1fr;gap:6px">
               <button class="all-apps-row" style="height:44px" data-launch="notepad">
                 <span class="ic" style="width:20px;height:20px">${I.file}</span>
                 <span style="display:flex;flex-direction:column;align-items:flex-start;gap:1px">
                   <span style="font-size:13px">notes.txt</span>
                   <span style="font-size:11px;color:var(--text-2)">Recently added</span></span>
               </button>
               <button class="all-apps-row" style="height:44px" data-launch="explorer">
                 <span class="ic" style="width:20px;height:20px">${I.file}</span>
                 <span style="display:flex;flex-direction:column;align-items:flex-start;gap:1px">
                   <span style="font-size:13px">Project Plan.docx</span>
                   <span style="font-size:11px;color:var(--text-2)">2h ago</span></span>
               </button>
             </div>`
          : ''
      }
      <div class="start-footer">
        <button class="start-user" data-open-settings>
          <span class="avatar">${esc(s.user.slice(0, 1).toUpperCase())}</span>${esc(s.user)}
        </button>
        <button class="power-btn" data-lock title="Power" aria-label="Power">${ic(I.power, 18)}</button>
      </div>
    </div>`;
  }

  /* ---- quick settings ---- */
  if (s.qs) {
    const t = s.toggles;
    const tiles = [
      { label: t.wifi ? 'HomeNet_5G' : 'Wi-Fi', icon: I.wifi, on: t.wifi, key: 'wifi' },
      { label: 'Bluetooth', icon: I.bluetooth, on: t.bt, key: 'bt' },
      { label: 'Airplane mode', icon: I.plane, on: t.airplane, key: 'airplane' },
      { label: 'Battery saver', icon: I.battery, on: t.saver, key: 'saver' },
      { label: 'Night light', icon: I.moon, on: t.night, key: 'night' },
      { label: 'Accessibility', icon: I.accessibility, on: t.access, key: 'access' },
    ];
    html += `<div class="flyout" style="width:372px" data-flyout>
      <div class="qs-grid">
        ${tiles
          .map(
            (x) => `<button class="qs-tile ${x.on ? 'on' : ''}" data-qs="${x.key}" aria-pressed="${x.on}">
              <span class="ic" style="width:20px;height:20px">${x.icon}</span><span>${esc(x.label)}</span></button>`,
          )
          .join('')}
      </div>
      <div class="slider-row">
        <span class="ic" style="width:20px;height:20px">${I.sun}</span>
        <input type="range" min="10" max="100" value="${s.brightness}" aria-label="Brightness" data-brightness />
      </div>
      <div class="slider-row">
        <span class="ic" style="width:20px;height:20px">${s.volume === 0 ? I.volumeMute : I.volume}</span>
        <input type="range" min="0" max="100" value="${s.volume}" aria-label="Volume" data-volume />
      </div>
      <div class="qs-footer">
        <span style="display:flex;align-items:center;gap:8px">${ic(I.battery, 16)}87% · 4h 12m left</span>
        <span style="display:flex;gap:2px">
          <button class="icon-btn-sm" aria-label="Edit quick settings" title="Edit quick settings">${ic(I.rename, 16)}</button>
          <button class="icon-btn-sm" data-open-settings aria-label="All settings" title="All settings">${ic(I.settings, 16)}</button>
        </span>
      </div>
    </div>`;
  }

  /* ---- notification centre ---- */
  if (s.notif) {
    const n = s.now;
    const y = s.calMonth.getFullYear();
    const m = s.calMonth.getMonth();
    const firstDow = new Date(y, m, 1).getDay();
    const total = new Date(y, m + 1, 0).getDate();
    const cells = Array(firstDow).fill('');
    for (let d = 1; d <= total; d++) cells.push(d);

    html += `<div class="flyout" style="width:392px" data-flyout>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <strong style="font-size:13px">Notifications</strong>
        <button class="pill-btn" data-clear-notifs>Clear all</button>
      </div>
      ${
        s.notifications.length
          ? s.notifications
              .map(
                (x) => `<div class="notif-card">
                  <div class="row">${ic(I.store, 14)}<span>${esc(x.app)}</span><span style="margin-left:auto">${esc(x.time)}</span></div>
                  <div class="ttl">${esc(x.title)}</div>
                  <div class="body">${esc(x.body)}</div>
                  <button class="dismiss" data-dismiss="${x.id}" aria-label="Dismiss notification from ${esc(x.app)}">${ic(I.close, 12)}</button>
                </div>`,
              )
              .join('')
          : `<div style="padding:20px 0;text-align:center;color:var(--text-2);font-size:12px">No new notifications</div>`
      }
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="qs-tile ${s.focus ? 'on' : ''}" style="flex:1;height:54px" data-focus>
          <span class="ic" style="width:18px;height:18px">${I.focus}</span><span>Focus ${s.focus ? 'on' : 'off'}</span>
        </button>
        <button class="qs-tile" style="flex:1;height:54px" data-launch="clock">
          <span class="ic" style="width:18px;height:18px">${I.time}</span><span>Clock</span>
        </button>
      </div>
      <div class="mini-cal">
        <div class="head">
          ${esc(s.calMonth.toLocaleDateString([], { month: 'long', year: 'numeric' }))}
          <span style="display:flex;gap:2px">
            <button class="icon-btn-sm" data-cal="-1" aria-label="Previous month">${ic(I.back, 14)}</button>
            <button class="icon-btn-sm" data-cal="1" aria-label="Next month">${ic(I.forward, 14)}</button>
          </span>
        </div>
        <div class="grid">
          ${['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => `<div class="dow">${d}</div>`).join('')}
          ${cells
            .map((d) => {
              const isToday =
                d === n.getDate() && s.calMonth.getMonth() === n.getMonth() && s.calMonth.getFullYear() === n.getFullYear();
              return `<div class="day ${isToday ? 'today' : ''}">${d || ''}</div>`;
            })
            .join('')}
        </div>
      </div>
    </div>`;
  }

  /* ---- context menus ---- */
  if (s.ctx) {
    const { x, y, target, legacy } = s.ctx;
    const item = (label, icon, data, extra = '') =>
      `<button class="ctx-item" ${data}>${ic(icon, 16)}${label}${extra}</button>`;
    let inner = '';

    if (target.kind === 'desktop' && !legacy) {
      inner =
        item('View', I.viewGrid, 'data-cmd="explorer"', '<span class="shortcut">›</span>') +
        item('Sort by', I.sort, 'data-cmd="explorer"', '<span class="shortcut">›</span>') +
        item('Refresh', I.refresh, 'data-cmd="clear"') +
        `<div class="ctx-sep"></div>` +
        item('New', I.plus, 'data-cmd="explorer"', '<span class="shortcut">›</span>') +
        `<div class="ctx-sep"></div>` +
        item('Display settings', I.display, 'data-cmd="settings"') +
        item('Personalize', I.palette, 'data-cmd="settings"') +
        `<div class="ctx-sep"></div>` +
        item('Open in Terminal', I.terminal, 'data-cmd="terminal"') +
        `<div class="ctx-sep"></div>` +
        item('Show more options', I.more, 'data-cmd="legacy"', '<span class="shortcut">Shift+F10</span>');
    } else if (target.kind === 'desktop' && legacy) {
      inner =
        item('Next desktop background', I.image, 'data-cmd="next-wall"') +
        item('Close all windows', I.apps, 'data-cmd="close-all"') +
        item('Open File Explorer', I.folder, 'data-cmd="explorer"') +
        item('Open in Terminal', I.terminal, 'data-cmd="terminal"') +
        `<div class="ctx-sep"></div>` +
        item('Lock screen', I.lock, 'data-cmd="lock"') +
        `<div class="ctx-sep"></div>` +
        item('Display settings', I.display, 'data-cmd="settings"') +
        item('Personalize', I.palette, 'data-cmd="settings"');
    } else if (target.kind === 'icon') {
      const app = appFor(target.appId);
      inner =
        item('Open', I.forward, `data-cmd="open" data-app="${app.id}"`) +
        `<div class="ctx-sep"></div>` +
        item('Pin to Start', I.pin, `data-cmd="pin" data-app="${app.id}"`) +
        item(state.pinned.includes(app.id) ? 'Unpin from taskbar' : 'Pin to taskbar', I.pin, `data-cmd="pin" data-app="${app.id}"`) +
        item('Rename', I.rename, 'data-cmd="noop"', '<span class="shortcut">F2</span>') +
        item('Delete', I.trash, 'data-cmd="recycle"', '<span class="shortcut">Del</span>') +
        `<div class="ctx-sep"></div>` +
        item('Properties', I.info, 'data-cmd="settings"', '<span class="shortcut">Alt+Enter</span>');
    } else if (target.kind === 'taskbar') {
      inner =
        item('Task Manager', I.terminal, 'data-cmd="terminal"') +
        item('Taskbar settings', I.settings, 'data-cmd="settings"') +
        `<div class="ctx-sep"></div>` +
        `<div class="ctx-item" style="cursor:default">${ic(I.apps, 16)}Taskbar alignment</div>` +
        `<button class="ctx-item" style="padding-left:42px" data-cmd="align" data-value="center">Center${state.align === 'center' ? '<span class="shortcut">✓</span>' : ''}</button>` +
        `<button class="ctx-item" style="padding-left:42px" data-cmd="align" data-value="left">Left${state.align === 'left' ? '<span class="shortcut">✓</span>' : ''}</button>`;
    } else if (target.kind === 'taskbar-app') {
      const app = appFor(target.appId);
      const isRunning = runningIds().has(app.id);
      inner =
        `<button class="ctx-item" style="height:38px;font-weight:600" data-cmd="open" data-app="${app.id}">
           <span class="ic" style="width:20px;height:20px">${app.icon}</span>${esc(app.name)}</button>
        <div class="ctx-sep"></div>` +
        item(state.pinned.includes(app.id) ? 'Unpin from taskbar' : 'Pin to taskbar', I.pin, `data-cmd="pin" data-app="${app.id}"`) +
        item('Open new window', I.forward, `data-cmd="open" data-app="${app.id}"`) +
        (isRunning ? item('Close window', I.close, `data-cmd="close" data-app="${app.id}"`) : '');
    } else if (target.kind === 'file') {
      inner =
        item('Open', I.forward, `data-file-cmd="open"`) +
        `<div class="ctx-sep"></div>` +
        item('Cut', I.cut, `data-file-cmd="cut"`) +
        item('Copy', I.copy, `data-file-cmd="copy"`) +
        item('Rename', I.rename, `data-file-cmd="rename"`, '<span class="shortcut">F2</span>') +
        item('Delete', I.trash, `data-file-cmd="delete"`, '<span class="shortcut">Del</span>') +
        `<div class="ctx-sep"></div>` +
        item('Show more options', I.more, `data-file-cmd="details"`, '<span class="shortcut">Shift+F10</span>');
    } else if (target.kind === 'folder') {
      inner =
        item('Open', I.forward, `data-file-cmd="open-folder"`) +
        item('Open in new tab', I.plus, `data-file-cmd="open-tab"`) +
        item('New folder', I.newFolder, `data-file-cmd="new-folder"`) +
        `<div class="ctx-sep"></div>` +
        item('Copy path', I.copy, `data-file-cmd="copy-path"`) +
        item('Open in Terminal', I.terminal, `data-file-cmd="terminal"`);
    } else if (target.kind === 'notepad-menu') {
      inner = (target.items || [])
        .map((it, i) => `<button class="ctx-item" data-menu-idx="${i}">${esc(it[0])}</button>`)
        .join('');
    }

    html += `<div class="ctx-menu" style="left:${x}px;top:${Math.max(8, y)}px" data-ctx>${inner}</div>`;
  }

  html += shellExtrasHtml();
  dom.shellLayer.innerHTML = html;

  /* start menu live bits */
  if (s.startOpen) {
    renderStartBody();
    const input = $('#start-input');
    if (input) {
      input.addEventListener('input', () => {
        state.query = input.value;
        renderStartBody();
      });
      input.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        const first = $('[data-launch]');
        if (first) launchApp(first.dataset.launch);
      });
    }
  }
}

function launchApp(id) {
  state.startOpen = false;
  state.query = '';
  state.startView = 'pinned';
  renderShellLayer();
  openApp(id);
}

/* shell-layer delegated interactions */
function wireShellLayer() {
  dom.shellLayer.addEventListener('click', (e) => {
    const t = e.target;

    /* --- notepad menu items (closures kept in state.ctx) --- */
    const nmi = t.closest('[data-menu-idx]');
    if (nmi) {
      const items = state.ctx && state.ctx.target && state.ctx.target.items;
      const fn = items && items[Number(nmi.dataset.menuIdx)] && items[Number(nmi.dataset.menuIdx)][1];
      closeShell();
      if (fn) fn();
      return undefined;
    }

    /* --- power menu --- */
    const pw = t.closest('[data-power]');
    if (pw) return doPower(pw.dataset.power);

    /* --- search rows --- */
    const fileRow = t.closest('[data-open-file]');
    if (fileRow) {
      const p = fileRow.dataset.openFile;
      const name = p.split('\\').pop();
      state.search.open = false;
      renderShellLayer();
      if (isImageName(name)) return openApp('photos', { file: name });
      return openApp('notepad', { path: p });
    }
    const sr = t.closest('[data-search-input]');
    if (sr) return undefined;

    /* --- tray flyout --- */
    const ta = t.closest('[data-tray-app]');
    if (ta) {
      state.tray = false;
      renderShellLayer();
      return openApp(ta.dataset.trayApp);
    }
    if (t.closest('[data-sound-toggle]')) {
      state.sounds = !state.sounds;
      store.set(LS.sounds, String(state.sounds));
      renderShellLayer();
      if (state.sounds) sfx('click');
      return undefined;
    }
    if (t.closest('[data-tray-taskmgr]')) {
      state.tray = false;
      renderShellLayer();
      return openApp('taskmgr');
    }

    /* --- taskbar previews --- */
    const pvOpen = t.closest('[data-preview-open]');
    if (pvOpen) {
      const id = pvOpen.dataset.previewOpen;
      const win = state.windows.find((w) => w.appId === id);
      state.preview = null;
      if (win) {
        win.minimized = false;
        focusWindow(win.id);
      }
      renderShellLayer();
      return undefined;
    }
    const pvClose = t.closest('[data-preview-close]');
    if (pvClose) {
      const win = state.windows.find((w) => w.appId === pvClose.dataset.previewClose);
      state.preview = null;
      if (win) closeWindow(win.id);
      renderShellLayer();
      return undefined;
    }

    /* --- snap assist --- */
    const aw = t.closest('[data-assist-win]');
    if (aw) return applyAssist(aw.dataset.assistWin);
    if (t.closest('[data-assist-cancel]')) {
      state.assist = null;
      renderShellLayer();
      return undefined;
    }

    /* --- toasts --- */
    const tx = t.closest('[data-toast-x]');
    if (tx) {
      state.toasts = state.toasts.filter((n) => String(n.id) !== tx.dataset.toastX);
      renderToasts();
      return undefined;
    }
    if (t.closest('[data-toast-open]')) {
      state.notif = true;
      renderShellLayer();
      return undefined;
    }

    /* --- File Explorer context commands --- */
    const fc = t.closest('[data-file-cmd]');
    if (fc) {
      const kind = fc.dataset.fileCmd;
      closeShell();
      const ex = state.windows.find((w) => w.appId === 'explorer');
      const inst = ex && ex.__inst;
      if (inst && typeof inst.fileCmd === 'function') inst.fileCmd(kind);
      return undefined;
    }

    const launch = t.closest('[data-launch]');
    if (launch) return launchApp(launch.dataset.launch);

    const view = t.closest('[data-start-view]');
    if (view) {
      state.startView = view.dataset.startView;
      state.query = '';
      renderShellLayer();
      return undefined;
    }

    if (t.closest('[data-widgets-hide]')) {
      state.widgets = false;
      state.widgetsOpen = false;
      saveShell();
      renderShellLayer();
      renderTaskbar();
      return undefined;
    }

    const qs = t.closest('[data-qs]');
    if (qs) {
      state.toggles[qs.dataset.qs] = !state.toggles[qs.dataset.qs];
      renderShellLayer();
      renderTaskbar();
      return undefined;
    }
    if (t.closest('[data-focus]')) {
      state.focus = !state.focus;
      renderShellLayer();
      return undefined;
    }
    if (t.closest('[data-clear-notifs]')) {
      state.notifications = [];
      renderShellLayer();
      renderTaskbar();
      return undefined;
    }
    const dismiss = t.closest('[data-dismiss]');
    if (dismiss) {
      state.notifications = state.notifications.filter((n) => String(n.id) !== dismiss.dataset.dismiss);
      renderShellLayer();
      renderTaskbar();
      return undefined;
    }
    const cal = t.closest('[data-cal]');
    if (cal) {
      state.calMonth = new Date(state.calMonth.getFullYear(), state.calMonth.getMonth() + Number(cal.dataset.cal), 1);
      renderShellLayer();
      return undefined;
    }
    if (t.closest('[data-open-settings]')) return launchApp('settings');
    if (t.closest('[data-lock]')) {
      const wasPower = state.power;
      closeShell();
      state.power = !wasPower;
      renderShellLayer();
      return undefined;
    }
    if (t.closest('[data-lock-now]')) {
      closeShell();
      lockScreen();
      return undefined;
    }

    const cmd = t.closest('[data-cmd]');
    if (cmd) {
      const app = cmd.dataset.app;
      switch (cmd.dataset.cmd) {
        case 'open': openApp(app); break;
        case 'pin':
          state.pinned = state.pinned.includes(app)
            ? state.pinned.filter((x) => x !== app)
            : [...state.pinned, app];
          saveShell();
          renderTaskbar();
          break;
        case 'explorer': openApp('explorer'); break;
        case 'settings': openApp('settings'); break;
        case 'terminal': openApp('terminal'); break;
        case 'recycle': openApp('recycle'); break;
        case 'lock': lockScreen(); break;
        case 'clear':
          state.windows.forEach((w) => {
            if (w.__el) w.__el.remove();
          });
          state.windows = [];
          state.activeId = null;
          renderTaskbar();
          break;
        case 'close-all':
          state.windows.forEach((w) => {
            if (w.__el) w.__el.remove();
          });
          state.windows = [];
          state.activeId = null;
          renderTaskbar();
          break;
        case 'close': {
          const win = state.windows.find((w) => w.appId === app);
          if (win) closeWindow(win.id);
          break;
        }
        case 'next-wall': {
          const i = WALLPAPERS.findIndex((w) => w.id === state.wallpaper);
          state.wallpaper = WALLPAPERS[(i + 1) % WALLPAPERS.length].id;
          renderWallpaper();
          saveShell();
          break;
        }
        case 'legacy':
          state.ctx = { ...state.ctx, legacy: true };
          renderShellLayer();
          return undefined;
        case 'align':
          state.align = cmd.dataset.value;
          saveShell();
          renderTaskbar();
          break;
        default:
          break;
      }
      closeShell();
      return undefined;
    }
    return undefined;
  });

  dom.shellLayer.addEventListener('input', (e) => {
    if (e.target.matches('[data-search-input]')) {
      state.search.q = e.target.value;
      const open = document.activeElement === e.target;
      renderShellLayer();
      if (open) {
        const i = document.getElementById('search-input');
        if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); }
      }
      return;
    }
    if (e.target.matches('[data-volume]')) state.volume = Number(e.target.value);
    if (e.target.matches('[data-brightness]')) state.brightness = Number(e.target.value);
    if (e.target.matches('[data-volume], [data-brightness]')) renderTaskbar();
  });
}

/* =====================================================================
   Sound engine — synthesised, no assets
   ===================================================================== */
let actx = null;
function beep(freq, dur, delay, type, vol) {
  if (!actx) return;
  const o = actx.createOscillator();
  const g = actx.createGain();
  o.type = type || 'sine';
  o.frequency.value = freq;
  const t0 = actx.currentTime + delay;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol || 0.05, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g);
  g.connect(actx.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.06);
}
const SFX = {
  startup: [[523, 0.34], [659, 0.34], [784, 0.34], [1047, 0.8]],
  click: [[1500, 0.045]],
  notify: [[880, 0.1], [1175, 0.18]],
  error: [[240, 0.18], [190, 0.26]],
  open: [[680, 0.07], [920, 0.1]],
  close: [[700, 0.07], [460, 0.12]],
  minimize: [[560, 0.07], [380, 0.1]],
  lock: [[660, 0.12], [440, 0.2]],
};
function sfx(name) {
  if (!state.sounds) return;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!actx) actx = new AC();
    if (actx.state === 'suspended') actx.resume();
    const seq = SFX[name];
    if (!seq) return;
    seq.forEach(([f, d], i) => beep(f, d, i * 0.09, name === 'error' ? 'triangle' : 'sine', name === 'startup' ? 0.045 : 0.05));
  } catch (e) {
    /* audio unavailable — silent fallback */
  }
}

/* =====================================================================
   Toast notifications
   ===================================================================== */
let toastSeq = 100;
function notify(app, title, body) {
  const id = ++toastSeq;
  state.toasts.push({ id, app: app || 'Windows', title: title || 'Notification', body: body || '' });
  while (state.toasts.length > 4) state.toasts.shift();
  state.notifications = [
    { id, app: app || 'Windows', title: title || 'Notification', body: body || '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ...state.notifications,
  ].slice(0, 12);
  sfx('notify');
  renderToasts();
  renderTaskbar();
  setTimeout(() => {
    state.toasts = state.toasts.filter((t) => t.id !== id);
    renderToasts();
  }, 5200);
}
function renderToasts() {
  const host = document.getElementById('toast-layer');
  if (!host) return;
  host.innerHTML = state.toasts
    .map(
      (t) => `<button class="toast" data-toast-open="${t.id}">
        <span class="toast-ico">${ic(I.notifications, 16)}</span>
        <span class="toast-body">
          <span class="toast-app">${esc(t.app)}</span>
          <span class="toast-title">${esc(t.title)}</span>
          ${t.body ? `<span class="toast-txt">${esc(t.body)}</span>` : ''}
        </span>
        <span class="toast-x" data-toast-x="${t.id}" role="button" aria-label="Dismiss">${ic(I.close, 12)}</span>
      </button>`,
    )
    .join('');
}

/* =====================================================================
   Jump lists  (right-click a taskbar icon)
   ===================================================================== */
const JUMP_TASKS = {
  explorer: [
    { label: 'Home', path: 'C:' },
    { label: 'Documents', path: 'C:\\Documents' },
    { label: 'Downloads', path: 'C:\\Downloads' },
    { label: 'Pictures', path: 'C:\\Pictures' },
  ],
  notepad: [
    { label: 'New window', app: 'notepad' },
    { label: 'notes.txt', app: 'notepad', path: 'C:\\Documents\\notes.txt' },
    { label: 'todo.md', app: 'notepad', path: 'C:\\Documents\\todo.md' },
  ],
  terminal: [
    { label: 'New terminal', app: 'terminal' },
    { label: 'New terminal (Admin)', app: 'terminal', admin: true, badge: 'ADMIN' },
  ],
  taskmgr: [{ label: 'Task Manager (compact)', app: 'taskmgr' }],
  paint: [{ label: 'New drawing', app: 'paint' }],
  sticky: [{ label: 'New note', app: 'sticky' }],
  edge: [{ label: 'New tab', app: 'edge' }],
};

function jumpListHtml() {
  const { appId } = state.jump;
  const app = appById(appId);
  const pinned = state.pinned.includes(appId);
  const running = state.windows.some((w) => w.appId === appId);
  const tasks = JUMP_TASKS[appId] || [{ label: `New ${app.name} window`, app: appId }];
  const recent =
    appId === 'explorer'
      ? [
          { label: 'notes.txt', path: 'C:\\Documents\\notes.txt' },
          { label: 'Projects', path: 'C:\\Documents' },
        ]
      : appId === 'notepad'
        ? [{ label: 'notes.txt', path: 'C:\\Documents\\notes.txt' }]
        : [];
  return `<div class="jump-list" data-jump-list style="${state.jumpSide === 'left' ? 'left:8px' : 'right:8px'}">
    <div class="jl-head">
      <span class="ic" style="width:22px;height:22px">${app.icon}</span>
      <span class="jl-name">${esc(app.name)}</span>
      <button class="jl-unpin" data-jump-pin title="${pinned ? 'Unpin from taskbar' : 'Pin to taskbar'}"
        aria-label="${pinned ? 'Unpin from taskbar' : 'Pin to taskbar'}">${ic(pinned ? I.unpin : I.pin, 16)}</button>
    </div>
    <div class="w11-sep"></div>
    ${tasks
      .map(
        (t, i) => `<button class="w11-row" data-jump-task="${i}">
          ${ic(I.forward, 14)}<span>${esc(t.label)}</span>
          ${t.badge ? `<span class="ql-badge">${esc(t.badge)}</span>` : ''}</button>`,
      )
      .join('')}
    ${recent.length ? '<div class="jl-section">Recent</div>' : ''}
    ${recent
      .map(
        (t) => `<button class="w11-row" data-jump-file="${esc(t.path)}">
          ${ic(I.file, 14)}<span>${esc(t.label)}</span></button>`,
      )
      .join('')}
    <div class="w11-sep"></div>
    <button class="w11-row" data-jump-close>${ic(I.close, 14)}<span>Close ${running ? 'window' : 'all windows'}</span></button>
  </div>`;
}

function wireJump() {
  dom.overlayLayer.addEventListener('click', (e) => {
    if (!state.jump) return undefined;
    const appId = state.jump.appId;
    if (e.target.closest('[data-jump-pin]')) {
      state.pinned = state.pinned.includes(appId)
        ? state.pinned.filter((x) => x !== appId)
        : [...state.pinned, appId];
      saveShell();
      state.jump = null;
      renderOverlays();
      renderTaskbar();
      return undefined;
    }
    if (e.target.closest('[data-jump-close]')) {
      const wins = state.windows.filter((w) => w.appId === appId);
      if (wins.length) wins.forEach((w) => closeWindow(w.id));
      else state.windows.forEach((w) => closeWindow(w.id));
      state.jump = null;
      renderOverlays();
      return undefined;
    }
    const task = e.target.closest('[data-jump-task]');
    if (task) {
      const list = JUMP_TASKS[appId] || [{}];
      const t = list[Number(task.dataset.jumpTask)] || {};
      state.jump = null;
      renderOverlays();
      if (t.app) return openApp(t.app, t.admin ? { admin: true } : t.path ? { path: t.path } : null);
      return openApp(appId, t.path ? { path: t.path } : null);
    }
    const file = e.target.closest('[data-jump-file]');
    if (file) {
      const p = file.dataset.jumpFile;
      state.jump = null;
      renderOverlays();
      return isImageName(p) ? openApp('photos', { file: p }) : openApp('notepad', { path: p });
    }
    if (!e.target.closest('[data-jump-list]')) {
      state.jump = null;
      renderOverlays();
    }
    return undefined;
  });
}

/* =====================================================================
   Emoji picker  (Win + .)
   ===================================================================== */
const EMOJI = {
  Smileys: '😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 🥰 😍 🤩 😘 😗 😚 😙 😋 😛 😜 🤪 🤨 🧐 🤓 😎 🥳 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 😐 😑 😬 🙄 😯 😴 🤤 😪 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕'.split(' '),
  Gestures: '👍 👎 👌 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 👇 ☝️ ✋ 🤚 🖐 🖖 👋 🤝 🙏 💪 🦾 ✍️ 👏 🙌 👐 🤲 🤜 🤛 ✊ 👊 🫰 🫱 🫲 🫳 🫴 🖕'.split(' '),
  People: '👶 🧒 👦 👧 🧑 👨 👩 🧓 👴 👵 🙈 🙉 🙊 💁 🙋 🙆 🙅 🤷 🤦 💃 🕺 👯 🧖 🧘 👮 🕵️ 💂 👷 🤴 👸 🦸 🦹 🧙 🧚 🧛 🧜 🧝 🧞'.split(' '),
  Animals: '🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🐔 🐧 🐦 🐤 🦆 🦅 🦉 🦇 🐺 🐗 🐴 🦄 🐝 🐛 🦋 🐌 🐞 🐢 🐍 🦖 🐙 🦑 🦀 🐬 🐳 🐟 🐠 🐡 🦈 🐊 🐆 🐘 🦏 🦍'.split(' '),
  Food: '🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🥑 🥦 🥕 🌽 🌶 🥒 🥬 🧄 🧅 🥔 🍠 🥐 🥯 🍞 🥖 🧀 🥚 🍳 🥞 🧇 🥓 🍔 🍟 🍕 🌭 🥪 🌮 🌯 🥙 🍜 🍝 🍣 🍱 🍦 🍰 🎂 🍫 🍬 🍿 🍩 🍪 ☕ 🍵 🧋 🍺 🥂 🍷'.split(' '),
  Travel: '🚗 🚕 🚙 🚌 🚎 🏎 🚓 🚑 🚒 🚐 🚚 🚛 🚜 🛴 🚲 🛵 🏍 🚨 🚔 🚍 🚘 🚖 🚡 🚠 🚟 🚃 🚋 🚞 🚝 🚄 🚅 🚈 🚂 🚆 🚇 🚊 🚉 ✈️ 🛫 🛬 🛩 🚁 🚀 🛸 🚢 ⛵ 🛥 🚤 ⛴ 🗺 🗿 🗽 🗼 🏰 🏯 🎡 🎢 🎠 ⛲ ⛱ 🏖 🏝 🌋 ⛰ 🏔 🗻 🏕 🏜 🏞 🏟 🏛'.split(' '),
  Objects: '⌚ 📱 💻 ⌨️ 🖥 🖨 🖱 💽 💾 💿 📀 📼 📷 📸 📹 🎥 📽 🎞 📞 ☎️ 📟 📠 📺 📻 🎙 🎚 🎛 🧭 ⏱ ⏲ ⏰ 🕰 ⌛ ⏳ 📡 🔋 🔌 💡 🔦 🕯 🧯 🛢 💸 💵 💴 💶 💷 💰 💳 💎 ⚖️ 🔧 🔨 ⚒ 🛠 ⛏ 🔩 ⚙️ 🧱 ⛓ 🧲 💣 🧨 🪓 🔪 🗡 ⚔️ 🛡 🚬 🏺 🔮 📿 🧿 💈 ⚗️ 🔭 🔬 🕳 💊 💉 🩸 🩹 🩺 🌡 🪑 🚽 🚿 🛁 🧼 🪒 🧽 🧹 🧺 🧻'.split(' '),
  Symbols: '❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💔 ❣️ 💕 💞 💓 💗 💖 💘 💝 💟 ☮️ ✝️ ☪️ 🕉 ☸️ ✡️ 🔯 ☯️ ☦️ ⛎ ♈️ ♉️ ♊️ ♋️ ♌️ ♍️ ♎️ ♏️ ♐️ ♑️ ♒️ ♓️ 🆔 ⚛️ ☢️ ☣️ 📴 📳 🈶 🈚️ 🈸 🈺 🈷️ ✴️ 🆚 💮 🉐 ㊙️ ㊗️ 🈴 🈵 🈹 🈲 🅰️ 🅱️ 🆎 🆑 🅾️ 🆘 ❌ ⭕️ 🛑 ⛔️ 📛 🚫 💯 💢 ♨️ 🚷 🚯 🚳 🔞 📵 🚭 ❗️ ❕ ❓ ❔ ‼️ ⁉️ 🔅 🔆 〽️ ⚠️ 🚸 🔱 ⚜️ 🔰 ♻️ ✅ 🈯️ 💹 ❇️ ✳️ ❎ 🌐 💠 Ⓜ️ 🌀 💤 🏧 🚾 ♿️ 🅿️ 🈳 🈂️ 🛂 🛃 🛄 🛅 🚹 🚺 🚼 🚻 🚮 🎦 📶 🈁 🔣 ℹ️ 🔤 🔡 🔠 🆖 🆗 🆙 🆒 🆕 🆓 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟 🔢 #️⃣ *️⃣ ▶️ ⏸ ⏯ ⏹ ⏺ ⏭ ⏮ ⏩ ⏪ ⏫ ⏬ ◀️ 🔼 🔽 ➡️ ⬅️ ⬆️ ⬇️ ↗️ ↘️ ↙️ ↖️ ↕️ ↔️ ↪️ ↩️ ⤴️ ⤵️ 🔀 🔁 🔂 🔄 🔃 🎵 🎶 ➕ ➖ ➗ ✖️ ♾ 💲 💱 ™️ ©️ ®️ 〰️ ➰ ➿ 🔚 🔙 🔛 🔝 🔜 ✔️ ☑️ 🔘 🔴 🟠 🟡 🟢 🔵 🟣 ⚫️ ⚪️ 🟤 🔺 🔻 🔸 🔹 🔶 🔷 🔳 🔲 ▪️ ▫️ ◾️ ◽️ ◼️ ◻️ 🟥 🟧 🟨 🟩 🟦 🟪 ⬛️ ⬜️ 🟫 🔊 🔉 🔈 🔇 🔔 🔕 📣 📢 👁️ 🗨️ 💬 💭 ♠️ ♣️ ♥️ ♦️ 🃏 🎴 🀄️'.split(' '),
};
const EMOJI_CATS = Object.keys(EMOJI);

function emojiHtml() {
  const cat = state.emoji.cat;
  const ql = String(state.emoji.q || '').trim().toLowerCase();
  const list = ql
    ? EMOJI_CATS.filter((k) => k.toLowerCase().includes(ql)).flatMap((k) => EMOJI[k])
    : EMOJI[cat] || EMOJI.Smileys;
  return `<div class="w11-sheet emoji-panel" data-emoji-panel>
    <div class="w11-head">${ic(I.emoji, 16)}<span>Emoji</span><span class="spacer"></span>
      <span class="tail" style="font-size:11px;color:var(--text-3)">${list.length} results</span></div>
    <div class="em-search">${ic(I.search, 14)}<input data-em-search placeholder="Search emoji" aria-label="Search emoji"
      value="${esc(state.emoji.q)}" autocomplete="off" /></div>
    <div class="em-cats">
      ${EMOJI_CATS.map(
        (c) => `<button class="em-cat ${c === cat && !ql ? 'on' : ''}" data-em-cat="${esc(c)}"
        title="${esc(c)}" aria-label="${esc(c)}">${EMOJI[c][0]}</button>`,
      ).join('')}
    </div>
    <div class="em-grid">
      ${list
        .map((e) => `<button class="em-btn" data-em="${esc(e)}" title="${esc(e)}" aria-label="Insert ${esc(e)}">${e}</button>`)
        .join('')}
    </div>
    <div class="em-foot"><span>Click an emoji to insert it into the focused field</span><span>Win + .</span></div>
  </div>`;
}

function toggleEmoji() {
  const open = !(state.emoji && state.emoji.open);
  closeShell();
  state.emoji = Object.assign({}, state.emoji, { open });
  renderOverlays();
}

function insertEmoji(e) {
  const el = document.activeElement;
  if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && typeof el.value === 'string') {
    const s = el.selectionStart == null ? el.value.length : el.selectionStart;
    const e2 = el.selectionEnd == null ? s : el.selectionEnd;
    el.value = el.value.slice(0, s) + e + el.value.slice(e2);
    const caret = s + e.length;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    try {
      el.setSelectionRange(caret, caret);
    } catch (err) {
      /* ignore */
    }
    el.focus();
  } else {
    pushClip(e, 'Emoji picker');
    notify('Emoji', 'Copied to clipboard', `${e} is on the clipboard.`);
  }
  sfx('click');
}

function wireEmoji() {
  dom.overlayLayer.addEventListener('click', (e) => {
    if (!state.emoji || !state.emoji.open) return undefined;
    const cat = e.target.closest('[data-em-cat]');
    if (cat) {
      state.emoji = { open: true, cat: cat.dataset.emCat, q: '' };
      renderOverlays();
      return undefined;
    }
    const em = e.target.closest('[data-em]');
    if (em) {
      insertEmoji(em.dataset.em);
      return undefined;
    }
    if (!e.target.closest('[data-emoji-panel]')) {
      state.emoji = Object.assign({}, state.emoji, { open: false });
      renderOverlays();
    }
    return undefined;
  });
  dom.overlayLayer.addEventListener('input', (e) => {
    if (!e.target.matches('[data-em-search]')) return;
    state.emoji = Object.assign({}, state.emoji, { q: e.target.value });
    const caret = e.target.selectionStart;
    renderOverlays();
    const s = $('[data-em-search]');
    if (s) {
      s.focus();
      s.setSelectionRange(caret, caret);
    }
  });
}

/* =====================================================================
   Snipping Tool  (Win + Shift + S)
   ===================================================================== */
function wallpaperColors() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const byId = {
    bloom: ['#0b2a45', '#1b5a8a', '#0a1c30'],
    'bloom-light': ['#0a2740', '#2b6ea8', '#123a63'],
    flow: ['#0f2027', '#203a43', '#2c5364'],
    sunrise: ['#ff8a3d', '#d94f70', '#14102b'],
    glow: ['#7b2ff7', '#2b1055', '#0a0618'],
    mint: ['#0f9b8e', '#0b6cbf', '#10233f'],
    graphite: ['#3a3a3a', '#1c1c1c', '#0a0a0a'],
  };
  const c = byId[state.wallpaper] || byId.bloom;
  return dark ? [c[0], c[1], '#05080d'] : c;
}

/** Renders the selected desktop region to a PNG data URL. */
function captureRegion(x, y, w, h) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(w * dpr));
  c.height = Math.max(1, Math.round(h * dpr));
  const g = c.getContext('2d');
  g.scale(dpr, dpr);
  const [c0, c1, c2] = wallpaperColors();
  const grad = g.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, c0);
  grad.addColorStop(0.5, c1);
  grad.addColorStop(1, c2);
  g.fillStyle = grad;
  g.fillRect(0, 0, w, h);

  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const accent = ACCENTS.find((a) => a.id === state.accent) || ACCENTS[0];
  const bx = -x;
  const by = -y;

  /* window frames */
  state.windows.forEach((win) => {
    if (win.minimized || (win.desk || 0) !== state.activeDesktop) return;
    const wx = win.maximized ? 0 : win.x;
    const wy = win.maximized ? 0 : win.y;
    const ww = win.maximized ? window.innerWidth : win.w;
    const wh = win.maximized ? window.innerHeight - state.taskbarH : win.h;
    g.save();
    g.fillStyle = dark ? '#202020' : '#f3f3f3';
    g.strokeStyle = dark ? 'rgba(255,255,255,.14)' : 'rgba(0,0,0,.14)';
    g.lineWidth = 1;
    const r = 8;
    g.beginPath();
    g.moveTo(wx + r + bx, wy + by);
    g.arcTo(wx + ww + bx, wy + by, wx + ww + bx, wy + wh + by, r);
    g.arcTo(wx + ww + bx, wy + wh + by, wx + bx, wy + wh + by, r);
    g.arcTo(wx + bx, wy + wh + by, wx + bx, wy + by, r);
    g.arcTo(wx + bx, wy + by, wx + ww + bx, wy + by, r);
    g.closePath();
    g.fill();
    g.stroke();
    /* title bar + caption glyphs */
    g.fillStyle = dark ? '#2b2b2b' : '#f3f3f3';
    g.fillRect(wx + bx, wy + by, ww, 32);
    g.fillStyle = dark ? '#fff' : '#1b1b1b';
    g.font = '12px "Segoe UI", system-ui, sans-serif';
    g.fillText(String(win.title || '').slice(0, 42), wx + bx + 34, wy + by + 21);
    g.font = '11px "Segoe UI", system-ui, sans-serif';
    g.fillText('—', wx + ww + bx - 92, wy + by + 20);
    g.fillText('▢', wx + ww + bx - 62, wy + by + 20);
    g.fillText('✕', wx + ww + bx - 30, wy + by + 20);
    /* content area */
    g.fillStyle = dark ? '#272727' : '#fbfbfb';
    g.fillRect(wx + bx + 1, wy + by + 33, ww - 2, wh - 34);
    g.fillStyle = accent.color;
    g.fillRect(wx + bx + 1, wy + by + 33, Math.max(0, Math.min(ww - 2, ww * 0.42)), 3);
    g.restore();
  });

  /* taskbar */
  const tbY = window.innerHeight - state.taskbarH;
  g.fillStyle = dark ? 'rgba(32,32,32,.94)' : 'rgba(243,243,243,.94)';
  g.fillRect(0, tbY + by, window.innerWidth, state.taskbarH);
  g.fillStyle = dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.06)';
  g.fillRect(0, tbY + by, window.innerWidth, 1);
  const pinned = state.pinned.slice();
  const iconW = 40;
  const startX = window.innerWidth / 2 - (pinned.length * iconW) / 2 - 40;
  pinned.forEach((id, i) => {
    g.fillStyle = accent.color;
    g.globalAlpha = 0.85;
    g.beginPath();
    g.roundRect
      ? g.roundRect(startX + i * iconW + 6, tbY + by + 8, 28, 28, 6)
      : g.rect(startX + i * iconW + 6, tbY + by + 8, 28, 28);
    g.fill();
    g.globalAlpha = 1;
  });

  /* snipped hint so the image is obviously a real capture */
  g.fillStyle = 'rgba(0,0,0,.35)';
  g.font = '11px "Segoe UI", system-ui, sans-serif';
  g.fillText(`${Math.round(w)} × ${Math.round(h)}`, 8, h - 8);
  return c.toDataURL('image/png');
}

function startSnip() {
  if (state.locked) return;
  state.snip.active = true;
  state.snip.sel = null;
  renderSnipOverlay();
}

function renderSnipOverlay() {
  const existing = $('#snip-overlay');
  if (!state.snip.active) {
    if (existing) existing.remove();
    return;
  }
  let el = existing;
  if (!el) {
    el = document.createElement('div');
    el.className = 'snip-overlay';
    el.id = 'snip-overlay';
    document.body.appendChild(el);
  }
  const sel = state.snip.sel;
  const modes = [['rect', 'Rectangle', I.crop], ['win', 'Window', I.win], ['full', 'Full screen', I.full], ['free', 'Freeform', I.freeform]];
  el.innerHTML = `
    <div class="snip-hint">${ic(I.crop, 14)}
      ${modes
        .map(
          (m) => `<button class="pill-btn ${state.snip.mode === m[0] ? 'accent' : ''}" data-snip-mode="${m[0]}">${esc(m[1])}</button>`,
        )
        .join('')}
      <span style="color:var(--text-2)">Esc to cancel</span>
    </div>
    ${sel ? `<div class="snip-sel" style="left:${sel.x}px;top:${sel.y}px;width:${sel.w}px;height:${sel.h}px">
        <span class="snip-size">${Math.round(sel.w)} × ${Math.round(sel.h)}</span>
      </div>` : ''}`;
  const hint = $('.snip-hint', el);
  if (hint) hint.addEventListener('click', (e) => {
    const m = e.target.closest('[data-snip-mode]');
    if (m) state.snip.mode = m.dataset.snipMode;
  });
}

function finishSnip() {
  const sel = state.snip.sel;
  state.snip.active = false;
  renderSnipOverlay();
  if (!sel || sel.w < 8 || sel.h < 8) return;
  const dataUrl = captureRegion(sel.x, sel.y, sel.w, sel.h);
  const shot = {
    id: `snip-${Date.now()}`,
    url: dataUrl,
    w: Math.round(sel.w),
    h: Math.round(sel.h),
    name: `Snip-${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(':', '.')}.png`,
    at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
  state.snip.shots = [shot, ...state.snip.shots].slice(0, 12);
  state.snip.current = shot.id;
  sfx('open');
  notify('Snipping Tool', 'Snip copied to clipboard', `${shot.name} · ${shot.w} × ${shot.h}`);
  pushClip(`[image] ${shot.name} (${shot.w} × ${shot.h})`, 'Snipping Tool');
  openSnipApp();
}

function wireSnip() {
  let dragging = false;
  let sx = 0;
  let sy = 0;
  document.addEventListener('pointerdown', (e) => {
    if (!state.snip.active) return;
    const ov = e.target.closest ? e.target.closest('#snip-overlay') : null;
    if (!ov) return;
    if (e.target.closest('.snip-hint') || e.target.closest('.snip-tools')) return;
    e.preventDefault();
    dragging = true;
    state.snip.freePath = [];
    sx = e.clientX;
    sy = e.clientY;
    if (state.snip.mode === 'full') {
      state.snip.sel = { x: 0, y: 0, w: window.innerWidth, h: window.innerHeight };
      renderSnipOverlay();
      dragging = false;
      setTimeout(finishSnip, 40);
      return;
    }
    if (state.snip.mode === 'win') {
      const winEl = (document.elementFromPoint(sx, sy) || {}).closest
        ? document.elementFromPoint(sx, sy).closest('.window')
        : null;
      const frame = winEl ? winEl.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
      state.snip.sel = { x: frame.left, y: frame.top, w: frame.width, h: frame.height };
      renderSnipOverlay();
      dragging = false;
      setTimeout(finishSnip, 40);
      return;
    }
    state.snip.sel = { x: sx, y: sy, w: 0, h: 0 };
  });
  document.addEventListener('pointermove', (e) => {
    if (!state.snip.active || !dragging) return;
    const x = Math.min(sx, e.clientX);
    const y = Math.min(sy, e.clientY);
    const w = Math.abs(e.clientX - sx);
    const h = Math.abs(e.clientY - sy);
    state.snip.sel = { x, y, w, h };
    const node = $('#snip-overlay .snip-sel');
    if (node) {
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      node.style.width = `${w}px`;
      node.style.height = `${h}px`;
      const size = $('.snip-size', node);
      if (size) size.textContent = `${Math.round(w)} × ${Math.round(h)}`;
    } else {
      renderSnipOverlay();
    }
  });
  document.addEventListener('pointerup', () => {
    if (!state.snip.active || !dragging) return;
    dragging = false;
    finishSnip();
  });
  document.addEventListener('keydown', (e) => {
    if (state.snip.active && e.key === 'Escape') {
      state.snip.active = false;
      state.snip.sel = null;
      renderSnipOverlay();
    }
  });
}

function snipApp() {
  const el = shell(`
    <div class="snip-app">
      <div class="snip-toolbar">
        <button class="pill-btn accent" data-snip-new>${ic(I.plus, 14)}New</button>
        <div class="snip-modes">
          ${[['rect', 'Rectangle', I.crop], ['win', 'Window', I.win], ['full', 'Full screen', I.full], ['free', 'Freeform', I.freeform]]
            .map(
              (m) => `<button data-snip-pick="${m[0]}" class="${state.snip.mode === m[0] ? 'on' : ''}">${ic(m[2], 14)}${esc(m[1])}</button>`,
            )
            .join('')}
        </div>
        <span class="cmd-sep"></span>
        <button class="tool-btn" data-snip-delay>${ic(I.timer, 16)}No delay</button>
        <span style="margin-left:auto;display:flex;gap:6px">
          <button class="tool-btn" data-snip-copy>${ic(I.copy, 16)}Copy</button>
          <button class="tool-btn" data-snip-save>${ic(I.save, 16)}Save</button>
          <button class="tool-btn" data-snip-open>${ic(I.photos, 16)}Open in Photos</button>
        </span>
      </div>
      <div class="snip-stage" data-snip-stage></div>
      <div class="snip-list" data-snip-list></div>
    </div>`);

  const stage = $('[data-snip-stage]', el);
  const list = $('[data-snip-list]', el);

  const current = () => state.snip.shots.find((s) => s.id === state.snip.current) || state.snip.shots[0];

  const paint = () => {
    const shot = current();
    stage.innerHTML = shot
      ? `<img src="${shot.url}" alt="Snip ${esc(shot.name)}" />`
      : `<div class="snip-placeholder">${ic(I.crop, 40)}<div style="margin-top:12px">Press <b>Win + Shift + S</b> or choose <b>New</b> to capture a region of the screen.</div></div>`;
    list.innerHTML = state.snip.shots.length
      ? state.snip.shots
          .map(
            (s) => `<button class="snip-card ${s.id === (shot && shot.id) ? 'on' : ''}" data-snip-show="${s.id}"
              title="${esc(s.name)} · ${s.w} × ${s.h}"><img src="${s.url}" alt="${esc(s.name)}" /><div style="font-size:10px;color:var(--text-2);padding:4px 2px 0">${esc(s.name)}</div></button>`,
          )
          .join('')
      : '';
  };

  el.addEventListener('click', (e) => {
    if (e.target.closest('[data-snip-new]')) {
      startSnip();
      return;
    }
    const pick = e.target.closest('[data-snip-pick]');
    if (pick) {
      state.snip.mode = pick.dataset.snipPick;
      paint();
      $$('[data-snip-pick]', el).forEach((b) => b.classList.toggle('on', b.dataset.snipPick === state.snip.mode));
      return;
    }
    if (e.target.closest('[data-snip-delay]')) {
      notify('Snipping Tool', 'Delay', 'Snips capture instantly on this device.');
      return;
    }
    const show = e.target.closest('[data-snip-show]');
    if (show) {
      state.snip.current = show.dataset.snipShow;
      paint();
      return;
    }
    const shot = current();
    if (e.target.closest('[data-snip-copy]')) {
      if (shot) {
        pushClip(`[image] ${shot.name} (${shot.w} × ${shot.h})`, 'Snipping Tool');
        notify('Snipping Tool', 'Copied', `${shot.name} is on the clipboard.`);
      }
      return;
    }
    if (e.target.closest('[data-snip-save]')) {
      if (!shot) return;
      FSE['C:\\Pictures'] = Object.assign({}, FSE['C:\\Pictures'], { [shot.name]: 240000 + state.snip.shots.length * 1024 });
      notify('Snipping Tool', 'Saved to Pictures', shot.name);
      paint();
      return;
    }
    if (e.target.closest('[data-snip-open]')) {
      if (!shot) return;
      FSE['C:\\Pictures'] = Object.assign({}, FSE['C:\\Pictures'], { [shot.name]: 240000 });
      openApp('photos', { file: shot.name });
      return;
    }
  });

  paint();
  return { el };
}

function openSnipApp() {
  openApp('snip');
}

/* =====================================================================
   Snap layouts overlay  (Win + Z)
   ===================================================================== */
function snapOverlayHtml() {
  const win = activeWindow();
  return `<div class="snap-overlay" data-snap-overlay>
    <div class="so-title">${win ? `Choose where to snap “${esc(win.title)}”` : 'Open a window to use snap layouts'}</div>
    <div class="so-options">
      ${SNAP_LAYOUTS.map(
        (l, li) => `<div class="so-opt" style="grid-template-columns:${l.cols};grid-template-rows:${l.rows}">
          ${l.zones
            .map(
              (z, zi) =>
                `<button data-snap-pick="${li}:${zi}" aria-label="Snap layout ${li + 1} zone ${zi + 1}"
                  title="Snap window here" ${z.tall ? 'style="grid-row:span 2"' : ''}></button>`,
            )
            .join('')}
        </div>`,
      ).join('')}
    </div>
  </div>`;
}

function openSnapOverlay() {
  if (state.locked) return;
  closeShell();
  state.snapOverlay = true;
  renderOverlays();
}

function wireSnapOverlay() {
  dom.overlayLayer.addEventListener('click', (e) => {
    if (!state.snapOverlay) return undefined;
    const pick = e.target.closest('[data-snap-pick]');
    if (pick) {
      const [li, zi] = pick.dataset.snapPick.split(':').map(Number);
      const win = activeWindow();
      state.snapOverlay = false;
      if (win) snapWindow(win, SNAP_LAYOUTS[li], SNAP_LAYOUTS[li].zones[zi]);
      else renderOverlays();
      return undefined;
    }
    if (!e.target.closest('[data-snap-overlay]')) {
      state.snapOverlay = false;
      renderOverlays();
    }
    return undefined;
  });
}

/* =====================================================================
   Overlay layer — Run, Quick Link, jump lists, clipboard, emoji,
   snip overlay, snap layouts. Above flyouts, below Task View.
   ===================================================================== */
function renderOverlays() {
  if (!dom.overlayLayer) return;
  let html = '';
  if (state.run) html += runDialogHtml();
  if (state.quickLink && !state.locked) html += quickLinkHtml();
  if (state.jump && !state.locked) html += jumpListHtml();
  if (state.clip && state.clip.open) html += clipboardHtml();
  if (state.emoji && state.emoji.open) html += emojiHtml();
  if (state.snapOverlay) html += snapOverlayHtml();
  dom.overlayLayer.innerHTML = html;
  if (state.run) {
    const i = $('[data-run-input]');
    if (i && document.activeElement !== i) i.focus();
  }
}

/* ---------------------------------------------------------- clipboard */
const CLIP_SEED = [
  { text: 'C:\\Users\\User\\Documents\\notes.txt', app: 'File Explorer', pinned: false },
  { text: 'ssh user@windowia.local -p 22', app: 'Terminal', pinned: false },
  { text: 'Windowia 11 Pro — 24H2 · Build 26100.1', app: 'Settings', pinned: false },
];

function saveClip() {
  store.set(LS.clip, JSON.stringify(state.clip.items.slice(0, 25)));
}

function pushClip(text, app) {
  const t = String(text || '').trim();
  if (!t || t.length > 4000) return;
  state.clip.items = [
    { text: t, app: app || 'Unknown app', pinned: false },
    ...state.clip.items.filter((x) => x.text !== t || x.pinned),
  ].slice(0, 25);
  saveClip();
  if (state.clip.open) renderOverlays();
}

function clipboardHtml() {
  const items = state.clip.items;
  const pinned = items.filter((i) => i.pinned);
  const rest = items.filter((i) => !i.pinned);
  const row = (it) => `<button class="cb-item ${it.pinned ? 'pinned' : ''}" data-clip-paste="${items.indexOf(it)}">
      <span class="cb-thumb">${ic(I.clip, 16)}</span>
      <span class="cb-text"><b>${esc(it.app)}</b><span>${esc(String(it.text).slice(0, 170))}</span></span>
      <span class="cb-pin" data-clip-pin="${items.indexOf(it)}" role="button" aria-label="${it.pinned ? 'Unpin' : 'Pin'}"
        title="${it.pinned ? 'Unpin' : 'Pin'}">${ic(it.pinned ? I.pin : I.bookmark, 13)}</span>
    </button>`;
  return `<div class="w11-sheet clipboard" data-clipboard>
    <div class="w11-head">${ic(I.clip, 16)}<span>Clipboard history</span>
      <span class="spacer"></span>
      <button class="icon-btn-sm" data-clip-clear title="Clear all" aria-label="Clear all">${ic(I.clear, 14)}</button>
    </div>
    <div class="cb-list">
      ${
        items.length
          ? `${pinned.length ? `<div class="notif-group">Pinned</div>${pinned.map(row).join('')}` : ''}
             ${rest.length ? `<div class="notif-group">Recent</div>${rest.map(row).join('')}` : ''}`
          : '<div class="w11-empty">Nothing here yet. Copy something with Ctrl+C and it will show up here.</div>'
      }
    </div>
    <div class="w11-foot">
      <span class="tail">${items.length} item${items.length === 1 ? '' : 's'}</span>
      <span class="spacer"></span>
      <button class="icon-btn-sm" data-clip-off title="Turn off clipboard history" aria-label="Turn off clipboard history">${ic(I.power, 14)}</button>
    </div>
  </div>`;
}

function toggleClipboard() {
  const open = !(state.clip && state.clip.open);
  closeShell();
  state.clip = Object.assign({}, state.clip, { open });
  renderOverlays();
}

function pasteToFocus(text) {
  const el = document.activeElement;
  if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && typeof el.value === 'string') {
    const s = el.selectionStart == null ? el.value.length : el.selectionStart;
    const e2 = el.selectionEnd == null ? s : el.selectionEnd;
    el.value = el.value.slice(0, s) + text + el.value.slice(e2);
    const caret = s + text.length;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    try {
      el.setSelectionRange(caret, caret);
    } catch (err) {
      /* some inputs disallow selection ranges */
    }
    el.focus();
    sfx('click');
    return;
  }
  notify('Clipboard', 'Copied item', String(text).slice(0, 80));
}

function wireClipboard() {
  dom.overlayLayer.addEventListener('click', (e) => {
    if (!state.clip || !state.clip.open) return undefined;
    if (e.target.closest('[data-clip-off]')) {
      state.clip = { open: false, items: [] };
      saveClip();
      renderOverlays();
      notify('Windows', 'Clipboard history is off', 'New copies will not be saved.');
      return undefined;
    }
    if (e.target.closest('[data-clip-clear]')) {
      state.clip.items = state.clip.items.filter((i) => i.pinned);
      saveClip();
      renderOverlays();
      return undefined;
    }
    const pin = e.target.closest('[data-clip-pin]');
    if (pin) {
      const it = state.clip.items[Number(pin.dataset.clipPin)];
      if (it) {
        it.pinned = !it.pinned;
        saveClip();
        renderOverlays();
      }
      return undefined;
    }
    const paste = e.target.closest('[data-clip-paste]');
    if (paste) {
      const it = state.clip.items[Number(paste.dataset.clipPaste)];
      if (it) pasteToFocus(it.text);
      state.clip = Object.assign({}, state.clip, { open: false });
      renderOverlays();
      return undefined;
    }
    if (!e.target.closest('[data-clipboard]')) {
      state.clip = Object.assign({}, state.clip, { open: false });
      renderOverlays();
    }
    return undefined;
  });
}

/** Ctrl+C / Ctrl+X anywhere feeds the Windows clipboard history. */
function wireClipboardCapture() {
  const capture = () => {
    const el = document.activeElement;
    let text = '';
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && el.selectionStart !== el.selectionEnd) {
      text = el.value.slice(el.selectionStart, el.selectionEnd);
    } else {
      text = String(window.getSelection() || '');
    }
    if (text.trim()) pushClip(text, 'Clipboard');
  };
  document.addEventListener('copy', capture);
  document.addEventListener('cut', capture);
}

/* =====================================================================
   Power menu / desktops / search / tray / previews / alt-tab / snap assist
   ===================================================================== */
/* =====================================================================
   Run dialog  (Win + R) + command registry
   ===================================================================== */
const CMD_MAP = [
  { cmd: 'notepad', aliases: ['notepad.exe'], name: 'Notepad', icon: I.notepad, desc: 'Open a text document in Notepad', open: () => openApp('notepad') },
  { cmd: 'explorer', aliases: ['explorer.exe'], name: 'File Explorer', icon: I.explorer, desc: 'Browse your files and folders', open: (a) => openApp('explorer', a ? { path: a } : null) },
  { cmd: 'calc', aliases: ['calc.exe'], name: 'Calculator', icon: I.calculator, desc: 'Perform standard calculations', open: () => openApp('calculator') },
  { cmd: 'cmd', aliases: ['terminal', 'wt', 'wt.exe', 'powershell', 'pwsh'], name: 'Terminal', icon: I.terminal, desc: 'Open a command-line session', open: () => openApp('terminal') },
  { cmd: 'control', aliases: ['settings', 'ms-settings:'], name: 'Settings', icon: I.settings, desc: 'View and change system settings', open: (a) => openSettings(a || null) },
  { cmd: 'taskmgr', aliases: ['taskmgr.exe'], name: 'Task Manager', icon: I.taskmgr, desc: 'See how your PC is performing', open: () => openApp('taskmgr') },
  { cmd: 'mspaint', aliases: ['paint'], name: 'Paint', icon: I.paint, desc: 'Create and edit drawings', open: () => openApp('paint') },
  { cmd: 'msedge', aliases: ['edge'], name: 'Microsoft Edge', icon: I.edge, desc: 'Browse the web', open: () => openApp('edge') },
  { cmd: 'ms-photos', aliases: ['photos'], name: 'Photos', icon: I.photos, desc: 'View your picture collection', open: () => openApp('photos') },
  { cmd: 'weather', aliases: [], name: 'Weather', icon: I.weather, desc: 'Forecast for your location', open: () => openApp('weather') },
  { cmd: 'stikynot', aliases: ['sticky', 'stickynotes'], name: 'Sticky Notes', icon: I.sticky, desc: 'Capture a thought on a sticky note', open: () => openApp('sticky') },
  { cmd: 'winmine', aliases: ['minesweeper'], name: 'Minesweeper', icon: I.mine, desc: 'Clear the board without hitting a mine', open: () => openApp('minesweeper') },
  { cmd: 'ms-clock', aliases: ['clock', 'alarm'], name: 'Clock', icon: I.clock, desc: 'Alarms, timers, stopwatch, world clock', open: () => openApp('clock') },
  { cmd: 'snippingtool', aliases: ['snip', 'ms-screenclip:'], name: 'Snipping Tool', icon: I.crop, desc: 'Capture a snip of the screen', open: () => openSnipApp() },
  { cmd: 'recyclebin', aliases: ['shell:recyclebinfolder'], name: 'Recycle Bin', icon: I.recycle, desc: 'Recover deleted files', open: () => openApp('recycle') },
  { cmd: 'ms-windows-store:', aliases: ['store'], name: 'Microsoft Store', icon: I.store, desc: 'Discover apps, games and films', open: () => openApp('store') },
];

function runMatch(q) {
  const v = String(q || '').trim().toLowerCase();
  if (!v) return null;
  const bare = v.replace(/\.exe$/, '');
  return (
    CMD_MAP.find((c) => c.cmd === v || c.aliases.includes(v)) ||
    CMD_MAP.find((c) => c.cmd === bare || c.aliases.includes(bare)) ||
    CMD_MAP.find((c) => bare.length > 1 && (c.cmd.startsWith(bare) || c.aliases.some((a) => a.startsWith(bare)))) ||
    CMD_MAP.find((c) => bare.length > 2 && c.name.toLowerCase().startsWith(bare)) ||
    null
  );
}

function runDialogHtml() {
  const r = state.run;
  const match = runMatch(r.q);
  const cmd = r.error
    ? `<div class="run-err">${ic(I.error, 14)}<span>Windowia can't find “${esc(r.error)}”. Check the spelling and try again.</span></div>`
    : '';
  const hist = r.history
    ? `<div class="run-hist">${(r.histList || [])
        .map((h) => `<button data-run-hist="${esc(h)}">${esc(h)}</button>`)
        .join('') || '<div class="w11-empty">No recent commands</div>'}</div>`
    : '';
  return `<div class="run-dialog" data-run-dialog role="dialog" aria-label="Run">
    <div class="run-head">${ic(I.runIcon, 16)}<span>Run</span>
      <button class="run-close" data-run-close aria-label="Close">${ic(I.close, 12)}</button>
    </div>
    <div class="run-body">
      ${cmd}
      <div class="run-top">
        <span class="run-art"><span class="ic" style="width:26px;height:26px">${match ? match.icon : I.windows}</span></span>
        <div>
          <div class="run-desc">Type the name of a program, folder, document, or Internet
            resource, and Windowia will open it for you.</div>
          <div class="kb-chips">${CMD_MAP.slice(0, 6)
            .map((c) => `<span data-run-chip="${c.cmd}">${c.cmd}</span>`)
            .join('')}</div>
        </div>
      </div>
      <div>
        <div class="run-label">Open:</div>
        <div class="run-input-row">
          <input class="field ${r.error ? 'err' : ''}" data-run-input value="${esc(r.q)}"
            aria-label="Open" autocomplete="off" spellcheck="false" />
          <button class="btn" data-run-browse title="Browse">Browse…</button>
        </div>
      </div>
      ${match && !r.error ? `<div class="run-match">${ic(match.icon, 14)} ${esc(match.name)} — ${esc(match.desc)}</div>` : ''}
      ${hist}
    </div>
    <div class="run-actions">
      <button class="btn accent" data-run-ok>OK</button>
      <button class="btn" data-run-cancel>Cancel</button>
    </div>
  </div>`;
}

function openRun() {
  state.quickLink = false;
  state.jump = null;
  state.run = { q: '', history: false, histList: state.runHistory.slice(0, 8), error: null };
  renderOverlays();
  setTimeout(() => {
    const i = $('[data-run-input]');
    if (i) i.focus();
  }, 20);
}
function closeRun() {
  state.run = null;
  renderOverlays();
}
function runCommand(raw) {
  const q = String(raw || '').trim();
  if (!q) return;
  const [head, ...rest] = q.split(/\s+/);
  const match = runMatch(head);
  if (!match) {
    state.run = Object.assign({}, state.run, { q, error: q, history: false });
    renderOverlays();
    setTimeout(() => {
      const i = $('[data-run-input]');
      if (i) i.focus();
    }, 10);
    return;
  }
  const args = rest.join(' ');
  state.runHistory = [q, ...state.runHistory.filter((x) => x !== q)].slice(0, 12);
  store.set(LS.run, JSON.stringify(state.runHistory));
  closeRun();
  sfx('open');
  match.open(args);
}

function wireRun() {
  const host = dom.overlayLayer;
  const refocus = () => {
    const i = $('[data-run-input]');
    if (i) {
      i.focus();
      i.setSelectionRange(i.value.length, i.value.length);
    }
  };
  host.addEventListener('click', (e) => {
    const t = e.target;
    if (t.closest('[data-run-close]') || t.closest('[data-run-cancel]')) return closeRun();
    if (t.closest('[data-run-ok]')) {
      const i = $('[data-run-input]');
      return runCommand(i ? i.value : '');
    }
    const chip = t.closest('[data-run-chip]');
    if (chip) {
      state.run = Object.assign({}, state.run, { q: chip.dataset.runChip, error: null, history: false });
      renderOverlays();
      setTimeout(refocus, 10);
      return undefined;
    }
    const h = t.closest('[data-run-hist]');
    if (h) return runCommand(h.dataset.runHist);
    if (t.closest('[data-run-browse]')) {
      state.run = Object.assign({}, state.run, { q: 'C:\\', error: null, history: false });
      renderOverlays();
      setTimeout(refocus, 10);
      return undefined;
    }
    if (!t.closest('[data-run-dialog]')) closeRun();
    return undefined;
  });
  host.addEventListener('input', (e) => {
    if (!e.target.matches('[data-run-input]')) return;
    state.run = Object.assign({}, state.run, { q: e.target.value, error: null, history: false });
    const caret = e.target.selectionStart;
    renderOverlays();
    setTimeout(() => {
      const i = $('[data-run-input]');
      if (i) {
        i.focus();
        i.setSelectionRange(caret, caret);
      }
    }, 0);
  });
  host.addEventListener('keydown', (e) => {
    if (!state.run) return;
    if (e.target.matches('[data-run-input]')) {
      if (e.key === 'Enter') {
        e.preventDefault();
        runCommand(e.target.value);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        state.run = Object.assign({}, state.run, { history: true });
        renderOverlays();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeRun();
      }
      return;
    }
    if (e.key === 'Escape') closeRun();
  });
}

/* =====================================================================
   Quick Link menu  (Win + X)
   ===================================================================== */
const QL_GROUPS = [
  [
    { label: 'Apps and Features', icon: I.apps, run: () => openSettings('apps.installed') },
    { label: 'Power Options', icon: I.battery, run: () => openSettings('system.power') },
    { label: 'Event Viewer', icon: I.history, run: () => openSettings('system.about') },
    { label: 'System', icon: I.info, run: () => openSettings('system.about') },
    { label: 'Device Manager', icon: I.monitor, run: () => openSettings('bluetooth') },
    { label: 'Network Connections', icon: I.network, run: () => openSettings('network') },
    { label: 'Disk Management', icon: I.storage, run: () => openSettings('system.storage') },
    { label: 'Computer Management', icon: I.taskmgr, run: () => openApp('taskmgr') },
  ],
  [
    { label: 'Terminal', icon: I.terminal, run: () => openApp('terminal') },
    { label: 'Terminal (Admin)', icon: I.terminal, badge: 'ADMIN', run: () => openApp('terminal', { admin: true }) },
    { label: 'Task Manager', icon: I.taskmgr, run: () => openApp('taskmgr') },
    { label: 'Settings', icon: I.settings, run: () => openSettings(null) },
    { label: 'File Explorer', icon: I.explorer, run: () => openApp('explorer') },
    { label: 'Search', icon: I.search, run: () => toggleSearch() },
    { label: 'Run', icon: I.runIcon, run: () => openRun() },
  ],
  [
    { label: 'Shut down or sign out', icon: I.power, run: () => powerMenuFromQuickLink() },
    { label: 'Desktop', icon: I.monitor, run: () => showDesktop() },
  ],
];

function powerMenuFromQuickLink() {
  state.power = true;
  renderShellLayer();
}

function quickLinkHtml() {
  return `<div class="quick-link" data-quick-link>
    ${QL_GROUPS.map(
      (g, gi) =>
        g
          .map(
            (it) => `<button class="w11-row" data-ql="${gi}:${g.indexOf(it)}">
            ${ic(it.icon, 16)}<span>${esc(it.label)}</span>
            ${it.badge ? `<span class="ql-badge">${esc(it.badge)}</span>` : ''}
          </button>`,
          )
          .join('') + (gi < QL_GROUPS.length - 1 ? '<div class="w11-sep"></div>' : ''),
    ).join('')}
  </div>`;
}

function toggleQuickLink() {
  const open = !state.quickLink;
  closeShell();
  state.quickLink = open;
  renderOverlays();
}

function wireQuickLink() {
  dom.overlayLayer.addEventListener('click', (e) => {
    const row = e.target.closest('[data-ql]');
    if (row) {
      const parts = row.dataset.ql.split(':').map(Number);
      const it = QL_GROUPS[parts[0]] && QL_GROUPS[parts[0]][parts[1]];
      state.quickLink = false;
      renderOverlays();
      if (it) it.run();
      return undefined;
    }
    if (state.quickLink && !e.target.closest('[data-quick-link]') && !e.target.closest('[data-power-menu]')) {
      state.quickLink = false;
      renderOverlays();
    }
    return undefined;
  });
}

function powerMenuHtml() {
  const row = (k, label, icon) => `<button class="power-row" data-power="${k}">${ic(icon, 16)}<span>${label}</span></button>`;
  return `<div class="power-menu" data-power-menu>
    ${row('lock', 'Lock', I.lock)}
    ${row('signout', 'Sign out', I.person)}
    ${row('sleep', 'Sleep', I.sleep)}
    ${row('restart', 'Restart', I.restart)}
    ${row('off', 'Shut down', I.shutdown)}
  </div>`;
}

function searchHtml() {
  const q = state.search.q.trim().toLowerCase();
  const apps = APPS.filter((a) => !q || a.name.toLowerCase().includes(q)).slice(0, 6);
  const settings = [
    { name: 'Display settings', icon: I.display },
    { name: 'Personalisation', icon: I.palette },
    { name: 'Sound settings', icon: I.sound },
    { name: 'Network & internet', icon: I.network },
    { name: 'Privacy & security', icon: I.privacy },
  ].filter((s) => !q || s.name.toLowerCase().includes(q));
  const files = [];
  Object.keys(FSE).forEach((p) => {
    Object.entries(FSE[p] || {}).forEach(([n, v]) => {
      if (v === 'd') return;
      if (q && !n.toLowerCase().includes(q)) return;
      files.push({ name: n, path: p === 'C:' ? `C:\\${n}` : `${p}\\${n}` });
    });
  });
  const hits = apps.length + settings.length + files.length;
  return `<div class="search-flyout" data-search-flyout>
    <div class="search-field">
      ${ic(I.search, 16)}
      <input id="search-input" data-search-input placeholder="Type here to search apps, settings and files"
        aria-label="Search" value="${esc(state.search.q)}" autocomplete="off" />
    </div>
    <div class="search-results">
      ${
        !hits
          ? `<div class="search-empty">No results for “${esc(state.search.q)}”</div>`
          : `${apps.length ? `<div class="search-head">Apps</div>` : ''}
             ${apps
               .map(
                 (a) => `<button class="search-row" data-launch="${a.id}">
                   <span class="ic" style="width:22px;height:22px">${a.icon}</span>
                   <span class="sr-name">${esc(a.name)}</span><span class="sr-kind">App</span></button>`,
               )
               .join('')}
             ${settings.length ? `<div class="search-head">Settings</div>` : ''}
             ${settings
               .map(
                 (s) => `<button class="search-row" data-launch="settings">
                   <span class="ic" style="width:22px;height:22px">${ic(s.icon, 20)}</span>
                   <span class="sr-name">${esc(s.name)}</span><span class="sr-kind">Settings</span></button>`,
               )
               .join('')}
             ${files.length ? `<div class="search-head">Files</div>` : ''}
             ${files
               .slice(0, 8)
               .map(
                 (f) => `<button class="search-row" data-open-file="${esc(f.path)}">
                   <span class="ic" style="width:22px;height:22px">${ic(isImageName(f.name) ? I.image : I.file, 20)}</span>
                   <span class="sr-name">${esc(f.name)}</span><span class="sr-kind">${esc(f.path.split('\\').slice(1, -1).join(' › '))}</span></button>`,
               )
               .join('')}`
      }
    </div>
    <div class="search-foot"><span>${hits} result${hits === 1 ? '' : 's'}</span><span>Enter to open the first match</span></div>
  </div>`;
}

function trayHtml() {
  const icon = (id, n, label) => `<button class="tray-icon" data-tray-app="${id}" title="${label}" aria-label="${label}">${ic(n, 18)}</button>`;
  return `<div class="flyout tray-flyout" data-flyout>
    <div class="tray-head">Hidden icons</div>
    <div class="tray-grid">
      ${icon('explorer', I.explorer, 'File Explorer')}
      ${icon('terminal', I.terminal, 'Terminal')}
      ${icon('mediaplayer', I.media, 'Media Player')}
      ${icon('sticky', I.sticky, 'Sticky Notes')}
      ${icon('taskmgr', I.taskmgr, 'Task Manager')}
      ${icon('privacy', I.privacy, 'Windows Security')}
    </div>
    <div class="tray-sep"></div>
    <button class="tray-row" data-sound-toggle>
      ${ic(state.sounds ? I.sound : I.volumeMute, 18)}
      <span>Sound effects</span>
      <span class="switch ${state.sounds ? 'on' : ''}" aria-hidden="true"></span>
    </button>
    <button class="tray-row" data-open-settings>${ic(I.settings, 18)}<span>Settings</span></button>
    <button class="tray-row" data-tray-taskmgr>${ic(I.taskmgr, 18)}<span>Task Manager</span></button>
  </div>`;
}

function previewHtml(appId) {
  const app = appById(appId);
  const win = state.windows.find((w) => w.appId === appId);
  if (!app || !win) return '';
  return `<div class="tb-preview" data-preview="${appId}">
    <button class="pv-shot" data-preview-open="${appId}" aria-label="Activate ${esc(app.name)}">
      <span class="ic" style="width:46px;height:46px">${app.icon}</span>
      <span class="pv-shot-title">${esc(win.title)}</span>
    </button>
    <div class="pv-foot">
      <span class="pv-name">${ic(app.icon, 14)}${esc(app.name)}</span>
      <button class="pv-close" data-preview-close="${appId}" title="Close window" aria-label="Close ${esc(app.name)}">${ic(I.close, 12)}</button>
    </div>
  </div>`;
}

function altTabHtml() {
  const list = state.altTab.list.map((id) => state.windows.find((w) => w.id === id)).filter(Boolean);
  return `<div class="alt-tab" data-alt-tab>
    <div class="alt-inner">
      ${list
        .map(
          (w) => `<div class="alt-card ${state.altTab.idx === state.altTab.list.indexOf(w.id) ? 'on' : ''}">
            <span class="alt-shot" style="display:grid;place-items:center">${ic(appById(w.appId).icon, 54)}</span>
            <span class="alt-name">${esc(w.title)}</span>
          </div>`,
        )
        .join('')}
    </div>
    <div class="alt-hint">Hold Alt · press Tab to cycle · release Alt to switch</div>
  </div>`;
}

function assistHtml() {
  const others = state.windows.filter((w) => w.id !== state.assist.except && !w.minimized);
  if (!others.length) return '';
  return `<div class="assist" data-assist>
    <div class="assist-title">Choose a window to snap to the other half</div>
    <div class="assist-row">
      ${others
        .map(
          (w) => `<button class="assist-card" data-assist-win="${w.id}">
            <span class="ic" style="width:34px;height:34px">${appById(w.appId).icon}</span>
            <span>${esc(w.title)}</span></button>`,
        )
        .join('')}
    </div>
    <button class="pill-btn" data-assist-cancel>Cancel</button>
  </div>`;
}

function shellExtrasHtml() {
  let html = '';
  if (state.power && !state.locked) html += `<div class="power-anchor">${powerMenuHtml()}</div>`;
  if (state.search.open) html += searchHtml();
  if (state.tray) html += trayHtml();
  if (state.preview) html += previewHtml(state.preview);
  if (state.altTab.open) html += altTabHtml();
  if (state.assist) html += assistHtml();
  return html;
}

function toggleSearch() {
  const open = !state.search.open;
  closeShell();
  state.search = { open, q: '' };
  state.preview = null;
  renderShellLayer();
  if (open) setTimeout(() => { const i = document.getElementById('search-input'); if (i) i.focus(); }, 20);
}
function toggleTray() {
  const open = !state.tray;
  closeShell();
  state.tray = open;
  state.preview = null;
  renderShellLayer();
}
function togglePower() {
  const open = !state.power;
  closeShell();
  state.power = open;
  renderShellLayer();
}

function openAltTab() {
  const list = state.windows.slice().sort((a, b) => b.z - a.z).map((w) => w.id);
  if (!list.length) return;
  state.altTab = { open: true, idx: 0, list };
  state.preview = null;
  renderShellLayer();
}
function cycleAltTab(dir) {
  if (!state.altTab.open) return openAltTab();
  const n = state.altTab.list.length;
  state.altTab.idx = ((state.altTab.idx + dir) % n + n) % n;
  renderShellLayer();
}
function commitAltTab() {
  if (!state.altTab.open) return;
  const id = state.altTab.list[state.altTab.idx];
  state.altTab.open = false;
  state.altTab.list = [];
  renderShellLayer();
  const win = state.windows.find((w) => w.id === id);
  if (win) {
    win.minimized = false;
    if (win.desk !== state.activeDesktop) switchDesktop(win.desk || 0);
    focusWindow(win.id);
  }
}

function showSnapAssist(win) {
  if (!win) return;
  if (state.windows.filter((w) => w.id !== win.id && !w.minimized && w.desk === state.activeDesktop).length < 1) return;
  state.assist = { except: win.id };
  renderShellLayer();
}
function applyAssist(id) {
  const target = state.windows.find((w) => w.id === id);
  const base = state.windows.find((w) => w.id === (state.assist && state.assist.except));
  state.assist = null;
  renderShellLayer();
  if (!target || !base) return;
  const W = window.innerWidth;
  const H = window.innerHeight - state.taskbarH;
  const baseLeft = base.x + base.w / 2 < W / 2;
  target.maximized = false;
  target.minimized = false;
  target.x = baseLeft ? Math.round(W / 2) : 0;
  target.y = 0;
  target.w = Math.round(W / 2);
  target.h = H;
  applyWindowBox(target);
  focusWindow(target.id);
}

function newDesktop() {
  state.desktops.push({ id: `d${Date.now()}`, name: `Desktop ${state.desktops.length + 1}` });
  switchDesktop(state.desktops.length - 1);
}
function switchDesktop(i) {
  state.activeDesktop = clamp(i, 0, state.desktops.length - 1);
  state.assist = null;
  updateWindows();
  renderTaskbar();
  if (state.taskView) openTaskView();
}
function closeDesktop(i) {
  if (state.desktops.length < 2) return;
  state.windows = state.windows.filter((w) => {
    if ((w.desk || 0) !== i) return true;
    if (w.__el) w.__el.remove();
    return false;
  });
  state.desktops.splice(i, 1);
  state.windows.forEach((w) => { if ((w.desk || 0) > i) w.desk -= 1; });
  state.activeDesktop = clamp(state.activeDesktop, 0, state.desktops.length - 1);
  state.activeId = (activeWindow() || {}).id || null;
  updateWindows();
  renderTaskbar();
  if (state.taskView) openTaskView();
}

function powerScreen(kind) {
  const b = document.getElementById('boot');
  if (!b) return;
  b.hidden = false;
  b.className = 'boot boot-off';
  b.innerHTML = `<div class="boot-inner">
    <div class="boot-text" style="font-size:20px">${kind === 'restart' ? 'Restarting…' : 'Shutting down…'}</div>
    <div class="boot-spin"></div>
  </div>`;
  setTimeout(() => {
    if (kind === 'restart') {
      bootSequence();
    } else {
      b.innerHTML = `<div class="boot-inner"><button class="pill-btn accent" data-power-again>Press to turn on</button></div>`;
      b.classList.add('boot-off');
      const btn = b.querySelector('[data-power-again]');
      if (btn) btn.addEventListener('click', () => { b.hidden = true; bootSequence(); });
    }
  }, 1800);
}

function doPower(kind) {
  state.power = false;
  closeShell();
  if (kind === 'lock') { lockScreen(); sfx('lock'); return; }
  if (kind === 'signout') { lockScreen(); sfx('lock'); return; }
  if (kind === 'sleep') {
    const r = document.getElementById('root');
    if (r) {
      r.classList.add('sleeping');
      sfx('lock');
      setTimeout(() => { r.classList.remove('sleeping'); lockScreen(); }, 1700);
    }
    return;
  }
  powerScreen(kind);
}

/* =====================================================================
   Clock + boot
   ===================================================================== */
function tickClock() {
  state.now = new Date();
  if (state.locked) {
    renderLock();
    return;
  }
  const n = state.now;
  const time = n.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = n.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
  const clock = $('[data-tray-clock] .tray-clock');
  if (clock) {
    clock.children[0].textContent = time;
    clock.children[1].textContent = date;
  }
}

function bootSequence() {
  const b = document.getElementById('boot');
  if (!b) return;
  b.hidden = false;
  b.className = 'boot';
  b.innerHTML = `<div class="boot-inner">
      <span class="boot-logo" style="width:76px;height:76px">${ic(I.windows, 72)}</span>
      <div class="boot-spin" aria-hidden="true"></div>
      <div class="boot-text">Windowia 11</div>
    </div>`;
  state.booted = false;
  renderLock();
  setTimeout(() => {
    b.classList.add('boot-out');
    state.booted = true;
    sfx('startup');
    renderLock();
    setTimeout(() => {
      b.hidden = true;
      b.classList.remove('boot-out');
    }, 560);
  }, 1900);
}

function boot() {
  applyTheme();
  mountDesktop();
  wireShellLayer();
  state.locked = true;
  renderLock();
  window.addEventListener('resize', () => {
    updateWindows();
    state.preview = null;
    renderShellLayer();
  });
  setInterval(tickClock, 1000);
  renderToasts();
  bootSequence();
}

boot();
