export function CommandMenuMock() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-[500px] glass shadow-2xl rounded-2xl p-4 flex items-center gap-4 border border-primary/20 z-50 pointer-events-auto hover:border-primary/40 transition-all cursor-text group">
      <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
        <span className="text-primary font-black text-xs">GO</span>
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none mb-1">
          Operational Shortcuts
        </p>
        <p className="text-xs text-on-surface-variant font-medium">
          Press{' '}
          <kbd className="px-1.5 py-0.5 bg-surface-container-highest rounded border border-outline-variant text-[9px] font-mono mx-0.5">
            ⌘
          </kbd>{' '}
          <kbd className="px-1.5 py-0.5 bg-surface-container-highest rounded border border-outline-variant text-[9px] font-mono mx-0.5">
            K
          </kbd>{' '}
          to search commands...
        </p>
      </div>
      <div className="flex gap-2">
        <div className="h-8 w-8 rounded-lg bg-surface-container-highest flex items-center justify-center border border-outline-variant/30">
          <div className="w-1 h-1 rounded-full bg-primary" />
        </div>
        <div className="h-8 w-8 rounded-lg bg-surface-container-highest flex items-center justify-center border border-outline-variant/30">
          <div className="w-1 h-1 rounded-full bg-secondary" />
        </div>
      </div>
    </div>
  );
}
