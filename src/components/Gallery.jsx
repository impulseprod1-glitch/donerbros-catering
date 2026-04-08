import { useLanguage } from '../context/LanguageContext';
import './Gallery.css';

const videos = [
    { id: 1, src: '/gallery-1.mp4', nameKey: 'gallery_vid_1', poster: '/gallery-poster-1.png' },
    { id: 2, src: '/gallery-2.mp4', nameKey: 'gallery_vid_2', poster: '/gallery-poster-2.png' },
    { id: 3, src: '/gallery-3.mp4', nameKey: 'gallery_vid_3', poster: '/gallery-poster-3.png' }
];

const GalleryVideo = ({ vid }) => {
    const { t } = useLanguage();
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
          <h3 className="video-title">{t(vid.nameKey)}</h3>
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
    const { t } = useLanguage();

    return (
        <section className="gallery section-padding" id="gallery">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-subtitle">{t('gallery_badge')}</span>
                    <h2 className="section-title">{t('gallery_title_1')}<span className="text-gradient">{t('gallery_title_2')}</span></h2>
                    <p className="section-desc">{t('gallery_desc')}</p>
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
