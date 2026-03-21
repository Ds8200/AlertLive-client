import type { ThreatType } from '@/enums/ThreatType.enum';
import type { AlertSeverity } from '@/enums/AlertSeverity.enum';

export interface Alert {
  event_id: string;
  alert_id: string;
  type: ThreatType | string;
  severity: AlertSeverity | string;
  region_name: string;
  oref_city: string;
  lat: number | null;
  lng: number | null;
  timestamp: string;
  oref_title: string | null;
  oref_desc: string | null;
  oref_category: number | null;
  region_id: string | null;
  created_at: string | null;
  distanceKm?: number;
}

export interface WsSentinel {
  type: 'history_end';
}

export type WsMessage = Alert | WsSentinel;
