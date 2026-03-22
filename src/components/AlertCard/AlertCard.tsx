'use client';

import { useAlertCard } from './useAlertCard';
import { AlertCardHeader } from './AlertCardHeader/AlertCardHeader';
import { AlertCardMeta } from './AlertCardMeta/AlertCardMeta';
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
    city,
    handleClick,
  } = useAlertCard(alert);

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
        <AlertCardHeader icon={typeIcon} city={city} formattedTime={formattedTime} />
        <AlertCardMeta typeLabel={typeLabel} formattedDistance={formattedDistance} />
        {alert.oref_title && (
          <p className={styles.title}>{alert.oref_title}</p>
        )}
        {alert.oref_desc && (
          <p className={styles.desc}>{alert.oref_desc}</p>
        )}
      </div>
    </div>
  );
};
