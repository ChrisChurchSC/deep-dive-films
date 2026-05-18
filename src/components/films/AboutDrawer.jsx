import Drawer from './Drawer'
import SEO from '../global/SEO'
import { aboutPage } from '../../data/aboutPage'
import styles from './InfoDrawer.module.css'

export default function AboutDrawer() {
  const intro = aboutPage.intro ?? []
  const team = aboutPage.team ?? []

  const description = (intro[0] || '').slice(0, 200)

  return (
    <>
    <SEO
      title="About"
      description={description}
      canonical="/about"
      breadcrumbs={[{ name: 'About', url: '/about' }]}
    />
    <Drawer title="About">
      <section className={styles.section}>
        {intro.map((p, i) => <p key={i} className={styles.body}>{p}</p>)}
      </section>

      <section className={styles.section}>
        <h2 className={styles.label}>The Team</h2>
        <ul className={styles.team}>
          {team.map((m) => (
            <li key={m.name} className={styles.teamRow}>
              <div className={styles.teamPhoto}>
                {m.photo ? (
                  <img src={m.photo} alt={m.name} />
                ) : (
                  <div className={styles.teamPhotoPlaceholder} aria-hidden="true" />
                )}
              </div>
              <div className={styles.teamMeta}>
                <p className={styles.teamName}>{m.name}</p>
                <p className={styles.teamRole}>{m.role}</p>
                {m.bio && <p className={styles.teamBio}>{m.bio}</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Drawer>
    </>
  )
}
