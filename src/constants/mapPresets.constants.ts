import { MapPresetId } from '@/enums/MapPresetId.enum';
import type { MapPreset } from '@/types';

export const MAP_PRESETS: MapPreset[] = [
  {
    id: MapPresetId.DARK,
    name: 'כהה',
    desc: 'מפה כהה של Carto',
    url: 'https://{a-d}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '© CARTO © OpenStreetMap contributors',
  },
  {
    id: MapPresetId.OSM,
    name: 'OpenStreetMap',
    desc: 'מפת רחובות סטנדרטית',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors',
  },
  {
    id: MapPresetId.SATELLITE,
    name: 'לוויין',
    desc: 'תמונות לוויין של Esri',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '© Esri, DigitalGlobe',
    overlay: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      attribution: '© Esri Labels',
    },
  },
  {
    id: MapPresetId.STADIA,
    name: 'Stadia',
    desc: 'Stadia Alidade Smooth Dark',
    url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
    attribution: '© Stadia Maps © OpenStreetMap contributors',
  },
  {
    id: MapPresetId.TOPO,
    name: 'טופוגרפי',
    desc: 'מפה עם נתוני גובה',
    url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '© OpenTopoMap (CC-BY-SA)',
  },
];

export const DEFAULT_MAP_PRESET_ID = MapPresetId.DARK;

export const MAP_PRESETS_BY_ID: Record<string, MapPreset> = Object.fromEntries(
  MAP_PRESETS.map((p) => [p.id, p])
);
