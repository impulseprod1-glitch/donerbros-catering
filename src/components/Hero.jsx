import React, { useEffect, useRef, useMemo } from 'react';
import { ArrowRight, Star, Award, Users, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Hero.css';

const Hero = () => {
    const { t } = useLanguage();
    const heroRef = useRef(null);

    // Parallax shimmer particles - Optimized with IntersectionObserver
    useEffect(() => {
        const canvas = document.getElementById('hero-particles');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let isVisible = true; // Track visibility
        let resizeTimeout;

        const resize = () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (canvas) {
                    canvas.width = canvas.offsetWidth;
                    canvas.height = canvas.offsetHeight;
                }
            }, 100); // 100ms debounce
        };
        
        // Initial set
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        window.addEventListener('resize', resize);

        const particles = Array.from({ length: 40 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.5 + 0.1,
            pulse: Math.random() * Math.PI * 2,
        }));

        const draw = () => {
            animId = requestAnimationFrame(draw);
            
            // Skip drawing and math if not visible
            if (!isVisible) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.pulse += 0.02;
                const currentOpacity = p.opacity * (0.5 + Math.sin(p.pulse) * 0.5);

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${currentOpacity})`;
                ctx.fill();

                // Glow
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${currentOpacity * 0.15})`;
                ctx.fill();
            });
        };
        draw();

        // Setup Intersection Observer to pause animation when off-screen
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
            });
        }, { threshold: 0 });

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            if (resizeTimeout) clearTimeout(resizeTimeout);
            if (heroRef.current) observer.unobserve(heroRef.current);
        };
    }, []);

    return (
        <section className="hero" ref={heroRef}>
            {/* Ambient light effects */}
            <div className="hero-ambient">
                <div className="ambient-orb orb-1"></div>
                <div className="ambient-orb orb-2"></div>
                <div className="ambient-orb orb-3"></div>
            </div>

            <canvas id="hero-particles" className="hero-particles-canvas"></canvas>

            <div className="hero-grid-lines"></div>

            <div className="container hero-container">
                <div className="hero-content">
                    {/* Premium badge */}
                    <div className="hero-premium-badge">
                        <Award size={14} />
                        <span>{t('hero_badge')}</span>
                        <div className="badge-shine"></div>
                    </div>

                    <h1 className="hero-title">
                        <span className="title-line title-line-1">{t('hero_title_1')}</span>
                        <span className="title-line title-line-2">{t('hero_title_2')}</span>
                        <span className="title-line title-line-3 text-gradient">{t('hero_title_3')}</span>
                    </h1>

                    <p className="hero-subtitle">{t('hero_subtitle')}</p>

                    <div className="hero-actions">
                        <a href="#iletisim" className="btn btn-primary btn-large btn-glow">
                            {t('hero_cta_primary')} <ArrowRight size={20} className="icon-right" />
                        </a>
                        <a href="#menu" className="btn btn-outline btn-large">
                            {t('hero_cta_secondary')}
                        </a>
                    </div>

                    {/* Stats Bar */}
                    <div className="hero-stats">
                        <a href="https://share.google/m2QRz9KymF9bcpdLI" target="_blank" rel="noopener noreferrer" className="stat-item google-trust-badge">
                            <div className="stat-icon google-icon">
                                <svg viewBox="0 0 24 24" width="22" height="22">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            </div>
                            <div className="stat-info">
                                <strong>4.9/5 <Star size={14} fill="#fbbc04" color="#fbbc04" className="inline-star" /></strong>
                                <span>{t('hero_stat_reviews')}</span>
                            </div>
                        </a>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-icon"><Users size={18} /></div>
                            <div className="stat-info">
                                <strong>200+</strong>
                                <span>{t('hero_stat_events')}</span>
                            </div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-icon"><Clock size={18} /></div>
                            <div className="stat-info">
                                <strong>24h</strong>
                                <span>{t('hero_stat_response')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="visual-wrapper">
                        {/* Fire & Smoke Effects */}
                        <div className="fire-smoke-container">
                            {/* Fire embers */}
                            {Array.from({ length: 25 }, (_, i) => {
                                const x = 15 + Math.random() * 70;
                                const delay = Math.random() * 4;
                                const duration = 2 + Math.random() * 3;
                                const size = 2 + Math.random() * 5;
                                const drift = (Math.random() - 0.5) * 60;
                                return (
                                    <div
                                        key={`ember-${i}`}
                                        className="hero-fire-ember"
                                        style={{
                                            left: `${x}%`,
                                            width: `${size}px`,
                                            height: `${size}px`,
                                            '--drift': `${drift}px`,
                                            animationDelay: `${delay}s`,
                                            animationDuration: `${duration}s`
                                        }}
                                    />
                                );
                            })}
                            {/* Smoke wisps */}
                            {Array.from({ length: 12 }, (_, i) => {
                                const x = 20 + Math.random() * 60;
                                const delay = Math.random() * 5;
                                const duration = 4 + Math.random() * 4;
                                const size = 20 + Math.random() * 40;
                                const drift = (Math.random() - 0.5) * 80;
                                return (
                                    <div
                                        key={`smoke-${i}`}
                                        className="hero-smoke-wisp"
                                        style={{
                                            left: `${x}%`,
                                            width: `${size}px`,
                                            height: `${size}px`,
                                            '--smoke-drift': `${drift}px`,
                                            animationDelay: `${delay}s`,
                                            animationDuration: `${duration}s`
                                        }}
                                    />
                                );
                            })}
                        </div>

                        {/* Heat haze / glow behind image */}
                        <div className="hero-heat-glow"></div>

                        {/* Animated gradient border frame */}
                        <div className="image-frame">
                            <div className="frame-glow"></div>
                            <video
                                className="hero-video"
                                autoPlay
                                loop
                                muted
                                playsInline
                                poster="hero-image.png"
                            >
                                {/* Place your custom video in the public folder as 'donerbros-shop.mp4' */}
                                <source src="/donerbros-shop.mp4" type="video/mp4" />
                                
                                <img
                                    src="hero-image.png"
                                    alt="Premium Döner Catering Berlin - Dönerbros"
                                    className="hero-image"
                                />
                            </video>
                        </div>

                        <div className="floating-badge badge-1">
                            <div className="badge-pulse"></div>
                            <div className="badge-content">
                                <strong>{t('hero_badge_1_title')}</strong>
                                <span>{t('hero_badge_1_sub')}</span>
                            </div>
                        </div>
                        <div className="floating-badge badge-2">
                            <div className="badge-pulse"></div>
                            <div className="badge-content">
                                <strong>{t('hero_badge_2_title')}</strong>
                                <span>{t('hero_badge_2_sub')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
