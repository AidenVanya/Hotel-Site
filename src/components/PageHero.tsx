import Link from 'next/link';

interface PageHeroProps {
  title: string;
  titleEmphasis?: string;
  breadcrumb: string;
  bgImage: string;
  height?: string;
}

export default function PageHero({
  title,
  titleEmphasis,
  breadcrumb,
  bgImage,
  height = '65vh',
}: PageHeroProps) {
  return (
    <div className="page-hero" style={{ height, minHeight: '400px', paddingTop: '80px' }}>
      <div
        className="page-hero-bg"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="page-hero-overlay" />
      <div className="page-hero-content">
        <div className="breadcrumb">
          <Link href="/">Anasayfa</Link>
          <span>/</span>
          <span style={{ color: 'var(--white)' }}>{breadcrumb}</span>
        </div>
        <h1 className="page-hero-title">
          {title}
          {titleEmphasis && (
            <>
              <br />
              <em>{titleEmphasis}</em>
            </>
          )}
        </h1>
      </div>
    </div>
  );
}
