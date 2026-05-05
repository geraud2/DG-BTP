import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  CalendarDays,
  Inbox,
  Users,
  ListTodo,
  MessageSquare,
  Bell,
  ChevronLeft,
  ChevronRight,
  X,
  ClipboardList,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/conges', icon: CalendarDays, label: 'Congés' },
  { to: '/demandes', icon: Inbox, label: 'Demandes' },
  { to: '/personnel', icon: Users, label: 'Personnel' },
  { to: '/taches', icon: ListTodo, label: 'Tâches' },
  { to: '/chat', icon: MessageSquare, label: 'Chat' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
  { to: '/assignation', icon: ClipboardList, label: 'Assignation' },
];

export default function Sidebar({ collapsed, onToggle, isMobile }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-gray-900 text-white z-50 transition-all duration-300 flex flex-col ${
        isMobile ? 'w-60 shadow-2xl' : collapsed ? 'w-[68px]' : 'w-60'
      }`}
    >
      {/* En-tête */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-white">DG</span>
          </div>
          {(!collapsed || isMobile) && (
            <span className="font-semibold text-sm whitespace-nowrap text-white">
              Directeur Général
            </span>
          )}
        </div>

        {/* Bouton fermer sur mobile */}
        {isMobile && (
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors lg:hidden"
            aria-label="Fermer le menu"
          >
            <X size={20} className="text-gray-400" />
          </button>
        )}
      </div>

      {/* Logo BTP */}
      {(!collapsed || isMobile) && (
        <div className="px-4 py-3 border-b border-gray-800">
          <div className="flex items-center gap-2 text-amber-400">
            <span className="text-lg"></span>
            <span className="text-xs font-bold uppercase tracking-wider">DG Manager</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={isMobile ? onToggle : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-0.5 ${
                isActive
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`
            }
          >
            <item.icon size={20} className="flex-shrink-0" />
            {(!collapsed || isMobile) && (
              <span className="whitespace-nowrap">{item.label}</span>
            )}
            {/* Badge pour Notifications */}
            {item.to === '/notifications' && (!collapsed || isMobile) && (
              <span className="ml-auto w-2 h-2 rounded-full bg-red-500" />
            )}
          </NavLink>
        ))}
      </nav>

      {/* Pied */}
      <div className="border-t border-gray-800 p-2">
        {(!collapsed || isMobile) ? (
          <div className="px-3 py-2 text-xs text-gray-500">
            <p>DG Manager</p>
            <p className="text-gray-600">v1.0.0</p>
          </div>
        ) : (
          <div className="flex items-center justify-center py-2">
            <span className="text-[10px] text-gray-600">v1</span>
          </div>
        )}
      </div>

      {/* Bouton toggle desktop uniquement */}
      {!isMobile && (
        <button
          onClick={onToggle}
          className="flex items-center justify-center h-12 border-t border-gray-800 hover:bg-gray-800 transition-colors"
          aria-label={collapsed ? 'Agrandir' : 'Réduire'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      )}
    </aside>
  );
}