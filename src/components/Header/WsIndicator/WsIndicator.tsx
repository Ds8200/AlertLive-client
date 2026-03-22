'use client';

import { useWsIndicator } from './useWsIndicator';
import styles from './WsIndicator.module.scss';

export const WsIndicator = () => {
  const { statusColor, statusLabel, isConnected } = useWsIndicator();

  return (
    <div className={styles.wsIndicator}>
      <span
        className={`${styles.wsDot} ${isConnected ? styles.wsDotConnected : ''}`}
        style={{ background: statusColor }}
        title={statusLabel}
      />
      <span className={styles.wsLabel}>{statusLabel}</span>
    </div>
  );
};
