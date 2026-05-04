import { Link } from 'react-router-dom';
import { Bell, Search, Wifi, WifiOff, Menu } from 'lucide-react';

interface HeaderProps {
  notificationCount: number;
  onMenuToggle: () => void;
}

export default function Header({ notificationCount, onMenuToggle }: HeaderProps) {
  // Simulation du statut en ligne
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-14 sm:h-16">
      <div className="flex items-center justify-between h-full px-3 sm:px-4 lg:px-6">
        {/* Gauche */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Burger menu - visible mobile seulement */}
          <button 
            onClick={onMenuToggle} 
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors -ml-1"
            aria-label="Menu"
          >
            <Menu size={20} className="text-gray-600" />
          </button>

          {/* Barre de recherche - cachée sur mobile */}
          <div className="relative hidden md:block">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-9 pr-4 py-2 w-48 lg:w-64 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
            />
          </div>
        </div>

        {/* Droite */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Statut connexion */}
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
            isOnline ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
          }`}>
            {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
            <span className="hidden sm:inline">{isOnline ? 'En ligne' : 'Hors ligne'}</span>
          </div>

          {/* Icône recherche mobile */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Search size={20} className="text-gray-600" />
          </button>

          {/* Notifications */}
          <Link to="/notifications" className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-600" />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </Link>

          {/* Profil utilisateur */}
          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-gray-200">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] sm:text-xs font-bold text-white">DG</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 leading-tight">Directeur</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}