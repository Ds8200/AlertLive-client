'use client';

import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { alertsAtom, isLiveModeAtom } from '@/atoms';
import { ThreatType } from '@/enums/ThreatType.enum';

export const useHeader = () => {
  const alerts = useAtomValue(alertsAtom);
  const isLiveMode = useAtomValue(isLiveModeAtom);

  const stats = useMemo(() => {
    const total = alerts.length;
    const ended = alerts.filter((a) => a.type === ThreatType.UPDATE).length;
    const active = total - ended;
    return { total, active, ended };
  }, [alerts]);

  return { stats, isLiveMode };
};
