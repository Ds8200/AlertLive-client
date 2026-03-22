'use client';

import { useMapTypeSelector } from './useMapTypeSelector';
import { FloatingCard } from '@/components/ui/FloatingCard/FloatingCard';
import { MAP_TYPE_SELECTOR_LABELS } from '@/constants/ui.constants';
import styles from './MapTypeSelector.module.scss';

interface MapTypeSelectorProps {
  onClose: () => void;
}

export const MapTypeSelector = ({ onClose }: MapTypeSelectorProps) => {
  const { presets, selectedId, onChange } = useMapTypeSelector(onClose);

  return (
    <div className={styles.wrapper}>
      <FloatingCard title={MAP_TYPE_SELECTOR_LABELS.title}>
        <ul className={styles.list}>
          {presets.map((preset) => (
            <li key={preset.id}>
              <button
                className={`${styles.option} ${preset.id === selectedId ? styles.selected : ''}`}
                onClick={() => onChange(preset.id)}
              >
                <span className={styles.optionName}>{preset.name}</span>
                <span className={styles.optionDesc}>{preset.desc}</span>
                {preset.id === selectedId && (
                  <span className={styles.checkmark}>✓</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </FloatingCard>
    </div>
  );
};
