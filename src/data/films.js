// Hardcoded film catalogue. To add a film: drop a poster in public/films/,
// append an entry below with matching slug.

export const films = [
  {
    slug: 'what-will-i-become',
    title: 'What Will I Become?',
    year: '2026',
    format: 'Feature documentary',
    poster: '/films/what-will-i-become/poster.jpg',
    logline:
      "A coming-of-age documentary about identity, family, and what we inherit. Berlinale 2026 premiere.",
    synopsis: '',
    credits: {
      director: '',
      producers: [],
      executiveProducers: ['Harper Steele'],
      cinematographer: '',
      editor: '',
    },
    festivals: ['Berlinale 2026'],
    press: [],
    links: {
      trailer: '',
      watch: '',
    },
    stills: [],
  },
  {
    slug: 'big-bass',
    title: 'Big Bass',
    year: '2025',
    format: 'Short documentary',
    poster: '/films/big-bass/poster.jpg',
    logline:
      "A personal story about fishing, fathers, and the rituals that hold a family together. Jury Prize at Palm Springs ShortFest 2025.",
    synopsis: '',
    credits: {},
    festivals: ['Palm Springs ShortFest 2025 — Jury Prize', 'Cleveland International Film Festival 2026'],
    press: [],
    links: { trailer: '', watch: '' },
    stills: [],
  },
  {
    slug: 'fireboys',
    title: 'Fireboys',
    year: '2022',
    format: 'Feature documentary — HBO',
    poster: '/films/fireboys/poster.jpg',
    logline:
      "Inside the all-Black incarcerated fire crews battling California's worst wildfires.",
    synopsis: '',
    credits: {},
    festivals: [],
    press: [],
    links: { trailer: '', watch: 'https://www.hbo.com/' },
    stills: [],
  },
]

export const filmsBySlug = Object.fromEntries(films.map((f) => [f.slug, f]))
