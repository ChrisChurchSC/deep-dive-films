import { useParams, Link, Navigate } from 'react-router-dom'
import SEO from '../components/global/SEO'
import { filmsBySlug } from '../data/films'
import { siteSettings } from '../data/siteSettings'
import styles from './FilmDetailPage.module.css'

export default function FilmDetailPage() {
  const { slug } = useParams()
  const film = filmsBySlug[slug]

  if (!film) return <Navigate to="/" replace />

  const credits = film.credits ?? {}
  const navLinks = siteSettings.nav?.links ?? []

  const filmJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: film.title,
    description: film.synopsis,
    image: film.poster ? `https://deepdivefilms.com${film.poster}` : undefined,
    datePublished: film.year,
    productionCompany: { '@type': 'Organization', name: 'Deep Dive Films' },
  }

  return (
    <>
      <SEO
        title={film.title}
        canonical={`/${film.slug}`}
        description={film.synopsis}
        ogImage={film.poster ? `https://deepdivefilms.com${film.poster}` : undefined}
        breadcrumbs={[{ name: 'Work', url: '/' }, { name: film.title, url: `/${film.slug}` }]}
        jsonLd={filmJsonLd}
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

        <article className={styles.article}>
          {/* Page photo */}
          <div className={styles.pagePhoto}>
            {film.pageImage ? (
              <img src={film.pageImage} alt="" className={styles.pagePhotoImg} />
            ) : (
              <div className={styles.pagePhotoPlaceholder} aria-hidden="true">
                <span>{film.title}</span>
              </div>
            )}
          </div>

          <div className={styles.body}>
            <header className={styles.titleBlock}>
              <p className={styles.eyebrow}>{film.format}, {film.year}</p>
              <h1 className={styles.title}>{film.title}</h1>
            </header>

            {film.synopsis && (
              <section className={styles.section}>
                <p className={styles.synopsis}>{film.synopsis}</p>
              </section>
            )}

            {(credits.directors?.length || credits.producers?.length || credits.executiveProducers?.length) && (
              <section className={styles.section}>
                <dl className={styles.credits}>
                  {credits.directors?.length > 0 && (
                    <>
                      <dt>{credits.directors.length > 1 ? 'Directed by' : 'Directed by'}</dt>
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
                      <dt>Executive produced by</dt>
                      <dd>{credits.executiveProducers.join(', ')}</dd>
                    </>
                  )}
                </dl>
              </section>
            )}

            {film.partners?.length > 0 && (
              <section className={styles.section}>
                <div className={styles.partners}>
                  {film.partners.map((p) => (
                    <span key={p} className={styles.partner}>{p}</span>
                  ))}
                </div>
              </section>
            )}

            {film.awards?.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionLabel}>Awards & Recognition</h2>
                <ul className={styles.awardList}>
                  {film.awards.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </section>
            )}

            {film.press?.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionLabel}>Press</h2>
                <ul className={styles.pressList}>
                  {film.press.map((p, i) => (
                    <li key={i}>
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className={styles.pressLink}>
                        <span className={styles.pressOutlet}>{p.outlet}</span>
                        <span className={styles.pressTitle}>{p.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </article>
      </div>
    </>
  )
}
