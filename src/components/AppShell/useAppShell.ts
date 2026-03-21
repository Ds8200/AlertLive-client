'use client';

import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { activeModalAtom } from '@/atoms';
import { ModalType } from '@/enums/ModalType.enum';
import { LS_KEY_ONBOARDED } from '@/constants/ui.constants';
import { lsGet } from '@/utils/localStorage';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useGeolocation } from '@/hooks/useGeolocation';

export function useAppShell() {
  const setActiveModal = useSetAtom(activeModalAtom);

  useWebSocket();
  useGeolocation();

  // Show onboarding for first-time visitors
  useEffect(() => {
    const onboarded = lsGet<boolean>(LS_KEY_ONBOARDED, false);
    if (!onboarded) {
      setActiveModal(ModalType.ONBOARDING);
    }
  }, [setActiveModal]);
}
