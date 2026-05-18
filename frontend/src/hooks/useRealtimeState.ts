import { useCallback, useRef, useState } from 'react';
import type { ConnectionStatus } from '@/types';

export function useRealtimeState(defaultStatus: ConnectionStatus = 'idle') {
  const [status, setStatus] = useState<ConnectionStatus>(defaultStatus);
  const [lastEventAt, setLastEventAt] = useState<Date | null>(null);
  const eventCountRef = useRef(0);

  const markConnecting = useCallback(() => setStatus('connecting'), []);
  const markConnected = useCallback(() => setStatus('connected'), []);
  const markDisconnected = useCallback(() => setStatus('disconnected'), []);
  const markError = useCallback(() => setStatus('error'), []);

  const recordEvent = useCallback(() => {
    eventCountRef.current += 1;
    setLastEventAt(new Date());
  }, []);

  return {
    status,
    lastEventAt,
    eventCount: eventCountRef.current,
    isConnected: status === 'connected',
    markConnecting,
    markConnected,
    markDisconnected,
    markError,
    recordEvent,
  };
}
