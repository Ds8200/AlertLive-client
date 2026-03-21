'use client';

import { useAtom, useSetAtom } from 'jotai';
import { useState } from 'react';
import { isMutedAtom, activeModalAtom, userLocationAtom } from '@/atoms';
import { ModalType } from '@/enums/ModalType.enum';

export function useActionBar() {
  const [isMuted, setIsMuted] = useAtom(isMutedAtom);
  const setActiveModal = useSetAtom(activeModalAtom);
  const setUserLocation = useSetAtom(userLocationAtom);
  const [isMapSelectorOpen, setIsMapSelectorOpen] = useState(false);

  const toggleMute = () => setIsMuted((v) => !v);

  const requestLocation = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {},
      { enableHighAccuracy: false, timeout: 8000 }
    );
  };

  const openOnboarding = () => {
    setActiveModal(ModalType.ONBOARDING);
    setIsMapSelectorOpen(false);
  };

  const toggleMapSelector = () => setIsMapSelectorOpen((v) => !v);
  const closeMapSelector = () => setIsMapSelectorOpen(false);

  return {
    isMuted,
    isMapSelectorOpen,
    toggleMute,
    requestLocation,
    openOnboarding,
    toggleMapSelector,
    closeMapSelector,
  };
}
