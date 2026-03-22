'use client';

import { useOnboardingModal } from './useOnboardingModal';
import { StepContent } from './StepContent/StepContent';
import { StepDots } from './StepDots/StepDots';
import { StepNav } from './StepNav/StepNav';
import { ModalOverlay } from '@/components/ui/ModalOverlay/ModalOverlay';
import styles from './OnboardingModal.module.scss';

export const OnboardingModal = () => {
  const { step, totalSteps, currentStep, isFirst, isLast, next, prev, finish } =
    useOnboardingModal();

  return (
    <ModalOverlay>
      <div className={styles.modal}>
        <StepContent
          icon={currentStep.icon}
          title={currentStep.title}
          description={currentStep.description}
        />
        <StepDots total={totalSteps} current={step} />
        <StepNav
          isFirst={isFirst}
          isLast={isLast}
          onPrev={prev}
          onNext={next}
          onFinish={finish}
        />
        <button className={styles.skipBtn} onClick={finish}>
          דלג
        </button>
      </div>
    </ModalOverlay>
  );
};
