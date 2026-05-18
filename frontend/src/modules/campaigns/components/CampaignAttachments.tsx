import { ExternalLink, FileArchive, FileCode2, FileText, Image, PlusCircle } from 'lucide-react';
import type { Campaign } from '@/types/campaign';

interface CampaignAttachmentsProps {
  campaign: Campaign;
}

export function CampaignAttachments({ campaign }: CampaignAttachmentsProps) {
  const attachments = [
    { name: `${campaign.channel}-final-v2.html`, type: 'HTML', icon: FileCode2 },
    { name: 'hero-banner.png', type: 'Image', icon: Image },
    { name: 'copy-approved.docx', type: 'Copy', icon: FileText },
    { name: `${campaign.squad.toLowerCase()}-assets.zip`, type: 'Assets', icon: FileArchive },
  ];

  return (
    <section className="glass p-6 rounded-2xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold tracking-tight">Attachments</h3>
          <p className="text-xs text-on-surface-variant mt-1">Mocked working files for implementation and QA.</p>
        </div>
        <span className="text-xs font-bold text-on-surface-variant cursor-pointer hover:text-primary transition-colors uppercase tracking-widest">
          Manage Files ({attachments.length})
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {attachments.map((attachment) => {
          const Icon = attachment.icon;

          return (
            <div key={attachment.name} className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 flex items-center gap-3 hover:border-primary/30 transition-all group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold truncate">{attachment.name}</p>
                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tight mt-0.5">{attachment.type}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
            </div>
          );
        })}

        <div className="p-4 rounded-xl border-2 border-dashed border-outline-variant flex items-center gap-3 text-on-surface-variant hover:border-primary/50 hover:text-primary transition-all cursor-pointer group">
          <PlusCircle className="w-5 h-5 opacity-40 group-hover:opacity-100" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Add Asset</span>
        </div>
      </div>
    </section>
  );
}
