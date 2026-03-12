import { useEffect } from 'react';

/**
 * Hook to trigger reveal animations on scroll using Intersection Observer.
 * Adds 'reveal-active' class to elements with 'reveal' class when they enter viewport.
 */
const useScrollReveal = () => {
    useEffect(() => {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    // Once revealed, we can stop observing this element
                    observer.unobserve(entry.target);
                }
            });
        };

        const options = {
            threshold: 0.15, // Trigger when 15% of element is visible
            rootMargin: '0px 0px -50px 0px' // Offset trigger point slightly from bottom
        };

        const observer = new IntersectionObserver(revealCallback, options);
        const revealElements = document.querySelectorAll('.reveal');

        revealElements.forEach(el => observer.observe(el));

        return () => {
            revealElements.forEach(el => observer.unobserve(el));
        };
    }, []);
};

export default useScrollReveal;
