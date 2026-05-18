export type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error';

export interface RealtimePresenceUser {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
}
