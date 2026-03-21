'use client';

import { useHeader } from './useHeader';
import { HEADER_LABELS } from '@/constants/ui.constants';
import styles from './Header.module.scss';

export const Header = () => {
  const { stats, statusColor, statusLabel, isLiveMode } = useHeader();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logo}>🚨</span>
        <span className={styles.appName}>{HEADER_LABELS.appName}</span>
        {isLiveMode && (
          <span className={styles.liveBadge}>{HEADER_LABELS.live}</span>
        )}
      </div>

      <div className={styles.stats}>
        <StatBadge label={HEADER_LABELS.total} value={stats.total} variant="neutral" />
        <StatBadge label={HEADER_LABELS.active} value={stats.active} variant="danger" />
        <StatBadge label={HEADER_LABELS.ended} value={stats.ended} variant="success" />
      </div>

      <div className={styles.wsIndicator}>
        <span
          className={styles.wsDot}
          style={{ background: statusColor }}
          title={statusLabel}
        />
        <span className={styles.wsLabel}>{statusLabel}</span>
      </div>
    </header>
  );
};

const StatBadge = ({
  label,
  value,
  variant,
}: {
  label: string;
  value: number;
  variant: 'neutral' | 'danger' | 'success';
}) => (
  <div className={`${styles.statBadge} ${styles[variant]}`}>
    <span className={styles.statValue}>{value}</span>
    <span className={styles.statLabel}>{label}</span>
  </div>
);
