import { atomWithStorage } from 'jotai/utils';
import { DEFAULT_MAP_PRESET_ID } from '@/constants/mapPresets.constants';

export const selectedMapPresetAtom = atomWithStorage<string>(
  'alertlive_map_preset',
  DEFAULT_MAP_PRESET_ID
);
