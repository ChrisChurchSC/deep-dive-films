import { Link } from 'react-router-dom'
import SEO from '../components/global/SEO'
import { aboutPage } from '../data/aboutPage'
import { siteSettings } from '../data/siteSettings'
import styles from './AboutPage.module.css'

export default function AboutPage() {
  const navLinks = siteSettings.nav?.links ?? []
  const intro = aboutPage.intro ?? []
  const team = aboutPage.team ?? []

  return (
    <>
      <SEO
        title="About"
        description="Award-winning documentary production company. Character-driven storytelling rooted in earned trust and close collaboration."
        canonical="/about"
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
          <section className={styles.intro}>
            <div className={styles.label}>About</div>
            <div className={styles.prose}>
              {intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          <section className={styles.teamSection}>
            <div className={styles.label}>The Team</div>
            <div className={styles.teamGrid}>
              {team.map((m) => (
                <div key={m.name} className={styles.teamCard}>
                  <div className={styles.photoFrame}>
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} className={styles.photo} />
                    ) : (
                      <div className={styles.photoPlaceholder} aria-hidden="true" />
                    )}
                  </div>
                  <p className={styles.teamName}>{m.name}</p>
                  <p className={styles.teamRole}>{m.role}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
