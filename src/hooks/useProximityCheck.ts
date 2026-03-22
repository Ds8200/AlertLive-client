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
import { ThreatType } from '@/enums/ThreatType.enum';
import { useAudio } from './useAudio';

export const useProximityCheck = () => {
  const userLocation = useAtomValue(userLocationAtom);
  const activeModal = useAtomValue(activeModalAtom);
  const nearbyAlert = useAtomValue(nearbyAlertAtom);
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

      if (distance > PROXIMITY_RADIUS_KM) return;
      if (alert.type === ThreatType.UPDATE) return;

      const alertWithDistance: Alert = { ...alert, distanceKm: distance };
      const alertAlreadyOpen = activeModal === ModalType.ALERT;

      if (!alertAlreadyOpen) {
        // First proximity alert — open modal and play siren once
        setNearbyAlert(alertWithDistance);
        setActiveModal(ModalType.ALERT);
        play();
      } else if (nearbyAlert?.distanceKm == null || distance < nearbyAlert.distanceKm) {
        // Modal already open — silently update to the closer alert, no reopen or replay
        setNearbyAlert(alertWithDistance);
      }
    },
    [userLocation, activeModal, nearbyAlert, setNearbyAlert, setActiveModal, play]
  );

  return { checkProximity };
};
