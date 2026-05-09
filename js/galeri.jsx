const { useState, useEffect, useCallback } = React;

const PHOTOS = [
  { id:1,  cat:'Odalar',    label:'Executive Oda',       src:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=85', thumb:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&q=70' },
  { id:2,  cat:'Odalar',    label:'Deluxe Oda',           src:'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1400&q=85', thumb:'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=200&q=70' },
  { id:3,  cat:'Odalar',    label:'Balayı Suite',         src:'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400&q=85', thumb:'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=200&q=70' },
  { id:4,  cat:'Odalar',    label:'Presidential Suite',   src:'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400&q=85', thumb:'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&q=70' },
  { id:5,  cat:'Odalar',    label:'Classic Oda',          src:'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1400&q=85', thumb:'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=200&q=70' },
  { id:6,  cat:'Havuz',     label:'Ana Yüzme Havuzu',     src:'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&q=85', thumb:'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200&q=70' },
  { id:7,  cat:'Havuz',     label:'Gece Havuzu',          src:'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1400&q=85', thumb:'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=200&q=70' },
  { id:8,  cat:'Restoran',  label:'Ana Restoran',         src:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85', thumb:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=70' },
  { id:9,  cat:'Restoran',  label:'Kahvaltı Salonu',      src:'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1400&q=85', thumb:'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=200&q=70' },
  { id:10, cat:'Spa',       label:'Hamam & Spa',          src:'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&q=85', thumb:'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&q=70' },
  { id:11, cat:'Spa',       label:'Masaj Salonu',         src:'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1400&q=85', thumb:'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=200&q=70' },
  { id:12, cat:'Lobi',      label:'Ana Lobi',             src:'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&q=85', thumb:'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&q=70' },
  { id:13, cat:'Lobi',      label:'Resepsiyon',           src:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=85', thumb:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=70' },
  { id:14, cat:'Aktivite',  label:'Toplantı Salonu',      src:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85', thumb:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=70' },
  { id:15, cat:'Aktivite',  label:'Eğlence & Bar',        src:'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1400&q=85', thumb:'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=200&q=70' },
  { id:16, cat:'Dış Mekan', label:'Otel Binası',          src:'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1400&q=85', thumb:'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=200&q=70' },
  { id:17, cat:'Dış Mekan', label:'Bahçe',                src:'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400&q=85', thumb:'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&q=70' },
  { id:18, cat:'Aktivite',  label:'Balayı Süslemesi',     src:'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400&q=85', thumb:'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&q=70' },
];

const CATS = ['Tümü', 'Odalar', 'Havuz', 'Restoran', 'Spa', 'Lobi', 'Aktivite', 'Dış Mekan'];

function Lightbox({ photos, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);

  const prev = useCallback(() => setIdx(i => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % photos.length), [photos.length]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, onClose]);

  const photo = photos[idx];

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>✕</button>

      <button className="lightbox-prev" onClick={e => { e.stopPropagation(); prev(); }}>
        <svg width="12" height="18" viewBox="0 0 12 18" fill="none"><path d="M10 1L2 9l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()} key={idx}>
        <img src={photo.src} className="lightbox-img" alt={photo.label} />
      </div>

      <button className="lightbox-next" onClick={e => { e.stopPropagation(); next(); }}>
        <svg width="12" height="18" viewBox="0 0 12 18" fill="none"><path d="M2 1l8 8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      <div className="lightbox-thumbs" onClick={e => e.stopPropagation()}>
        {photos.map((p, i) => (
          <img key={p.id} src={p.thumb} className={`lightbox-thumb${i === idx ? ' active' : ''}`} alt="" onClick={() => setIdx(i)} />
        ))}
      </div>

      <div className="lightbox-info" onClick={e => e.stopPropagation()}>
        <div className="lightbox-cat">{photo.cat}</div>
        <div className="lightbox-title">{photo.label}</div>
        <div className="lightbox-counter">{idx + 1} / {photos.length}</div>
      </div>
    </div>
  );
}

function App() {
  const [cat, setCat] = useState('Tümü');
  const [lightbox, setLightbox] = useState(null);

  const filtered = cat === 'Tümü' ? PHOTOS : PHOTOS.filter(p => p.cat === cat);

  function openPhoto(globalIdx) {
    setLightbox({ photos: filtered, idx: globalIdx });
  }

  return (
    <div>
      <div className="filter-tabs">
        <span className="filter-tab-label">Kategori:</span>
        {CATS.map(c => (
          <button key={c} className={`filter-tab${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <div className="gallery-section">
        <div className="masonry">
          {filtered.map((photo, i) => (
            <div className="masonry-item" key={photo.id} onClick={() => openPhoto(i)}>
              <img src={photo.src} alt={photo.label} loading="lazy" />
              <div className="zoom-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              </div>
              <div className="masonry-item-overlay">
                <div>
                  <div className="masonry-item-cat">{photo.cat}</div>
                  <div className="masonry-item-label">{photo.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          photos={lightbox.photos}
          startIdx={lightbox.idx}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
