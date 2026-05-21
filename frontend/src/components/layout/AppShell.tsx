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
    <div className="min-h-screen bg-surface flex flex-col">
      <TopBar onNewCampaign={openCampaignCreation} />
      <Sidebar />
      <main className="md:ml-[240px] pt-16 px-6 pb-20 w-full max-w-[1440px] mx-auto min-h-screen">
        <div className="pt-8">{children}</div>
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
