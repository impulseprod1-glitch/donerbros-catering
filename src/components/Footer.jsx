import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, ShoppingBag, Store, Bike } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { ORDER_SETTINGS, formatPrice } from '../data/menu';
import './Footer.css';

const Footer = ({ onNavigate }) => {
    const { t, lang } = useLanguage();
    const { count, openCart } = useCart();

    const [hasConsent, setHasConsent] = useState(localStorage.getItem('site_consent_v1') === 'accepted');

    React.useEffect(() => {
        const handleConsentChange = (e) => {
            setHasConsent(e.detail === 'accepted');
        };
        window.addEventListener('consentChanged', handleConsentChange);
        return () => window.removeEventListener('consentChanged', handleConsentChange);
    }, []);

    return (
        <footer id="kontakt" className="footer">
            <div className="container">

                {/* Order CTA & Contact Section */}
                <div className="booking-section">
                    <div className="booking-content">
                        <h2 className="booking-title">{t('footer_title_1')}<span className="text-gradient">{t('footer_title_2')}</span></h2>
                        <p className="booking-desc">{t('footer_desc')}</p>

                        <div className="contact-info-blocks">
                            <a href="tel:+491637097175" className="info-block info-block-link">
                                <Phone size={20} className="info-icon" />
                                <span>+49 163 7097175</span>
                            </a>
                            <a href="mailto:catering@donerbros.berlin" className="info-block info-block-link">
                                <Mail size={20} className="info-icon" />
                                <span>catering@donerbros.berlin</span>
                            </a>
                            <a href="https://www.google.com/maps/place/D%C3%B6nerBros./@52.5065405,13.3005392,17z/" target="_blank" rel="noopener noreferrer" className="info-block info-block-link">
                                <MapPin size={20} className="info-icon" />
                                <span>Kaiser-Friedrich-Straße 48, 10627 Berlin</span>
                            </a>

                            {/* Embedded Google Map */}
                            <div className="google-map-container mt-4">
                                {hasConsent ? (
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.1724041040854!2d13.300539177114851!3d52.50654053676878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8511d731f8253%3A0xcfab0ccab1e0186!2sD%C3%B6nerBros.!5e0!3m2!1sen!2sde!4v1714150532134!5m2!1sen!2sde"
                                        width="100%"
                                        height="200"
                                        style={{ border: 0, borderRadius: '12px' }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Dönerbros Location Kaiser-Friedrich-Straße"
                                        className="google-map-iframe"
                                    ></iframe>
                                ) : (
                                    <div className="map-placeholder">
                                        <p>{t('cookie_text')}</p>
                                        <button className="btn btn-outline btn-sm" onClick={() => window.dispatchEvent(new CustomEvent('consentChanged', { detail: 'accepted' }))}>
                                            {t('cookie_accept')}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="booking-form-wrapper order-cta-card">
                        <div className="order-cta-icon"><ShoppingBag size={34} /></div>
                        <h3 className="order-cta-title">{t('footer_order_title')}</h3>
                        <p className="order-cta-text">{t('footer_order_text')}</p>

                        <ul className="order-cta-options">
                            {ORDER_SETTINGS.pickup.enabled && (
                                <li><Store size={20} /> <div><strong>{t('order_pickup')}</strong><span>{ORDER_SETTINGS.pickup.address}</span></div></li>
                            )}
                            {ORDER_SETTINGS.delivery.enabled && (
                                <li><Bike size={20} /> <div><strong>{t('order_delivery')}</strong><span>{t('footer_delivery_info').replace('{min}', formatPrice(ORDER_SETTINGS.delivery.minOrder, lang))}</span></div></li>
                            )}
                        </ul>

                        {count > 0 ? (
                            <button id="footer-open-cart" className="btn btn-primary w-full btn-large" onClick={openCart}>
                                {t('cart_view')} ({count})
                            </button>
                        ) : (
                            <a id="footer-order-now" href="#menu" className="btn btn-primary w-full btn-large">
                                {t('nav_cta')}
                            </a>
                        )}
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-logo">
                        <span className="logo-accent">Döner</span>Bros
                        <p className="footer-tagline">{t('footer_tagline')}</p>
                    </div>

                    <div className="footer-links">
                        <button className="footer-link-btn" onClick={() => onNavigate('datenschutz')}>{t('footer_privacy')}</button>
                        <button className="footer-link-btn" onClick={() => onNavigate('impressum')}>{t('footer_imprint')}</button>
                        <button className="footer-link-btn" onClick={() => onNavigate('agb')}>{t('footer_terms')}</button>
                    </div>

                    <div className="social-links">
                        <a href="https://www.instagram.com/donerbros.berlin/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><Instagram size={20} /></a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
