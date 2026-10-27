import React, { useState, useEffect } from 'react';
import { Plus, Minus, Flame } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { MENU_CATEGORIES, MENU_ITEMS, formatPrice, ORDER_SETTINGS } from '../data/menu';
import useScrollReveal from '../hooks/useScrollReveal';
import './Menu.css';

const Menu = () => {
    const [activeTab, setActiveTab] = useState(MENU_CATEGORIES[0].id);
    const { t, lang } = useLanguage();
    const { quantities, addItem, removeItem } = useCart();
    const reveal = useScrollReveal();

    // Trigger reveal animation manually on tab switch
    useEffect(() => {
        const timer = setTimeout(() => {
            if (typeof reveal === 'function') {
                reveal();
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [activeTab, reveal]);

    const items = MENU_ITEMS.filter(i => i.category === activeTab);

    return (
        <section id="menu" className="menu section">
            {/* Ambient Background Glows */}
            <div className="menu-ambient">
                <div className="bg-glow-menu top-right"></div>
                <div className="bg-glow-menu bottom-left"></div>
            </div>

            <div className="container relative z-10">
                <div className="section-header text-center reveal reveal-up">
                    <div className="premium-subtitle">
                        <span className="line"></span>
                        <span className="text">{t('menu_premium_subtitle')}</span>
                        <span className="line"></span>
                    </div>
                    <h2 className="section-title text-shadow">
                        {t('menu_title_1')}<span className="text-gradient">{t('menu_title_2')}</span>
                    </h2>
                    <p className="section-subtitle-large">{t('menu_subtitle')}</p>
                </div>

                <div className="menu-tabs reveal reveal-up delay-1" role="tablist">
                    {MENU_CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            id={`menu-tab-${cat.id}`}
                            role="tab"
                            aria-selected={activeTab === cat.id}
                            className={`tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(cat.id)}
                        >
                            <span className="tab-text">{cat.label[lang] || cat.label.de}</span>
                            <div className="tab-glow"></div>
                        </button>
                    ))}
                </div>

                <div className="menu-content">
                    <div key={activeTab} className="menu-grid">
                        {items.map((item, index) => {
                            const qty = quantities[item.id] || 0;
                            const name = item.name[lang] || item.name.de;
                            return (
                                <article key={item.id} className={`menu-item-premium group reveal reveal-up delay-${(index % 3) + 1} ${qty ? 'in-cart' : ''}`}>
                                    <div className="card-border-gradient-menu"></div>
                                    <div className="menu-item-content">
                                        <div className="menu-item-image-wrapper">
                                            <img src={item.image} alt={name} className="menu-item-image" loading="lazy" />
                                            <div className="menu-item-image-overlay"></div>
                                            {item.popular && (
                                                <span className="menu-item-badge"><Flame size={14} /> {t('menu_popular')}</span>
                                            )}
                                            {qty > 0 && <span className="menu-item-qty-badge">{qty}×</span>}
                                        </div>
                                        <div className="menu-item-body">
                                            <div className="menu-item-header">
                                                <h3 className="menu-item-name">{name}</h3>
                                                {ORDER_SETTINGS.showPrices && (
                                                    <>
                                                        <div className="menu-item-dots"></div>
                                                        <span className="menu-item-price">{formatPrice(item.price, lang)}</span>
                                                    </>
                                                )}
                                            </div>
                                            <p className="menu-item-desc">{item.desc[lang] || item.desc.de}</p>

                                            <div className="menu-item-actions">
                                                {qty === 0 ? (
                                                    <button
                                                        id={`add-${item.id}`}
                                                        className="btn btn-primary add-to-cart-btn"
                                                        onClick={() => addItem(item.id)}
                                                    >
                                                        <Plus size={18} /> {t('menu_add')}
                                                    </button>
                                                ) : (
                                                    <div className="qty-stepper" aria-label={name}>
                                                        <button id={`dec-${item.id}`} onClick={() => removeItem(item.id)} aria-label="-"><Minus size={18} /></button>
                                                        <span className="qty-value">{qty}</span>
                                                        <button id={`inc-${item.id}`} onClick={() => addItem(item.id)} aria-label="+"><Plus size={18} /></button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>

                <div className="menu-callout premium-callout">
                    <div className="callout-glow"></div>
                    <p>{t('menu_callout')}</p>
                </div>
            </div>
        </section>
    );
};

export default Menu;
