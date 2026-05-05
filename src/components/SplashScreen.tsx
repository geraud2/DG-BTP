import { useState, useEffect } from 'react';
import { Building2, Users, FileText, Briefcase, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

export default function SplashScreen({ onFinish, duration = 2800 }: SplashScreenProps) {
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowContent(true), 200);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(progressInterval); return 100; }
        return prev + 2;
      });
    }, duration / 50);

    const fadeTimer = setTimeout(() => setIsFading(true), duration - 400);
    const hideTimer = setTimeout(() => onFinish(), duration);

    return () => { clearTimeout(showTimer); clearInterval(progressInterval); clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, [onFinish, duration]);

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#0a0a1a] transition-all duration-700 ${isFading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}>
      
      {/* Grille de fond */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* Particules */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-amber-400/50 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-amber-300/40 rounded-full animate-ping" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-amber-400/40 rounded-full animate-ping" style={{ animationDelay: '1s', animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-amber-300/30 rounded-full animate-ping" style={{ animationDelay: '0.7s', animationDuration: '4s' }} />
        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-amber-400/30 rounded-full animate-ping" style={{ animationDelay: '1.2s', animationDuration: '3.5s' }} />
      </div>

      {/* Contenu avec animation d'entrée */}
      <div className={`relative z-10 flex flex-col items-center transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        {/* Logo */}
        <div className="relative mb-10">
          <div className="absolute -inset-8 rounded-full border border-amber-500/10 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute -inset-4 rounded-full border-2 border-amber-500/20 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 blur-xl animate-pulse" />
          
          <div className="relative w-28 h-28 bg-gradient-to-br from-amber-500 to-amber-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-amber-500/40">
            <Building2 size={52} className="text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Icônes secondaires */}
        <div className="flex items-center gap-8 mb-10">
          <div className="animate-bounce" style={{ animationDelay: '0s' }}>
            <div className="p-3 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/5">
              <Users size={26} className="text-amber-400/80" />
            </div>
          </div>
          <div className="animate-bounce" style={{ animationDelay: '0.15s' }}>
            <div className="p-3.5 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/10">
              <Building2 size={30} className="text-white" />
            </div>
          </div>
          <div className="animate-bounce" style={{ animationDelay: '0.3s' }}>
            <div className="p-3 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/5">
              <Briefcase size={26} className="text-amber-400/80" />
            </div>
          </div>
        </div>

        {/* Titre */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Enterprise<span className="text-amber-500">Manager</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500/50" />
            <Sparkles size={16} className="text-amber-500" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>
          <p className="text-sm text-gray-500 mt-3 font-medium tracking-widest uppercase">Direction Générale</p>
        </div>

        {/* Barre de progression */}
        <div className="w-64 space-y-2.5">
          <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
            <div className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full transition-all duration-150 ease-linear shadow-lg shadow-amber-500/20" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-center text-xs text-gray-600 font-mono tracking-widest">{Math.round(progress)}%</p>
        </div>

        {/* Tagline */}
        <p className="mt-10 text-xs text-gray-700 font-medium tracking-[0.2em] uppercase">
          Pilotez votre entreprise
        </p>
      </div>

      {/* Version */}
      <div className="absolute bottom-8 text-xs text-gray-800 font-mono">v2.0.0</div>

      {/* Lueur en bas */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-amber-500/5 blur-3xl rounded-full" />
    </div>
  );
}