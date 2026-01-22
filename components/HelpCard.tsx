import React from 'react';
import { MEETING_CONFIG, TEXTS } from '../constants';
import { Copy, Video, Smartphone } from 'lucide-react';

interface HelpCardProps {
  onClose: () => void;
  onJoinNow: () => void;
}

export const HelpCard: React.FC<HelpCardProps> = ({ onClose, onJoinNow }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a full app, we would show a toast here
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-lg mx-4 animate-fade-in">
      <div className="flex items-center justify-center mb-6">
        <div className="p-3 bg-amber-50 rounded-full text-amber-600">
          <Smartphone size={32} />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">
        {TEXTS.manualLoginTitle}
      </h2>
      
      <p className="text-slate-600 text-center mb-6">
        {TEXTS.manualLoginDesc}
      </p>

      <div className="space-y-4 mb-8">
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Mötes-ID (Meeting ID)</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-mono font-medium text-slate-900">{MEETING_CONFIG.meetingId}</span>
            <button 
              onClick={() => copyToClipboard(MEETING_CONFIG.meetingId.replace(/\s/g, ''))}
              className="text-brand-600 hover:text-brand-700 p-2 hover:bg-brand-50 rounded-md transition-colors"
              title="Kopiera ID"
            >
              <Copy size={18} />
            </button>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Lösenkod (Passcode)</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-mono font-medium text-slate-900">{MEETING_CONFIG.passcode}</span>
            <button 
               onClick={() => copyToClipboard(MEETING_CONFIG.passcode)}
               className="text-brand-600 hover:text-brand-700 p-2 hover:bg-brand-50 rounded-md transition-colors"
               title="Kopiera kod"
            >
              <Copy size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onJoinNow}
          className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg transform active:scale-[0.98]"
        >
          <Video size={20} />
          {TEXTS.joinButton}
        </button>
        
        <button
          onClick={onClose}
          className="w-full py-3 px-4 text-slate-500 hover:text-slate-700 font-medium transition-colors text-sm"
        >
          {TEXTS.cancelHelp}
        </button>
      </div>
    </div>
  );
};