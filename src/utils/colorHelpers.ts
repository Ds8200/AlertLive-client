export const CSS_VAR_TO_HEX: Record<string, string> = {
  '--color-threat-red': '#ef4444',
  '--color-threat-orange': '#f97316',
  '--color-threat-yellow': '#eab308',
  '--color-threat-green': '#22c55e',
  '--color-threat-purple': '#a855f7',
  '--color-threat-blue': '#3b82f6',
};

export const getMarkerColor = (cssVar: string): string =>
  CSS_VAR_TO_HEX[cssVar] ?? '#3b82f6';

export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
