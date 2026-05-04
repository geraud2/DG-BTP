import { useState, useEffect } from 'react';
import { HardHat, Building2, Wrench, Hammer } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

export default function SplashScreen({ onFinish, duration = 2800 }: SplashScreenProps) {
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animation de la barre de progression
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    // Déclenchement du fade out
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, duration - 400);

    // Fin du splashscreen
    const hideTimer = setTimeout(() => {
      onFinish();
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [onFinish, duration]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-opacity duration-500 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Grille de fond décorative */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-amber-400/40 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-amber-300/30 rounded-full animate-ping" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-amber-400/30 rounded-full animate-ping" style={{ animationDelay: '1s', animationDuration: '3s' }} />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-amber-300/20 rounded-full animate-ping" style={{ animationDelay: '0.3s', animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-amber-400/40 rounded-full animate-ping" style={{ animationDelay: '0.8s', animationDuration: '3.5s' }} />
      </div>

      {/* Contenu central */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo / Icône */}
        <div className="relative mb-8">
          {/* Anneau externe animé */}
          <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute -inset-4 rounded-full border border-amber-500/20 animate-pulse" style={{ animationDuration: '3s' }} />
          
          {/* Cercle principal */}
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-2xl shadow-amber-500/30">
            <HardHat size={48} className="text-white sm:size-56" strokeWidth={1.5} />
          </div>
        </div>

        {/* Outils animés */}
        <div className="flex items-center gap-5 mb-8">
          <div className="animate-bounce" style={{ animationDelay: '0s' }}>
            <div className="p-2.5 rounded-xl bg-white/5 backdrop-blur-sm">
              <Wrench size={24} className="text-amber-400 sm:size-28" />
            </div>
          </div>
          <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
              <Building2 size={28} className="text-white sm:size-32" />
            </div>
          </div>
          <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>
            <div className="p-2.5 rounded-xl bg-white/5 backdrop-blur-sm">
              <Hammer size={24} className="text-amber-400 sm:size-28" />
            </div>
          </div>
        </div>

        {/* Titre */}
        <div className="text-center mb-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            BTP Stock
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-amber-400">
            Manager
          </p>
        </div>

        {/* Sous-titre */}
        <p className="text-sm sm:text-base text-gray-400 font-medium mb-8 tracking-wide">
          Direction Générale
        </p>

        {/* Barre de progression */}
        <div className="w-56 sm:w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Pourcentage */}
        <p className="text-xs text-gray-500 mt-2 font-medium">
          {Math.round(progress)}%
        </p>

        {/* Tagline */}
        <p className="mt-8 text-xs text-gray-600 font-medium tracking-wider uppercase">
          Gérez vos chantiers en toute simplicité
        </p>
      </div>

      {/* Version */}
      <div className="absolute bottom-8 text-xs text-gray-600">
        v1.0.0
      </div>
    </div>
  );
}