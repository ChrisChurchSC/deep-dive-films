import styles from './PageHero.module.css'
import SectionLabel from '../primitives/SectionLabel'
import Reveal from '../primitives/Reveal'

export default function PageHero({ eyebrow, title, description, align = 'left' }) {
  return (
    <section className={`${styles.hero} ${styles[align]}`}>
      <div className="shell">
        <div className={styles.inner}>
          {eyebrow && <Reveal><SectionLabel>{eyebrow}</SectionLabel></Reveal>}
          <Reveal delay={1}><h1 className={styles.title}>{title}</h1></Reveal>
          {description && <Reveal delay={2}><p className={styles.desc}>{description}</p></Reveal>}
        </div>
      </div>
    </section>
  )
}
