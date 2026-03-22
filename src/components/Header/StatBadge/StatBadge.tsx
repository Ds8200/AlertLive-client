import styles from './StatBadge.module.scss';

interface StatBadgeProps {
  label: string;
  value: number;
  variant: 'neutral' | 'danger' | 'success';
}

export const StatBadge = ({ label, value, variant }: StatBadgeProps) => (
  <div className={`${styles.statBadge} ${styles[variant]}`}>
    <span className={styles.statValue}>{value}</span>
    <span className={styles.statLabel}>{label}</span>
  </div>
);
