'use client';

import { useSidebar } from './useSidebar';
import { AlertCard } from '@/components/AlertCard/AlertCard';
import { SIDEBAR_LABELS } from '@/constants/ui.constants';
import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  const { alerts, count, clearAlerts } = useSidebar();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <span className={styles.title}>
          {SIDEBAR_LABELS.title}
          {count > 0 && <span className={styles.badge}>{count}</span>}
        </span>
        {count > 0 && (
          <button className={styles.clearBtn} onClick={clearAlerts}>
            {SIDEBAR_LABELS.clear}
          </button>
        )}
      </div>

      <div className={styles.scrollArea}>
        {count === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📡</span>
            <p className={styles.emptyText}>{SIDEBAR_LABELS.empty}</p>
            <p className={styles.emptyDesc}>{SIDEBAR_LABELS.emptyDesc}</p>
          </div>
        ) : (
          <div className={styles.cardList}>
            {alerts.map((alert) => (
              <AlertCard key={alert.alert_id} alert={alert} />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
