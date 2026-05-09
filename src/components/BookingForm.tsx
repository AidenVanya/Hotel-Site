'use client';

import Link from 'next/link';
import { useBookingStore } from '@/store/bookingStore';

export default function BookingForm() {
  const { checkIn, checkOut, guests } = useBookingStore();

  return (
    <div
      style={{
        background: 'var(--dark)',
        border: '1px solid rgba(201,168,76,0.2)',
        padding: '2.5rem',
        maxWidth: '480px',
        margin: '2rem auto',
        textAlign: 'center',
      }}
    >
      <div className="section-label" style={{ justifyContent: 'center' }}>
        Rezervasyon Sistemi
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.8rem',
          fontWeight: 300,
          color: 'var(--white)',
          margin: '0.5rem 0 1rem',
        }}
      >
        Çok Yakında
      </h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Gelişmiş rezervasyon sistemi yakında aktif olacak.
        {checkIn && ` Seçilen tarih: ${checkIn}${checkOut ? ` — ${checkOut}` : ''}`}
        {guests.adults > 0 && `, ${guests.adults} yetişkin`}
      </p>
      <Link href="/iletisim" className="btn-primary">
        Rezervasyon Yap
      </Link>
    </div>
  );
}
