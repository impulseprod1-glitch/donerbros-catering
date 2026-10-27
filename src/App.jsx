import React, { useEffect, useState, useCallback } from 'react';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import Intro from './components/Intro';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Process from './components/Process';
import Footer from './components/Footer';
import Legal from './components/Legal';
import WhatsAppButton from './components/WhatsAppButton';
import ConsentManager from './components/ConsentManager';
import useScrollReveal from './hooks/useScrollReveal';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  // Initialize premium scroll reveal animations
  useScrollReveal();

  return (
    <LanguageProvider>
      <CartProvider>
      {showIntro && <Intro onComplete={handleIntroComplete} />}
      <div className="app">
        <Header onNavigate={() => setCurrentPage('home')} />

        {currentPage === 'home' ? (
          <main>
            <Hero />
            <Process />
            <Menu />
            <Gallery />
            <Reviews />
          </main>
        ) : (
          <Legal page={currentPage} onBack={() => setCurrentPage('home')} />
        )}

        <Footer onNavigate={setCurrentPage} />

        {/* Global floating WhatsApp Button */}
        <WhatsAppButton />

        {/* Order cart: floating bar + checkout drawer */}
        <Cart />

        {/* DSGVO Consent Manager (AdBlock-safe) */}
        <ConsentManager />
      </div>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
