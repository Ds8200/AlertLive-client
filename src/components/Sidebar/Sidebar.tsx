'use client';

import { useSidebar } from './useSidebar';
import { SidebarHeader } from './SidebarHeader/SidebarHeader';
import { SidebarEmpty } from './SidebarEmpty/SidebarEmpty';
import { AlertCard } from '@/components/AlertCard/AlertCard';
import { SIDEBAR_LABELS } from '@/constants/ui.constants';
import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  const { alerts, count, clearAlerts } = useSidebar();

  return (
    <aside className={styles.sidebar}>
      <SidebarHeader
        title={SIDEBAR_LABELS.title}
        clearLabel={SIDEBAR_LABELS.clear}
        count={count}
        onClear={clearAlerts}
      />

      <div className={styles.scrollArea}>
        {count === 0 ? (
          <SidebarEmpty
            icon="📡"
            text={SIDEBAR_LABELS.empty}
            description={SIDEBAR_LABELS.emptyDesc}
          />
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
