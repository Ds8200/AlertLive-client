import { atom } from 'jotai';

export interface UserLocation {
  lat: number;
  lng: number;
}

export const userLocationAtom = atom<UserLocation | null>(null);
