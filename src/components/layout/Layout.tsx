import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { notifications as defaultNotifications } from '../../data/mockData';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifs] = useLocalStorage('notifications', defaultNotifications);
  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar desktop - visible seulement sur grand écran */}
      <div className="hidden lg:block">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
      </div>

      {/* Sidebar mobile - overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Fond noir opaque */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          
          {/* Sidebar mobile */}
          <div className="fixed inset-y-0 left-0 z-50 w-60 animate-slide-in">
            <Sidebar 
              collapsed={false} 
              onToggle={() => setMobileMenuOpen(false)} 
              isMobile
            />
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-[68px]' : 'lg:ml-60'
      }`}>
        <Header 
          notificationCount={unreadCount} 
          onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} 
        />
        
        <main className="p-3 sm:p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}