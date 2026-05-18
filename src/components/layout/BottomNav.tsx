import { NavLink } from 'react-router-dom';

interface BottomNavProps {
  notificationCount?: number;
}

export default function BottomNav({ notificationCount = 0 }: BottomNavProps) {
  const navItems = [
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
    {
      path: '/profil',
      label: 'Profil',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#4CAF50' : '#9CA3AF'} strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" fill={active ? '#dcfce7' : 'none'} />
          <path d="M20 21a8 8 0 0 0-16 0" fill={active ? '#dcfce7' : 'none'} />
        </svg>
      ),
      badge: notificationCount,
    },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t bg-white/95 backdrop-blur-xl border-gray-200" 
      style={{ 
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.04)'
      }}
    >
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className="relative flex flex-col items-center justify-center flex-1 h-full group"
          >
            {({ isActive }) => (
              <>
                {isActive && <div className="absolute inset-1 bg-green-50 rounded-lg" />}
                <div className={`relative transition-all duration-300 ${isActive ? '-translate-y-0.5' : 'group-hover:-translate-y-0.5'}`}>
                  {item.icon(isActive)}
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full shadow-sm ring-2 ring-white">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className={`relative text-[10.5px] font-semibold mt-1 transition-all ${isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-500'}`}>
                  {item.label}
                </span>
                {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-green-500 rounded-full" />}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}