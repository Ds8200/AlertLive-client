'use client';

import { memo, useMemo } from 'react';
import { RLayerVector, RFeature } from 'rlayers';
import { RStyle, RCircle, RFill, RStroke } from 'rlayers/style';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import type { UserLocation } from '@/atoms';

interface UserMarkerLayerProps {
  userLocation: UserLocation;
}

export const UserMarkerLayer = memo(({ userLocation }: UserMarkerLayerProps) => {
  const geometry = useMemo(
    () => new Point(fromLonLat([userLocation.lng, userLocation.lat])),
    [userLocation.lng, userLocation.lat]
  );

  return (
    <RLayerVector zIndex={20}>
      <RFeature geometry={geometry}>
        <RStyle>
          <RCircle radius={8}>
            <RFill color="#3b82f6" />
            <RStroke color="#fff" width={2.5} />
          </RCircle>
        </RStyle>
      </RFeature>
    </RLayerVector>
  );
});
UserMarkerLayer.displayName = 'UserMarkerLayer';
