import { atomWithStorage } from 'jotai/utils';

export const isMutedAtom = atomWithStorage<boolean>('alertlive_muted', false);
