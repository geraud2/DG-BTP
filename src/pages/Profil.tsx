import { useNavigate } from 'react-router-dom';
import { useOnlineStatus } from '../hooks/useLocalStorage';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { notifications } from '../data/mockData';
import type { Notification } from '../data/mockData';

interface MenuItem {
  path: string;
  label: string;
  description: string;
  icon: JSX.Element;
  color: string;
  badge?: number;
}

interface ActivityItem {
  id: string;
  action: string;
  date: string;
  icon: JSX.Element;
  color: string;
}

export default function Profil() {
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const [notifs] = useLocalStorage<Notification[]>('notifications', notifications);
  const unreadCount = notifs.filter((n) => !n.read).length;

  const menuItems: MenuItem[] = [
    {
      path: '/taches',
      label: 'Tâches',
      description: 'Gérer les tâches et projets',
      color: '#3B82F6',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      ),
    },
    {
      path: '/conges',
      label: 'Congés',
      description: 'Calendrier des absences',
      color: '#8B5CF6',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      label: 'Messages',
      description: 'Conversations équipe',
      color: '#06B6D4',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      path: '/notifications',
      label: 'Alertes',
      description: 'Centre de notifications',
      color: '#F59E0B',
      badge: unreadCount,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
  ];

  const recentActivities: ActivityItem[] = [
    {
      id: '1',
      action: 'Demande de congé validée — Sophie Dubois',
      date: 'Aujourd\'hui, 09:30',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
      color: '#4CAF50',
    },
    {
      id: '2',
      action: 'Rapport Q1 finalisé — Pierre Durand',
      date: 'Hier, 16:45',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
      color: '#3B82F6',
    },
    {
      id: '3',
      action: 'Alerte : 2 incidents sécurité détectés',
      date: 'Hier, 14:20',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      color: '#F44336',
    },
  ];

  const statsData = [
    { 
      label: 'Employés', 
      value: '30', 
      color: '#3B82F6',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    { 
      label: 'Tâches', 
      value: '12', 
      color: '#F59E0B',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
        </svg>
      ),
    },
    { 
      label: 'Messages', 
      value: '8', 
      color: '#06B6D4',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    { 
      label: 'Congés', 
      value: '5', 
      color: '#8B5CF6',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-lg mx-auto space-y-4 pb-4">
      {/* Carte profil */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Bannière */}
        <div className="h-28 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full translate-y-1/2 -translate-x-1/4" />
          </div>
        </div>

        {/* Avatar + infos */}
        <div className="px-6 pb-6">
          <div className="flex justify-between items-start">
            <div className="flex-1 -mt-12">
              <div className="w-22 h-22 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 ring-4 ring-white flex items-center justify-center shadow-xl shadow-amber-200/50">
                <span className="text-3xl font-bold text-white">DG</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mt-3">Directeur Général</h2>
              <p className="text-gray-500 text-sm">admin@entreprise.fr</p>
            </div>
            <div className={`flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-xs font-semibold ${
              isOnline ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              {isOnline ? 'Online' : 'Offline'}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {statsData.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-3 text-center hover:shadow-sm transition-shadow">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" 
              style={{ backgroundColor: `${stat.color}12`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="text-base font-bold text-gray-800">{stat.value}</div>
            <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Menu navigation */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-50">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Accès rapides</h3>
        </div>
        {menuItems.map((item, index) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3.5 px-5 py-4 hover:bg-gray-50/80 transition-colors text-left group ${
              index < menuItems.length - 1 ? 'border-b border-gray-50' : ''
            }`}
          >
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center relative flex-shrink-0 transition-transform group-hover:scale-105" 
              style={{ backgroundColor: `${item.color}12` }}>
              {item.icon}
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-[20px] px-1.5 text-[10px] font-bold text-white bg-red-500 rounded-full ring-2 ring-white">
                  {item.badge > 9 ? '9+' : item.badge}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-gray-700 text-sm">{item.label}</span>
              <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}
      </div>

      {/* Activité récente */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Activité récente</h3>
          <button className="text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors">Tout voir</button>
        </div>
        {recentActivities.map((activity, index) => (
          <div 
            key={activity.id} 
            className={`flex items-start gap-3 px-5 py-3.5 ${
              index < recentActivities.length - 1 ? 'border-b border-gray-50' : ''
            }`}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: `${activity.color}12`, color: activity.color }}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 font-medium truncate">{activity.action}</p>
              <p className="text-xs text-gray-400 mt-0.5">{activity.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Déconnexion */}
      <button 
        onClick={() => navigate('/')}
        className="w-full p-4 bg-white rounded-3xl shadow-sm border border-gray-100 text-red-500 font-semibold hover:bg-red-50 transition-all flex items-center justify-center gap-2.5 group"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Déconnexion
      </button>

      <p className="text-center text-[11px] font-medium text-gray-300">DG Dashboard · v1.0.0</p>
    </div>
  );
}