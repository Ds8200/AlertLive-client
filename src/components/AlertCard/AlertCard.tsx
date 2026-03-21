'use client';

import { useAlertCard } from './useAlertCard';
import type { Alert } from '@/types';
import styles from './AlertCard.module.scss';

interface AlertCardProps {
  alert: Alert;
}

export const AlertCard = ({ alert }: AlertCardProps) => {
  const {
    severityCssVar,
    highPriority,
    typeLabel,
    typeIcon,
    formattedTime,
    formattedDistance,
    handleClick,
  } = useAlertCard(alert);

  const city = alert.region_name || alert.oref_city || 'לא ידוע';

  return (
    <div
      className={`${styles.card} ${highPriority ? styles.highPriority : ''}`}
      style={{ '--threat-color': `var(${severityCssVar})` } as React.CSSProperties}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className={styles.colorBar} />

      <div className={styles.content}>
        <div className={styles.topRow}>
          <span className={styles.icon}>{typeIcon}</span>
          <span className={styles.city}>{city}</span>
          <span className={styles.time}>{formattedTime}</span>
        </div>

        <div className={styles.bottomRow}>
          <span className={styles.typeLabel}>{typeLabel}</span>
          {formattedDistance && (
            <span className={styles.distance}>📍 {formattedDistance}</span>
          )}
        </div>

        {alert.oref_title && (
          <p className={styles.title}>{alert.oref_title}</p>
        )}
      </div>
    </div>
  );
};
