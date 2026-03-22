'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useEffect, useRef } from 'react';
import {
  alertsAtom,
  wsStatusAtom,
  isLiveModeAtom,
  userLocationAtom,
} from '@/atoms';
import { WsStatus } from '@/enums/WsStatus.enum';
import { WS_URL, WS_HISTORY_END_TYPE } from '@/constants/ws.constants';
import {
  RECONNECT_INTERVAL_MS,
  ALERT_EXPIRY_MS,
  ALERT_CLEANUP_INTERVAL_MS,
} from '@/constants/ui.constants';
import type { Alert, WsMessage } from '@/types';
import { useProximityCheck } from './useProximityCheck';

const getRegionKey = (alert: Alert): string => alert.oref_city;

export const useWebSocket = () => {
  const setAlerts = useSetAtom(alertsAtom);
  const setWsStatus = useSetAtom(wsStatusAtom);
  const setIsLiveMode = useSetAtom(isLiveModeAtom);
  const isLiveMode = useAtomValue(isLiveModeAtom);
  const userLocation = useAtomValue(userLocationAtom);
  const { checkProximity } = useProximityCheck();

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLiveModeRef = useRef(isLiveMode);
  const userLocationRef = useRef(userLocation);
  const checkProximityRef = useRef(checkProximity);

  // Keep refs in sync to avoid stale closures in WS callbacks
  useEffect(() => {
    isLiveModeRef.current = isLiveMode;
  }, [isLiveMode]);
  useEffect(() => {
    userLocationRef.current = userLocation;
  }, [userLocation]);
  useEffect(() => {
    checkProximityRef.current = checkProximity;
  }, [checkProximity]);

  // One alert per region — replace old alert for same region, dedupe by alert_id
  // Skip alerts older than the expiry threshold
  const upsertAlert = useCallback(
    (incoming: Alert) => {
      const cutoff = Date.now() - ALERT_EXPIRY_MS;
      if (new Date(incoming.timestamp).getTime() < cutoff) return;

      const regionKey = getRegionKey(incoming);
      setAlerts((prev) => {
        const filtered = prev.filter(
          (a) => a.alert_id !== incoming.alert_id && getRegionKey(a) !== regionKey
        );
        return [...filtered, incoming];
      });
    },
    [setAlerts]
  );

  // Periodic cleanup — remove alerts older than 1 hour
  useEffect(() => {
    const interval = setInterval(() => {
      const cutoff = Date.now() - ALERT_EXPIRY_MS;
      setAlerts((prev) =>
        prev.filter((a) => new Date(a.timestamp).getTime() >= cutoff)
      );
    }, ALERT_CLEANUP_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [setAlerts]);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    setWsStatus(WsStatus.CONNECTING);
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setWsStatus(WsStatus.CONNECTED);
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const msg = JSON.parse(event.data as string) as WsMessage;

        if ('type' in msg && (msg as { type: string }).type === WS_HISTORY_END_TYPE) {
          setIsLiveMode(true);
          return;
        }

        const alert = msg as Alert;
        upsertAlert(alert);

        if (isLiveModeRef.current && userLocationRef.current) {
          checkProximityRef.current(alert);
        }
      } catch {
        // Malformed message; ignore
      }
    };

    ws.onclose = () => {
      setWsStatus(WsStatus.DISCONNECTED);
      wsRef.current = null;
      reconnectTimerRef.current = setTimeout(connect, RECONNECT_INTERVAL_MS);
    };

    ws.onerror = () => {
      setWsStatus(WsStatus.ERROR);
      ws.close();
    };
  }, [setWsStatus, setIsLiveMode, upsertAlert]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
