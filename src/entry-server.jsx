import { renderToString } from 'react-dom/server'
import { StaticRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import HomePage       from './pages/HomePage'
import FilmDrawer     from './components/films/FilmDrawer'
import AboutDrawer    from './components/films/AboutDrawer'
import ContactDrawer  from './components/films/ContactDrawer'

export function render(url) {
  const helmetContext = {}

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="about"   element={<AboutDrawer />} />
            <Route path="contact" element={<ContactDrawer />} />
            <Route path=":slug"   element={<FilmDrawer />} />
          </Route>
        </Routes>
      </StaticRouter>
    </HelmetProvider>
  )

  const { helmet } = helmetContext
  return { html, helmet }
}
