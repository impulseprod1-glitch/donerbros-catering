import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Header.css';

const Header = ({ onNavigate }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { lang, toggleLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container header-container">
                <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); onNavigate && onNavigate(); }}>
                    <span className="logo-accent">Döner</span>Bros
                </a>

                <div className="desktop-menu">
                    <nav>
                        <a href="#hizmetler" className="nav-link" onClick={onNavigate}>{t('nav_services')}</a>
                        <a href="#menu" className="nav-link" onClick={onNavigate}>{t('nav_menu')}</a>
                        <a href="#surec" className="nav-link" onClick={onNavigate}>{t('nav_process')}</a>
                    </nav>

                    <button className="lang-toggle" onClick={toggleLanguage} aria-label="Toggle Language">
                        <span className={lang === 'de' ? 'active-lang' : ''}>DE</span>
                        <span className="lang-separator">/</span>
                        <span className={lang === 'en' ? 'active-lang' : ''}>EN</span>
                        <span className="lang-separator">/</span>
                        <span className={lang === 'tr' ? 'active-lang' : ''}>TR</span>
                    </button>

                    <a href="#iletisim" className="btn btn-primary">{t('nav_cta')}</a>
                </div>

                <div className="mobile-right">
                    <button className="lang-toggle" onClick={toggleLanguage} aria-label="Toggle Language">
                        <span className={lang === 'de' ? 'active-lang' : ''}>DE</span>
                        <span className="lang-separator">/</span>
                        <span className={lang === 'en' ? 'active-lang' : ''}>EN</span>
                        <span className="lang-separator">/</span>
                        <span className={lang === 'tr' ? 'active-lang' : ''}>TR</span>
                    </button>
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                <nav>
                    <a href="#hizmetler" className="mobile-link" onClick={() => { setIsMobileMenuOpen(false); onNavigate && onNavigate(); }}>{t('nav_services')}</a>
                    <a href="#menu" className="mobile-link" onClick={() => { setIsMobileMenuOpen(false); onNavigate && onNavigate(); }}>{t('nav_menu')}</a>
                    <a href="#surec" className="mobile-link" onClick={() => { setIsMobileMenuOpen(false); onNavigate && onNavigate(); }}>{t('nav_process')}</a>
                    <a href="#iletisim" className="btn btn-primary w-full text-center mt-4" onClick={() => { setIsMobileMenuOpen(false); onNavigate && onNavigate(); }}>{t('nav_cta')}</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
