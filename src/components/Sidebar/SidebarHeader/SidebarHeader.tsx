import styles from './SidebarHeader.module.scss';

interface SidebarHeaderProps {
  title: string;
  clearLabel: string;
  count: number;
  onClear: () => void;
}

export const SidebarHeader = ({ title, clearLabel, count, onClear }: SidebarHeaderProps) => (
  <div className={styles.header}>
    <span className={styles.title}>
      {title}
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </span>
    {count > 0 && (
      <button className={styles.clearBtn} onClick={onClear}>
        {clearLabel}
      </button>
    )}
  </div>
);
