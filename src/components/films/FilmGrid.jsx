import { Link } from 'react-router-dom'
import styles from './FilmGrid.module.css'

export default function FilmGrid({ films }) {
  return (
    <section className={styles.section}>
      <div className={styles.shell}>
        <ul className={styles.grid}>
          {films.map((f) => (
            <li key={f.slug} className={styles.item}>
              <Link to={`/films/${f.slug}`} className={styles.card}>
                <div className={styles.posterFrame}>
                  {f.poster ? (
                    <img
                      src={f.poster}
                      alt={f.title}
                      className={styles.poster}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.posterPlaceholder} aria-hidden="true">
                      <span>{f.title}</span>
                    </div>
                  )}
                </div>
                <div className={styles.meta}>
                  <h3 className={styles.title}>{f.title}</h3>
                  <span className={styles.sub}>{f.year}{f.format ? ` · ${f.format}` : ''}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
