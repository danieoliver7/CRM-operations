import { cn } from '@/utils/cn';

interface TopBarProps {
  onNewCampaign?: () => void;
}

export function TopBar({ onNewCampaign }: TopBarProps) {
  return (
    <header className="fixed top-0 z-50 flex h-14 w-full min-w-0 items-center justify-between gap-3 border-b border-outline bg-surface px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-2 text-sm font-medium sm:gap-4">
        <span className="shrink-0 text-on-surface-variant">MARKET.OS</span>
        <span className="hidden text-outline sm:inline">/</span>
        <span className="hidden min-w-0 truncate text-on-surface sm:inline">Operations Dashboard</span>
      </div>

      <div className="flex min-w-0 shrink-0 items-center gap-3 sm:gap-6">
        <div className="hidden md:flex items-center space-x-4 text-sm font-medium text-on-surface-variant">
          <div className="flex items-center space-x-2">
            <span className="opacity-50">⌘</span>
            <span className="opacity-50">K</span>
            <span className="ml-2 text-[11px] uppercase tracking-tighter">Search</span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden -space-x-2 sm:flex">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={cn(
                  'w-6 h-6 rounded-full border-2 border-surface',
                  item === 1 ? 'bg-orange-400' : item === 2 ? 'bg-blue-400' : 'bg-green-400',
                )}
              />
            ))}
          </div>
          <button
            onClick={onNewCampaign}
            className="shrink-0 rounded bg-primary px-3 py-1.5 text-xs font-medium text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95"
          >
            <span className="sm:hidden">New</span>
            <span className="hidden sm:inline">+ New Campaign</span>
          </button>
        </div>
      </div>
    </header>
  );
}
