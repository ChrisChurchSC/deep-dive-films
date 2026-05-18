// Featured films, ordered for the gallery wall.
// Drop posters at public/films/{slug}/poster.jpg and page photos at
// public/films/{slug}/page.jpg.

export const films = [
  {
    slug: 'wwib',
    title: 'What Will I Become?',
    year: '2026',
    format: 'Feature documentary',
    poster: '/films/wwib/poster.jpg',
    pageImage: '/films/wwib/page.jpg',
    pageVideo: 'https://cdn.sanity.io/files/h5ku88jy/production/e7c9d2a8d31bdd74afc3684e301492b9f51ca283.mp4',
    trailer: 'https://cdn.sanity.io/files/h5ku88jy/production/e7c9d2a8d31bdd74afc3684e301492b9f51ca283.mp4',
    synopsis:
      "In this personal and expansive documentary, Lexie Bean and Logan Rozos explore the unique challenges of growing up as trans boys, interweaving their own journeys with the stories of two young men whose lives left a lasting imprint on their community.",
    credits: {
      directors: ['Lexie Bean', 'Logan Rozos'],
      producers: ['Drew Dickler', 'David Sherwin', 'Geoff Pingree', 'Ricki Stern'],
      executiveProducers: ['Harper Steele', 'Lois Vossen', 'Carrie Lozano'],
    },
    partners: ['ITVS', 'Sundance Institute', 'Berlin', 'Amnesty'],
    awards: [
      'Berlin International Film Festival — World Premiere',
      'Amnesty International Film Award',
      'AG Kino — Gilde Cinema Vision 14Plus Award',
      'Pink Apple Film Festival — Audience Award: Best Documentary',
      'BFI Flare London LGBT Film Festival — Official Selection',
      'Inside Out Film Festival — Official Selection',
    ],
    press: [
      {
        outlet: 'Buzzfeed',
        title: '5-star review — BFI Flare London LGBTQIA+ Film Festival Reviews',
        url: 'https://www.buzzfeed.com/poppyscarborough/bfi-flare-londons-lgbtqia-film-festival-reviews',
      },
      {
        outlet: 'Deadline',
        title: "'What Will I Become?' Premieres At Berlin Film Festival",
        url: 'https://deadline.com/2026/02/what-will-i-become-documentary-clip-berlinale-1236731048/',
      },
      {
        outlet: 'Hollywood Reporter',
        title: 'Harper Steele Boards Berlin-Premiering Doc',
        url: 'https://www.hollywoodreporter.com/movies/movie-news/harper-steele-berlin-trans-youth-documentary-film-producer-1236476234/',
      },
    ],
  },
  {
    slug: 'bigbass',
    title: 'Big Bass',
    year: '2025',
    format: 'Short documentary',
    poster: '/films/bigbass/poster.jpg',
    pageImage: '/films/bigbass/page.jpg',
    pageVideo: 'https://cdn.sanity.io/files/h5ku88jy/production/950e6cf78ebd533a45492afc543c3227f7f8afa2.mp4',
    pixelated: true,
    synopsis:
      "What does it mean to feel seen by others before you're ready to see yourself? A filmmaker travels back to 1997 to revisit a dream-like memory from second grade that centers around her queer identity, her legendary PE teacher and a mysterious large plastic fish.",
    credits: {
      directors: ['Drew Dickler'],
      producers: ['Nikki F. Heyman', 'Jennie Kamin', 'David Sherwin'],
      executiveProducers: ['Andre Robert Lee'],
    },
    awards: [
      'Palm Springs International ShortFest — Desert View Jury Award',
      'Cleveland International Film Festival — Audience Award: Best LGBT Short',
      'Wicked Queer: Boston LGBTQ+ Film Festival — Audience Award: Best in Show',
      'Cinema Diverse LGBTQ Film Festival — Jury & Audience Award',
      'Fresno Reel Pride LGBTQ+ Film Festival — Audience Award: Youth Choice',
      'Desperado LGBTQ+ Film Festival — Audience Award: Best Short',
      'Media Film Festival — Best Documentary Award',
      'DOC NYC — Official Selection',
      'DC/DOX — Official Selection',
      'Raindance Film Festival in London — Official Selection',
      'Flickers Rhode Island International Film Festival — Official Selection',
      'San Diego International Film Festival — Official Selection',
      'Newport Beach Film Festival — Official Selection',
    ],
    press: [
      {
        outlet: 'Axios',
        title: 'From Oberlin to CIFF50',
        url: 'https://www.axios.com/local/cleveland/2026/04/07/drew-dickler-big-bass-cleveland-international-film-festival-ciff',
      },
      {
        outlet: 'Philadelphia Gay News',
        title: 'SpringFest 2026: LGBTQ features and shorts',
        url: 'https://epgn.com/2026/04/07/springfest-2026-lgbtq-features-and-shorts/',
      },
      {
        outlet: 'Variety',
        title: '2025 Palm Springs International ShortFest Winners',
        url: 'https://variety.com/2025/film/news/2025-palm-springs-international-shortfest-winners-list-1236443698/',
      },
    ],
  },
  {
    slug: 'fireboys',
    title: 'Fireboys',
    year: '2021',
    format: 'Feature documentary',
    poster: '/films/fireboys/poster.jpg',
    pageImage: 'https://cdn.sanity.io/images/h5ku88jy/production/05cbbf8c98e7bd5b8a5f62133d02e2b58f5e2c4d-1920x1080.png',
    pageVideo: 'https://cdn.sanity.io/files/h5ku88jy/production/5402eebefc5171cd37c92638b98311daf4d103e5.mp4',
    pageVideoStart: 15,
    trailer: 'https://cdn.sanity.io/files/h5ku88jy/production/5402eebefc5171cd37c92638b98311daf4d103e5.mp4',
    synopsis:
      'The untold story of young men in California prisons who find hope and redemption by fighting wildfires, highlighting a path that is both hopeful and exploitative.',
    credits: {
      directors: ['Drew Dickler', 'Jakob Hochendoner'],
      producers: ['Jakob Hochendoner', 'David Sherwin', 'Drew Dickler', 'Geoff Pingree'],
    },
    partners: ['HBO', 'Good Docs'],
    awards: [
      'Red Rock Film Festival — Outstanding Documentary Feature',
      'Awareness Film Festival — Grand Jury Award',
      'Chain Film Festival NYC — Best of Fest',
      "US State Department's American Film Showcase — Official Selection",
      'Dances with Films Los Angeles — Official Selection',
      'Heartland International Film Festival — Official Selection',
      'Napa Valley Film Festival — Official Selection',
      'Chagrin Documentary Film Festival — Official Selection',
      'San Luis Obispo International Film Festival — Official Selection',
    ],
    press: [
      {
        outlet: 'ABC7 Eyewitness News',
        title: 'New documentary spotlight',
        url: 'https://abc7.com/post/fireboys-documentary-movie-firefighters/10926031/',
      },
      {
        outlet: 'San Francisco Chronicle',
        title: 'Fireboys review',
        url: 'https://www.sfchronicle.com/entertainment/movies-tv/article/review-fireboys-and-bring-your-own-brigade-21175661.php',
      },
      {
        outlet: 'Film Threat',
        title: 'Fireboys review',
        url: 'https://filmthreat.com/reviews/fireboys/',
      },
    ],
  },
  {
    slug: 'grassceiling',
    title: 'The Grass Ceiling',
    year: 'Post-production',
    format: 'Feature documentary',
    poster: '/films/grassceiling/poster.jpg',
    pageImage: 'https://cdn.sanity.io/images/h5ku88jy/production/4ce903b6624d0a1201eae7901243b54747b933aa-3929x2623.jpg',
    pageVideo: 'https://cdn.sanity.io/files/h5ku88jy/production/02280ada8055864bf96efd48ec1d026dd576c5e0.mp4',
    pixelated: true,
    synopsis:
      'The Grass Ceiling is an intergenerational story about women and baseball. A filmmaker revisits her abandoned dream of playing professional baseball by following four girls fighting for a place in the sport, as a historic women’s league prepares to launch.',
    credits: {
      directors: ['Sarah Strauss'],
      producers: ['Drew Dickler', 'David Sherwin'],
    },
  },
  {
    slug: 'hashhunt',
    title: 'Hash Hunt',
    year: 'Production',
    format: 'Documentary series',
    poster: '/films/hashhunt/poster.jpg',
    pageImage: 'https://cdn.sanity.io/images/h5ku88jy/production/4ea6adf37249194a67c3eea7a018bee01504e77d-2700x4050.jpg',
    pageVideo: 'https://cdn.sanity.io/files/h5ku88jy/production/ce8f5607de93078301e461f119cdfbfb0b80773a.mp4',
    pixelated: true,
    synopsis:
      'A true crime thriller about Vermont kingpin Billy Greer and his ragtag crew of smugglers, whose wild exploits led to the largest hash bust in history.',
    credits: {
      directors: ['David Sherwin'],
      producers: ['Jennie Kamin', 'Drew Dickler'],
    },
  },
  {
    slug: 'betheexplorer',
    title: 'Be the Explorer',
    year: 'Coming soon',
    format: 'Short',
    poster: '/films/betheexplorer/poster.jpg',
    pageImage: 'https://cdn.sanity.io/images/h5ku88jy/production/f7741a8cc8267e5a199a3cfbba49e4e57bfd61e2-4096x2160.jpg',
    pageVideo: 'https://cdn.sanity.io/files/h5ku88jy/production/02bdf7c98379d8fa9fdc67bf52de4632242146b8.mp4',
    pixelated: true,
    synopsis:
      "Confined by Long COVID to her brother's childhood bedroom, Lizzie wrestles with illness and disability through a silent dialogue with the boyhood souvenirs that surround her. These objects quietly push her towards a breakthrough that changes how she sees her illness, and herself.",
    credits: {
      directors: ['Lizzie Parmenter'],
      producers: ['Drew Dickler'],
      executiveProducers: ['Alyssa Milano'],
    },
  },
]

export const filmsBySlug = Object.fromEntries(films.map((f) => [f.slug, f]))
