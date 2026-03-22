'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './Popover.module.scss';

interface PopoverProps {
  children: ReactNode;
  onClose: () => void;
}

export const Popover = ({ children, onClose }: PopoverProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div ref={ref} className={styles.popover} onClick={(e) => e.stopPropagation()}>
      {children}
      <div className={styles.triangle} />
    </div>
  );
};
