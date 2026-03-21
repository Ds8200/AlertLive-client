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
import { MAX_ALERT_CARDS } from '@/constants/ui.constants';
import { RECONNECT_INTERVAL_MS } from '@/constants/ui.constants';
import type { Alert, WsMessage } from '@/types';
import { useProximityCheck } from './useProximityCheck';

export function useWebSocket() {
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

  // Keep refs in sync to avoid stale closures in WS callbacks
  useEffect(() => {
    isLiveModeRef.current = isLiveMode;
  }, [isLiveMode]);
  useEffect(() => {
    userLocationRef.current = userLocation;
  }, [userLocation]);

  const upsertAlert = useCallback(
    (incoming: Alert) => {
      setAlerts((prev) => {
        const idx = prev.findIndex((a) => a.alert_id === incoming.alert_id);
        let next: Alert[];
        if (idx >= 0) {
          next = [...prev];
          next[idx] = incoming;
        } else {
          next = [...prev, incoming];
        }
        // Cap list size — remove oldest
        if (next.length > MAX_ALERT_CARDS) {
          next = next.slice(next.length - MAX_ALERT_CARDS);
        }
        return next;
      });
    },
    [setAlerts]
  );

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
          checkProximity(alert);
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
  }, [setWsStatus, setIsLiveMode, upsertAlert, checkProximity]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
