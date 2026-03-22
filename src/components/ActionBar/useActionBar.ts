'use client';

import { useAtom, useSetAtom } from 'jotai';
import { useState, useEffect, useRef } from 'react';
import { isMutedAtom, activeModalAtom, userLocationAtom, isMapSelectorOpenAtom } from '@/atoms';
import { ModalType } from '@/enums/ModalType.enum';
import { useAudio } from '@/hooks/useAudio';

export const useActionBar = () => {
  const [isMuted, setIsMuted] = useAtom(isMutedAtom);
  const setActiveModal = useSetAtom(activeModalAtom);
  const setUserLocation = useSetAtom(userLocationAtom);
  const [isMapSelectorOpen, setIsMapSelectorOpen] = useAtom(isMapSelectorOpenAtom);
  const { unlock } = useAudio();
  const [isExpanded, setIsExpanded] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isExpanded) return;
    const handler = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
        setIsMapSelectorOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isExpanded, setIsMapSelectorOpen]);

  const expand = () => setIsExpanded(true);
  const toggleMute = () => setIsMuted((v) => !v);

  const requestLocation = () => {
    unlock();
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
    setIsExpanded(false);
    setIsMapSelectorOpen(false);
  };

  const toggleMapSelector = () => setIsMapSelectorOpen((v) => !v);
  const closeMapSelector = () => setIsMapSelectorOpen(false);

  return {
    barRef,
    isExpanded,
    expand,
    isMuted,
    isMapSelectorOpen,
    toggleMute,
    requestLocation,
    openOnboarding,
    toggleMapSelector,
    closeMapSelector,
  };
};
