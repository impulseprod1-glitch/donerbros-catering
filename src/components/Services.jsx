import React from 'react';
import { Building2, PartyPopper, Utensils, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Services.css';

const Services = () => {
    const { t } = useLanguage();

    const services = [
        {
            id: 1,
            icon: <Building2 size={36} className="service-icon" />,
            titleKey: 'service_1_title',
            descKey: 'service_1_desc',
            featureKeys: ['service_1_feat_1', 'service_1_feat_2', 'service_1_feat_3'],
            accentColor: 'rgba(212, 175, 55, 1)'
        },
        {
            id: 2,
            icon: <PartyPopper size={36} className="service-icon" />,
            titleKey: 'service_2_title',
            descKey: 'service_2_desc',
            featureKeys: ['service_2_feat_1', 'service_2_feat_2', 'service_2_feat_3'],
            accentColor: 'rgba(230, 126, 34, 1)'
        },
        {
            id: 3,
            icon: <Utensils size={36} className="service-icon" />,
            titleKey: 'service_3_title',
            descKey: 'service_3_desc',
            featureKeys: ['service_3_feat_1', 'service_3_feat_2', 'service_3_feat_3'],
            accentColor: 'rgba(52, 168, 83, 1)'
        }
    ];

    return (
        <section id="hizmetler" className="services section">
            {/* Ambient Background Glows */}
            <div className="services-ambient">
                <div className="bg-glow glow-left"></div>
                <div className="bg-glow glow-right"></div>
            </div>

            <div className="container relative z-10">
                <div className="section-header text-center reveal reveal-up">
                    <div className="premium-subtitle">
                        <span className="line"></span>
                        <span className="text">{t('services_premium_subtitle')}</span>
                        <span className="line"></span>
                    </div>
                    <h2 className="section-title text-shadow">
                        {t('services_title_1')}<span className="text-gradient">{t('services_title_2')}</span>
                    </h2>
                    <p className="section-subtitle-large">{t('services_subtitle')}</p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={service.id} className={`service-card-premium group reveal reveal-up delay-${index + 1}`}>
                            {/* Animated Glowing Border */}
                            <div className="card-border-gradient" style={{ '--accent': service.accentColor }}></div>

                            <div className="service-card-content">
                                {/* Top Icon Section */}
                                <div className="service-header">
                                    <div className="icon-hexagon" style={{ '--icon-color': service.accentColor }}>
                                        <div className="icon-inner">
                                            {service.icon}
                                        </div>
                                    </div>
                                    <div className="card-number">0{service.id}</div>
                                </div>

                                {/* Texts */}
                                <div className="service-body">
                                    <h3 className="service-title">{t(service.titleKey)}</h3>
                                    <p className="service-description">{t(service.descKey)}</p>
                                </div>

                                {/* Feature List */}
                                <div className="service-features">
                                    {service.featureKeys.map((featureKey, idx) => (
                                        <div key={idx} className="feature-line">
                                            <CheckCircle2 size={16} className="feature-check" style={{ color: service.accentColor }} />
                                            <span>{t(featureKey)}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Hover Glow Effect inside card */}
                                <div className="card-hover-glow" style={{ background: `radial-gradient(circle at center, ${service.accentColor}20 0%, transparent 70%)` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
