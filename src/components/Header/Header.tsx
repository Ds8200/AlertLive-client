'use client';

import { useHeader } from './useHeader';
import { HeaderBrand } from './HeaderBrand/HeaderBrand';
import { StatBadge } from './StatBadge/StatBadge';
import { WsIndicator } from './WsIndicator/WsIndicator';
import { HEADER_LABELS } from '@/constants/ui.constants';
import styles from './Header.module.scss';

export const Header = () => {
  const { stats, isLiveMode } = useHeader();

  return (
    <header className={styles.header}>
      <HeaderBrand isLiveMode={isLiveMode} />

      <div className={styles.stats}>
        <StatBadge label={HEADER_LABELS.total} value={stats.total} variant="neutral" />
        <StatBadge label={HEADER_LABELS.active} value={stats.active} variant="danger" />
        <StatBadge label={HEADER_LABELS.ended} value={stats.ended} variant="success" />
      </div>

      <WsIndicator />
    </header>
  );
};
