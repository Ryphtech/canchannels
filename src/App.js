import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import MainContent from './components/MainContent';
import Showcase from './components/Showcase';
import Sidebar from './components/Sidebar';
import CookieBanner from './components/CookieBanner';
import NotificationBell from './components/NotificationBell';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6">
          <div className="xl:col-span-3">
            <MainContent />
            <Showcase />
          </div>
          <div className="xl:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
      
      <CookieBanner />
      <NotificationBell />
    </div>
  );
}

export default App; 