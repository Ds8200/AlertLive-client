'use client';

import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { activeModalAtom } from '@/atoms';
import { ModalType } from '@/enums/ModalType.enum';
import { LS_KEY_ONBOARDED } from '@/constants/ui.constants';
import { ONBOARDING_STEPS } from '@/constants/severity.constants';
import { lsSet } from '@/utils/localStorage';

export const useOnboardingModal = () => {
  const setActiveModal = useSetAtom(activeModalAtom);
  const [step, setStep] = useState(0);

  const totalSteps = ONBOARDING_STEPS.length;
  const currentStep = ONBOARDING_STEPS[step];

  const next = () => {
    if (step < totalSteps - 1) setStep((s) => s + 1);
  };

  const prev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const finish = () => {
    lsSet(LS_KEY_ONBOARDED, true);
    setActiveModal(ModalType.NONE);
  };

  return {
    step,
    totalSteps,
    currentStep,
    isFirst: step === 0,
    isLast: step === totalSteps - 1,
    next,
    prev,
    finish,
  };
}
