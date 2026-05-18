import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_PATH  = path.resolve(__dirname, '../public/sitemap.xml')
const SITE_URL  = 'https://deepdivefilms.com'

const { films } = await import(path.resolve(__dirname, '../src/data/films.js'))

const staticRoutes = [
  { path: '/',        priority: '1.0', changefreq: 'weekly' },
  { path: '/about',   priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
]

const filmRoutes = films
  .filter((f) => f.slug)
  .map((f) => ({ path: `/${f.slug}`, priority: '0.8', changefreq: 'monthly' }))

const all = [...staticRoutes, ...filmRoutes]

const urls = all
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

await fs.writeFile(OUT_PATH, xml)
console.log(`  ✓ wrote sitemap.xml — ${all.length} routes`)
