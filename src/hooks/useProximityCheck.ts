'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import {
  userLocationAtom,
  nearbyAlertAtom,
  activeModalAtom,
} from '@/atoms';
import { ModalType } from '@/enums/ModalType.enum';
import { haversine } from '@/utils/haversine';
import { PROXIMITY_RADIUS_KM } from '@/constants/ui.constants';
import type { Alert } from '@/types';
import { useAudio } from './useAudio';

export function useProximityCheck() {
  const userLocation = useAtomValue(userLocationAtom);
  const setNearbyAlert = useSetAtom(nearbyAlertAtom);
  const setActiveModal = useSetAtom(activeModalAtom);
  const { play } = useAudio();

  const checkProximity = useCallback(
    (alert: Alert) => {
      if (!userLocation || alert.lat == null || alert.lng == null) return;

      const distance = haversine(
        userLocation.lat,
        userLocation.lng,
        alert.lat,
        alert.lng
      );

      if (distance <= PROXIMITY_RADIUS_KM) {
        const alertWithDistance: Alert = { ...alert, distanceKm: distance };
        setNearbyAlert(alertWithDistance);
        setActiveModal(ModalType.ALERT);
        play();
      }
    },
    [userLocation, setNearbyAlert, setActiveModal, play]
  );

  return { checkProximity };
}
