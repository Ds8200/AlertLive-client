import { atom } from 'jotai';
import type { Alert } from '@/types';

export const alertsAtom = atom<Alert[]>([]);
