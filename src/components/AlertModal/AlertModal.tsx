'use client';

import { useAlertModal } from './useAlertModal';
import { DetailRow } from './DetailRow/DetailRow';
import { ModalOverlay } from '@/components/ui/ModalOverlay/ModalOverlay';
import { ALERT_MODAL_LABELS } from '@/constants/ui.constants';
import styles from './AlertModal.module.scss';

export const AlertModal = () => {
  const { nearbyAlert, city, typeLabel, typeIcon, formattedDistance, dismiss } =
    useAlertModal();

  if (!nearbyAlert) return null;

  return (
    <ModalOverlay onBackdropClick={dismiss} variant="alert">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.icon}>{typeIcon}</div>

        <h2 className={styles.heading}>{ALERT_MODAL_LABELS.title}</h2>

        <div className={styles.city}>{city}</div>

        <div className={styles.details}>
          <DetailRow label="סוג" value={typeLabel} />
          <DetailRow label="חומרה" value={nearbyAlert.severity} />
          {formattedDistance && (
            <DetailRow label={ALERT_MODAL_LABELS.distance} value={formattedDistance} />
          )}
        </div>

        {nearbyAlert.oref_title && (
          <p className={styles.title}>{nearbyAlert.oref_title}</p>
        )}
        {nearbyAlert.oref_desc && (
          <p className={styles.desc}>{nearbyAlert.oref_desc}</p>
        )}

        <button className={styles.dismissBtn} onClick={dismiss}>
          {ALERT_MODAL_LABELS.dismiss}
        </button>
      </div>
    </ModalOverlay>
  );
};
