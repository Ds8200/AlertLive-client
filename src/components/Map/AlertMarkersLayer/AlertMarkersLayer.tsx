'use client';

import { memo, useMemo } from 'react';
import { RLayerVector, RFeature, ROverlay } from 'rlayers';
import { RStyle, RCircle, RFill, RStroke } from 'rlayers/style';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import type { AlertMarker } from '../useMap';
import styles from './AlertMarkersLayer.module.scss';

interface AlertMarkersLayerProps {
  markers: AlertMarker[];
}

const MarkerFeature = memo(({ marker }: { marker: AlertMarker }) => {
  const geometry = useMemo(
    () => new Point(fromLonLat([marker.lng, marker.lat])),
    [marker.lng, marker.lat]
  );

  return (
    <RFeature key={marker.alert_id} geometry={geometry}>
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
    </RFeature>
  );
});
MarkerFeature.displayName = 'MarkerFeature';

export const AlertMarkersLayer = memo(({ markers }: AlertMarkersLayerProps) => (
  <RLayerVector zIndex={10}>
    {markers.map((marker) => (
      <MarkerFeature key={marker.alert_id} marker={marker} />
    ))}
  </RLayerVector>
));
AlertMarkersLayer.displayName = 'AlertMarkersLayer';
