import { AlertSeverity } from '@/enums/AlertSeverity.enum';
import { ThreatType } from '@/enums/ThreatType.enum';

export const SEVERITY_LABELS: Record<string, string> = {
  [AlertSeverity.CRITICAL]: 'קריטי',
  [AlertSeverity.WARN]: 'אזהרה',
  [AlertSeverity.WARNING]: 'אזהרה',
  [AlertSeverity.INFO]: 'מידע',
};

export const THREAT_TYPE_LABELS: Record<string, string> = {
  [ThreatType.ROCKETS]: 'ירי רקטות',
  [ThreatType.ROCKET]: 'ירי רקטה',
  [ThreatType.MISSILES]: 'טילים',
  [ThreatType.HOSTILE_AIRCRAFT]: 'כלי טיס עוין',
  [ThreatType.INFILTRATION]: 'חדירת מחבלים',
  [ThreatType.NEWS]: 'התרעה מקדימה',
  [ThreatType.UPDATE]: 'עדכון',
  [ThreatType.EARTHQUAKE]: 'רעידת אדמה',
  [ThreatType.TSUNAMI]: 'צונאמי',
  [ThreatType.HAZMAT]: 'חומרים מסוכנים',
  [ThreatType.TERROR]: 'פיגוע טרור',
};

export const THREAT_TYPE_ICONS: Record<string, string> = {
  [ThreatType.ROCKETS]: '🚀',
  [ThreatType.ROCKET]: '🚀',
  [ThreatType.MISSILES]: '💥',
  [ThreatType.HOSTILE_AIRCRAFT]: '✈️',
  [ThreatType.INFILTRATION]: '⚠️',
  [ThreatType.NEWS]: '📰',
  [ThreatType.UPDATE]: '✅',
  [ThreatType.EARTHQUAKE]: '🌍',
  [ThreatType.TSUNAMI]: '🌊',
  [ThreatType.HAZMAT]: '☣️',
  [ThreatType.TERROR]: '🔴',
};

export const ONBOARDING_STEPS = [
  {
    title: 'ברוכים הבאים ל-AlertLive',
    description:
      'מערכת ניטור התרעות בזמן אמת. המפה מציגה את כל ההתרעות הפעילות בישראל.',
    icon: '🚨',
  },
  {
    title: 'המפה האינטראקטיבית',
    description:
      'המפה ברקע מציגה סמנים צבעוניים לפי חומרת ההתרעה. ניתן להחליף סוג מפה בלחיצה על כפתור המפה.',
    icon: '🗺️',
  },
  {
    title: 'רשימת ההתרעות',
    description:
      'הפאנל הצדדי מציג את כל ההתרעות. לחיצה על התרעה תעיף את המפה לאזור הרלוונטי.',
    icon: '📋',
  },
  {
    title: 'התרעות קרובות',
    description:
      'אם תרשה גישה למיקום שלך, תקבל התרעה מיוחדת כאשר אירוע מתרחש בטווח 50 ק"מ ממך.',
    icon: '📍',
  },
];
