import React, { useState, useEffect, useCallback } from 'react';
import { MEETING_CONFIG, TEXTS } from './constants';
import { ProgressBar } from './components/ProgressBar';
import { HelpCard } from './components/HelpCard';
import { Loader2, HelpCircle, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(MEETING_CONFIG.redirectDelaySeconds * 100); // Using 100ms intervals for smoother bar
  const [isPaused, setIsPaused] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const performRedirect = useCallback(() => {
    window.location.href = MEETING_CONFIG.url;
  }, []);

  useEffect(() => {
    // If help is shown or paused, do not tick down
    if (showHelp || isPaused) return;

    if (timeLeft <= 0) {
      performRedirect();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 10)); // Decrease by 10 (100ms)
    }, 100);

    return () => clearInterval(interval);
  }, [timeLeft, isPaused, showHelp, performRedirect]);

  const handleHelpClick = () => {
    setIsPaused(true);
    setShowHelp(true);
  };

  const handleCloseHelp = () => {
    setShowHelp(false);
    setIsPaused(false);
    // Reset timer partially to give user a moment upon return, or let it continue
    setTimeLeft(300); // Give them 3 seconds before auto-redirect resumes
  };

  const progressPercentage = 100 - ((timeLeft / (MEETING_CONFIG.redirectDelaySeconds * 100)) * 100);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-100 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>

      <div className="z-10 w-full flex justify-center">
        {showHelp ? (
          <HelpCard onClose={handleCloseHelp} onJoinNow={performRedirect} />
        ) : (
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100 w-full max-w-lg text-center animate-fade-in">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-100 rounded-full animate-ping opacity-75"></div>
                <div className="relative bg-white p-4 rounded-full shadow-sm border border-slate-100">
                  <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
                </div>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              {TEXTS.title}
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {TEXTS.subtitle}
            </p>

            <ProgressBar progress={progressPercentage} />

            <div className="flex flex-col gap-4 mt-8">
              <button 
                onClick={performRedirect}
                className="w-full flex items-center justify-center gap-2 text-brand-600 font-medium py-2 px-4 rounded-lg hover:bg-brand-50 transition-colors"
              >
                <ExternalLink size={18} />
                <span>Öppna omedelbart</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-400">eller</span>
                </div>
              </div>

              <button
                onClick={handleHelpClick}
                className="group flex items-center justify-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mt-2 text-sm md:text-base"
              >
                <HelpCircle size={18} className="group-hover:text-brand-600 transition-colors" />
                <span className="underline decoration-slate-300 underline-offset-4 group-hover:decoration-brand-600 transition-all">
                  {TEXTS.helpTrigger}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="absolute bottom-6 text-center text-slate-400 text-sm">
        Säker omdirigering till Zoom
      </footer>
    </div>
  );
};

export default App;