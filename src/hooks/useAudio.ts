'use client';

import { useAtomValue } from 'jotai';
import { useCallback, useRef } from 'react';
import { isMutedAtom } from '@/atoms';

// Module-level AudioContext shared across all hook instances
let _ctx: AudioContext | null = null;
let _unlocked = false;

const getCtx = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!_ctx) _ctx = new AudioContext();
  return _ctx;
};

const playSiren = (ctx: AudioContext) => {
  const now = ctx.currentTime;
  const duration = 2.5;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  // Sweep from 600 Hz → 1200 Hz → 600 Hz
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.linearRampToValueAtTime(1200, now + duration / 2);
  osc.frequency.linearRampToValueAtTime(600, now + duration);

  gain.gain.setValueAtTime(0.35, now);
  gain.gain.setValueAtTime(0.35, now + duration - 0.1);
  gain.gain.linearRampToValueAtTime(0, now + duration);

  osc.start(now);
  osc.stop(now + duration);
};

export const useAudio = () => {
  const isMuted = useAtomValue(isMutedAtom);
  const unlockedRef = useRef(_unlocked);

  // Must be called from a direct user gesture to satisfy browser autoplay policy
  const unlock = useCallback(() => {
    const ctx = getCtx();
    if (!ctx || _unlocked) return;
    // Resume suspended context (required on some browsers after creation)
    ctx.resume().then(() => {
      _unlocked = true;
      unlockedRef.current = true;
    }).catch(() => {});
  }, []);

  const play = useCallback(() => {
    if (isMuted) return;
    const ctx = getCtx();
    if (!ctx) return;
    ctx.resume().then(() => playSiren(ctx)).catch(() => {});
  }, [isMuted]);

  const stop = useCallback(() => {
    // Oscillators auto-stop after duration; nothing to do
  }, []);

  return { play, stop, unlock };
};
