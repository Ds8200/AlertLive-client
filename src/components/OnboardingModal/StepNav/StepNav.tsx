import styles from './StepNav.module.scss';

interface StepNavProps {
  isFirst: boolean;
  isLast: boolean;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
}

export const StepNav = ({ isFirst, isLast, onPrev, onNext, onFinish }: StepNavProps) => (
  <div className={styles.actions}>
    {!isFirst && (
      <button className={styles.btnSecondary} onClick={onPrev}>
        הקודם
      </button>
    )}
    <div className={styles.actionsSpacer} />
    {isLast ? (
      <button className={styles.btnPrimary} onClick={onFinish}>
        בואו נתחיל!
      </button>
    ) : (
      <button className={styles.btnPrimary} onClick={onNext}>
        הבא
      </button>
    )}
  </div>
);
