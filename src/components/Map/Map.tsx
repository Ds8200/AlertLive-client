'use client';

import { useRef } from 'react';
import { useSetAtom } from 'jotai';
import { RMap, RLayerTile } from 'rlayers';
import { fromLonLat } from 'ol/proj';
import { useMap } from './useMap';
import { AlertMarkersLayer } from './AlertMarkersLayer/AlertMarkersLayer';
import { UserMarkerLayer } from './UserMarkerLayer/UserMarkerLayer';
import { isMapSelectorOpenAtom } from '@/atoms';
import {
  MAP_DEFAULT_CENTER_LNG,
  MAP_DEFAULT_CENTER_LAT,
  MAP_DEFAULT_ZOOM,
} from '@/constants/ui.constants';
import styles from './Map.module.scss';

export const Map = () => {
  const rMapRef = useRef<RMap>(null);
  const { alertMarkers, currentPreset, userLocation } = useMap(rMapRef);
  const setIsMapSelectorOpen = useSetAtom(isMapSelectorOpenAtom);

  const initialCenter = fromLonLat([MAP_DEFAULT_CENTER_LNG, MAP_DEFAULT_CENTER_LAT]);

  return (
    <div className={styles.mapContainer} onClick={() => setIsMapSelectorOpen(false)}>
      <RMap
        className={styles.rmap}
        initial={{ center: initialCenter, zoom: MAP_DEFAULT_ZOOM }}
        noDefaultControls
        ref={rMapRef}
      >
        <RLayerTile
          key={`base-${currentPreset.id}`}
          url={currentPreset.url}
          attributions={currentPreset.attribution}
        />

        {currentPreset.overlay && (
          <RLayerTile
            key={`overlay-${currentPreset.id}`}
            url={currentPreset.overlay.url}
            attributions={currentPreset.overlay.attribution}
          />
        )}

        <AlertMarkersLayer markers={alertMarkers} />

        {userLocation && <UserMarkerLayer userLocation={userLocation} />}
      </RMap>
    </div>
  );
};
