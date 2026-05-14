import { Link } from 'react-router-dom'
import styles from './SiteFooter.module.css'
import wordmark from '../../assets/dd-wordmark.svg'
import { siteSettings } from '../../data/siteSettings'

export default function SiteFooter() {
  const footer = siteSettings.footer ?? {}
  const footerLinks = footer.links ?? []
  const socials = footer.socials ?? {}
  const email = siteSettings.contactEmail

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        <nav className={styles.links} aria-label="Footer">
          {footerLinks.map((l, i) => (
            <div key={l.to} className={styles.linkRow}>
              {i > 0 && <div className={styles.rule} />}
              <Link to={l.to} className={styles.link}>{l.label}</Link>
            </div>
          ))}
        </nav>

        <div className={styles.mid}>
          <div className={styles.brand}>
            <img src={wordmark} height={20} alt="Deep Dive Films" className={styles.wordmark} />
            <p className={styles.tagline}>
              {(footer.tagline ?? '').split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </p>
            <div className={styles.socials}>
              {socials.instagram && (
                <a href={socials.instagram} className={styles.social} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
              )}
              {socials.vimeo && (
                <a href={socials.vimeo} className={styles.social} aria-label="Vimeo" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 7.42c-.09 2.01-1.49 4.76-4.2 8.26C15.05 19.32 12.7 21 10.7 21c-1.27 0-2.35-1.18-3.24-3.54L5.82 12.3C5.2 9.94 4.53 8.76 3.82 8.76c-.16 0-.71.33-1.64.99L1 8.44c1.03-.91 2.05-1.82 3.05-2.74 1.37-1.19 2.4-1.82 3.09-1.88 1.62-.16 2.62.96 3 3.34.41 2.56.69 4.15.85 4.78.47 2.15.99 3.22 1.56 3.22.44 0 1.1-.7 1.98-2.09.88-1.4 1.35-2.46 1.42-3.2.13-1.21-.35-1.82-1.42-1.82-.51 0-1.03.12-1.57.35.99-3.23 2.88-4.8 5.66-4.71 2.06.06 3.03 1.4 2.88 4.01z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>© {new Date().getFullYear()} {siteSettings.siteName}. {footer.copyrightCity}</span>
          <a href={`mailto:${email}`} className={styles.email}>{email}</a>
        </div>

      </div>
    </footer>
  )
}
