'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, type RefObject } from 'react';
import type { RMap } from 'rlayers';
import { fromLonLat } from 'ol/proj';
import {
  alertsAtom,
  selectedMapPresetAtom,
  userLocationAtom,
  mapFlyToAtom,
} from '@/atoms';
import {
  MAP_PRESETS_BY_ID,
  DEFAULT_MAP_PRESET_ID,
} from '@/constants/mapPresets.constants';
import { MAP_FLY_TO_ZOOM } from '@/constants/ui.constants';
import { getSeverityCssVar } from '@/utils/severityHelpers';
import { getMarkerColor } from '@/utils/colorHelpers';
import { getCityName } from '@/utils/formatters';
import type { MapPreset } from '@/types';

export interface AlertMarker {
  alert_id: string;
  lat: number;
  lng: number;
  color: string;
  isHighPriority: boolean;
  label: string;
}

export const useMap = (rMapRef: RefObject<RMap>) => {
  const alerts = useAtomValue(alertsAtom);
  const selectedPresetId = useAtomValue(selectedMapPresetAtom);
  const userLocation = useAtomValue(userLocationAtom);
  const flyTo = useAtomValue(mapFlyToAtom);
  const setFlyTo = useSetAtom(mapFlyToAtom);

  const currentPreset: MapPreset =
    MAP_PRESETS_BY_ID[selectedPresetId] ??
    MAP_PRESETS_BY_ID[DEFAULT_MAP_PRESET_ID];

  const alertMarkers: AlertMarker[] = alerts
    .filter((a) => a.lat != null && a.lng != null)
    .map((a) => {
      const cssVar = getSeverityCssVar(a.severity, a.type);
      return {
        alert_id: a.alert_id,
        lat: a.lat!,
        lng: a.lng!,
        color: getMarkerColor(cssVar),
        isHighPriority: cssVar === '--color-threat-red',
        label: getCityName(a, ''),
      };
    });

  useEffect(() => {
    if (!flyTo || !rMapRef.current?.ol) return;

    rMapRef.current.ol.getView().animate({
      center: fromLonLat([flyTo.lng, flyTo.lat]),
      zoom: MAP_FLY_TO_ZOOM,
      duration: 700,
    });
    setFlyTo(null);
  }, [flyTo, rMapRef, setFlyTo]);

  return { alertMarkers, currentPreset, userLocation };
};
