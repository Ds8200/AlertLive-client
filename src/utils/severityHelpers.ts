import { AlertSeverity } from '@/enums/AlertSeverity.enum';
import { ThreatType } from '@/enums/ThreatType.enum';

const HIGH_THREAT_TYPES: string[] = [
  ThreatType.ROCKETS,
  ThreatType.ROCKET,
  ThreatType.MISSILES,
  ThreatType.HOSTILE_AIRCRAFT,
  ThreatType.TERROR,
  ThreatType.INFILTRATION,
];

const NATURAL_THREAT_TYPES: string[] = [
  ThreatType.EARTHQUAKE,
  ThreatType.TSUNAMI,
  ThreatType.HAZMAT,
];

export function getSeverityCssVar(severity: string, type: string): string {
  if (type === ThreatType.UPDATE) return '--color-threat-green';
  if (HIGH_THREAT_TYPES.includes(type) || severity === AlertSeverity.CRITICAL)
    return '--color-threat-red';
  if (NATURAL_THREAT_TYPES.includes(type)) return '--color-threat-purple';
  if (severity === AlertSeverity.WARN || severity === AlertSeverity.WARNING)
    return '--color-threat-orange';
  if (severity === AlertSeverity.INFO) return '--color-threat-yellow';
  return '--color-threat-blue';
}

export function isHighPriority(type: string, severity: string): boolean {
  return (
    HIGH_THREAT_TYPES.includes(type) || severity === AlertSeverity.CRITICAL
  );
}

export function isResolved(type: string): boolean {
  return type === ThreatType.UPDATE;
}
