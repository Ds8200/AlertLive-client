import { atom } from 'jotai';
import type { Alert } from '@/types';

export const nearbyAlertAtom = atom<Alert | null>(null);
