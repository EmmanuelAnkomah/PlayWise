import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Genres } from './pages/Genres';
import { LowEndGames } from './pages/LowEndGames';
import { HighEndGames } from './pages/HighEndGames';
import { GameDetails } from './pages/GameDetails';
import { RequestInstallation } from './pages/RequestInstallation';
import { Contact } from './pages/Contact';

function RouteScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function App() {
  return <BrowserRouter><RouteScrollReset /><Navbar /><Routes><Route path="/" element={<Home />} /><Route path="/explore" element={<Explore />} /><Route path="/genres" element={<Genres />} /><Route path="/low-end" element={<LowEndGames />} /><Route path="/high-end" element={<HighEndGames />} /><Route path="/games/:id" element={<GameDetails />} /><Route path="/request-installation" element={<RequestInstallation />} /><Route path="/contact" element={<Contact />} /></Routes><Footer /><FloatingWhatsApp /></BrowserRouter>;
}

export default App;
