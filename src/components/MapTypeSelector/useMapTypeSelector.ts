'use client';

import { useAtom } from 'jotai';
import { selectedMapPresetAtom } from '@/atoms';
import { MAP_PRESETS } from '@/constants/mapPresets.constants';

export function useMapTypeSelector(onClose: () => void) {
  const [selectedId, setSelectedId] = useAtom(selectedMapPresetAtom);

  const onChange = (id: string) => {
    setSelectedId(id);
    onClose();
  };

  return { presets: MAP_PRESETS, selectedId, onChange };
}
