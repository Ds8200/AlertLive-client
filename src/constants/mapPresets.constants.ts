import { MapPresetId } from '@/enums/MapPresetId.enum';
import type { MapPreset } from '@/types';

export const MAP_PRESETS: MapPreset[] = [
  {
    id: MapPresetId.ESRI_SAT_LABELS,
    name: 'לווין + שמות',
    desc: 'לווין Esri עם שמות מקומות',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '© Esri, DigitalGlobe',
    overlay: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      attribution: '© Esri Labels',
    },
  },
  {
    id: MapPresetId.CARTO_DARK,
    name: 'כהה',
    desc: 'מפה כהה של Carto',
    url: 'https://{a-d}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '© CARTO © OpenStreetMap contributors',
  },
  {
    id: MapPresetId.CARTO_DARK_NOLABELS,
    name: 'כהה ללא שמות',
    desc: 'מפה כהה של Carto ללא תוויות',
    url: 'https://{a-d}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
    attribution: '© CARTO © OpenStreetMap contributors',
  },
  {
    id: MapPresetId.CARTO_LIGHT,
    name: 'בהיר',
    desc: 'מפה בהירה של Carto',
    url: 'https://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '© CARTO © OpenStreetMap contributors',
  },
  {
    id: MapPresetId.CARTO_VOYAGER,
    name: 'Voyager',
    desc: 'Carto Voyager',
    url: 'https://{a-d}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
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
    id: MapPresetId.WIKIMEDIA,
    name: 'Wikimedia',
    desc: 'מפת Wikimedia',
    url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png',
    attribution: '© Wikimedia Maps © OpenStreetMap contributors',
  },
  {
    id: MapPresetId.HOT,
    name: 'HOT הומניטרי',
    desc: 'OpenStreetMap Humanitarian',
    url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors, HOT',
  },
  {
    id: MapPresetId.CYCLOSM,
    name: 'CyclOSM',
    desc: 'מפת אופניים',
    url: 'https://{a-c}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    attribution: '© CyclOSM © OpenStreetMap contributors',
  },
  {
    id: MapPresetId.OPENTOPOMAP,
    name: 'טופוגרפי',
    desc: 'מפה עם נתוני גובה',
    url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '© OpenTopoMap (CC-BY-SA)',
  },
  {
    id: MapPresetId.ESRI_TOPO,
    name: 'Esri טופו',
    desc: 'מפה טופוגרפית של Esri',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '© Esri',
  },
  {
    id: MapPresetId.ESRI_STREET,
    name: 'Esri רחובות',
    desc: 'מפת רחובות של Esri',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '© Esri',
  },
  {
    id: MapPresetId.ESRI_NATGEO,
    name: 'Esri NatGeo',
    desc: 'מפת National Geographic של Esri',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '© Esri, National Geographic',
  },
  {
    id: MapPresetId.ESRI_SATELLITE,
    name: 'לווין',
    desc: 'תמונות לווין של Esri ללא תוויות',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '© Esri, DigitalGlobe',
  },
  {
    id: MapPresetId.STADIA_DARK,
    name: 'Stadia כהה',
    desc: 'Stadia Alidade Smooth Dark',
    url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
    attribution: '© Stadia Maps © OpenStreetMap contributors',
  },
  {
    id: MapPresetId.ESRI_GRAY,
    name: 'Esri אפור',
    desc: 'מפה אפורה של Esri',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attribution: '© Esri',
  },
];

export const DEFAULT_MAP_PRESET_ID = MapPresetId.ESRI_SAT_LABELS;

export const MAP_PRESETS_BY_ID: Record<string, MapPreset> = Object.fromEntries(
  MAP_PRESETS.map((p) => [p.id, p])
);
