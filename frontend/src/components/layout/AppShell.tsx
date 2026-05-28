import { CommandMenuMock } from './CommandMenuMock';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import type { AppShellProps } from './types';
import { CampaignCreationModal, useCampaignCreation } from '@/modules/campaigns';

export function AppShell({ children, showCommandMenu = true }: AppShellProps) {
  const {
    closeCampaignCreation,
    handleCreateCampaign,
    isCreationOpen,
    openCampaignCreation,
  } = useCampaignCreation();

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-surface">
      <TopBar onNewCampaign={openCampaignCreation} />
      <Sidebar />
      <main className="min-h-screen w-full min-w-0 overflow-x-hidden pt-14 pb-20 md:pl-[240px]">
        <div className="mx-auto w-full max-w-[1440px] min-w-0 px-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
          {children}
        </div>
      </main>
      {showCommandMenu && <CommandMenuMock />}
      <CampaignCreationModal
        open={isCreationOpen}
        onClose={closeCampaignCreation}
        onCreate={handleCreateCampaign}
      />
    </div>
  );
}
