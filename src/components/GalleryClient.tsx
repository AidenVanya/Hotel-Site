'use client';

import { useState, useCallback, useEffect } from 'react';

const PHOTOS = [
  { id: 1, cat: 'Odalar', label: 'Executive Oda', src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=85', thumb: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&q=70' },
  { id: 2, cat: 'Odalar', label: 'Deluxe Oda', src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1400&q=85', thumb: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=200&q=70' },
  { id: 3, cat: 'Odalar', label: 'Balayı Suite', src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400&q=85', thumb: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=200&q=70' },
  { id: 4, cat: 'Odalar', label: 'Presidential Suite', src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400&q=85', thumb: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&q=70' },
  { id: 5, cat: 'Odalar', label: 'Classic Oda', src: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1400&q=85', thumb: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=200&q=70' },
  { id: 6, cat: 'Havuz', label: 'Ana Yüzme Havuzu', src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&q=85', thumb: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200&q=70' },
  { id: 7, cat: 'Havuz', label: 'Gece Havuzu', src: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1400&q=85', thumb: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=200&q=70' },
  { id: 8, cat: 'Restoran', label: 'Ana Restoran', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85', thumb: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=70' },
  { id: 9, cat: 'Restoran', label: 'Kahvaltı Salonu', src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1400&q=85', thumb: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=200&q=70' },
  { id: 10, cat: 'Spa', label: 'Hamam & Spa', src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&q=85', thumb: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&q=70' },
  { id: 11, cat: 'Spa', label: 'Masaj Salonu', src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1400&q=85', thumb: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=200&q=70' },
  { id: 12, cat: 'Lobi', label: 'Ana Lobi', src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&q=85', thumb: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&q=70' },
  { id: 13, cat: 'Lobi', label: 'Resepsiyon', src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=85', thumb: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=70' },
  { id: 14, cat: 'Aktivite', label: 'Toplantı Salonu', src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85', thumb: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=70' },
  { id: 15, cat: 'Aktivite', label: 'Eğlence & Bar', src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1400&q=85', thumb: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=200&q=70' },
  { id: 16, cat: 'Dış Mekan', label: 'Otel Binası', src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1400&q=85', thumb: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=200&q=70' },
  { id: 17, cat: 'Dış Mekan', label: 'Bahçe', src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400&q=85', thumb: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&q=70' },
  { id: 18, cat: 'Aktivite', label: 'Balayı Süslemesi', src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400&q=85', thumb: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&q=70' },
];

const CATS = ['Tümü', 'Odalar', 'Havuz', 'Restoran', 'Spa', 'Lobi', 'Aktivite', 'Dış Mekan'];

interface LightboxProps {
  photos: typeof PHOTOS;
  startIdx: number;
  onClose: () => void;
}

function Lightbox({ photos, startIdx, onClose }: LightboxProps) {
  const [idx, setIdx] = useState(startIdx);

  const prev = useCallback(() => setIdx((i) => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % photos.length), [photos.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, onClose]);

  const photo = photos[idx];

  return (
    <div className="lightbox-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.96)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <button className="lightbox-close" onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '2rem', background: 'none', border: 'none', color: 'var(--white)', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10 }}>✕</button>

      <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prev(); }} style={{ position: 'absolute', left: '2rem', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--white)', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <svg width="12" height="18" viewBox="0 0 12 18" fill="none"><path d="M10 1L2 9l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '80vw', maxHeight: '65vh', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.src} className="lightbox-img" alt={photo.label} style={{ maxWidth: '80vw', maxHeight: '65vh', objectFit: 'contain', display: 'block' }} />
      </div>

      <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); next(); }} style={{ position: 'absolute', right: '2rem', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--white)', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <svg width="12" height="18" viewBox="0 0 12 18" fill="none"><path d="M2 1l8 8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      <div className="lightbox-thumbs" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', gap: '0.4rem', marginTop: '1rem', overflowX: 'auto', maxWidth: '80vw' }}>
        {photos.map((p, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={p.id} src={p.thumb} className={`lightbox-thumb${i === idx ? ' active' : ''}`} alt="" onClick={() => setIdx(i)} style={{ width: '60px', height: '44px', objectFit: 'cover', cursor: 'pointer', opacity: i === idx ? 1 : 0.5, border: i === idx ? '1px solid var(--gold)' : '1px solid transparent', flexShrink: 0 }} />
        ))}
      </div>

      <div className="lightbox-info" onClick={(e) => e.stopPropagation()} style={{ marginTop: '0.8rem', textAlign: 'center' }}>
        <div className="lightbox-cat" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase' }}>{photo.cat}</div>
        <div className="lightbox-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 300 }}>{photo.label}</div>
        <div className="lightbox-counter" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{idx + 1} / {photos.length}</div>
      </div>
    </div>
  );
}

export default function GalleryClient() {
  const [cat, setCat] = useState('Tümü');
  const [lightbox, setLightbox] = useState<{ photos: typeof PHOTOS; idx: number } | null>(null);

  const filtered = cat === 'Tümü' ? PHOTOS : PHOTOS.filter((p) => p.cat === cat);

  return (
    <div>
      <div className="filter-tabs" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', padding: '2rem 4rem', maxWidth: '1280px', margin: '0 auto' }}>
        <span className="filter-tab-label" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Kategori:</span>
        {CATS.map((c) => (
          <button
            key={c}
            className={`filter-tab${cat === c ? ' active' : ''}`}
            onClick={() => setCat(c)}
            style={{
              background: cat === c ? 'var(--gold)' : 'transparent',
              color: cat === c ? 'var(--black)' : 'var(--text-muted)',
              border: cat === c ? '1px solid var(--gold)' : '1px solid rgba(201,168,76,0.25)',
              padding: '0.4rem 1rem',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.25s',
              fontFamily: 'var(--font-body)',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="gallery-section" style={{ padding: '0 4rem 7rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div
          className="masonry"
          style={{ columns: '3', columnGap: '1rem' }}
        >
          {filtered.map((photo, i) => (
            <div
              key={photo.id}
              className="masonry-item"
              onClick={() => setLightbox({ photos: filtered, idx: i })}
              style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', marginBottom: '1rem', breakInside: 'avoid' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={photo.label} loading="lazy" style={{ width: '100%', display: 'block' }} />
              <div className="zoom-icon" style={{ position: 'absolute', top: '1rem', right: '1rem', opacity: 0, transition: 'opacity 0.3s' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
              </div>
              <div className="masonry-item-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 60%)', opacity: 0, transition: 'opacity 0.3s', display: 'flex', alignItems: 'flex-end' }}>
                <div style={{ padding: '1rem' }}>
                  <div className="masonry-item-cat" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>{photo.cat}</div>
                  <div className="masonry-item-label" style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 300 }}>{photo.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox photos={lightbox.photos} startIdx={lightbox.idx} onClose={() => setLightbox(null)} />
      )}

      <style>{`
        .masonry-item:hover .zoom-icon,
        .masonry-item:hover .masonry-item-overlay { opacity: 1; }
      `}</style>
    </div>
  );
}
