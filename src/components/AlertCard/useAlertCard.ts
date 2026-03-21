'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { useMemo } from 'react';
import { userLocationAtom, mapFlyToAtom } from '@/atoms';
import { getSeverityCssVar, isHighPriority } from '@/utils/severityHelpers';
import { haversine } from '@/utils/haversine';
import { formatTimestamp, formatDistance } from '@/utils/formatters';
import { THREAT_TYPE_LABELS, THREAT_TYPE_ICONS } from '@/constants/severity.constants';
import type { Alert } from '@/types';

export function useAlertCard(alert: Alert) {
  const userLocation = useAtomValue(userLocationAtom);
  const setFlyTo = useSetAtom(mapFlyToAtom);

  const severityCssVar = getSeverityCssVar(alert.severity, alert.type);
  const highPriority = isHighPriority(alert.type, alert.severity);
  const typeLabel = THREAT_TYPE_LABELS[alert.type] ?? alert.type;
  const typeIcon = THREAT_TYPE_ICONS[alert.type] ?? '⚠️';
  const formattedTime = formatTimestamp(alert.timestamp);

  const distanceKm = useMemo(() => {
    if (!userLocation || alert.lat == null || alert.lng == null) return null;
    return haversine(userLocation.lat, userLocation.lng, alert.lat, alert.lng);
  }, [userLocation, alert.lat, alert.lng]);

  const formattedDistance = distanceKm !== null ? formatDistance(distanceKm) : null;

  const handleClick = () => {
    if (alert.lat != null && alert.lng != null) {
      setFlyTo({ lat: alert.lat, lng: alert.lng });
    }
  };

  return {
    severityCssVar,
    highPriority,
    typeLabel,
    typeIcon,
    formattedTime,
    formattedDistance,
    handleClick,
  };
}
