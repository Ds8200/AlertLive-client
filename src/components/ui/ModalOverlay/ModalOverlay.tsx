import type { ReactNode } from 'react';
import styles from './ModalOverlay.module.scss';

interface ModalOverlayProps {
  children: ReactNode;
  onBackdropClick?: () => void;
  variant?: 'default' | 'alert';
}

export const ModalOverlay = ({ children, onBackdropClick, variant = 'default' }: ModalOverlayProps) => (
  <div
    className={`${styles.overlay} ${variant === 'alert' ? styles.overlayAlert : ''}`}
    onClick={onBackdropClick}
  >
    {children}
  </div>
);
