// Build-time fetch of film documents from Sanity. Output is written to
// src/data/films.generated.json, which is imported by src/data/films.js.
// Runs in predev/prebuild via package.json.
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '..', 'src', 'data', 'films.generated.json')

const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'h5ku88jy'
const DATASET = process.env.SANITY_DATASET || 'production'
const TOKEN = process.env.SANITY_READ_TOKEN // optional, only needed for private datasets

const QUERY = `*[_type == "film"] | order(order asc, _createdAt asc){
  "slug": slug.current,
  title,
  year,
  format,
  synopsis,
  "poster": poster.asset->url,
  "pageImage": pageImage.asset->url,
  "pageVideo": pageVideo.asset->url,
  pageVideoStart,
  "trailer": trailer.asset->url,
  pixelated,
  credits,
  partners,
  awards,
  press[]{outlet, title, url}
}`

const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${encodeURIComponent(QUERY)}`
const res = await fetch(url, TOKEN ? {headers: {Authorization: `Bearer ${TOKEN}`}} : undefined)
if (!res.ok) {
  console.error(`Sanity fetch failed: ${res.status} ${await res.text()}`)
  process.exit(1)
}
const {result} = await res.json()
if (!Array.isArray(result) || result.length === 0) {
  console.error('No films returned from Sanity. Refusing to overwrite films.generated.json.')
  process.exit(1)
}

await fs.writeFile(OUT, JSON.stringify(result, null, 2) + '\n')
console.log(`  ✓ wrote ${path.relative(path.join(__dirname, '..'), OUT)} — ${result.length} films`)
