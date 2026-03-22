'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { nearbyAlertAtom, activeModalAtom } from '@/atoms';
import { ModalType } from '@/enums/ModalType.enum';
import { formatDistance, getCityName } from '@/utils/formatters';
import { THREAT_TYPE_LABELS, THREAT_TYPE_ICONS } from '@/constants/severity.constants';

export const useAlertModal = () => {
  const nearbyAlert = useAtomValue(nearbyAlertAtom);
  const setActiveModal = useSetAtom(activeModalAtom);
  const setNearbyAlert = useSetAtom(nearbyAlertAtom);

  const dismiss = () => {
    setActiveModal(ModalType.NONE);
    setNearbyAlert(null);
  };

  const city = nearbyAlert ? getCityName(nearbyAlert) : '';
  const typeLabel = nearbyAlert ? (THREAT_TYPE_LABELS[nearbyAlert.type] ?? nearbyAlert.type) : '';
  const typeIcon = nearbyAlert ? (THREAT_TYPE_ICONS[nearbyAlert.type] ?? '⚠️') : '';
  const formattedDistance =
    nearbyAlert?.distanceKm != null ? formatDistance(nearbyAlert.distanceKm) : null;

  return { nearbyAlert, city, typeLabel, typeIcon, formattedDistance, dismiss };
};
