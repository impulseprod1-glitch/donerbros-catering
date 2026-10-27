import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = ({ onNavigate }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { lang, toggleLanguage, t } = useLanguage();
    const { count, openCart } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#menu', label: t('nav_menu') },
        { href: '#so-gehts', label: t('nav_process') },
        { href: '#kontakt', label: t('nav_contact') },
    ];

    const CartButton = ({ id }) => (
        <button id={id} className="header-cart-btn" onClick={openCart} aria-label={t('cart_title')}>
            <ShoppingBag size={20} />
            {count > 0 && <span key={count} className="header-cart-count">{count}</span>}
        </button>
    );

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container header-container">
                <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); onNavigate && onNavigate(); }}>
                    <span className="logo-accent">Döner</span>Bros
                </a>

                <div className="desktop-menu">
                    <nav>
                        {navLinks.map(l => (
                            <a key={l.href} href={l.href} className="nav-link" onClick={onNavigate}>{l.label}</a>
                        ))}
                    </nav>

                    <button className="lang-toggle" onClick={toggleLanguage} aria-label="Toggle Language">
                        <span className={lang === 'de' ? 'active-lang' : ''}>DE</span>
                        <span className="lang-separator">/</span>
                        <span className={lang === 'en' ? 'active-lang' : ''}>EN</span>
                        <span className="lang-separator">/</span>
                        <span className={lang === 'tr' ? 'active-lang' : ''}>TR</span>
                    </button>

                    <CartButton id="header-cart-desktop" />

                    <a href="#menu" className="btn btn-primary" onClick={onNavigate}>{t('nav_cta')}</a>
                </div>

                <div className="mobile-right">
                    <button className="lang-toggle" onClick={toggleLanguage} aria-label="Toggle Language">
                        <span className={lang === 'de' ? 'active-lang' : ''}>DE</span>
                        <span className="lang-separator">/</span>
                        <span className={lang === 'en' ? 'active-lang' : ''}>EN</span>
                        <span className="lang-separator">/</span>
                        <span className={lang === 'tr' ? 'active-lang' : ''}>TR</span>
                    </button>
                    <CartButton id="header-cart-mobile" />
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Menu"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                <nav>
                    {navLinks.map(l => (
                        <a key={l.href} href={l.href} className="mobile-link" onClick={() => { setIsMobileMenuOpen(false); onNavigate && onNavigate(); }}>{l.label}</a>
                    ))}
                    <a href="#menu" className="btn btn-primary w-full text-center mt-4" onClick={() => { setIsMobileMenuOpen(false); onNavigate && onNavigate(); }}>{t('nav_cta')}</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
