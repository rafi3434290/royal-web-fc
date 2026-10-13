import React, { useEffect, useState } from 'react';
import { X, Bell, ExternalLink, Sparkles, Megaphone } from 'lucide-react';
import { AnnouncementItem } from '../types';
import { SERVER_CONFIG } from '../data/serverData';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcements?: AnnouncementItem[];
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ 
  isOpen, 
  onClose,
  announcements: propAnnouncements,
}) => {
  const [localAnnouncements, setLocalAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    if (propAnnouncements && propAnnouncements.length > 0) {
      setLocalAnnouncements(propAnnouncements);
      return;
    }

    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/announcements');
        const data = await res.json();
        if (Array.isArray(data)) {
          setLocalAnnouncements(data);
        }
      } catch {
        // Fallback already handled
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, [isOpen, propAnnouncements]);

  if (!isOpen) return null;

  const displayList = propAnnouncements && propAnnouncements.length > 0 ? propAnnouncements : localAnnouncements;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-xl max-h-[85vh] bg-[#0A0E18] border border-[#D4AF37]/35 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_60px_rgba(0,0,0,0.9)] z-10">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
                <Bell size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                  KINGDOM CHRONICLES
                </span>
                <h3 className="font-brand text-xl font-bold text-white">
                  Server Announcements &amp; Updates
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Announcements Feed */}
          <div className="my-6 space-y-4 max-h-[50vh] overflow-y-auto pr-1">
            {loading ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                Consulting kingdom scrolls...
              </div>
            ) : displayList.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                No new announcements at this hour.
              </div>
            ) : (
              displayList.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-slate-900/75 border border-slate-800 hover:border-[#D4AF37]/40 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#FDE68A] border border-[#D4AF37]/25 uppercase">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {item.date}
                    </span>
                  </div>
                  <h4 className="font-brand text-base font-bold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                    {item.content}
                  </p>
                  <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                    <span>By {item.author || 'Royal SMP Administration'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Discord Link */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">Join Discord for instant notifications</span>
          <a
            href={SERVER_CONFIG.discordInvite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Open Discord</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
