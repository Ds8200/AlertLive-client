import styles from './StepDots.module.scss';

interface StepDotsProps {
  total: number;
  current: number;
}

export const StepDots = ({ total, current }: StepDotsProps) => (
  <div className={styles.dots}>
    {Array.from({ length: total }).map((_, i) => (
      <span
        key={i}
        className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
      />
    ))}
  </div>
);
