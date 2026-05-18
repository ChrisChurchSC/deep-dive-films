import { Link } from 'react-router-dom'
import SEO from '../components/global/SEO'
import { siteSettings } from '../data/siteSettings'
import styles from './ContactPage.module.css'

export default function ContactPage() {
  const navLinks = siteSettings.nav?.links ?? []
  const socials = siteSettings.footer?.socials ?? {}
  const email = siteSettings.contactEmail

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with Deep Dive Films about a project or collaboration."
        canonical="/contact"
      />

      <div className={`dark ${styles.viewport}`}>
        <header className={styles.topbar}>
          <Link to="/" className={styles.brand}>Deep Dive Films</Link>
          <nav className={styles.nav}>
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className={styles.navLink}>{l.label}</Link>
            ))}
          </nav>
        </header>

        <main className={styles.body}>
          <div className={styles.label}>Contact</div>
          <p className={styles.lead}>
            We're always interested in developing new projects and working with filmmakers who feel deeply connected to the stories they're telling.
          </p>

          <dl className={styles.info}>
            <dt>Email</dt>
            <dd><a href={`mailto:${email}`}>{email}</a></dd>

            <dt>Location</dt>
            <dd>Brooklyn, NY</dd>

            {(socials.instagram || socials.vimeo) && (
              <>
                <dt>Follow</dt>
                <dd>
                  {socials.instagram && <a href={socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
                  {socials.instagram && socials.vimeo && <span className={styles.sep}> · </span>}
                  {socials.vimeo && <a href={socials.vimeo} target="_blank" rel="noopener noreferrer">Vimeo</a>}
                </dd>
              </>
            )}
          </dl>
        </main>
      </div>
    </>
  )
}
