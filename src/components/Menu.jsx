import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Menu.css';

const Menu = () => {
    const [activeTab, setActiveTab] = useState('doner_station');
    const { t } = useLanguage();

    const menuItems = {
        doner_station: [
            { id: 1, nameKey: 'menu_item_1_name', descKey: 'menu_item_1_desc', priceKey: 'menu_price_default', image: `${import.meta.env.BASE_URL}menu-beef-doner.png` },
            { id: 2, nameKey: 'menu_item_2_name', descKey: 'menu_item_2_desc', priceKey: 'menu_price_default', image: `${import.meta.env.BASE_URL}menu-chicken-doner.png` },
            { id: 3, nameKey: 'menu_item_3_name', descKey: 'menu_item_3_desc', priceKey: 'menu_price_default', image: `${import.meta.env.BASE_URL}menu-mixed-doner.png` }
        ],
        burger_station: [
            { id: 4, nameKey: 'menu_item_4_name', descKey: 'menu_item_4_desc', priceKey: 'menu_price_default', image: `${import.meta.env.BASE_URL}menu-burgers.png` },
            { id: 5, nameKey: 'menu_item_5_name', descKey: 'menu_item_5_desc', priceKey: 'menu_price_default', image: `${import.meta.env.BASE_URL}menu-street-food.png` }
        ],
        vegan_veggie: [
            { id: 6, nameKey: 'menu_item_6_name', descKey: 'menu_item_6_desc', priceKey: 'menu_price_default', image: `${import.meta.env.BASE_URL}menu-mixed-doner.png` },
            { id: 7, nameKey: 'menu_item_7_name', descKey: 'menu_item_7_desc', priceKey: 'menu_price_default', image: `${import.meta.env.BASE_URL}menu-street-food.png` }
        ]
    };

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

                <div className="menu-tabs reveal reveal-up delay-1">
                    <button
                        className={`tab-btn ${activeTab === 'doner_station' ? 'active' : ''}`}
                        onClick={() => setActiveTab('doner_station')}
                    >
                        <span className="tab-text">{t('menu_tab_doner')}</span>
                        <div className="tab-glow"></div>
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'burger_station' ? 'active' : ''}`}
                        onClick={() => setActiveTab('burger_station')}
                    >
                        <span className="tab-text">{t('menu_tab_burger')}</span>
                        <div className="tab-glow"></div>
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'vegan_veggie' ? 'active' : ''}`}
                        onClick={() => setActiveTab('vegan_veggie')}
                    >
                        <span className="tab-text">{t('menu_tab_vegan')}</span>
                        <div className="tab-glow"></div>
                    </button>
                </div>

                <div className="menu-content">
                    <div className="menu-grid">
                        {menuItems[activeTab].map((item, index) => (
                            <div key={item.id} className={`menu-item-premium group reveal reveal-up delay-${(index % 3) + 1}`}>
                                <div className="card-border-gradient-menu"></div>
                                <div className="menu-item-content">
                                    {/* Package Image */}
                                    <div className="menu-item-image-wrapper">
                                        <img
                                            src={item.image}
                                            alt={t(item.nameKey)}
                                            className="menu-item-image"
                                            loading="lazy"
                                        />
                                        <div className="menu-item-image-overlay"></div>
                                    </div>
                                    <div className="menu-item-body">
                                        <div className="menu-item-header">
                                            <h3 className="menu-item-name">{t(item.nameKey)}</h3>
                                            <div className="menu-item-dots"></div>
                                            <span className="menu-item-price">{t(item.priceKey)}</span>
                                        </div>
                                        <p className="menu-item-desc">{t(item.descKey)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
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
