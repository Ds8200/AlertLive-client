'use client';

import dynamic from 'next/dynamic';
import { useAtomValue } from 'jotai';
import { useAppShell } from './useAppShell';
import { activeModalAtom } from '@/atoms';
import { ModalType } from '@/enums/ModalType.enum';
import { Header } from '@/components/Header/Header';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { ActionBar } from '@/components/ActionBar/ActionBar';
import { AlertModal } from '@/components/AlertModal/AlertModal';
import { OnboardingModal } from '@/components/OnboardingModal/OnboardingModal';
import styles from './AppShell.module.scss';

const Map = dynamic(
  () => import('@/components/Map/Map').then((m) => m.Map),
  { ssr: false, loading: () => <div className={styles.mapPlaceholder} /> }
);

const ModalHost = () => {
  const activeModal = useAtomValue(activeModalAtom);
  return (
    <>
      {activeModal === ModalType.ALERT && <AlertModal />}
      {activeModal === ModalType.ONBOARDING && <OnboardingModal />}
    </>
  );
};

export const AppShell = () => {
  useAppShell();

  return (
    <div className={styles.root}>
      <Map />
      <Header />
      <Sidebar />
      <ActionBar />
      <ModalHost />
    </div>
  );
};
