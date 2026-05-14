import { renderToString } from 'react-dom/server'
import { StaticRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import SiteNav        from './components/global/SiteNav'
import SiteFooter     from './components/global/SiteFooter'
import HomePage       from './pages/HomePage'
import FilmDetailPage from './pages/FilmDetailPage'
import AboutPage      from './pages/AboutPage'

function Layout({ children }) {
  return (
    <>
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}

export function render(url) {
  const helmetContext = {}

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <Routes>
          <Route path="/"            element={<Layout><HomePage /></Layout>} />
          <Route path="/films/:slug" element={<Layout><FilmDetailPage /></Layout>} />
          <Route path="/about"       element={<Layout><AboutPage /></Layout>} />
        </Routes>
      </StaticRouter>
    </HelmetProvider>
  )

  const { helmet } = helmetContext
  return { html, helmet }
}
