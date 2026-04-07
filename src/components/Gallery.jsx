import React, { useRef, useEffect } from 'react';
import './Gallery.css';

const videos = [
  // Fixed file extensions exactly as they appear in the public folder
  { id: 1, src: '/gallery-1.mp4', title: 'Premium Kesim', poster: '/gallery-poster-1.png' },
  { id: 2, src: '/gallery-2.mp4', title: 'Taze Malzemeler', poster: '/gallery-poster-2.png' },
  { id: 3, src: '/gallery-3.mp4', title: 'Catering Deneyimi', poster: '/gallery-poster-3.png' }
];

const GalleryVideo = ({ vid }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (videoRef.current) {
            videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      });
    }, { threshold: 0.1 }); // Trigger a bit earlier

    if (videoRef.current) observer.observe(videoRef.current);
    
    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  const glowColors = ['glow-gold', 'glow-emerald', 'glow-crimson'];

  return (
    <div className={`gallery-card glass-panel ${glowColors[vid.id - 1] || 'glow-gold'}`}>
      {/* Premium Ambient Glow */}
      <div className="gallery-card-glow"></div>
      <div className="gallery-card-glow secondary"></div>
      <div className="video-wrapper">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          className="gallery-video"
          poster={vid.poster}
          preload="auto"
        >
          <source src={vid.src} type="video/mp4" />
        </video>
        <div className="video-overlay">
          <h3 className="video-title">{vid.title}</h3>
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  return (
    <section className="gallery section-padding" id="gallery">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Öne Çıkanlar</span>
          <h2 className="section-title">Dönerbros <span className="text-gradient">Deneyimi</span></h2>
          <p className="section-desc">Eşsiz lezzetimizin ve premium catering hizmetimizin kamera arkasındaki detayları keşfedin.</p>
        </div>

        <div className="gallery-grid">
          {videos.map((vid) => (
            <GalleryVideo key={vid.id} vid={vid} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
