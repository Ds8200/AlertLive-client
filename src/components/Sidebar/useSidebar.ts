'use client';

import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { alertsAtom } from '@/atoms';

export function useSidebar() {
  const [alerts, setAlerts] = useAtom(alertsAtom);

  // Show newest first
  const sortedAlerts = useMemo(() => [...alerts].reverse(), [alerts]);

  const clearAlerts = () => setAlerts([]);

  return { alerts: sortedAlerts, count: alerts.length, clearAlerts };
}
