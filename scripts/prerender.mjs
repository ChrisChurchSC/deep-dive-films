import fs   from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root      = path.resolve(__dirname, '..')
const distDir   = path.resolve(root, 'dist')
const ssrDir    = path.resolve(root, 'dist-ssr')

const { films } = await import(path.resolve(root, 'src/data/films.js'))

const staticRoutes = ['/', '/about']
const filmRoutes   = films.filter((f) => f.slug).map((f) => `/films/${f.slug}`)
const routes = [...staticRoutes, ...filmRoutes]
console.log(`  Prerendering ${routes.length} routes`)

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')
const { render } = await import(path.join(ssrDir, 'entry-server.js'))

let rendered = 0
let skipped  = 0

for (const url of routes) {
  try {
    const { html: appHtml, helmet } = render(url)

    const headTags = helmet
      ? [
          helmet.title?.toString()  ?? '',
          helmet.meta?.toString()   ?? '',
          helmet.link?.toString()   ?? '',
          helmet.script?.toString() ?? '',
        ].join('\n    ').trim()
      : ''

    const page = template
      .replace('<!--app-head-->', headTags)
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

    const outPath = url === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, url.slice(1), 'index.html')

    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, page)
    rendered++
    console.log(`  ✓ ${url}`)
  } catch (err) {
    skipped++
    console.warn(`  ⚠ ${url} — skipped (${err.message})`)
  }
}

fs.rmSync(ssrDir, { recursive: true, force: true })
console.log(`\n  ${rendered} pages prerendered${skipped ? `, ${skipped} skipped` : ''}.`)
