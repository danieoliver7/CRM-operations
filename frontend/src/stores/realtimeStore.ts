import { create } from 'zustand';
import type { ConnectionStatus, RealtimePresenceUser } from '@/types';

interface RealtimeState {
  status: ConnectionStatus;
  presenceUsers: RealtimePresenceUser[];
  lastEventAt: Date | null;
  setStatus: (status: ConnectionStatus) => void;
  setPresenceUsers: (users: RealtimePresenceUser[]) => void;
  recordEvent: () => void;
  resetRealtime: () => void;
}

export const useRealtimeStore = create<RealtimeState>((set) => ({
  status: 'idle',
  presenceUsers: [],
  lastEventAt: null,
  setStatus: (status) => set({ status }),
  setPresenceUsers: (presenceUsers) => set({ presenceUsers }),
  recordEvent: () => set({ lastEventAt: new Date() }),
  resetRealtime: () =>
    set({
      status: 'idle',
      presenceUsers: [],
      lastEventAt: null,
    }),
}));
