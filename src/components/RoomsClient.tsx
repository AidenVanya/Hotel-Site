'use client';

import { useState } from 'react';

const ROOMS = [
  {
    id: 1, category: 'Standart Oda', name: 'Classic Oda', capacity: 2, size: 28,
    view: 'Şehir Manzarası', price: 150, floor: '2-4. Kat',
    desc: 'Sıcak ahşap tonları ve modern donanımıyla tasarlanmış Classic Odamız, şehrin kalbinde konforlu bir konaklama sunar. 28 m² alanıyla çift veya twin yatak seçeneğiyle sunulan odamız, şehir manzarasının tadını çıkarmanız için geniş bir pencereye sahiptir.',
    amenities: ['Klima', 'Wi-Fi', 'Mini Bar', 'LCD TV', 'Saç Kurutma', 'Kasa', 'Masaüstü', 'Çay & Kahve'],
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'],
    available: true, rooms_left: 8,
  },
  {
    id: 2, category: 'Deluxe Oda', name: 'Deluxe Oda', capacity: 2, size: 35,
    view: 'Bahçe Manzarası', price: 200, floor: '3-6. Kat',
    desc: 'Özel tasarım mobilyaları ve premium yatak konforu ile donatılmış Deluxe Odamız, sessiz bahçe manzarasına açılan büyük pencereleriyle huzuru yaşatır.',
    amenities: ['Klima', 'Wi-Fi', 'Mini Bar', 'LCD TV', 'Küvet', 'Sauna Duş', 'Kasa', 'Çay & Kahve', 'Bornoz & Terlik', 'Ücretsiz Minibar'],
    images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800&q=80'],
    available: true, rooms_left: 5,
  },
  {
    id: 3, category: 'Executive Oda', name: 'Executive Oda', capacity: 2, size: 45,
    view: 'Deniz Manzarası', price: 300, floor: '5-8. Kat',
    desc: 'Panoramik deniz manzarasına açılan Executive Odamız, özel lounge erişimi ve kişiye özel butler hizmeti sunar.',
    amenities: ['Klima', 'Wi-Fi', 'Premium Mini Bar', '55" LCD TV', 'Küvet & Yağmur Duş', 'Butler Hizmeti', 'Lounge Erişimi', 'Kasa', 'Bornoz & Terlik', 'Ücretsiz Minibar', 'Sabah Gazetesi'],
    images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80'],
    available: true, rooms_left: 3,
  },
  {
    id: 4, category: 'Aile Odası', name: 'Aile Odası', capacity: 4, size: 55,
    view: 'Havuz Manzarası', price: 350, floor: '2-4. Kat',
    desc: '4 kişiye kadar konforla ağırlayabilen Aile Odamız, iki ayrı uyku alanı ve çocuklara özel aksesuarlarıyla tam bir aile tatili deneyimi sunar.',
    amenities: ['Klima', 'Wi-Fi', 'Mini Bar', 'LCD TV', 'Çocuk Karyolası', 'Bebek Banyosu', 'Oyun Köşesi', 'Kasa', 'Çay & Kahve', 'Bornoz & Terlik'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'],
    available: false, rooms_left: 0,
  },
  {
    id: 5, category: 'Balayı Suite', name: 'Balayı Suite', capacity: 2, size: 65,
    view: 'Panoramik Manzara', price: 450, floor: '7-8. Kat (Teras Kat)',
    desc: 'Çiftlerin hayalindeki romantik kaçışı sunan Balayı Suite\'imiz, özel jakuzi, kişisel teras ve panoramik İstanbul manzarasıyla eşsiz bir deneyim vaat eder.',
    amenities: ['Özel Jakuzi', 'Teras', 'Klima', 'Wi-Fi', 'Şampanya', 'Çiçek Dekoru', 'Butler Hizmeti', 'Premium Mini Bar', '65" TV', 'Bornoz & Terlik', 'Ücretsiz Minibar', 'Sabah Kahvaltısı', 'Spa Kredisi'],
    images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80'],
    available: true, rooms_left: 2,
  },
  {
    id: 6, category: 'Presidential Suite', name: 'Presidential Suite', capacity: 4, size: 120,
    view: '360° Panoramik', price: 1200, floor: 'Penthouse — 9. Kat',
    desc: 'Hotel Master\'ın zirvesi olan Presidential Suite, 120 m² yaşam alanı, özel yemek odası, kütüphane ve 360° panoramik manzara terasıyla lüksü yeniden tanımlar.',
    amenities: ['Özel Teras', 'Özel Şoför', 'Butler', 'Jakuzi', 'Sauna', 'Yemek Odası', 'Kütüphane', 'Premium Bar', '4K TV', 'Bornoz & Terlik', 'Tüm Yiyecek-İçecek', 'Spa Dahil', 'Havalimanı Transferi'],
    images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80'],
    available: true, rooms_left: 1,
  },
];

function getToday() { return new Date().toISOString().split('T')[0]; }
function getTomorrow() { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; }
function calcNights(ci: string, co: string) { return Math.max(1, Math.round((new Date(co).getTime() - new Date(ci).getTime()) / 86400000)); }

function ImageSlider({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  return (
    <div className="room-gallery" style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', height: '100%', transform: `translateX(-${idx * 100}%)`, transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} className="room-slide" alt="" style={{ flexShrink: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        ))}
      </div>
      {idx > 0 && (
        <button className="gallery-prev" onClick={(e) => { e.stopPropagation(); setIdx(idx - 1); }} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(10,10,10,0.6)', border: 'none', color: 'var(--white)', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none"><path d="M8 1L2 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      )}
      {idx < images.length - 1 && (
        <button className="gallery-next" onClick={(e) => { e.stopPropagation(); setIdx(idx + 1); }} style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(10,10,10,0.6)', border: 'none', color: 'var(--white)', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none"><path d="M2 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      )}
      <div className="gallery-dots" style={{ position: 'absolute', bottom: '0.8rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px' }}>
        {images.map((_, i) => (
          <div key={i} className={`gallery-dot${i === idx ? ' active' : ''}`} onClick={(e) => { e.stopPropagation(); setIdx(i); }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: i === idx ? 'var(--gold)' : 'rgba(250,248,244,0.4)', cursor: 'pointer' }} />
        ))}
      </div>
    </div>
  );
}

function AvailBadge({ room }: { room: typeof ROOMS[0] }) {
  const style: React.CSSProperties = { position: 'absolute', top: '1rem', left: '1rem', padding: '0.3rem 0.8rem', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, zIndex: 2 };
  if (!room.available) return <div className="avail-badge unavailable" style={{ ...style, background: '#e05353', color: '#fff' }}>Dolu</div>;
  if (room.rooms_left <= 2) return <div className="avail-badge limited" style={{ ...style, background: '#e07b35', color: '#fff' }}>Son {room.rooms_left} Oda!</div>;
  return <div className="avail-badge available" style={{ ...style, background: 'rgba(10,10,10,0.7)', color: 'var(--gold)', border: '1px solid var(--gold)' }}>Müsait</div>;
}

interface BookingModalProps {
  room: typeof ROOMS[0];
  checkin: string;
  checkout: string;
  nights: number;
  onClose: () => void;
}

function BookingModal({ room, checkin, checkout, nights, onClose }: BookingModalProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', note: '' });
  const [done, setDone] = useState(false);
  const total = room.price * nights;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ background: 'var(--dark)', maxWidth: '520px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '1.5rem', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
          <div>
            <div className="modal-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 300 }}>{room.name}</div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginTop: '0.2rem' }}>{room.category}</div>
          </div>
          <button className="modal-close" onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1rem', cursor: 'pointer', padding: '0.25rem' }}>✕</button>
        </div>
        <div className="modal-body" style={{ padding: '1.5rem' }}>
          {done ? (
            <div className="success-msg" style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div className="success-icon" style={{ width: '56px', height: '56px', background: 'var(--gold)', color: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.4rem' }}>✓</div>
              <div className="success-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 300, marginBottom: '0.5rem' }}>Rezervasyon Talebi Alındı!</div>
              <p className="success-desc" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>En kısa sürede sizinle iletişime geçeceğiz. Teşekkür ederiz.</p>
            </div>
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={room.images[0]} className="modal-img" alt={room.name} style={{ width: '100%', height: '180px', objectFit: 'cover', marginBottom: '1rem' }} />
              <div className="modal-summary" style={{ background: 'var(--mid)', padding: '1rem', marginBottom: '1.2rem' }}>
                {[['Giriş', checkin], ['Çıkış', checkout], ['Süre', `${nights} gece`], ['Gecelik', `₺${room.price}`], ['Toplam', `₺${total.toLocaleString('tr-TR')}`]].map(([k, v]) => (
                  <div key={k} className="modal-summary-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', padding: '0.3rem 0', color: 'var(--text-muted)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
                    <span>{k}</span><span style={{ color: 'var(--white)' }}>{v}</span>
                  </div>
                ))}
              </div>
              <form className="modal-form" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '0.8rem' }}>
                  <div className="modal-field">
                    <label className="modal-label" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '0.3rem' }}>Ad Soyad</label>
                    <input className="modal-input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ahmet Yılmaz" style={{ width: '100%', background: 'var(--mid)', border: '1px solid rgba(201,168,76,0.15)', color: 'var(--white)', padding: '0.6rem 0.8rem', fontSize: '0.8rem', fontFamily: 'var(--font-body)' }} />
                  </div>
                  <div className="modal-field">
                    <label className="modal-label" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '0.3rem' }}>Telefon</label>
                    <input className="modal-input" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+90 5XX XXX XX XX" style={{ width: '100%', background: 'var(--mid)', border: '1px solid rgba(201,168,76,0.15)', color: 'var(--white)', padding: '0.6rem 0.8rem', fontSize: '0.8rem', fontFamily: 'var(--font-body)' }} />
                  </div>
                </div>
                <div className="modal-field" style={{ marginBottom: '0.8rem' }}>
                  <label className="modal-label" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '0.3rem' }}>E-Posta</label>
                  <input className="modal-input" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ornek@email.com" style={{ width: '100%', background: 'var(--mid)', border: '1px solid rgba(201,168,76,0.15)', color: 'var(--white)', padding: '0.6rem 0.8rem', fontSize: '0.8rem', fontFamily: 'var(--font-body)' }} />
                </div>
                <div className="modal-field" style={{ marginBottom: '1.2rem' }}>
                  <label className="modal-label" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '0.3rem' }}>Özel İstek (İsteğe Bağlı)</label>
                  <input className="modal-input" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Erken check-in, özel süsleme vb." style={{ width: '100%', background: 'var(--mid)', border: '1px solid rgba(201,168,76,0.15)', color: 'var(--white)', padding: '0.6rem 0.8rem', fontSize: '0.8rem', fontFamily: 'var(--font-body)' }} />
                </div>
                <button type="submit" className="modal-submit btn-primary" style={{ width: '100%', padding: '1rem' }}>Rezervasyon Talebini Gönder</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RoomsClient() {
  const [checkin, setCheckin] = useState(getToday());
  const [checkout, setCheckout] = useState(getTomorrow());
  const [guests, setGuests] = useState('2');
  const [filter, setFilter] = useState('all');
  const [searched, setSearched] = useState(false);
  const [bookingRoom, setBookingRoom] = useState<typeof ROOMS[0] | null>(null);

  const nights = calcNights(checkin, checkout);
  const guestNum = parseInt(guests);

  let filtered = ROOMS;
  if (filter === '2') filtered = ROOMS.filter((r) => r.capacity === 2);
  else if (filter === '3+') filtered = ROOMS.filter((r) => r.capacity >= 3);
  else if (filter === 'available') filtered = ROOMS.filter((r) => r.available);
  else if (filter === 'suite') filtered = ROOMS.filter((r) => r.category.toLowerCase().includes('suite') || r.category.toLowerCase().includes('presidential'));

  if (searched && guestNum > 0) {
    filtered = filtered.filter((r) => r.capacity >= guestNum);
  }

  const inputStyle: React.CSSProperties = { background: 'var(--dark)', border: '1px solid rgba(201,168,76,0.2)', color: 'var(--white)', padding: '0.6rem 0.8rem', fontSize: '0.8rem', fontFamily: 'var(--font-body)', width: '100%' };
  const labelStyle: React.CSSProperties = { fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 4rem 7rem' }}>
      {/* Availability Bar */}
      <div className="avail-bar" style={{ background: 'var(--dark)', border: '1px solid rgba(201,168,76,0.15)', padding: '1.5rem 2rem', marginBottom: '2rem' }}>
        <div className="avail-inner" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div className="avail-field" style={{ flex: 1, minWidth: '140px' }}>
            <label className="avail-label" style={labelStyle}>Giriş Tarihi</label>
            <input type="date" className="avail-input" style={inputStyle} value={checkin} min={getToday()}
              onChange={(e) => { setCheckin(e.target.value); if (e.target.value >= checkout) { const d = new Date(e.target.value); d.setDate(d.getDate() + 1); setCheckout(d.toISOString().split('T')[0]); } }} />
          </div>
          <div className="avail-field" style={{ flex: 1, minWidth: '140px' }}>
            <label className="avail-label" style={labelStyle}>Çıkış Tarihi</label>
            <input type="date" className="avail-input" style={inputStyle} value={checkout} min={checkin}
              onChange={(e) => setCheckout(e.target.value)} />
          </div>
          <div className="avail-field" style={{ flex: '0 0 140px' }}>
            <label className="avail-label" style={labelStyle}>Kişi Sayısı</label>
            <select className="avail-select avail-input" style={inputStyle} value={guests} onChange={(e) => setGuests(e.target.value)}>
              {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} Kişi</option>)}
            </select>
          </div>
          <div className="avail-nights" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            {nights} gece · <strong style={{ color: 'var(--gold)' }}>Müsaitlik Kontrolü</strong>
          </div>
          <button className="avail-btn btn-primary" style={{ padding: '0.8rem 2rem', whiteSpace: 'nowrap' }} onClick={() => setSearched(true)}>Ara</button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="filter-row" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <span className="filter-label" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Filtre:</span>
        {([['all', 'Tümü'], ['available', 'Müsait'], ['2', '2 Kişilik'], ['3+', 'Aile'], ['suite', 'Suite']] as const).map(([val, label]) => (
          <button key={val} className={`filter-btn${filter === val ? ' active' : ''}`} onClick={() => setFilter(val)}
            style={{ background: filter === val ? 'var(--gold)' : 'transparent', color: filter === val ? 'var(--black)' : 'var(--text-muted)', border: '1px solid', borderColor: filter === val ? 'var(--gold)' : 'rgba(201,168,76,0.2)', padding: '0.4rem 1rem', fontSize: '0.65rem', letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.25s' }}>
            {label}
          </button>
        ))}
      </div>

      {/* Room List */}
      <div className="rooms-list" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {filtered.length === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', padding: '5rem 0' }}>
            <div className="empty-title" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, marginBottom: '0.5rem' }}>Uygun oda bulunamadı</div>
            <p className="empty-desc" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Farklı tarih veya kişi sayısı ile tekrar deneyin.</p>
          </div>
        ) : filtered.map((room) => {
          const total = room.price * nights;
          return (
            <div key={room.id} className="room-row" style={{ display: 'grid', gridTemplateColumns: '380px 1fr', background: 'var(--dark)', overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <AvailBadge room={room} />
                <ImageSlider images={room.images} />
              </div>
              <div className="room-detail" style={{ padding: '2rem' }}>
                <div className="room-cat" style={{ fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.4rem' }}>{room.category}</div>
                <div className="room-name" style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 300, marginBottom: '0.6rem' }}>{room.name}</div>
                <div className="room-capacity" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
                  <span>{room.capacity} Kişiye Kadar · {room.floor}</span>
                </div>
                <p className="room-desc" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.7 }}>{room.desc}</p>
                <div className="room-specs" style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                  {[`${room.size} m²`, room.view, room.floor].map((spec, i) => (
                    <div key={i} className="room-spec" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>{spec}</div>
                  ))}
                </div>
                <div className="room-amenities" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {room.amenities.slice(0, 8).map((a) => <span key={a} className="amenity-tag" style={{ fontSize: '0.62rem', border: '1px solid rgba(201,168,76,0.2)', padding: '0.2rem 0.6rem', color: 'var(--text-muted)' }}>{a}</span>)}
                  {room.amenities.length > 8 && <span className="amenity-tag" style={{ fontSize: '0.62rem', border: '1px solid var(--gold)', padding: '0.2rem 0.6rem', color: 'var(--gold)' }}>+{room.amenities.length - 8} daha</span>}
                </div>
                <div className="room-footer-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: '1.2rem' }}>
                  <div>
                    <div className="room-price-num" style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 300 }}>₺{room.price}</div>
                    <div className="room-price-night" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>/ Gecelik</div>
                    {nights > 1 && <div className="room-total" style={{ fontSize: '0.72rem', color: 'var(--gold)', marginTop: '0.25rem' }}>Toplam: <strong>₺{total.toLocaleString('tr-TR')}</strong> ({nights} gece)</div>}
                  </div>
                  <div className="room-actions" style={{ display: 'flex', gap: '0.8rem' }}>
                    <button className="btn-detail" style={{ background: 'transparent', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--text-muted)', padding: '0.7rem 1.5rem', fontSize: '0.65rem', letterSpacing: '0.15em', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.25s' }}>Detaylar</button>
                    <button
                      className="btn-book btn-primary"
                      disabled={!room.available}
                      onClick={() => room.available && setBookingRoom(room)}
                      style={{ padding: '0.7rem 1.5rem', opacity: room.available ? 1 : 0.5, cursor: room.available ? 'pointer' : 'not-allowed' }}
                    >
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
        <BookingModal room={bookingRoom} checkin={checkin} checkout={checkout} nights={nights} onClose={() => setBookingRoom(null)} />
      )}
    </div>
  );
}
