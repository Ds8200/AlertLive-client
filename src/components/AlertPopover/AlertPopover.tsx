'use client';

import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { selectedAlertIdAtom } from '@/atoms';
import { Popover } from '@/components/ui/Popover/Popover';
import { getCityName } from '@/utils/formatters';
import { THREAT_TYPE_LABELS, THREAT_TYPE_ICONS } from '@/constants/severity.constants';
import type { Alert } from '@/types';
import styles from './AlertPopover.module.scss';

interface AlertPopoverProps {
  alert: Alert;
}

export const AlertPopover = ({ alert }: AlertPopoverProps) => {
  const setSelectedId = useSetAtom(selectedAlertIdAtom);
  const close = useCallback(() => setSelectedId(null), [setSelectedId]);

  const city = getCityName(alert);
  const typeIcon = THREAT_TYPE_ICONS[alert.type] ?? '⚠️';
  const typeLabel = THREAT_TYPE_LABELS[alert.type] ?? alert.type;

  return (
    <Popover onClose={close}>
      <button className={styles.closeBtn} onClick={close} aria-label="סגור">×</button>

      <div className={styles.header}>
        <span className={styles.icon}>{typeIcon}</span>
        <span className={styles.city}>{city}</span>
      </div>

      <p className={styles.type}>{typeLabel}</p>

      {alert.oref_title && (
        <p className={styles.title}>{alert.oref_title}</p>
      )}
      {alert.oref_desc && (
        <p className={styles.desc}>{alert.oref_desc}</p>
      )}
    </Popover>
  );
};
