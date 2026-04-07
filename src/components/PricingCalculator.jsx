import React, { useState, useEffect } from 'react';
import { Calculator, Utensils, Flame, ChefHat, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './PricingCalculator.css';

const PricingCalculator = () => {
    const { t } = useLanguage();
    const [guests, setGuests] = useState(100);
    const [menuType, setMenuType] = useState('classic');
    const [extras, setExtras] = useState({
        drinks: false,
        dessert: false,
        service: false
    });
    const [total, setTotal] = useState(0);

    const menuIcons = {
        classic: <Utensils size={20} />,
        mixed: <Flame size={20} />,
        burger: <ChefHat size={20} />,
        vegan: <Leaf size={20} />
    };

    const basePrices = {
        classic: 16,
        mixed: 20,
        burger: 22,
        vegan: 18
    };

    useEffect(() => {
        let currentTotal = guests * basePrices[menuType];
        
        if (extras.drinks) currentTotal += guests * 5;
        if (extras.dessert) currentTotal += guests * 4;
        if (extras.service) currentTotal += 250; // flat fee

        setTotal(currentTotal);
    }, [guests, menuType, extras]);

    const handleExtraChange = (extra) => {
        setExtras(prev => ({ ...prev, [extra]: !prev[extra] }));
    };

    const selectPackage = (type, guestCount) => {
        setMenuType(type);
        setGuests(guestCount);
        // Scroll to calculator for feedback
        const el = document.querySelector('.calculator-wrapper');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <section id="calculator" className="calculator section">
            <div className="container relative z-10">
                <div className="section-header text-center reveal reveal-up">
                    <div className="premium-subtitle">
                        <span className="line"></span>
                        <div className="text flex items-center gap-2">
                            <Calculator size={18} />
                            <span>{t('calc_subtitle')}</span>
                        </div>
                        <span className="line"></span>
                    </div>
                    <h2 className="section-title text-shadow">
                        {t('calc_title_1')}<span className="text-gradient">{t('calc_title_2')}</span>
                    </h2>
                </div>

                {/* Package Quick Selection */}
                <div className="package-selection-grid reveal reveal-up delay-1">
                    <div className="package-card glass-panel bronze" onClick={() => selectPackage('classic', 50)}>
                        <div className="package-badge">Standard</div>
                        <h3>Classic Event</h3>
                        <p>Döner Station mit frischen Beilagen & Saucen.</p>
                        <div className="package-price">ab 16€<span>/Person</span></div>
                        <ul className="package-features">
                            <li><Utensils size={14}/> 100% Kalb oder Hähnchen</li>
                            <li><Utensils size={14}/> Frisches Brot & Salate</li>
                        </ul>
                    </div>

                    <div className="package-card glass-panel gold featured" onClick={() => selectPackage('mixed', 100)}>
                        <div className="package-badge">Beliebt</div>
                        <h3>Berlin Mixed</h3>
                        <p>Der Klassiker: Rind & Hähnchen kombiniert mit Grillgemüse.</p>
                        <div className="package-price">ab 20€<span>/Person</span></div>
                        <ul className="package-features">
                            <li><Flame size={14}/> Mixed Spiesse</li>
                            <li><Flame size={14}/> Grillgemüse & Halloumi</li>
                        </ul>
                    </div>

                    <div className="package-card glass-panel platinum" onClick={() => selectPackage('burger', 150)}>
                        <div className="package-badge">Premium</div>
                        <h3>Gourmet Burger</h3>
                        <p>Saftige Burger & Premium Beilagen für höchste Ansprüche.</p>
                        <div className="package-price">ab 22€<span>/Person</span></div>
                        <ul className="package-features">
                            <li><ChefHat size={14}/> Angus Beef Burger</li>
                            <li><ChefHat size={14}/> Special Toppings</li>
                        </ul>
                    </div>
                </div>

                <div className="calculator-wrapper reveal reveal-up delay-2">
                    <div className="calc-card-border"></div>
                    <div className="calc-content">
                        <div className="calc-controls">
                            {/* Guests Slider */}
                            <div className="calc-group">
                                <div className="calc-group-header">
                                    <label>{t('calc_guests')}</label>
                                    <span className="calc-value">{guests}</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="50" 
                                    max="1000" 
                                    step="10" 
                                    value={guests} 
                                    onChange={(e) => setGuests(Number(e.target.value))} 
                                    className="calc-slider"
                                />
                            </div>

                            {/* Menu Type */}
                            <div className="calc-group">
                                <label>{t('calc_menu_type')}</label>
                                <div className="calc-radio-group">
                                    {['classic', 'mixed', 'burger', 'vegan'].map(type => (
                                    <label key={type} className={`calc-radio ${menuType === type ? 'active' : ''}`}>
                                        <input 
                                            type="radio" 
                                            name="menuType" 
                                            value={type} 
                                            checked={menuType === type} 
                                            onChange={(e) => setMenuType(e.target.value)} 
                                        />
                                        <span className="radio-icon">{menuIcons[type]}</span>
                                        <span className="radio-text">{t(`calc_menu_${type}`)}</span>
                                    </label>
                                ))}
                                </div>
                            </div>

                            {/* Extras */}
                            <div className="calc-group">
                                <label>{t('calc_extras')}</label>
                                <div className="calc-checkbox-group">
                                    <label className="calc-checkbox">
                                        <input type="checkbox" checked={extras.drinks} onChange={() => handleExtraChange('drinks')} />
                                        <span className="checkbox-custom"></span>
                                        <span className="checkbox-text">{t('calc_extra_drinks')}</span>
                                    </label>
                                    <label className="calc-checkbox">
                                        <input type="checkbox" checked={extras.dessert} onChange={() => handleExtraChange('dessert')} />
                                        <span className="checkbox-custom"></span>
                                        <span className="checkbox-text">{t('calc_extra_dessert')}</span>
                                    </label>
                                    <label className="calc-checkbox">
                                        <input type="checkbox" checked={extras.service} onChange={() => handleExtraChange('service')} />
                                        <span className="checkbox-custom"></span>
                                        <span className="checkbox-text">{t('calc_extra_service')}</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="calc-result">
                            <div className="calc-total-box">
                                <span className="total-label">{t('calc_total')}</span>
                                <div className="total-amount">
                                    <span className="currency">€</span>
                                    <span className="amount">{total.toLocaleString('de-DE')}</span>
                                </div>
                                <p className="calc-notice">{t('calc_notice')}</p>
                            </div>
                            <a href="#iletisim" className="btn btn-primary btn-large w-full mt-6" onClick={() => {
                                // Pre-fill form or set intent
                                setTimeout(() => {
                                    const notesInput = document.getElementById('notes');
                                    if(notesInput) {
                                        notesInput.value = `Ich interessiere mich für das ${menuType} Menü für ${guests} Personen. (Preis: ca. ${total}€)`;
                                    }
                                }, 500);
                            }}>
                                {t('calc_cta')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingCalculator;
