import React from 'react';
import { MEETING_CONFIG, TEXTS } from '../constants';
import { Video, ArrowLeft } from 'lucide-react';

interface HelpCardProps {
  onBack: () => void;
  onJoinNow: () => void;
}

export const HelpCard: React.FC<HelpCardProps> = ({ onBack, onJoinNow }) => {
  return (
    <div className="w-full animate-fade-in">
      <h2 className="text-2xl font-semibold text-brand-800 mb-2 text-center">
        {TEXTS.helpTitle}
      </h2>
      
      <p className="text-slate-600 text-center mb-8">
        {TEXTS.helpDesc}
      </p>

      <div className="bg-white border border-brand-100 rounded-xl p-6 mb-8 shadow-sm">
        <h3 className="font-semibold text-slate-700 mb-4">Gör så här:</h3>
        <ol className="list-decimal list-inside space-y-3 text-slate-600 text-sm md:text-base">
          <li>Öppna <strong>Zoom</strong>-appen på din enhet.</li>
          <li>Välj "Join Meeting".</li>
          <li>
            Om du blir tillfrågad om lösenkod, skriv:
            <div className="mt-2 inline-block bg-brand-50 text-brand-700 font-mono font-bold text-xl px-4 py-1 rounded border border-brand-200">
              {MEETING_CONFIG.passcode}
            </div>
          </li>
        </ol>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onJoinNow}
          className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-sm"
        >
          <Video size={20} />
          {TEXTS.manualJoinButton}
        </button>
        
        <button
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-brand-600 font-medium py-2 px-4 transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          {TEXTS.backButton}
        </button>
      </div>
    </div>
  );
};