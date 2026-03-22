'use client';

import { RLayerVector, RFeature, ROverlay } from 'rlayers';
import { RStyle, RCircle, RFill, RStroke } from 'rlayers/style';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import type { AlertMarker } from '../useMap';
import styles from './AlertMarkersLayer.module.scss';

interface AlertMarkersLayerProps {
  markers: AlertMarker[];
}

export const AlertMarkersLayer = ({ markers }: AlertMarkersLayerProps) => (
  <RLayerVector zIndex={10}>
    {markers.map((marker) => (
      <RFeature
        key={marker.alert_id}
        geometry={new Point(fromLonLat([marker.lng, marker.lat]))}
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
      </RFeature>
    ))}
  </RLayerVector>
);
