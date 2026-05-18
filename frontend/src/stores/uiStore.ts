import { create } from 'zustand';

interface UiState {
  isSidebarOpen: boolean;
  isCommandMenuOpen: boolean;
  activeModal: string | null;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  openCommandMenu: () => void;
  closeCommandMenu: () => void;
  toggleCommandMenu: () => void;
  setActiveModal: (modalId: string | null) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isSidebarOpen: false,
  isCommandMenuOpen: false,
  activeModal: null,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  openCommandMenu: () => set({ isCommandMenuOpen: true }),
  closeCommandMenu: () => set({ isCommandMenuOpen: false }),
  toggleCommandMenu: () => set((state) => ({ isCommandMenuOpen: !state.isCommandMenuOpen })),
  setActiveModal: (activeModal) => set({ activeModal }),
}));
