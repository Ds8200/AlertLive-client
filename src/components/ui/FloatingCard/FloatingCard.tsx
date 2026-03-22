'use client';

import type { ReactNode } from 'react';
import styles from './FloatingCard.module.scss';

interface FloatingCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export const FloatingCard = ({ children, title, className }: FloatingCardProps) => (
  <div className={`${styles.card} ${className ?? ''}`}>
    {title && <p className={styles.title}>{title}</p>}
    {children}
  </div>
);
