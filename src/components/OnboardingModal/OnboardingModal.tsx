'use client';

import { useOnboardingModal } from './useOnboardingModal';
import styles from './OnboardingModal.module.scss';

export const OnboardingModal = () => {
  const {
    step,
    totalSteps,
    currentStep,
    isFirst,
    isLast,
    next,
    prev,
    finish,
  } = useOnboardingModal();

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.stepIcon}>{currentStep.icon}</div>

        <div className={styles.body}>
          <h2 className={styles.title}>{currentStep.title}</h2>
          <p className={styles.description}>{currentStep.description}</p>
        </div>

        <div className={styles.dots}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === step ? styles.dotActive : ''}`}
            />
          ))}
        </div>

        <div className={styles.actions}>
          {!isFirst && (
            <button className={styles.btnSecondary} onClick={prev}>
              הקודם
            </button>
          )}
          <div className={styles.actionsSpacer} />
          {isLast ? (
            <button className={styles.btnPrimary} onClick={finish}>
              בואו נתחיל!
            </button>
          ) : (
            <button className={styles.btnPrimary} onClick={next}>
              הבא
            </button>
          )}
        </div>

        <button className={styles.skipBtn} onClick={finish}>
          דלג
        </button>
      </div>
    </div>
  );
};
