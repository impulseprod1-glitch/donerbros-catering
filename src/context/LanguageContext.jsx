import React, { createContext, useContext, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('de'); // Default: Deutsch

    const t = (key) => {
        return translations[lang]?.[key] || translations['de']?.[key] || key;
    };

    const toggleLanguage = () => {
        setLang(prev => {
            if (prev === 'de') return 'en';
            if (prev === 'en') return 'tr';
            return 'de';
        });
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
