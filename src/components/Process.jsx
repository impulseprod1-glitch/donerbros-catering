import React from 'react';
import { CalendarCheck, ChefHat, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Process.css';

const Process = () => {
    const { t } = useLanguage();

    const steps = [
        {
            id: 1,
            icon: <CalendarCheck size={36} />,
            titleKey: 'process_step_1_title',
            descKey: 'process_step_1_desc'
        },
        {
            id: 2,
            icon: <ChefHat size={36} />,
            titleKey: 'process_step_2_title',
            descKey: 'process_step_2_desc'
        },
        {
            id: 3,
            icon: <Truck size={36} />,
            titleKey: 'process_step_3_title',
            descKey: 'process_step_3_desc'
        }
    ];

    return (
        <section id="surec" className="process section">
            {/* Ambient glow orbs */}
            <div className="process-ambient">
                <div className="process-orb process-orb-1"></div>
                <div className="process-orb process-orb-2"></div>
            </div>

            <div className="container">
                <div className="section-header reveal reveal-up">
                    <h2 className="section-title">{t('process_title_1')}<span className="text-gradient">{t('process_title_2')}</span></h2>
                    <p className="section-subtitle">{t('process_subtitle')}</p>
                </div>

                <div className="process-timeline">
                    {steps.map((step, index) => (
                        <div key={step.id} className={`process-step reveal reveal-up delay-${index + 1}`}>
                            <div className="step-number">0{step.id}</div>
                            <div className="step-icon-wrapper">
                                {step.icon}
                            </div>
                            <h3 className="step-title">{t(step.titleKey)}</h3>
                            <p className="step-desc">{t(step.descKey)}</p>

                            {index < steps.length - 1 && <div className="step-connector"></div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
