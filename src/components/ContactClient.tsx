'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/store/bookingStore';

const ROOMS_LIST = [
  { id: 'classic', name: 'Classic Oda', price: 150, cap: '2 Kişi' },
  { id: 'deluxe', name: 'Deluxe Oda', price: 200, cap: '2 Kişi' },
  { id: 'executive', name: 'Executive Oda', price: 300, cap: '2 Kişi' },
  { id: 'family', name: 'Aile Odası', price: 350, cap: '4 Kişi' },
  { id: 'honeymoon', name: 'Balayı Suite', price: 450, cap: '2 Kişi' },
  { id: 'presidential', name: 'Presidential', price: 1200, cap: '4 Kişi' },
];

const EXTRAS = [
  'Havalimanı Transferi', 'Araç Kiralama', 'Özel Şoför',
  'Çiçek Dekorasyonu', 'Şampanya İkramı', 'Erken Check-in',
  'Geç Check-out', 'Çocuk Karyolası', 'Ekstra Yatak',
  'Spa Paketi', 'Romantik Akşam Yemeği', 'Doğum Günü Sürprizi',
];

function getToday() { return new Date().toISOString().split('T')[0]; }
function getTomorrow() { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; }
function calcNights(ci: string, co: string) { return Math.max(1, Math.round((new Date(co).getTime() - new Date(ci).getTime()) / 86400000)); }
function genRef() { return 'HM-' + Date.now().toString(36).toUpperCase().slice(-6); }

const inputStyle: React.CSSProperties = { width: '100%', background: 'var(--dark)', border: '1px solid rgba(201,168,76,0.15)', color: 'var(--white)', padding: '0.75rem 1rem', fontSize: '0.82rem', fontFamily: 'var(--font-body)', outline: 'none' };
const errorInputStyle: React.CSSProperties = { ...inputStyle, borderColor: 'var(--error)' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--gold)', marginBottom: '0.4rem' };

export default function ContactClient() {
  const router = useRouter();
  const bookingStore = useBookingStore();

  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [refCode] = useState(genRef());

  const [f, setF] = useState({
    checkin: bookingStore.checkIn || getToday(),
    checkout: bookingStore.checkOut || getTomorrow(),
    adults: String(bookingStore.guests.adults || 2),
    children: String(bookingStore.guests.children || 0),
    roomType: bookingStore.roomType || '',
    firstName: '', lastName: '', phone: '', email: '',
    nationality: 'TR', idType: 'TC Kimlik', idNo: '',
    extras: bookingStore.extras || [] as string[],
    floor: '', bedType: '', smokingPref: 'hayir',
    specialRequest: '', arrivalTime: '',
    payType: 'kapida',
    cardName: '', cardNo: '', cardExp: '', cardCvv: '',
    kvkk: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string | boolean | string[]) => setF((p) => ({ ...p, [k]: v }));
  const toggleExtra = (ex: string) => set('extras', (f.extras as string[]).includes(ex) ? (f.extras as string[]).filter((e) => e !== ex) : [...(f.extras as string[]), ex]);

  const nights = calcNights(f.checkin, f.checkout);
  const room = ROOMS_LIST.find((r) => r.id === f.roomType);
  const total = room ? room.price * nights : 0;

  function validate(s: number) {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!f.roomType) e.roomType = 'Lütfen bir oda seçin';
      if (!f.checkin) e.checkin = 'Giriş tarihi gerekli';
      if (!f.checkout) e.checkout = 'Çıkış tarihi gerekli';
    }
    if (s === 2) {
      if (!f.firstName.trim()) e.firstName = 'Ad gerekli';
      if (!f.lastName.trim()) e.lastName = 'Soyad gerekli';
      if (!f.phone.trim()) e.phone = 'Telefon gerekli';
      if (!f.email.trim() || !f.email.includes('@')) e.email = 'Geçerli e-posta girin';
      if (!f.idNo.trim()) e.idNo = 'Kimlik no gerekli';
    }
    if (s === 4) {
      if (!f.kvkk) e.kvkk = 'Lütfen KVKK metnini onaylayın';
      if (f.payType === 'kart') {
        if (!f.cardName.trim()) e.cardName = 'Kart üzerindeki isim gerekli';
        if (!f.cardNo.trim() || f.cardNo.replace(/\s/g, '').length < 16) e.cardNo = 'Geçerli kart numarası girin';
        if (!f.cardExp.trim()) e.cardExp = 'Son kullanma tarihi gerekli';
        if (!f.cardCvv.trim() || f.cardCvv.length < 3) e.cardCvv = 'CVV gerekli';
      }
    }
    return e;
  }

  function next() {
    const e = validate(step);
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    if (step === 4) {
      bookingStore.setCheckIn(f.checkin);
      bookingStore.setCheckOut(f.checkout);
      bookingStore.setRoomType(f.roomType);
      bookingStore.setExtras(f.extras as string[]);
      setSuccess(true);
      return;
    }
    setStep((s) => s + 1);
  }

  function back() { setErrors({}); setStep((s) => s - 1); }

  const steps = ['Tarih & Oda', 'Kişisel Bilgiler', 'Tercihler', 'Onay & Ödeme'];

  const fieldGroupStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' };
  const fieldStyle: React.CSSProperties = { marginBottom: 0 };

  if (success) return (
    <div className="main-section" style={{ padding: '5rem 4rem 7rem', maxWidth: '1280px', margin: '0 auto' }}>
      <div className="success-state" style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
        <div className="success-circle" style={{ width: '72px', height: '72px', background: 'var(--gold)', color: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', fontSize: '1.8rem' }}>✓</div>
        <h2 className="success-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '1rem' }}>
          Rezervasyonunuz<br /><em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>Alındı!</em>
        </h2>
        <p className="success-desc" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Sayın {f.firstName} {f.lastName}, rezervasyon talebiniz başarıyla alınmıştır. En kısa sürede <strong style={{ color: 'var(--gold)' }}>{f.email}</strong> adresinize onay e-postası gönderilecektir.
        </p>
        <div className="success-ref" style={{ background: 'var(--dark)', border: '1px solid rgba(201,168,76,0.2)', padding: '1.5rem', marginBottom: '2.5rem' }}>
          <div className="success-ref-label" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Rezervasyon Referans Kodu</div>
          <div className="success-ref-num" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--gold)', letterSpacing: '0.2em' }}>{refCode}</div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={() => router.push('/')}>Anasayfaya Dön</button>
          <button className="btn-ghost" onClick={() => { setSuccess(false); setStep(1); setF((p) => ({ ...p, firstName: '', lastName: '', phone: '', email: '', idNo: '', cardName: '', cardNo: '', cardExp: '', cardCvv: '', kvkk: false })); }}>Yeni Rezervasyon</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="main-section" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '4rem', maxWidth: '1280px', margin: '0 auto', padding: '5rem 4rem 7rem' }}>
      {/* LEFT: Form */}
      <div className="form-side">
        <div className="section-label">Rezervasyon Formu</div>
        <h2 className="section-title">Konaklamanızı<br />Planlayalım</h2>
        <p className="section-desc" style={{ marginBottom: '2.5rem' }}>
          Aşağıdaki formu doldurarak rezervasyon talebinizi oluşturun. Ekibimiz 2 saat içinde sizinle iletişime geçecektir.
        </p>

        {/* Step Tabs */}
        <div className="step-tabs" style={{ display: 'flex', gap: '0', marginBottom: '2.5rem', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
          {steps.map((s, i) => (
            <div
              key={i}
              className={`step-tab${step === i + 1 ? ' active' : ''}${step > i + 1 ? ' done' : ''}`}
              onClick={() => step > i + 1 && setStep(i + 1)}
              style={{ flex: 1, textAlign: 'center', padding: '0.8rem 0.5rem', cursor: step > i + 1 ? 'pointer' : 'default', borderBottom: step === i + 1 ? '2px solid var(--gold)' : '2px solid transparent', transition: 'all 0.3s' }}
            >
              <div className="step-tab-num" style={{ width: '24px', height: '24px', borderRadius: '50%', background: step > i + 1 ? 'var(--gold)' : step === i + 1 ? 'var(--gold)' : 'var(--mid)', color: step >= i + 1 ? 'var(--black)' : 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.3rem' }}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <div className="step-tab-label" style={{ fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: step === i + 1 ? 'var(--gold)' : 'var(--text-muted)' }}>{s}</div>
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="form-step active">
            <div style={fieldGroupStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Giriş Tarihi <span style={{ color: 'var(--error)' }}>*</span></label>
                <input type="date" style={errors.checkin ? errorInputStyle : inputStyle} value={f.checkin} min={getToday()}
                  onChange={(e) => { set('checkin', e.target.value); if (e.target.value >= f.checkout) { const d = new Date(e.target.value); d.setDate(d.getDate() + 1); set('checkout', d.toISOString().split('T')[0]); } }} />
                {errors.checkin && <div style={{ color: 'var(--error)', fontSize: '0.7rem', marginTop: '0.3rem' }}>{errors.checkin}</div>}
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Çıkış Tarihi <span style={{ color: 'var(--error)' }}>*</span></label>
                <input type="date" style={errors.checkout ? errorInputStyle : inputStyle} value={f.checkout} min={f.checkin}
                  onChange={(e) => set('checkout', e.target.value)} />
                {errors.checkout && <div style={{ color: 'var(--error)', fontSize: '0.7rem', marginTop: '0.3rem' }}>{errors.checkout}</div>}
              </div>
            </div>
            <div style={fieldGroupStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Yetişkin Sayısı</label>
                <select style={inputStyle} value={f.adults} onChange={(e) => set('adults', e.target.value)}>
                  {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} Yetişkin</option>)}
                </select>
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Çocuk Sayısı</label>
                <select style={inputStyle} value={f.children} onChange={(e) => set('children', e.target.value)}>
                  {[0, 1, 2, 3].map((n) => <option key={n} value={n}>{n === 0 ? 'Çocuk Yok' : n + ' Çocuk'}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '0.6rem' }}>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.4rem' }}>Oda Tipi <span style={{ color: 'var(--error)' }}>*</span></div>
              {errors.roomType && <div style={{ color: 'var(--error)', fontSize: '0.7rem', marginBottom: '0.6rem' }}>{errors.roomType}</div>}
            </div>
            <div className="room-type-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {ROOMS_LIST.map((r) => (
                <div key={r.id} className={`room-type-card${f.roomType === r.id ? ' selected' : ''}`} onClick={() => set('roomType', r.id)}
                  style={{ border: `1px solid ${f.roomType === r.id ? 'var(--gold)' : 'rgba(201,168,76,0.15)'}`, background: f.roomType === r.id ? 'var(--gold-dim)' : 'var(--dark)', padding: '0.8rem', cursor: 'pointer', transition: 'all 0.25s' }}>
                  <div className="rtc-name" style={{ fontSize: '0.72rem', fontWeight: 500, marginBottom: '0.3rem' }}>{r.name}</div>
                  <div className="rtc-price" style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--gold)' }}>₺{r.price}/gece</div>
                  <div className="rtc-cap" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{r.cap}</div>
                </div>
              ))}
            </div>

            {f.roomType && nights > 0 && (
              <div style={{ background: 'var(--gold-dim)', border: '1px solid rgba(201,168,76,0.2)', padding: '1rem 1.2rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{nights} gece × ₺{room?.price}</span>
                <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)', fontSize: '1.3rem' }}>₺{total.toLocaleString('tr-TR')}</span>
              </div>
            )}
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="form-step active">
            <div style={fieldGroupStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Ad <span style={{ color: 'var(--error)' }}>*</span></label>
                <input style={errors.firstName ? errorInputStyle : inputStyle} value={f.firstName} onChange={(e) => set('firstName', e.target.value)} placeholder="Ahmet" />
                {errors.firstName && <div style={{ color: 'var(--error)', fontSize: '0.7rem', marginTop: '0.3rem' }}>{errors.firstName}</div>}
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Soyad <span style={{ color: 'var(--error)' }}>*</span></label>
                <input style={errors.lastName ? errorInputStyle : inputStyle} value={f.lastName} onChange={(e) => set('lastName', e.target.value)} placeholder="Yılmaz" />
                {errors.lastName && <div style={{ color: 'var(--error)', fontSize: '0.7rem', marginTop: '0.3rem' }}>{errors.lastName}</div>}
              </div>
            </div>
            <div style={fieldGroupStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Telefon <span style={{ color: 'var(--error)' }}>*</span></label>
                <input style={errors.phone ? errorInputStyle : inputStyle} value={f.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+90 5XX XXX XX XX" />
                {errors.phone && <div style={{ color: 'var(--error)', fontSize: '0.7rem', marginTop: '0.3rem' }}>{errors.phone}</div>}
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>E-Posta <span style={{ color: 'var(--error)' }}>*</span></label>
                <input type="email" style={errors.email ? errorInputStyle : inputStyle} value={f.email} onChange={(e) => set('email', e.target.value)} placeholder="ornek@mail.com" />
                {errors.email && <div style={{ color: 'var(--error)', fontSize: '0.7rem', marginTop: '0.3rem' }}>{errors.email}</div>}
              </div>
            </div>
            <div style={fieldGroupStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Uyruk</label>
                <select style={inputStyle} value={f.nationality} onChange={(e) => set('nationality', e.target.value)}>
                  <option value="TR">Türkiye</option>
                  <option value="DE">Almanya</option>
                  <option value="GB">İngiltere</option>
                  <option value="US">ABD</option>
                  <option value="FR">Fransa</option>
                  <option value="other">Diğer</option>
                </select>
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Kimlik Türü</label>
                <select style={inputStyle} value={f.idType} onChange={(e) => set('idType', e.target.value)}>
                  <option>TC Kimlik</option>
                  <option>Pasaport</option>
                  <option>Sürücü Belgesi</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>{f.idType} No <span style={{ color: 'var(--error)' }}>*</span></label>
              <input style={errors.idNo ? errorInputStyle : inputStyle} value={f.idNo} onChange={(e) => set('idNo', e.target.value)} placeholder="Kimlik / Pasaport numarası" />
              {errors.idNo && <div style={{ color: 'var(--error)', fontSize: '0.7rem', marginTop: '0.3rem' }}>{errors.idNo}</div>}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="form-step active">
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.8rem' }}>Ek Hizmetler &amp; Talepler</div>
            <div className="check-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {EXTRAS.map((ex) => (
                <div key={ex} className={`check-item${(f.extras as string[]).includes(ex) ? ' checked' : ''}`} onClick={() => toggleExtra(ex)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.8rem', border: `1px solid ${(f.extras as string[]).includes(ex) ? 'var(--gold)' : 'rgba(201,168,76,0.12)'}`, background: (f.extras as string[]).includes(ex) ? 'var(--gold-dim)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div className="check-box" style={{ width: '16px', height: '16px', background: (f.extras as string[]).includes(ex) ? 'var(--gold)' : 'transparent', border: `1px solid ${(f.extras as string[]).includes(ex) ? 'var(--gold)' : 'rgba(201,168,76,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {(f.extras as string[]).includes(ex) && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </div>
                  <span className="check-label" style={{ fontSize: '0.72rem', color: (f.extras as string[]).includes(ex) ? 'var(--white)' : 'var(--text-muted)' }}>{ex}</span>
                </div>
              ))}
            </div>
            <div style={fieldGroupStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Kat Tercihi</label>
                <select style={inputStyle} value={f.floor} onChange={(e) => set('floor', e.target.value)}>
                  <option value="">Fark etmez</option>
                  <option>Düşük Kat (2-3)</option>
                  <option>Orta Kat (4-6)</option>
                  <option>Yüksek Kat (7-8)</option>
                  <option>Teras Kat (9)</option>
                </select>
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Yatak Tercihi</label>
                <select style={inputStyle} value={f.bedType} onChange={(e) => set('bedType', e.target.value)}>
                  <option value="">Fark etmez</option>
                  <option>Çift Kişilik (King)</option>
                  <option>İki Ayrı Yatak (Twin)</option>
                </select>
              </div>
            </div>
            <div style={fieldGroupStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Sigara Tercihi</label>
                <select style={inputStyle} value={f.smokingPref} onChange={(e) => set('smokingPref', e.target.value)}>
                  <option value="hayir">Sigara İçilmez</option>
                  <option value="evet">Sigara İçilir</option>
                </select>
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Tahmini Varış Saati</label>
                <select style={inputStyle} value={f.arrivalTime} onChange={(e) => set('arrivalTime', e.target.value)}>
                  <option value="">Belirtmek İstemiyorum</option>
                  {['08:00–10:00', '10:00–12:00', '12:00–14:00', '14:00–16:00', '16:00–18:00', '18:00–20:00', '20:00–22:00', '22:00+'].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Özel İstek veya Not</label>
              <textarea style={{ ...inputStyle, height: '100px', resize: 'vertical' }} value={f.specialRequest} onChange={(e) => set('specialRequest', e.target.value)} placeholder="Alerjiniz, özel gereksinimleriniz veya diğer talepleriniz..." />
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="form-step active">
            <div className="summary-box" style={{ background: 'var(--dark)', border: '1px solid rgba(201,168,76,0.15)', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div className="summary-title" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Rezervasyon Özeti</div>
              {room && (
                <>
                  {[['Oda Tipi', room.name], ['Giriş', f.checkin], ['Çıkış', f.checkout], ['Süre', `${nights} Gece`], ['Misafir', `${f.adults} Yetişkin${parseInt(f.children) > 0 ? ' + ' + f.children + ' Çocuk' : ''}`], ['Misafir Adı', `${f.firstName} ${f.lastName}`]].map(([k, v]) => (
                    <div key={k} className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid rgba(201,168,76,0.08)', fontSize: '0.78rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{k}</span><strong style={{ color: 'var(--white)' }}>{v}</strong>
                    </div>
                  ))}
                  {(f.extras as string[]).length > 0 && (
                    <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid rgba(201,168,76,0.08)', fontSize: '0.78rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Ek Hizmetler</span>
                      <strong style={{ color: 'var(--white)' }}>{(f.extras as string[]).slice(0, 2).join(', ')}{(f.extras as string[]).length > 2 ? ` +${(f.extras as string[]).length - 2}` : ''}</strong>
                    </div>
                  )}
                  <div className="summary-row total" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', fontSize: '0.9rem', marginTop: '0.4rem' }}>
                    <span>Toplam Tutar</span><strong style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>₺{total.toLocaleString('tr-TR')}</strong>
                  </div>
                </>
              )}
            </div>

            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.8rem' }}>Ödeme Yöntemi</div>
            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem' }}>
              {([['kapida', 'Kapıda Ödeme'], ['kart', 'Kredi Kartı'], ['havale', 'Banka Havalesi']] as const).map(([val, label]) => (
                <div key={val} onClick={() => set('payType', val)} style={{ flex: 1, border: `1px solid ${f.payType === val ? 'var(--gold)' : 'rgba(201,168,76,0.18)'}`, background: f.payType === val ? 'var(--gold-dim)' : 'var(--dark)', padding: '0.9rem', cursor: 'pointer', textAlign: 'center', fontSize: '0.72rem', color: f.payType === val ? 'var(--gold)' : 'var(--text-muted)', transition: 'all 0.25s', letterSpacing: '0.08em' }}>
                  {label}
                </div>
              ))}
            </div>

            {f.payType === 'kart' && (
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Kart Üzerindeki İsim <span style={{ color: 'var(--error)' }}>*</span></label>
                  <input style={errors.cardName ? errorInputStyle : inputStyle} value={f.cardName} onChange={(e) => set('cardName', e.target.value)} placeholder="AHMET YILMAZ" />
                  {errors.cardName && <div style={{ color: 'var(--error)', fontSize: '0.7rem', marginTop: '0.3rem' }}>{errors.cardName}</div>}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Kart Numarası <span style={{ color: 'var(--error)' }}>*</span></label>
                  <input style={errors.cardNo ? errorInputStyle : inputStyle} value={f.cardNo} maxLength={19}
                    onChange={(e) => { const v = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim(); set('cardNo', v); }}
                    placeholder="0000 0000 0000 0000" />
                  {errors.cardNo && <div style={{ color: 'var(--error)', fontSize: '0.7rem', marginTop: '0.3rem' }}>{errors.cardNo}</div>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Son Kullanma Tarihi <span style={{ color: 'var(--error)' }}>*</span></label>
                    <input style={errors.cardExp ? errorInputStyle : inputStyle} value={f.cardExp} maxLength={5}
                      onChange={(e) => { let v = e.target.value.replace(/\D/g, ''); if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2); set('cardExp', v); }}
                      placeholder="AA/YY" />
                    {errors.cardExp && <div style={{ color: 'var(--error)', fontSize: '0.7rem', marginTop: '0.3rem' }}>{errors.cardExp}</div>}
                  </div>
                  <div>
                    <label style={labelStyle}>CVV <span style={{ color: 'var(--error)' }}>*</span></label>
                    <input type="password" style={errors.cardCvv ? errorInputStyle : inputStyle} value={f.cardCvv} maxLength={4} onChange={(e) => set('cardCvv', e.target.value.replace(/\D/g, ''))} placeholder="•••" />
                    {errors.cardCvv && <div style={{ color: 'var(--error)', fontSize: '0.7rem', marginTop: '0.3rem' }}>{errors.cardCvv}</div>}
                  </div>
                </div>
              </div>
            )}

            {f.payType === 'havale' && (
              <div style={{ background: 'var(--gold-dim)', border: '1px solid rgba(201,168,76,0.15)', padding: '1.2rem', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.2rem' }}>
                <strong style={{ color: 'var(--gold)', display: 'block', marginBottom: '0.5rem' }}>Banka Bilgileri</strong>
                IBAN: TR12 0001 0012 3456 7890 1234 56<br />
                Alıcı: Hotel Master Turizm A.Ş.<br />
                Açıklama: Rezervasyon — {f.firstName} {f.lastName}
              </div>
            )}

            <div style={{ marginTop: '1rem' }}>
              <div className={`check-item${f.kvkk ? ' checked' : ''}`} onClick={() => set('kvkk', !f.kvkk)} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.6rem 0', cursor: 'pointer', marginBottom: '0.4rem' }}>
                <div className="check-box" style={{ width: '16px', height: '16px', background: f.kvkk ? 'var(--gold)' : 'transparent', border: `1px solid ${f.kvkk ? 'var(--gold)' : 'rgba(201,168,76,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  {f.kvkk && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  <a href="#" style={{ color: 'var(--gold)' }}>KVKK Aydınlatma Metni</a>&apos;ni okudum, kişisel verilerimin işlenmesini kabul ediyorum. <span style={{ color: 'var(--error)' }}>*</span>
                </span>
              </div>
              {errors.kvkk && <div style={{ color: 'var(--error)', fontSize: '0.7rem' }}>{errors.kvkk}</div>}
            </div>

            <p className="privacy-note" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '1rem', lineHeight: 1.7 }}>
              Rezervasyon talebiniz onaylanana kadar herhangi bir ücret tahsil edilmeyecektir. Onay e-postası 2 saat içinde gönderilir. Sorularınız için: <a href="tel:+905338333663" style={{ color: 'var(--gold)' }}>+90 533 833 36 63</a>
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="form-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          {step > 1 ? (
            <button className="btn-ghost" onClick={back} style={{ padding: '0.8rem 1.8rem' }}>← Geri</button>
          ) : <div />}
          <span className="step-hint" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Adım {step} / 4</span>
          <button className="btn-primary" onClick={next} style={{ padding: '0.8rem 1.8rem' }}>
            {step === 4 ? 'Rezervasyon Talebini Gönder' : 'Devam Et →'}
          </button>
        </div>
      </div>

      {/* RIGHT: Sidebar */}
      <div className="right-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="contact-card" style={{ background: 'var(--dark)', border: '1px solid rgba(201,168,76,0.12)', padding: '1.5rem' }}>
          <div className="contact-card-title" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.2rem' }}>İletişim Bilgileri</div>
          {[
            { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.66A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" /></svg>, label: 'Telefon', value: <><a href="tel:+905338333663" style={{ color: 'var(--gold)' }}>+90 533 833 36 63</a><br /><a href="tel:+902125550011" style={{ color: 'var(--gold)' }}>+90 212 555 00 11</a></> },
            { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>, label: 'E-Posta', value: <a href="mailto:rezervasyon@hotelmaster.com" style={{ color: 'var(--gold)' }}>rezervasyon@hotelmaster.com</a> },
            { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>, label: 'Adres', value: 'Cumhuriyet Cad. No:392\nBakırköy, İstanbul 34145' },
          ].map(({ icon, label, value }) => (
            <div key={label} className="contact-entry" style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
              <div className="contact-entry-icon" style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }}>{icon}</div>
              <div>
                <div className="contact-entry-label" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{label}</div>
                <div className="contact-entry-value" style={{ fontSize: '0.8rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="map-card" style={{ background: 'var(--dark)', border: '1px solid rgba(201,168,76,0.12)', overflow: 'hidden' }}>
          <div className="map-placeholder" style={{ height: '160px', background: 'var(--mid)', position: 'relative' }}>
            <div className="map-overlay" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(10,10,10,0.4)' }}>
              <div className="map-pin" style={{ background: 'var(--gold)', color: 'var(--black)', padding: '0.5rem 1rem', fontSize: '0.7rem', fontWeight: 600 }}>📍 Hotel Master</div>
            </div>
          </div>
          <div className="map-address" style={{ padding: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--white)' }}>Hotel Master</strong><br />
            Cumhuriyet Cad. No:392, Bakırköy / İstanbul<br />
            Metro: Bakırköy M1A · 5 dk yürüyüş
          </div>
        </div>

        <div className="hours-card" style={{ background: 'var(--dark)', border: '1px solid rgba(201,168,76,0.12)', padding: '1.5rem' }}>
          <div className="hours-card-title" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Çalışma Saatleri</div>
          {[['Resepsiyon', '7/24 Açık', true], ['Restoran Kahvaltı', '07:00 – 10:30', false], ['Restoran Öğle', '12:00 – 15:00', false], ['Restoran Akşam', '18:00 – 23:00', false], ['Spa & Hamam', '08:00 – 22:00', false], ['Fitness', '06:00 – 23:00', false], ['Havuz', '08:00 – 21:00', false], ['Bar', '18:00 – 02:00', false]].map(([day, time, gold]) => (
            <div key={String(day)} className="hours-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid rgba(201,168,76,0.06)', fontSize: '0.75rem' }}>
              <span className="hours-day" style={{ color: 'var(--text-muted)' }}>{day}</span>
              <span className="hours-time" style={{ color: gold ? 'var(--gold)' : 'var(--white)' }}>{time}</span>
            </div>
          ))}
        </div>

        <div className="social-card" style={{ background: 'var(--dark)', border: '1px solid rgba(201,168,76,0.12)', padding: '1.5rem' }}>
          <div className="social-text" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Bizi takip edin</div>
          <div className="social-links" style={{ display: 'flex', gap: '0.6rem' }}>
            {[
              { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
              { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              { label: 'TikTok', path: 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.66a8.19 8.19 0 004.77 1.52V6.73a4.85 4.85 0 01-1-.04z' },
            ].map(({ label, path }) => (
              <a key={label} href="#" className="social-link" aria-label={label} style={{ width: '36px', height: '36px', border: '1px solid rgba(201,168,76,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', transition: 'all 0.3s' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={path} /></svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
