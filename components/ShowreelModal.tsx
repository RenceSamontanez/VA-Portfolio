"use client";

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 backdrop-blur-md p-4 sm:p-8">
      <div className="relative w-full max-w-5xl bg-obsidian border border-hairline p-4 sm:p-6 shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-hairline font-mono text-xs">
          <span className="text-violet tracking-widest">// SHOWREEL 2026 — RENCE SAMONTAÑEZ</span>
          <button
            onClick={onClose}
            className="text-ash hover:text-bone tracking-widest transition-colors"
          >
            [CLOSE ESC]
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-video w-full bg-void border border-hairline flex items-center justify-center overflow-hidden">
          {/* Replace src with your actual video or video host */}
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="Showreel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Footer Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-4 border-t border-hairline font-mono text-[10px] text-ash">
          <div>DURATION: 01:42</div>
          <div>STACK: NEXT.JS · R3F · GSAP · SUPABASE · AI AGENTS</div>
          <div>STATUS: AVAILABLE FOR CONTRACT</div>
        </div>
      </div>
    </div>
  );
}