'use client';

import { useAtomValue } from 'jotai';
import { useCallback, useRef } from 'react';
import { isMutedAtom } from '@/atoms';

export function useAudio() {
  const isMuted = useAtomValue(isMutedAtom);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (isMuted) return;

    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('/sounds/alert.mp3');
        audioRef.current.volume = 0.7;
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Browser may block autoplay; ignore silently
      });
    } catch {
      // Web Audio unavailable; ignore
    }
  }, [isMuted]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { play, stop };
}
