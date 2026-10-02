import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Genres } from './pages/Genres';
import { LowEndGames } from './pages/LowEndGames';
import { HighEndGames } from './pages/HighEndGames';
import { GameDetails } from './pages/GameDetails';
import { RequestInstallation } from './pages/RequestInstallation';
import { Contact } from './pages/Contact';
import { PlaywiseLoader } from './components/layout/PlaywiseLoader';

function RouteScrollReset() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);
  return null;
}

function App() {
  const [showLoader, setShowLoader] = useState(() => sessionStorage.getItem('playwise-loader-seen') !== 'true');
  const finishLoader = () => {
    sessionStorage.setItem('playwise-loader-seen', 'true');
    setShowLoader(false);
  };
  return <BrowserRouter><RouteScrollReset /><Navbar /><Routes><Route path="/" element={<Home />} /><Route path="/explore" element={<Explore />} /><Route path="/genres" element={<Genres />} /><Route path="/low-end" element={<LowEndGames />} /><Route path="/high-end" element={<HighEndGames />} /><Route path="/games/:id" element={<GameDetails />} /><Route path="/request-installation" element={<RequestInstallation />} /><Route path="/contact" element={<Contact />} /></Routes><Footer />{showLoader && <PlaywiseLoader onComplete={finishLoader} />}</BrowserRouter>;
}

export default App;
