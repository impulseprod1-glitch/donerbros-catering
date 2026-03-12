import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Reviews.css';

const Reviews = () => {
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);

    const mockReviews = [
        {
            id: 1,
            name: "Sabrina Schmidt",
            avatar: "S",
            text: "review_1",
            date: "Vor 2 Wochen",
        },
        {
            id: 2,
            name: "Johannes Müller",
            avatar: "J",
            text: "review_2",
            date: "Vor 1 Monat",
        },
        {
            id: 3,
            name: "Elena Wagner",
            avatar: "E",
            text: "review_3",
            date: "Vor 3 Monaten",
        },
        {
            id: 4,
            name: "Markus Becker",
            avatar: "M",
            text: "review_4",
            date: "Vor 1 Woche",
        },
        {
            id: 5,
            name: "Lisa Hoffmann",
            avatar: "L",
            text: "review_5",
            date: "Vor 2 Monaten",
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % mockReviews.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [mockReviews.length]);

    const handleNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % mockReviews.length);
    const handlePrev = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + mockReviews.length) % mockReviews.length);

    return (
        <section className="reviews section" id="reviews">
            <div className="container">
                <div className="section-header text-center reveal reveal-up">
                    <span className="section-subtitle">
                        <MessageCircle size={16} className="subtitle-icon" /> {t('reviews_premium_subtitle')}
                    </span>
                    <h2 className="section-title">
                        {t('reviews_title_1')} <span className="text-gradient">{t('reviews_title_2')}</span>
                    </h2>
                    <p className="section-desc">
                        {t('reviews_subtitle')}
                    </p>
                </div>

                <div className="google-rating-aggregate">
                    <div className="google-rating-stars">
                        <span className="rating-number">4.9</span>
                        <div className="star-group">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="#fbbc04" color="#fbbc04" />)}
                        </div>
                    </div>
                    <div className="rating-info">
                        <div className="rating-text">{t('reviews_google_rating')}</div>
                        <div className="rating-count">{t('reviews_total_count')}</div>
                    </div>
                </div>

                <div className="reviews-slider-container">
                    <button className="slider-btn prev-btn" onClick={handlePrev} aria-label="Previous">
                        <ChevronLeft size={24} />
                    </button>

                    <div className="reviews-track">
                        {mockReviews.map((review, index) => (
                            <div
                                key={review.id}
                                className={`review-card ${index === currentIndex ? 'active' : ''}`}
                                style={{
                                    transform: `translateX(${100 * (index - currentIndex)}%)`,
                                    opacity: index === currentIndex ? 1 : 0,
                                    visibility: index === currentIndex ? 'visible' : 'hidden'
                                }}
                            >
                                <div className="review-google-badge">
                                    <svg viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                </div>

                                <div className="review-stars">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="#fbbc04" color="#fbbc04" />)}
                                </div>

                                <p className="review-text">"{t(review.text)}"</p>

                                <div className="review-author">
                                    <div className="author-avatar">{review.avatar}</div>
                                    <div className="author-info">
                                        <div className="author-name">{review.name}</div>
                                        <div className="author-date">{review.date}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="slider-btn next-btn" onClick={handleNext} aria-label="Next">
                        <ChevronRight size={24} />
                    </button>
                </div>

                <div className="slider-dots">
                    {mockReviews.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
