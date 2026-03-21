'use client';

import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { userLocationAtom } from '@/atoms';

export function useGeolocation() {
  const setUserLocation = useSetAtom(userLocationAtom);
  const [isLocating, setIsLocating] = useState(false);

  const requestLocation = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
      },
      { enableHighAccuracy: false, timeout: 8000 }
    );
  };

  useEffect(() => {
    requestLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLocating, requestLocation };
}
