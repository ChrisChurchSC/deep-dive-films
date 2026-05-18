import { useParams, Navigate } from 'react-router-dom'
import Drawer from './Drawer'
import { filmsBySlug } from '../../data/films'
import styles from './InfoDrawer.module.css'

export default function FilmDrawer() {
  const { slug } = useParams()
  const film = filmsBySlug[slug]
  if (!film) return <Navigate to="/" replace />

  const credits = film.credits ?? {}
  const hasCredits =
    credits.directors?.length ||
    credits.producers?.length ||
    credits.executiveProducers?.length

  return (
    <Drawer title={film.title}>
      {film.trailer ? (
        <section className={styles.section}>
          <p className={styles.label}>Trailer</p>
          <video
            src={film.trailer}
            controls
            playsInline
            preload="metadata"
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              background: '#000',
              display: 'block',
              border: '1px solid var(--border)',
            }}
          />
        </section>
      ) : film.pageImage ? (
        <section className={styles.section}>
          <img
            src={film.pageImage}
            alt={film.title}
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              objectFit: 'cover',
              display: 'block',
              border: '1px solid var(--border)',
              background: '#000',
            }}
          />
        </section>
      ) : null}

      <section className={styles.section}>
        <p className={styles.label}>{film.format}, {film.year}</p>
        {film.synopsis && <p className={styles.body}>{film.synopsis}</p>}
      </section>

      {hasCredits && (
        <section className={styles.section}>
          <h2 className={styles.label}>Credits</h2>
          <dl className={styles.info}>
            {credits.directors?.length > 0 && (
              <>
                <dt>Directed by</dt>
                <dd>{credits.directors.join(' & ')}</dd>
              </>
            )}
            {credits.producers?.length > 0 && (
              <>
                <dt>Produced by</dt>
                <dd>{credits.producers.join(', ')}</dd>
              </>
            )}
            {credits.executiveProducers?.length > 0 && (
              <>
                <dt>Executive prod.</dt>
                <dd>{credits.executiveProducers.join(', ')}</dd>
              </>
            )}
          </dl>
        </section>
      )}

      {film.partners?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.label}>Partners</h2>
          <p className={styles.body}>{film.partners.join(' · ')}</p>
        </section>
      )}

      {film.awards?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.label}>Awards & Recognition</h2>
          <ul style={{ margin: 0, paddingLeft: '1.1em', display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
            {film.awards.map((a, i) => (
              <li key={i} style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--text)' }}>{a}</li>
            ))}
          </ul>
        </section>
      )}

      {film.press?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.label}>Press</h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
            {film.press.map((p, i) => (
              <li key={i}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', color: 'var(--text)', textDecoration: 'none' }}
                >
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 2 }}>
                    {p.outlet}
                  </span>
                  <span style={{ display: 'block', fontSize: 15, lineHeight: 1.4 }}>{p.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Drawer>
  )
}
