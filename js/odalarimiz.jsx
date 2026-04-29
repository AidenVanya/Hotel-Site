const { useState } = React;

const ROOMS = [
  {
    id: 1,
    category: "Standart Oda",
    name: "Classic Oda",
    capacity: 2,
    size: 28,
    view: "Şehir Manzarası",
    price: 150,
    floor: "2-4. Kat",
    desc: "Sıcak ahşap tonları ve modern donanımıyla tasarlanmış Classic Odamız, şehrin kalbinde konforlu bir konaklama sunar. 28 m² alanıyla çift veya twin yatak seçeneğiyle sunulan odamız, şehir manzarasının tadını çıkarmanız için geniş bir pencereye sahiptir.",
    amenities: ["Klima","Wi-Fi","Mini Bar","LCD TV","Saç Kurutma","Kasa","Masaüstü","Çay & Kahve"],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
    ],
    available: true,
    rooms_left: 8,
  },
  {
    id: 2,
    category: "Deluxe Oda",
    name: "Deluxe Oda",
    capacity: 2,
    size: 35,
    view: "Bahçe Manzarası",
    price: 200,
    floor: "3-6. Kat",
    desc: "Özel tasarım mobilyaları ve premium yatak konforu ile donatılmış Deluxe Odamız, sessiz bahçe manzarasına açılan büyük pencereleriyle huzuru yaşatır. Geniş banyosu ve lüks aksesuarlarıyla kendinizi şımartın.",
    amenities: ["Klima","Wi-Fi","Mini Bar","LCD TV","Küvet","Sauna Duş","Kasa","Çay & Kahve","Bornoz & Terlik","Ücretsiz Minibar"],
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800&q=80",
    ],
    available: true,
    rooms_left: 5,
  },
  {
    id: 3,
    category: "Executive Oda",
    name: "Executive Oda",
    capacity: 2,
    size: 45,
    view: "Deniz Manzarası",
    price: 300,
    floor: "5-8. Kat",
    desc: "Panoramik deniz manzarasına açılan Executive Odamız, özel lounge erişimi ve kişiye özel butler hizmeti sunar. Ayrı oturma alanı, premium kahve makinesi ve özel minibar ile iş veya tatil amaçlı konaklamalarınız için idealdir.",
    amenities: ["Klima","Wi-Fi","Premium Mini Bar","55\" LCD TV","Küvet & Yağmur Duş","Butler Hizmeti","Lounge Erişimi","Kasa","Bornoz & Terlik","Ücretsiz Minibar","Sabah Gazetesi"],
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    ],
    available: true,
    rooms_left: 3,
  },
  {
    id: 4,
    category: "Aile Odası",
    name: "Aile Odası",
    capacity: 4,
    size: 55,
    view: "Havuz Manzarası",
    price: 350,
    floor: "2-4. Kat",
    desc: "4 kişiye kadar konforla ağırlayabilen Aile Odamız, iki ayrı uyku alanı ve çocuklara özel aksesuarlarıyla tam bir aile tatili deneyimi sunar. Havuz manzarasına açılan terasıyla çocuklarınızın en sevdiği tatil mekanı olacak.",
    amenities: ["Klima","Wi-Fi","Mini Bar","LCD TV","Çocuk Karyolası","Bebek Banyosu","Oyun Köşesi","Kasa","Çay & Kahve","Bornoz & Terlik"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    ],
    available: false,
    rooms_left: 0,
  },
  {
    id: 5,
    category: "Balayı Suite",
    name: "Balayı Suite",
    capacity: 2,
    size: 65,
    view: "Panoramik Manzara",
    price: 450,
    floor: "7-8. Kat (Teras Kat)",
    desc: "Çiftlerin hayalindeki romantik kaçışı sunan Balayı Suite'imiz, özel jakuzi, kişisel teras ve panoramik İstanbul manzarasıyla eşsiz bir deneyim vaat eder. Giriş anında çiçek dekorasyonu ve şampanya ikramımız dahildir.",
    amenities: ["Özel Jakuzi","Teras","Klima","Wi-Fi","Şampanya","Çiçek Dekoru","Butler Hizmeti","Premium Mini Bar","65\" TV","Bornoz & Terlik","Ücretsiz Minibar","Sabah Kahvaltısı","Spa Kredisi"],
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    ],
    available: true,
    rooms_left: 2,
  },
  {
    id: 6,
    category: "Presidential Suite",
    name: "Presidential Suite",
    capacity: 4,
    size: 120,
    view: "360° Panoramik",
    price: 1200,
    floor: "Penthouse — 9. Kat",
    desc: "Hotel Master'ın zirvesi olan Presidential Suite, 120 m² yaşam alanı, özel yemek odası, kütüphane ve 360° panoramik manzara terasıyla lüksü yeniden tanımlar. Özel şoför, kişisel butler ve öncelikli spa hizmeti dahildir.",
    amenities: ["Özel Teras","Özel Şoför","Butler","Jakuzi","Sauna","Yemek Odası","Kütüphane","Premium Bar","4K TV","Bornoz & Terlik","Tüm Yiyecek-İçecek","Spa Dahil","Havalimanı Transferi"],
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    ],
    available: true,
    rooms_left: 1,
  },
];

function getToday() { return new Date().toISOString().split('T')[0]; }
function getTomorrow() { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; }
function calcNights(ci, co) { return Math.max(1, Math.round((new Date(co) - new Date(ci)) / 86400000)); }

function ImageSlider({ images }) {
  const [idx, setIdx] = useState(0);
  return (
    <div className="room-gallery">
      <div style={{ display:'flex', height:'100%', transform:`translateX(-${idx*100}%)`, transition:'transform 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
        {images.map((src, i) => (
          <img key={i} src={src} className="room-slide" alt="" style={{flexShrink:0,width:'100%',height:'100%',objectFit:'cover'}} />
        ))}
      </div>
      {idx > 0 && (
        <button className="gallery-prev" onClick={e => { e.stopPropagation(); setIdx(idx-1); }}>
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none"><path d="M8 1L2 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      )}
      {idx < images.length - 1 && (
        <button className="gallery-next" onClick={e => { e.stopPropagation(); setIdx(idx+1); }}>
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none"><path d="M2 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      )}
      <div className="gallery-dots">
        {images.map((_, i) => (
          <div key={i} className={`gallery-dot${i===idx?' active':''}`} onClick={e => { e.stopPropagation(); setIdx(i); }} />
        ))}
      </div>
    </div>
  );
}

function AvailBadge({ room }) {
  if (!room.available) return <div className="avail-badge unavailable">Dolu</div>;
  if (room.rooms_left <= 2) return <div className="avail-badge limited">Son {room.rooms_left} Oda!</div>;
  return <div className="avail-badge available">Müsait</div>;
}

function BookingModal({ room, checkin, checkout, nights, onClose }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', note:'' });
  const [done, setDone] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setDone(true);
  }

  const total = room.price * nights;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-title">{room.name}</div>
            <div style={{fontSize:'0.65rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--gold)',marginTop:'0.2rem'}}>{room.category}</div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {done ? (
            <div className="success-msg">
              <div className="success-icon">✓</div>
              <div className="success-title">Rezervasyon Talebi Alındı!</div>
              <p className="success-desc">En kısa sürede sizinle iletişime geçeceğiz. Teşekkür ederiz.</p>
            </div>
          ) : (
            <>
              <img src={room.images[0]} className="modal-img" alt={room.name} />
              <div className="modal-summary">
                <div className="modal-summary-row"><span>Giriş</span><span>{checkin}</span></div>
                <div className="modal-summary-row"><span>Çıkış</span><span>{checkout}</span></div>
                <div className="modal-summary-row"><span>Süre</span><span>{nights} gece</span></div>
                <div className="modal-summary-row"><span>Gecelik</span><span>₺{room.price}</span></div>
                <div className="modal-summary-row"><span>Toplam</span><span>₺{total.toLocaleString('tr-TR')}</span></div>
              </div>
              <form className="modal-form" onSubmit={handleSubmit}>
                <div className="modal-row">
                  <div className="modal-field">
                    <label className="modal-label">Ad Soyad</label>
                    <input className="modal-input" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Ahmet Yılmaz" />
                  </div>
                  <div className="modal-field">
                    <label className="modal-label">Telefon</label>
                    <input className="modal-input" required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+90 5XX XXX XX XX" />
                  </div>
                </div>
                <div className="modal-field">
                  <label className="modal-label">E-Posta</label>
                  <input className="modal-input" type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="ornek@email.com" />
                </div>
                <div className="modal-field">
                  <label className="modal-label">Özel İstek (İsteğe Bağlı)</label>
                  <input className="modal-input" value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder="Erken check-in, özel süsleme vb." />
                </div>
                <button type="submit" className="modal-submit">Rezervasyon Talebini Gönder</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [checkin, setCheckin] = useState(getToday());
  const [checkout, setCheckout] = useState(getTomorrow());
  const [guests, setGuests] = useState('2');
  const [filter, setFilter] = useState('all');
  const [searched, setSearched] = useState(false);
  const [bookingRoom, setBookingRoom] = useState(null);

  const nights = calcNights(checkin, checkout);
  const guestNum = parseInt(guests);

  let filtered = ROOMS;
  if (filter === '1') filtered = ROOMS.filter(r => r.capacity === 1 || r.capacity === 2);
  else if (filter === '2') filtered = ROOMS.filter(r => r.capacity === 2);
  else if (filter === '3+') filtered = ROOMS.filter(r => r.capacity >= 3);
  else if (filter === 'available') filtered = ROOMS.filter(r => r.available);
  else if (filter === 'suite') filtered = ROOMS.filter(r => r.category.toLowerCase().includes('suite') || r.category.toLowerCase().includes('presidential'));

  if (searched && guestNum > 0) {
    filtered = filtered.filter(r => r.capacity >= guestNum);
  }

  return (
    <div>
      <div className="avail-bar">
        <div className="avail-inner">
          <div className="avail-field">
            <label className="avail-label">Giriş Tarihi</label>
            <input type="date" className="avail-input" value={checkin} min={getToday()}
              onChange={e => { setCheckin(e.target.value); if (e.target.value >= checkout) { const d=new Date(e.target.value); d.setDate(d.getDate()+1); setCheckout(d.toISOString().split('T')[0]); } }} />
          </div>
          <div className="avail-field">
            <label className="avail-label">Çıkış Tarihi</label>
            <input type="date" className="avail-input" value={checkout} min={checkin}
              onChange={e => setCheckout(e.target.value)} />
          </div>
          <div className="avail-field" style={{maxWidth:'160px'}}>
            <label className="avail-label">Kişi Sayısı</label>
            <select className="avail-select avail-input" value={guests} onChange={e => setGuests(e.target.value)}>
              <option value="1">1 Kişi</option>
              <option value="2">2 Kişi</option>
              <option value="3">3 Kişi</option>
              <option value="4">4 Kişi</option>
            </select>
          </div>
          <div className="avail-nights">{nights} gece · <strong style={{color:'var(--gold)'}}>Müsaitlik Kontrolü</strong></div>
          <button className="avail-btn" onClick={() => setSearched(true)}>Ara</button>
        </div>
      </div>

      <div className="filter-row">
        <span className="filter-label">Filtre:</span>
        {[['all','Tümü'],['available','Müsait'],['2','2 Kişilik'],['3+','Aile'],['suite','Suite']].map(([val,label]) => (
          <button key={val} className={`filter-btn${filter===val?' active':''}`} onClick={() => setFilter(val)}>{label}</button>
        ))}
      </div>

      <div className="rooms-list">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-title">Uygun oda bulunamadı</div>
            <p className="empty-desc">Farklı tarih veya kişi sayısı ile tekrar deneyin.</p>
          </div>
        ) : filtered.map(room => {
          const total = room.price * nights;
          return (
            <div className="room-row" key={room.id}>
              <div style={{position:'relative'}}>
                <AvailBadge room={room} />
                <ImageSlider images={room.images} />
              </div>
              <div className="room-detail">
                <div className="room-cat">{room.category}</div>
                <div className="room-name">{room.name}</div>
                <div className="room-capacity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                  <span>{room.capacity} Kişiye Kadar · {room.floor}</span>
                </div>
                <p className="room-desc">{room.desc}</p>
                <div className="room-specs">
                  <div className="room-spec">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
                    {room.size} m²
                  </div>
                  <div className="room-spec">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                    {room.view}
                  </div>
                  <div className="room-spec">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    {room.floor}
                  </div>
                </div>
                <div className="room-amenities">
                  {room.amenities.slice(0,8).map(a => <span key={a} className="amenity-tag">{a}</span>)}
                  {room.amenities.length > 8 && <span className="amenity-tag" style={{color:'var(--gold)',borderColor:'var(--gold)'}}>+{room.amenities.length-8} daha</span>}
                </div>
                <div className="room-footer-row">
                  <div className="room-price-block">
                    <div className="room-price-num">₺{room.price}</div>
                    <div className="room-price-night">/ Gecelik</div>
                    {nights > 1 && <div className="room-total">Toplam: <strong>₺{total.toLocaleString('tr-TR')}</strong> ({nights} gece)</div>}
                  </div>
                  <div className="room-actions">
                    <button className="btn-detail">Detaylar</button>
                    <button className="btn-book" disabled={!room.available} onClick={() => room.available && setBookingRoom(room)}>
                      {room.available ? 'Rezervasyon Yap' : 'Dolu'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {bookingRoom && (
        <BookingModal
          room={bookingRoom}
          checkin={checkin}
          checkout={checkout}
          nights={nights}
          onClose={() => setBookingRoom(null)}
        />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
