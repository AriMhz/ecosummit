import React, { useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';

interface DemoProtectionProps {
  /**
   * Set to true to activate anti-theft deterrents (blocks right-click, F12, Ctrl+U, Ctrl+S, Inspect)
   */
  enabled?: boolean;
  /**
   * Shows a sleek "Client Review Demo" watermark banner at the top
   */
  showWatermark?: boolean;
  /**
   * Optional expiry date in YYYY-MM-DD format. After this date, site displays demo expired message.
   */
  expiryDate?: string;
  /**
   * Client or project name to display on the watermark
   */
  clientName?: string;
}

export const DemoProtection: React.FC<DemoProtectionProps> = ({
  enabled = true,
  showWatermark = true,
  expiryDate,
  clientName = 'EcoSummit Nepal Demo',
}) => {
  const isExpired = expiryDate ? new Date() > new Date(expiryDate) : false;

  useEffect(() => {
    if (!enabled) return;

    // 1. Block Context Menu (Right Click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Block DevTools & Source Download Key Combinations
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 (DevTools)
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+U or Cmd+U (View Page Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+S or Cmd+S (Save Webpage to Disk)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+I / Cmd+Option+I (Inspect Element)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === 'i' || e.key === 'I')
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+J / Cmd+Option+J (Console)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === 'j' || e.key === 'J')
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+C / Cmd+Option+C (Inspect Picker)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === 'c' || e.key === 'C')
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 3. Block Dragging of Images / Assets
    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };

    // 4. Console deterrent warning message
    console.clear();
    console.log(
      '%c⚠️ CLIENT REVIEW DEMO — PROPRIETARY & CONFIDENTIAL',
      'color: #C8A97A; font-size: 18px; font-weight: bold; background: #0E1A14; padding: 8px 14px; border-radius: 6px; border: 1px solid #C8A97A;'
    );
    console.log(
      '%cThis website is an active client preview. Unauthorized cloning, code scraping, decompiling, or downloading is strictly prohibited by copyright law.\nContact the lead developer for source code deployment and licensing.',
      'color: #888; font-size: 12px; line-height: 1.5;'
    );

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('dragstart', handleDragStart);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('dragstart', handleDragStart);
    };
  }, [enabled]);

  // If expired, lock the screen politely
  if (enabled && isExpired) {
    return (
      <div className="fixed inset-0 z-[99999] bg-[#0E1A14] flex items-center justify-center p-6 text-center text-white select-none">
        <div className="max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-[#C8A97A]/20 border border-[#C8A97A]/40 flex items-center justify-center mx-auto mb-5 text-[#C8A97A]">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mb-2">
            Client Preview Expired
          </h2>
          <p className="text-white/65 text-sm leading-relaxed mb-6">
            The temporary review period for this demonstration build has concluded.
            Please contact your development partner to finalize deployment and transfer production access.
          </p>
          <div className="py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#C8A97A]">
            {clientName} • Demo Build
          </div>
        </div>
      </div>
    );
  }

  if (!enabled || !showWatermark) return null;

  return (
    <>
      {/* ── Client Review Floating Watermark Badge ── */}
      <aside 
        aria-label="Client demo preview mode"
        className="fixed bottom-4 left-4 z-[999] pointer-events-auto select-none"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0E1A14]/90 border border-[#C8A97A]/50 text-white shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#C8A97A] animate-pulse" />
          <span className="text-[11px] font-mono tracking-wider text-[#C8A97A] font-semibold uppercase">
            Client Review Preview
          </span>
          <span className="text-white/30 text-[10px]">|</span>
          <span className="text-white/60 text-[10.5px]">Confidential Demo</span>
        </div>
      </aside>
    </>
  );
};
