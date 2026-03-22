import styles from './SidebarEmpty.module.scss';

interface SidebarEmptyProps {
  icon: string;
  text: string;
  description: string;
}

export const SidebarEmpty = ({ icon, text, description }: SidebarEmptyProps) => (
  <div className={styles.emptyState}>
    <span className={styles.emptyIcon}>{icon}</span>
    <p className={styles.emptyText}>{text}</p>
    <p className={styles.emptyDesc}>{description}</p>
  </div>
);
