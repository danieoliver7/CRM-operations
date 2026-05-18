import { CheckCircle2 } from 'lucide-react';

interface CampaignWorkspaceToastProps {
  message: string | null;
}

export function CampaignWorkspaceToast({ message }: CampaignWorkspaceToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 glass rounded-xl border border-primary/30 px-4 py-3 shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-300">
      <CheckCircle2 className="w-4 h-4 text-green-400" />
      <span className="text-xs font-bold text-on-surface">{message}</span>
    </div>
  );
}
