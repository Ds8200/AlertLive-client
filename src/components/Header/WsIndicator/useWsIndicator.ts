'use client';

import { useAtomValue } from 'jotai';
import { wsStatusAtom } from '@/atoms';
import { WsStatus } from '@/enums/WsStatus.enum';

export const useWsIndicator = () => {
  const wsStatus = useAtomValue(wsStatusAtom);

  const statusColor = {
    [WsStatus.CONNECTED]: 'var(--color-ws-connected)',
    [WsStatus.CONNECTING]: 'var(--color-ws-connecting)',
    [WsStatus.DISCONNECTED]: 'var(--color-ws-disconnected)',
    [WsStatus.ERROR]: 'var(--color-ws-error)',
  }[wsStatus];

  const statusLabel = {
    [WsStatus.CONNECTED]: 'מחובר',
    [WsStatus.CONNECTING]: 'מתחבר...',
    [WsStatus.DISCONNECTED]: 'מנותק',
    [WsStatus.ERROR]: 'שגיאה',
  }[wsStatus];

  const isConnected = wsStatus === WsStatus.CONNECTED;

  return { statusColor, statusLabel, isConnected };
};
