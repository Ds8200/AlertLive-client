import styles from './DetailRow.module.scss';

interface DetailRowProps {
  label: string;
  value: string;
}

export const DetailRow = ({ label, value }: DetailRowProps) => (
  <div className={styles.detailRow}>
    <span className={styles.detailLabel}>{label}:</span>
    <span className={styles.detailValue}>{value}</span>
  </div>
);
