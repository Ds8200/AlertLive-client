import { atom } from 'jotai';
import { WsStatus } from '@/enums/WsStatus.enum';

export const wsStatusAtom = atom<WsStatus>(WsStatus.DISCONNECTED);
