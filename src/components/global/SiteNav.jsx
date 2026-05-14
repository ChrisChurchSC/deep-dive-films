import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './SiteNav.module.css'
import wordmark from '../../assets/dd-wordmark.svg'
import icon from '../../assets/dd-icon.svg'
import MobileNav from './MobileNav'
import { siteSettings } from '../../data/siteSettings'

export default function SiteNav() {
  const links = siteSettings.nav?.links ?? []
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const isActive = (to) => to === '/' ? pathname === '/' : pathname.startsWith(to)

  return (
    <>
      <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <Link to="/" className={styles.brand}>
            <img src={icon} height={30} alt="" className={styles.icon} aria-hidden="true" />
            <img src={wordmark} height={20} alt="Deep Dive Films" className={styles.wordmark} />
          </Link>

          <nav className={styles.links} aria-label="Primary">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`${styles.link} ${isActive(l.to) ? styles.active : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions} />

          <button
            className={styles.hamburger}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
          >
            <span className={`${styles.bar} ${mobileOpen ? styles.open : ''}`} />
            <span className={`${styles.bar} ${mobileOpen ? styles.open : ''}`} />
          </button>
        </div>
      </header>

      <MobileNav links={links} isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
