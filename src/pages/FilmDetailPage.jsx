import { useParams, Link, Navigate } from 'react-router-dom'
import SEO from '../components/global/SEO'
import { filmsBySlug } from '../data/films'
import styles from './FilmDetailPage.module.css'

export default function FilmDetailPage() {
  const { slug } = useParams()
  const film = filmsBySlug[slug]

  if (!film) return <Navigate to="/" replace />

  const credits = film.credits ?? {}

  const filmJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: film.title,
    description: film.logline || film.synopsis,
    image: film.poster ? `https://deepdivefilms.com${film.poster}` : undefined,
    datePublished: film.year,
    productionCompany: { '@type': 'Organization', name: 'Deep Dive Films' },
  }

  return (
    <>
      <SEO
        title={film.title}
        canonical={`/films/${film.slug}`}
        description={film.logline}
        ogImage={film.poster ? `https://deepdivefilms.com${film.poster}` : undefined}
        breadcrumbs={[{ name: 'Films', url: '/' }, { name: film.title, url: `/films/${film.slug}` }]}
        jsonLd={filmJsonLd}
      />

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <Link to="/" className={styles.back}>← All films</Link>
            <p className={styles.eyebrow}>{film.year} · {film.format}</p>
            <h1 className={styles.title}>{film.title}</h1>
            {film.logline && <p className={styles.logline}>{film.logline}</p>}
          </div>
        </header>

        {film.poster && (
          <div className={styles.posterWrap}>
            <img src={film.poster} alt={film.title} className={styles.poster} />
          </div>
        )}

        <div className={styles.body}>
          {film.synopsis && (
            <section className={styles.section}>
              <h2 className={styles.sectionLabel}>Synopsis</h2>
              <div className={styles.prose}>
                {film.synopsis.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </section>
          )}

          {(credits.director || credits.producers?.length || credits.executiveProducers?.length || credits.cinematographer || credits.editor) && (
            <section className={styles.section}>
              <h2 className={styles.sectionLabel}>Credits</h2>
              <dl className={styles.credits}>
                {credits.director && (
                  <>
                    <dt>Director</dt>
                    <dd>{credits.director}</dd>
                  </>
                )}
                {credits.producers?.length > 0 && (
                  <>
                    <dt>Producers</dt>
                    <dd>{credits.producers.join(', ')}</dd>
                  </>
                )}
                {credits.executiveProducers?.length > 0 && (
                  <>
                    <dt>Executive producers</dt>
                    <dd>{credits.executiveProducers.join(', ')}</dd>
                  </>
                )}
                {credits.cinematographer && (
                  <>
                    <dt>Cinematographer</dt>
                    <dd>{credits.cinematographer}</dd>
                  </>
                )}
                {credits.editor && (
                  <>
                    <dt>Editor</dt>
                    <dd>{credits.editor}</dd>
                  </>
                )}
              </dl>
            </section>
          )}

          {film.festivals?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionLabel}>Festivals</h2>
              <ul className={styles.list}>
                {film.festivals.map((fest, i) => <li key={i}>{fest}</li>)}
              </ul>
            </section>
          )}

          {(film.links?.trailer || film.links?.watch) && (
            <section className={styles.section}>
              <h2 className={styles.sectionLabel}>Watch</h2>
              <div className={styles.actions}>
                {film.links.trailer && (
                  <a className={styles.action} href={film.links.trailer} target="_blank" rel="noopener noreferrer">Trailer →</a>
                )}
                {film.links.watch && (
                  <a className={styles.action} href={film.links.watch} target="_blank" rel="noopener noreferrer">Watch the film →</a>
                )}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  )
}
