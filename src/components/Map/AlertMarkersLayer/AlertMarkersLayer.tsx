'use client';

import { memo, useMemo } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { RLayerVector, RFeature, ROverlay } from 'rlayers';
import { RStyle, RCircle, RFill, RStroke } from 'rlayers/style';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { selectedAlertIdAtom } from '@/atoms';
import { AlertPopover } from '@/components/AlertPopover/AlertPopover';
import type { AlertMarker } from '../useMap';
import styles from './AlertMarkersLayer.module.scss';

interface AlertMarkersLayerProps {
  markers: AlertMarker[];
}

interface MarkerFeatureProps {
  marker: AlertMarker;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const MarkerFeature = memo(({ marker, isSelected, onSelect }: MarkerFeatureProps) => {
  const geometry = useMemo(
    () => new Point(fromLonLat([marker.lng, marker.lat])),
    [marker.lng, marker.lat]
  );

  return (
    <RFeature
      geometry={geometry}
      onClick={(e) => {
        e.originalEvent?.stopPropagation();
        onSelect(marker.alert_id);
      }}
    >
      <RStyle>
        <RCircle radius={marker.isHighPriority ? 9 : 7}>
          <RFill color={marker.color} />
          <RStroke color="rgba(255,255,255,0.7)" width={1.5} />
        </RCircle>
      </RStyle>
      {marker.isHighPriority && (
        <ROverlay>
          <div className={styles.pulseRing} />
        </ROverlay>
      )}
      {isSelected && (
        <ROverlay>
          <div className={styles.popoverWrapper}>
            <AlertPopover alert={marker.alert} />
          </div>
        </ROverlay>
      )}
    </RFeature>
  );
});
MarkerFeature.displayName = 'MarkerFeature';

export const AlertMarkersLayer = memo(({ markers }: AlertMarkersLayerProps) => {
  const selectedId = useAtomValue(selectedAlertIdAtom);
  const setSelectedId = useSetAtom(selectedAlertIdAtom);

  return (
    <RLayerVector zIndex={10}>
      {markers.map((marker) => (
        <MarkerFeature
          key={marker.alert_id}
          marker={marker}
          isSelected={selectedId === marker.alert_id}
          onSelect={setSelectedId}
        />
      ))}
    </RLayerVector>
  );
});
AlertMarkersLayer.displayName = 'AlertMarkersLayer';
