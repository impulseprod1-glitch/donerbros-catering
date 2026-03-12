import React, { useState, useEffect } from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showBubble, setShowBubble] = useState(false);
    const phoneNumber = "491789209116"; // 01789209116 without the starting 0, with 49
    const message = "Hallo Döner Bros Catering, ich würde gerne mehr über euer Angebot erfahren!";

    useEffect(() => {
        // Show button after a small delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3500);

        // Show bubble after 6 seconds
        const bubbleTimer = setTimeout(() => {
            setShowBubble(true);
        }, 6000);

        return () => {
            clearTimeout(timer);
            clearTimeout(bubbleTimer);
        };
    }, []);

    const handleClick = () => {
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    if (!isVisible) return null;

    return (
        <div className="wa-container-wrapper">
            {showBubble && (
                <div className="wa-chat-bubble reveal-active">
                    <p className="wa-bubble-text">Hangi tarih için catering bakıyorsunuz? 😊</p>
                    <button className="wa-bubble-close" onClick={(e) => {
                        e.stopPropagation();
                        setShowBubble(false);
                    }}>×</button>
                </div>
            )}
            <div className="wa-container" onClick={handleClick}>
                <div className="wa-pulse"></div>
                <div className="wa-pulse-delay"></div>
                <button className="wa-button" aria-label="Contact us on WhatsApp">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="wa-icon"
                    >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                </button>
                <div className="wa-tooltip">
                    <span className="wa-tooltip-text">WhatsApp Catering</span>
                    <span className="wa-tooltip-number">+49 178 9209116</span>
                </div>
            </div>
        </div>
    );
};

export default WhatsAppButton;
