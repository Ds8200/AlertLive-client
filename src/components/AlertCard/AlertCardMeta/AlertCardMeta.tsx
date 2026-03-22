import styles from './AlertCardMeta.module.scss';

interface AlertCardMetaProps {
  typeLabel: string;
  formattedDistance: string | null;
}

export const AlertCardMeta = ({ typeLabel, formattedDistance }: AlertCardMetaProps) => (
  <div className={styles.bottomRow}>
    <span className={styles.typeLabel}>{typeLabel}</span>
    {formattedDistance && (
      <span className={styles.distance}>📍 {formattedDistance}</span>
    )}
  </div>
);
