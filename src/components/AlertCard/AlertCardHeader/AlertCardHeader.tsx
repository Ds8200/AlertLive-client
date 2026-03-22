import styles from './AlertCardHeader.module.scss';

interface AlertCardHeaderProps {
  icon: string;
  city: string;
  formattedTime: string;
}

export const AlertCardHeader = ({ icon, city, formattedTime }: AlertCardHeaderProps) => (
  <div className={styles.topRow}>
    <span className={styles.icon}>{icon}</span>
    <span className={styles.city}>{city}</span>
    <span className={styles.time}>{formattedTime}</span>
  </div>
);
