'use client';

import { useActionBar } from './useActionBar';
import { MapTypeSelector } from '@/components/MapTypeSelector/MapTypeSelector';
import { ACTION_BAR_LABELS } from '@/constants/ui.constants';
import styles from './ActionBar.module.scss';

export const ActionBar = () => {
  const {
    isMuted,
    isMapSelectorOpen,
    toggleMute,
    requestLocation,
    openOnboarding,
    toggleMapSelector,
    closeMapSelector,
  } = useActionBar();

  return (
    <div className={styles.bar}>
      <ActionButton
        icon={isMuted ? '🔇' : '🔊'}
        label={isMuted ? ACTION_BAR_LABELS.unmute : ACTION_BAR_LABELS.mute}
        onClick={toggleMute}
        active={isMuted}
        activeClass={styles.mutedActive}
      />

      <ActionButton
        icon="📍"
        label={ACTION_BAR_LABELS.location}
        onClick={requestLocation}
      />

      <div className={styles.mapBtnWrapper}>
        <ActionButton
          icon="🗺️"
          label={ACTION_BAR_LABELS.mapType}
          onClick={toggleMapSelector}
          active={isMapSelectorOpen}
        />
        {isMapSelectorOpen && (
          <MapTypeSelector onClose={closeMapSelector} />
        )}
      </div>

      <ActionButton
        icon="❓"
        label={ACTION_BAR_LABELS.help}
        onClick={openOnboarding}
      />
    </div>
  );
};

const ActionButton = ({
  icon,
  label,
  onClick,
  active,
  activeClass,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  active?: boolean;
  activeClass?: string;
}) => (
  <button
    className={`${styles.btn} ${active ? (activeClass ?? styles.btnActive) : ''}`}
    onClick={onClick}
    title={label}
    aria-label={label}
  >
    <span className={styles.icon}>{icon}</span>
  </button>
);
