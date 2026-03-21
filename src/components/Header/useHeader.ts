'use client';

import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { alertsAtom, wsStatusAtom, isLiveModeAtom } from '@/atoms';
import { WsStatus } from '@/enums/WsStatus.enum';
import { ThreatType } from '@/enums/ThreatType.enum';

export function useHeader() {
  const alerts = useAtomValue(alertsAtom);
  const wsStatus = useAtomValue(wsStatusAtom);
  const isLiveMode = useAtomValue(isLiveModeAtom);

  const stats = useMemo(() => {
    const total = alerts.length;
    const ended = alerts.filter((a) => a.type === ThreatType.UPDATE).length;
    const active = total - ended;
    return { total, active, ended };
  }, [alerts]);

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

  return { stats, wsStatus, statusColor, statusLabel, isLiveMode };
}
