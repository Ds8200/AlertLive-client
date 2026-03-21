export const WS_URL =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_WS_URL) ||
  'wss://alertlive.onrender.com/ws';

export const WS_HISTORY_END_TYPE = 'history_end';
