import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

interface BottomNavProps {
  notificationCount?: number;
}

interface PlusItem {
  path: string;
  label: string;
  color: string;
  icon: JSX.Element;
  badge?: number;
}

export default function BottomNav({ notificationCount = 0 }: BottomNavProps) {
  const [plusOpen, setPlusOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setPlusOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mainItems = [
    {
      path: '/',
      label: 'Accueil',
      exact: true,
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#4CAF50' : '#9CA3AF'} strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" fill={active ? '#dcfce7' : 'none'} />
          <path d="M9 21V12h6v9" />
        </svg>
      ),
    },
    {
      path: '/analytics',
      label: 'Stats',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#4CAF50' : '#9CA3AF'} strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <rect x="3" y="10" width="4" height="8" rx="1" fill={active ? '#dcfce7' : 'none'} />
          <rect x="10" y="6" width="4" height="12" rx="1" fill={active ? '#dcfce7' : 'none'} />
          <rect x="17" y="13" width="4" height="5" rx="1" fill={active ? '#dcfce7' : 'none'} />
        </svg>
      ),
    },
    {
      path: '/demandes',
      label: 'Demandes',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#4CAF50' : '#9CA3AF'} strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h4v4" />
          <path d="M14 10l6-6" />
          <path d="M8 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
          <circle cx="9" cy="12" r="1" fill={active ? '#4CAF50' : '#9CA3AF'} stroke="none" />
          <circle cx="13" cy="16" r="1" fill={active ? '#4CAF50' : '#9CA3AF'} stroke="none" />
          <path d="M9 12h8M13 16h4" />
        </svg>
      ),
    },
    {
      path: '/personnel',
      label: 'Équipe',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#4CAF50' : '#9CA3AF'} strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="7" r="3" fill={active ? '#dcfce7' : 'none'} />
          <path d="M2 21v-2a5 5 0 0 1 4-3.5" />
          <circle cx="16" cy="9" r="2.5" fill={active ? '#dcfce7' : 'none'} />
          <path d="M22 21v-2a4 4 0 0 0-3-3.5" />
          <path d="M9 14a5 5 0 0 1 6 0v3H3v-3a5 5 0 0 1 6 0z" fill={active ? '#dcfce7' : 'none'} strokeWidth={active ? 2 : 1.5} />
        </svg>
      ),
    },
  ];

  const plusItems: PlusItem[] = [
    {
      path: '/taches',
      label: 'Tâches',
      color: '#3B82F6',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      ),
    },
    {
      path: '/conges',
      label: 'Congés',
      color: '#8B5CF6',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
        </svg>
      ),
    },
    {
      path: '/chat',
      label: 'Chat',
      color: '#06B6D4',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      path: '/notifications',
      label: 'Alertes',
      color: '#F59E0B',
      badge: notificationCount,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Overlay */}
      {plusOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setPlusOpen(false)}
        />
      )}

      {/* Popup Plus */}
      {plusOpen && (
        <div 
          ref={menuRef}
          className="fixed bottom-20 left-4 right-4 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 animate-slide-up"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
        >
          <div className="grid grid-cols-4 gap-2">
            {plusItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setPlusOpen(false);
                }}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 active:scale-95 transition-all"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center relative" 
                  style={{ backgroundColor: `${item.color}12` }}>
                  {item.icon}
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full shadow-sm ring-2 ring-white">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-medium text-gray-600">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t bg-white/95 backdrop-blur-xl border-gray-200" 
        style={{ 
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.04)'
        }}
      >
        <div className="flex justify-around items-center h-16">
          {mainItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={() => setPlusOpen(false)}
              className="relative flex flex-col items-center justify-center flex-1 h-full group"
            >
              {({ isActive }) => (
                <>
                  {isActive && <div className="absolute inset-1 bg-green-50 rounded-lg" />}
                  <div className={`relative transition-all duration-300 ${isActive ? '-translate-y-0.5' : 'group-hover:-translate-y-0.5'}`}>
                    {item.icon(isActive)}
                  </div>
                  <span className={`relative text-[10.5px] font-semibold mt-1 transition-all ${isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-500'}`}>
                    {item.label}
                  </span>
                  {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-green-500 rounded-full" />}
                </>
              )}
            </NavLink>
          ))}

          {/* Bouton Plus - Icône 4 points en grille */}
          <button
            onClick={() => setPlusOpen(!plusOpen)}
            className="relative flex flex-col items-center justify-center flex-1 h-full group"
          >
            <div className={`relative transition-all duration-300 ${plusOpen ? '-translate-y-0.5' : 'group-hover:-translate-y-0.5'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                plusOpen ? 'bg-green-500 shadow-lg shadow-green-200' : 'bg-gray-100 group-hover:bg-gray-200'
              }`}>
                <svg 
                  width="20" height="20" viewBox="0 0 24 24" fill="none" 
                  stroke={plusOpen ? 'white' : '#9CA3AF'} 
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="transition-all duration-300"
                >
                  <circle cx="8" cy="8" r="2" fill={plusOpen ? 'white' : '#9CA3AF'} stroke="none" />
                  <circle cx="16" cy="8" r="2" fill={plusOpen ? 'white' : '#9CA3AF'} stroke="none" />
                  <circle cx="8" cy="16" r="2" fill={plusOpen ? 'white' : '#9CA3AF'} stroke="none" />
                  <circle cx="16" cy="16" r="2" fill={plusOpen ? 'white' : '#9CA3AF'} stroke="none" />
                </svg>
              </div>
            </div>
            <span className={`text-[10.5px] font-semibold mt-1 transition-all ${plusOpen ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-500'}`}>
              
            </span>
            {plusOpen && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-green-500 rounded-full" />}
          </button>
        </div>
      </nav>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}