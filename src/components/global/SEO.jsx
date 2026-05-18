import { Helmet } from 'react-helmet-async'
import { siteSettings } from '../../data/siteSettings'

const SITE_NAME = 'Deep Dive Films'
const SITE_TAGLINE = 'Documentary and narrative film'
const SITE_URL  = 'https://deepdivefilms.com'
const OG_IMAGE  = `${SITE_URL}/og-default.png`

const GSC_VERIFICATION = ''

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/og-default.png`,
  description: siteSettings.siteDescription,
  email: siteSettings.contactEmail,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brooklyn',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
  sameAs: [
    siteSettings.footer?.socials?.instagram,
  ].filter(Boolean),
}

export default function SEO({
  title,
  description,
  canonical,
  ogImage   = OG_IMAGE,
  ogType    = 'website',
  noIndex   = false,
  jsonLd,
  breadcrumbs,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — ${SITE_TAGLINE}`

  const resolvedCanonical = canonical ? `${SITE_URL}${canonical}` : null

  const breadcrumbSchema = breadcrumbs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          ...breadcrumbs.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 2,
            name: b.name,
            item: `${SITE_URL}${b.url}`,
          })),
        ],
      }
    : null

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}

      {noIndex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      }

      {GSC_VERIFICATION && (
        <meta name="google-site-verification" content={GSC_VERIFICATION} />
      )}

      {resolvedCanonical && <link rel="canonical" href={resolvedCanonical} />}

      <meta property="og:type"        content={ogType} />
      <meta property="og:title"       content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image"       content={ogImage} />
      {resolvedCanonical && <meta property="og:url" content={resolvedCanonical} />}
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:locale"      content="en_US" />

      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image"       content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}

      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  )
}
