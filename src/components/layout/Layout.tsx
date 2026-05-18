import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';
import { notifications } from '../../data/mockData';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Notification } from '../../data/mockData';

export default function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [notifs] = useLocalStorage<Notification[]>('notifications', notifications);
  const unreadCount: number = notifs.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar desktop uniquement */}
      <div className="hidden lg:block">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
      </div>

      {/* Contenu principal */}
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-[68px]' : 'lg:ml-60'
      }`}>
        <Header notificationCount={unreadCount} />
        
        <main className="p-3 sm:p-4 lg:p-6 pb-20 lg:pb-6">
          <Outlet />
        </main>
      </div>

      {/* BottomNav - visible uniquement sur mobile/tablette */}
      <div className="block lg:hidden">
        <BottomNav notificationCount={unreadCount} />
      </div>
    </div>
  );
}