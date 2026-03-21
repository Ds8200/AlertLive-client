'use client';

import { useRef } from 'react';
import { RMap, RLayerTile, RLayerVector, RFeature, ROverlay } from 'rlayers';
import { RStyle, RCircle, RFill, RStroke } from 'rlayers/style';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { useMap } from './useMap';
import {
  MAP_DEFAULT_CENTER_LNG,
  MAP_DEFAULT_CENTER_LAT,
  MAP_DEFAULT_ZOOM,
} from '@/constants/ui.constants';
import styles from './Map.module.scss';

export const Map = () => {
  const rMapRef = useRef<RMap>(null);
  const { alertMarkers, currentPreset, userLocation } = useMap(rMapRef);

  const initialCenter = fromLonLat([MAP_DEFAULT_CENTER_LNG, MAP_DEFAULT_CENTER_LAT]);

  return (
    <div className={styles.mapContainer}>
      <RMap
        className={styles.rmap}
        initial={{ center: initialCenter, zoom: MAP_DEFAULT_ZOOM }}
        noDefaultControls
        ref={rMapRef}
      >
        {/* Base tile layer */}
        <RLayerTile
          key={`base-${currentPreset.id}`}
          url={currentPreset.url}
          attributions={currentPreset.attribution}
        />

        {/* Optional overlay layer (e.g. satellite labels) */}
        {currentPreset.overlay && (
          <RLayerTile
            key={`overlay-${currentPreset.id}`}
            url={currentPreset.overlay.url}
            attributions={currentPreset.overlay.attribution}
          />
        )}

        {/* Alert markers */}
        <RLayerVector zIndex={10}>
          {alertMarkers.map((marker) => (
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
                <ROverlay className={styles.pulseWrap}>
                  <div className={styles.pulseRing} />
                </ROverlay>
              )}
            </RFeature>
          ))}
        </RLayerVector>

        {/* User location marker */}
        {userLocation && (
          <RLayerVector zIndex={20}>
            <RFeature
              geometry={new Point(fromLonLat([userLocation.lng, userLocation.lat]))}
            >
              <RStyle>
                <RCircle radius={8}>
                  <RFill color="#3b82f6" />
                  <RStroke color="#fff" width={2.5} />
                </RCircle>
              </RStyle>
            </RFeature>
          </RLayerVector>
        )}
      </RMap>
    </div>
  );
};
