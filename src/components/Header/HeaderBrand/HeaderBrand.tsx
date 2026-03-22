import { HEADER_LABELS } from '@/constants/ui.constants';
import styles from './HeaderBrand.module.scss';

interface HeaderBrandProps {
  isLiveMode: boolean;
}

export const HeaderBrand = ({ isLiveMode }: HeaderBrandProps) => (
  <div className={styles.brand}>
    <span className={styles.logo}>🚨</span>
    <span className={styles.appName}>{HEADER_LABELS.appName}</span>
    {isLiveMode && (
      <span className={styles.liveBadge}>{HEADER_LABELS.live}</span>
    )}
  </div>
);
