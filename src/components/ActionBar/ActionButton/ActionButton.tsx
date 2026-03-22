'use client';

import styles from './ActionButton.module.scss';

interface ActionButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
  active?: boolean;
  variant?: 'default' | 'muted';
}

export const ActionButton = ({
  icon,
  label,
  onClick,
  active,
  variant = 'default',
}: ActionButtonProps) => (
  <button
    className={`${styles.btn} ${active ? (variant === 'muted' ? styles.mutedActive : styles.btnActive) : ''}`}
    onClick={onClick}
    title={label}
    aria-label={label}
  >
    <span className={styles.icon}>{icon}</span>
  </button>
);
