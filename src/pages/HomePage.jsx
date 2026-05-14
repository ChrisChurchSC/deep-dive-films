import SEO from '../components/global/SEO'
import FilmGrid from '../components/films/FilmGrid'
import { films } from '../data/films'
import styles from './HomePage.module.css'

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://deepdivefilms.com/#organization',
  name: 'Deep Dive Films',
  url: 'https://deepdivefilms.com',
  logo: 'https://deepdivefilms.com/og-default.png',
  description: 'New York-based film and television studio. Documentary and narrative work for streamers, networks, and festivals.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brooklyn',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
  sameAs: [
    'https://www.instagram.com/deepdivefilms',
    'https://vimeo.com/deepdivefilms',
  ],
}

export default function HomePage() {
  return (
    <>
      <SEO
        canonical="/"
        description="New York-based film and television studio. Documentary and narrative work for streamers, networks, and festivals."
        jsonLd={homeJsonLd}
      />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Deep Dive Films</p>
          <h1 className={styles.heroTitle}>
            Documentary and narrative film.
          </h1>
        </div>
      </header>

      <FilmGrid films={films} />
    </>
  )
}
