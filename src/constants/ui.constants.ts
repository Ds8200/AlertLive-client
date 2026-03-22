export const PROXIMITY_RADIUS_KM = 50;
export const RECONNECT_INTERVAL_MS = 3000;
export const ALERT_EXPIRY_MS = 60 * 60 * 1000; // 1 hour
export const ALERT_CLEANUP_INTERVAL_MS = 60 * 1000; // 1 minute

// Israel center: [lng, lat] in EPSG:4326
export const MAP_DEFAULT_CENTER_LNG = 34.85;
export const MAP_DEFAULT_CENTER_LAT = 31.5;
export const MAP_DEFAULT_ZOOM = 7.5;
export const MAP_FLY_TO_ZOOM = 13;
export const MAP_USER_ZOOM = 11;

export const LS_KEY_ONBOARDED = 'alertlive_onboarded';
export const LS_KEY_MAP_PRESET = 'alertlive_map_preset';
export const LS_KEY_MUTED = 'alertlive_muted';

export const HEADER_LABELS = {
  appName: 'AlertLive',
  total: 'סה״כ',
  active: 'פעילות',
  ended: 'הסתיימו',
  live: 'שידור חי',
  connecting: 'מתחבר...',
  disconnected: 'מנותק',
};

export const SIDEBAR_LABELS = {
  title: 'התרעות',
  empty: 'אין התרעות פעילות',
  emptyDesc: 'כאשר תתקבלנה התרעות, הן יופיעו כאן',
  clear: 'נקה הכל',
};

export const ACTION_BAR_LABELS = {
  toggle: 'פתח תפריט',
  mute: 'השתק',
  unmute: 'בטל השתקה',
  location: 'המיקום שלי',
  mapType: 'סוג מפה',
  help: 'עזרה',
};

export const ALERT_MODAL_LABELS = {
  title: 'התרעה בקרבתך!',
  dismiss: 'הבנתי',
  distance: 'מרחק',
};

export const MAP_TYPE_SELECTOR_LABELS = {
  title: 'בחר סוג מפה',
};
