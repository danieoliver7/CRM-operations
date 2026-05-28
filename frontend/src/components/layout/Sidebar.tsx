import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  CalendarDays,
  Kanban,
  LayoutDashboard,
  Megaphone,
} from 'lucide-react';
import { cn } from '@/utils/cn';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Campaigns', icon: Megaphone, path: '/campaigns' },
  { label: 'Kanban', icon: Kanban, path: '/kanban' },
  { label: 'Calendar', icon: CalendarDays, path: '/calendar' },
  { label: 'Analytics', icon: BarChart3, path: '/analytics' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <nav className="fixed left-0 top-14 z-40 hidden h-[calc(100vh-3.5rem)] w-[240px] min-w-[240px] flex-col gap-2 overflow-y-auto border-r border-outline bg-surface-container-low py-6 md:flex">
      <div className="px-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-white">M</div>
          <span className="font-bold text-sm tracking-tight text-on-surface">MARKET.OS</span>
        </div>
      </div>

      <div className="flex flex-col flex-1 px-3 space-y-1">
        <div className="text-[11px] font-bold text-on-surface-variant uppercase px-3 py-2">WORKSPACE</div>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2 text-sm transition-all duration-200 border-l-2',
                isActive
                  ? 'bg-primary/10 text-on-primary-container border-primary'
                  : 'text-on-surface-variant hover:text-on-surface border-transparent',
              )}
            >
              <item.icon className="w-4 h-4 opacity-70" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="text-[11px] font-bold text-on-surface-variant uppercase px-3 py-2 mt-6">CAMPAIGNS</div>
        {['Retention_Q3', 'Black_Friday_Dev', 'New_Feature_Push'].map((campaign) => (
          <button
            key={campaign}
            className="flex w-full min-w-0 items-center gap-3 px-3 py-2 text-left text-sm text-on-surface-variant transition-colors hover:text-on-surface"
          >
            <span className="opacity-70 font-mono">#</span>
            <span className="truncate">{campaign}</span>
          </button>
        ))}

      </div>

      <div className="p-4 border-t border-outline">
        <div className="flex min-w-0 cursor-pointer items-center space-x-3 rounded bg-surface-container-high p-2 transition-colors hover:bg-surface-container-highest">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">JD</div>
          <div className="truncate text-xs font-medium text-on-surface">John Doe</div>
        </div>
      </div>
    </nav>
  );
}
