// Films are fetched from Sanity at build time by scripts/fetch-films.mjs
// and written to films.generated.json. To refresh locally, run:
//   npm run build:films
import generated from './films.generated.json'

export const films = generated
export const filmsBySlug = Object.fromEntries(films.map((f) => [f.slug, f]))
