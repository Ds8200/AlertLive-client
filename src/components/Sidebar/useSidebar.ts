'use client';

import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { alertsAtom } from '@/atoms';
import { ALERT_EXPIRY_MS } from '@/constants/ui.constants';

export const useSidebar = () => {
  const [alerts, setAlerts] = useAtom(alertsAtom);

  // Show newest first, filter to last hour
  const visibleAlerts = useMemo(() => {
    const cutoff = Date.now() - ALERT_EXPIRY_MS;
    return [...alerts]
      .filter((a) => new Date(a.timestamp).getTime() >= cutoff)
      .reverse();
  }, [alerts]);

  const clearAlerts = () => setAlerts([]);

  return { alerts: visibleAlerts, count: visibleAlerts.length, clearAlerts };
};
