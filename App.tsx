import React, { useState, useEffect, useCallback } from 'react';
import { MEETING_CONFIG, TEXTS } from './constants';
import { ProgressBar } from './components/ProgressBar';
import { HelpCard } from './components/HelpCard';
import { Loader2, HelpCircle } from 'lucide-react';

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(MEETING_CONFIG.redirectDelaySeconds * 100); 
  const [isPaused, setIsPaused] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const performRedirect = useCallback(() => {
    window.location.href = MEETING_CONFIG.url;
  }, []);

  useEffect(() => {
    if (showHelp || isPaused) return;

    if (timeLeft <= 0) {
      performRedirect();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 10)); // Tick every 100ms
    }, 100);

    return () => clearInterval(interval);
  }, [timeLeft, isPaused, showHelp, performRedirect]);

  const handleHelpClick = () => {
    setIsPaused(true);
    setShowHelp(true);
  };

  const handleBack = () => {
    setShowHelp(false);
    setIsPaused(false);
    // Optional: Reset timer a bit so they don't immediately jump away upon return
    setTimeLeft(300); 
  };

  const progressPercentage = 100 - ((timeLeft / (MEETING_CONFIG.redirectDelaySeconds * 100)) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white ring-1 ring-brand-100">
        
        {showHelp ? (
          <HelpCard onBack={handleBack} onJoinNow={performRedirect} />
        ) : (
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="bg-brand-50 p-4 rounded-full">
                <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-brand-800 mb-2">
              {TEXTS.title}
            </h1>
            
            <p className="text-slate-600 mb-8 font-medium">
              {TEXTS.subtitle}
            </p>

            <ProgressBar progress={progressPercentage} />

            <button
              onClick={handleHelpClick}
              className="mt-8 group flex items-center justify-center gap-2 w-full text-slate-400 hover:text-brand-600 transition-colors text-sm"
            >
              <HelpCircle size={16} />
              <span className="underline decoration-transparent group-hover:decoration-brand-600 underline-offset-4 transition-all">
                {TEXTS.helpTrigger}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;