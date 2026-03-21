import { atom } from 'jotai';
import { ModalType } from '@/enums/ModalType.enum';

export const activeModalAtom = atom<ModalType>(ModalType.NONE);
