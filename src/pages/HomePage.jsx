import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import SEO from '../components/global/SEO'
import { films } from '../data/films'
import { siteSettings } from '../data/siteSettings'
import { HudCounters, statusFor } from '../components/films/Hud'
import ThreeLogo from '../components/films/ThreeLogo'
import NoiseStatic from '../components/films/NoiseStatic'
import PixelatedVideo from '../components/films/PixelatedVideo'
import styles from './HomePage.module.css'

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://deepdivefilms.com/#organization',
  name: 'Deep Dive Films',
  url: 'https://deepdivefilms.com',
  description: 'Award-winning documentary production company. Character-driven storytelling for streamers, networks, and festivals.',
  sameAs: [
    'https://www.instagram.com/deepdivefilms',
    'https://vimeo.com/deepdivefilms',
  ],
}

function shortFormat(f) {
  const fmt = (f.format || '').toLowerCase()
  if (fmt.includes('series')) return 'SERIES'
  if (fmt.includes('short')) return 'SHORT'
  if (fmt.includes('feature')) return 'FEATURE'
  return f.format?.toUpperCase() || ''
}

function pad2(n) { return String(n).padStart(2, '0') }

export default function HomePage() {
  const navLinks = siteSettings.nav?.links ?? []
  const socials = siteSettings.footer?.socials ?? {}
  const navigate = useNavigate()

  const [active, setActive] = useState(0)
  const [started, setStarted] = useState(false)
  const [now, setNow] = useState(() => new Date())
  const film = films[active]

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const localeTime = useMemo(() => {
    const pad = (n) => String(n).padStart(2, '0')
    const h24 = now.getHours()
    const h12 = h24 % 12 || 12
    const ampm = h24 < 12 ? 'A' : 'P'
    const date = `${pad(now.getMonth() + 1)}.${pad(now.getDate())}.${String(now.getFullYear()).slice(2)}`
    return `${pad(h12)}:${pad(now.getMinutes())}${ampm} ${date}`
  }, [now])

  const selectFilm = useCallback((i) => {
    setActive(i)
    setStarted(true)
    navigate(`/${films[i].slug}`)
  }, [navigate])

  const go = useCallback((delta) => {
    setActive((i) => (i + delta + films.length) % films.length)
    setStarted(true)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Enter') navigate(`/${film.slug}`)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, navigate, film.slug])

  return (
    <>
      <SEO
        canonical="/"
        description="Award-winning documentary production company. Character-driven storytelling for streamers, networks, and festivals."
        jsonLd={homeJsonLd}
      />

      <div className={`dark ${styles.viewport}`}>
        {/* Full-bleed background media */}
        <div className={styles.bg} aria-hidden="true">
          <div className={styles.bgNoise}>
            <NoiseStatic resolution={1600} />
          </div>
          {started && film.pageVideo ? (
            <div key={`${film.slug}-pix`} className={styles.bgMedia}>
              <PixelatedVideo src={film.pageVideo} resolution={40} startTime={film.pageVideoStart || 0} />
            </div>
          ) : null}
          {!started && <div className={styles.bgGradient} />}
          <div className={styles.bgVignette} />
          <div className={styles.bgGradientTop} />
          <div className={styles.bgGradientBottom} />
          <div className={styles.bgLogo}>
            <ThreeLogo src="/ddf-horizontal.svg" width="100%" height="100%" fitFraction={0.5} depth={140} />
          </div>
        </div>

        <div className={styles.gradientBleed} aria-hidden="true" />
        <div className={styles.scanline} aria-hidden="true" />
        <div className={styles.accentStrip} aria-hidden="true" />

        <header className={styles.topbar}>
          <p className={styles.tagline}>
            Award-winning documentary production company telling stories that stay with viewers.
          </p>

          <nav className={styles.nav}>
            {navLinks.map((l, i) => (
              <span key={l.to} className={styles.navItem}>
                <Link to={l.to} className={styles.navLink}>{l.label}</Link>
                {i < navLinks.length - 1 && <span className={styles.navComma}>,</span>}
              </span>
            ))}
          </nav>

          <p className={styles.locale}>
            Brooklyn, NY <span className={styles.localeTime}>{localeTime}</span>
          </p>
        </header>

        <main className={styles.stage}>
          <div className={styles.controls}>
            <div className={styles.module}>
              <div className={styles.moduleHead}>
                <span className={styles.moduleLabel}>
                  <span className={styles.metaId}>DDF-{pad2(active + 1)}</span>
                  <span className={styles.metaSep}>·</span>
                  <span className={styles.metaFormat}>{shortFormat(film)}</span>
                  <span className={styles.metaSep}>·</span>
                  <span className={styles.metaStatus}>{statusFor(film)}</span>
                </span>
                <span className={styles.moduleCounter}>{pad2(active + 1)} / {pad2(films.length)}</span>
              </div>

              <div className={styles.moduleBody}>
                <div className={styles.channels}>
                  <button
                    type="button"
                    className={`${styles.channel} ${!started ? styles.channelActive : ''}`}
                    onClick={() => { setStarted(false); navigate('/') }}
                    aria-label="Home"
                    aria-current={!started}
                  >
                    <span className={styles.bracketTL} aria-hidden="true" />
                    <span className={styles.bracketTR} aria-hidden="true" />
                    <span className={styles.bracketBL} aria-hidden="true" />
                    <span className={styles.bracketBR} aria-hidden="true" />

                    <span className={styles.channelHead}>
                      <span className={styles.channelNum}>00</span>
                      <span className={`${styles.channelDot} ${styles.channelDotLive}`} aria-hidden="true">■</span>
                    </span>

                    <span className={styles.channelTitle}>Home</span>
                    <span className={styles.channelSlug}>Index</span>
                  </button>
                  {films.map((f, i) => {
                    const isActive = i === active
                    const released = /^\d{4}$/.test(f.year)
                    return (
                      <button
                        key={f.slug}
                        className={`${styles.channel} ${isActive && started ? styles.channelActive : ''}`}
                        onClick={() => selectFilm(i)}
                        aria-label={f.title}
                        aria-current={isActive}
                      >
                        <span className={styles.bracketTL} aria-hidden="true" />
                        <span className={styles.bracketTR} aria-hidden="true" />
                        <span className={styles.bracketBL} aria-hidden="true" />
                        <span className={styles.bracketBR} aria-hidden="true" />

                        <span className={styles.channelHead}>
                          <span className={styles.channelNum}>{pad2(i + 1)}</span>
                          <span className={`${styles.channelDot} ${released ? styles.channelDotLive : styles.channelDotIdle}`} aria-hidden="true">
                            {released ? '■' : '◌'}
                          </span>
                        </span>

                        <span className={styles.channelTitle}>{f.title}</span>
                        <span className={styles.channelSlug}>{f.format} · {f.year}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className={styles.bottombar}>
          <HudCounters films={films} />
          <div className={styles.bottomRight}>
            <a href="mailto:hello@deepdivefilms.com" className={styles.bottomLink}>hello@deepdivefilms.com</a>
            <span className={styles.bottomSep}>·</span>
            {socials.instagram && <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className={styles.bottomLink}>IG</a>}
            <span className={styles.bottomSep}>·</span>
            {socials.vimeo && <a href={socials.vimeo} target="_blank" rel="noopener noreferrer" className={styles.bottomLink}>Vimeo</a>}
          </div>
        </footer>

        <Outlet />
      </div>
    </>
  )
}
