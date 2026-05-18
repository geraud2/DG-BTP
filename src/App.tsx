import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import SplashScreen from './components/SplashScreen';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Conges from './pages/Conges';
import Demandes from './pages/Demandes';
import Personnel from './pages/Personnel';
import Taches from './pages/Taches';
import Chat from './pages/Chat';
import Notifications from './pages/Notifications';
import BottomNav from './components/layout/BottomNav';
import Assignation from './pages/Assignation';
import Profil from './pages/Profil';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Affiche le splashscreen en premier
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // Puis l'application
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bottomnav" element={<BottomNav />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/conges" element={<Conges />} />
          <Route path="/demandes" element={<Demandes />} />
          <Route path="/personnel" element={<Personnel />} />
          <Route path="/taches" element={<Taches />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/assignation" element={<Assignation />} />
          <Route path="/profil" element={<Profil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;