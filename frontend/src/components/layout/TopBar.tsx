import { cn } from '@/utils/cn';

interface TopBarProps {
  onNewCampaign?: () => void;
}

export function TopBar({ onNewCampaign }: TopBarProps) {
  return (
    <header className="h-14 bg-surface border-b border-outline top-0 z-50 fixed flex justify-between items-center px-6 w-full">
      <div className="flex items-center space-x-4 text-sm font-medium">
        <span className="text-on-surface-variant">MARKET.OS</span>
        <span className="text-outline">/</span>
        <span className="text-on-surface">Operations Dashboard</span>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center space-x-4 text-sm font-medium text-on-surface-variant">
          <div className="flex items-center space-x-2">
            <span className="opacity-50">⌘</span>
            <span className="opacity-50">K</span>
            <span className="ml-2 text-[11px] uppercase tracking-tighter">Search</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex -space-x-2">
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
            className="bg-primary hover:bg-primary/90 text-white text-xs px-3 py-1.5 rounded font-medium transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            + New Campaign
          </button>
        </div>
      </div>
    </header>
  );
}
