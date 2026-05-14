import SEO from '../components/global/SEO'
import PageHero from '../components/shared/PageHero'
import SectionLabel from '../components/primitives/SectionLabel'
import styles from './AboutPage.module.css'
import { aboutPage } from '../data/aboutPage'

export default function AboutPage() {
  const intro = aboutPage.introBody ?? []
  const values = aboutPage.values ?? []
  const press = aboutPage.press ?? []

  return (
    <>
      <SEO
        title="About"
        description="Deep Dive Films is a New York-based film and television studio. Documentary and narrative work for streamers, networks, and festivals."
        canonical="/about"
      />
      <PageHero
        eyebrow={aboutPage.heroEyebrow}
        title={aboutPage.heroTitle}
        description={aboutPage.heroDescription}
      />

      <section className={styles.intro}>
        <div className="shell">
          <div className={styles.introGrid}>
            <div className={styles.introLeft}>
              <SectionLabel>{aboutPage.introLabel}</SectionLabel>
            </div>
            <div className={styles.introRight}>
              {intro.map((para, i) => (
                <p key={i} className={styles.body}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className="shell">
          <div className={styles.valuesHead}>
            <SectionLabel>{aboutPage.valuesLabel}</SectionLabel>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <div key={i} className={styles.valueCard}>
                <span className={styles.valueNum}>0{i + 1}</span>
                <h3 className={styles.valueLabel}>{v.label}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {press.length > 0 && (
        <section className={styles.pressSection}>
          <div className="shell">
            <div className={styles.pressHead}>
              <SectionLabel>{aboutPage.pressLabel}</SectionLabel>
            </div>
            <div className={styles.pressList}>
              {press.map((p, i) => (
                <a key={i} href={p.href || '#'} className={styles.pressRow} target="_blank" rel="noopener noreferrer">
                  <span className={styles.pressOutlet}>{p.outlet}</span>
                  <span className={styles.pressTitle}>{p.title}</span>
                  <span className={styles.pressYear}>{p.year} →</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
