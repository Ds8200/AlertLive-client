'use client';

import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { alertsAtom } from '@/atoms';

export const useSidebar = () => {
  const [alerts, setAlerts] = useAtom(alertsAtom);

  // Show newest first — expiry is handled by the periodic cleanup in useWebSocket
  const visibleAlerts = useMemo(() => [...alerts].reverse(), [alerts]);

  const clearAlerts = useCallback(() => setAlerts([]), [setAlerts]);

  return { alerts: visibleAlerts, count: visibleAlerts.length, clearAlerts };
};
