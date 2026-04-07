import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './ConsentManager.css';

const ConsentManager = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const consent = localStorage.getItem('site_consent_v1');
        if (!consent) {
            // Delay banner appearance so it doesn't clash with intro
            const timer = setTimeout(() => setIsVisible(true), 4000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('site_consent_v1', 'accepted');
        window.dispatchEvent(new CustomEvent('consentChanged', { detail: 'accepted' }));
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('site_consent_v1', 'declined');
        window.dispatchEvent(new CustomEvent('consentChanged', { detail: 'declined' }));
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="consent-banner">
            <div className="consent-content">
                <p className="consent-text">{t('cookie_text')}</p>
                <div className="consent-actions">
                    <button className="consent-btn consent-accept" onClick={handleAccept}>
                        {t('cookie_accept')}
                    </button>
                    <button className="consent-btn consent-decline" onClick={handleDecline}>
                        {t('cookie_decline')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsentManager;
