export const formatTimestamp = (iso: string): string => {
  try {
    const date = new Date(iso);
    return date.toLocaleTimeString('he-IL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
};

export const formatDistance = (km: number): string => {
  if (km < 1) return `${Math.round(km * 1000)} מ'`;
  return `${km.toFixed(1)} ק"מ`;
};

export const formatDateFull = (iso: string): string => {
  try {
    const date = new Date(iso);
    return date.toLocaleString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
};

export const getCityName = (
  alert: { region_name?: string | null; oref_city?: string | null },
  fallback = 'לא ידוע'
): string => alert.region_name || alert.oref_city || fallback;
