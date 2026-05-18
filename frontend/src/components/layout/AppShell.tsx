import { CommandMenuMock } from './CommandMenuMock';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import type { AppShellProps } from './types';

export function AppShell({ children, showCommandMenu = true }: AppShellProps) {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <TopBar />
      <Sidebar />
      <main className="md:ml-[240px] pt-16 px-6 pb-20 w-full max-w-[1440px] mx-auto min-h-screen">
        <div className="pt-8">{children}</div>
      </main>
      {showCommandMenu && <CommandMenuMock />}
    </div>
  );
}
