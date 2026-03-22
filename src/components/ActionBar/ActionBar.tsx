'use client';

import { useActionBar } from './useActionBar';
import { ActionButton } from './ActionButton/ActionButton';
import { MapTypeSelector } from './MapTypeSelector/MapTypeSelector';
import { ACTION_BAR_LABELS } from '@/constants/ui.constants';
import styles from './ActionBar.module.scss';

export const ActionBar = () => {
  const {
    barRef,
    isExpanded,
    expand,
    isMuted,
    isMapSelectorOpen,
    toggleMute,
    requestLocation,
    openOnboarding,
    toggleMapSelector,
    closeMapSelector,
  } = useActionBar();

  return (
    <div ref={barRef} className={styles.bar}>
      {isExpanded ? (
        <div className={styles.actions}>
          <ActionButton
            icon={isMuted ? '🔇' : '🔊'}
            label={isMuted ? ACTION_BAR_LABELS.unmute : ACTION_BAR_LABELS.mute}
            onClick={toggleMute}
            active={isMuted}
            variant="muted"
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
      ) : (
        <ActionButton
          icon="⚙️"
          label={ACTION_BAR_LABELS.toggle}
          onClick={expand}
        />
      )}
    </div>
  );
};
