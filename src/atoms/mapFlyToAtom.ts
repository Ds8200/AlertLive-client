import { atom } from 'jotai';

export interface FlyToTarget {
  lat: number;
  lng: number;
}

export const mapFlyToAtom = atom<FlyToTarget | null>(null);
