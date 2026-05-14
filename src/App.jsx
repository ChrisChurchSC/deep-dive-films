import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import SiteNav from './components/global/SiteNav'
import SiteFooter from './components/global/SiteFooter'
import LoadingScreen from './components/global/LoadingScreen'

const HomePage       = lazy(() => import('./pages/HomePage'))
const FilmDetailPage = lazy(() => import('./pages/FilmDetailPage'))
const AboutPage      = lazy(() => import('./pages/AboutPage'))
const NotFoundPage   = lazy(() => import('./pages/NotFoundPage'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PageFade({ children }) {
  const { pathname } = useLocation()
  const [fading, setFading] = useState(false)
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    setFading(true)
    const t = setTimeout(() => setFading(false), 250)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <div style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.25s ease' }}>
      {children}
    </div>
  )
}

function Layout({ children }) {
  return (
    <>
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}

function PageLoader() {
  return <div style={{ minHeight: 'calc(100vh - 56px)' }} />
}

export default function App() {
  return (
    <BrowserRouter>
      <LoadingScreen />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <PageFade>
          <Routes>
            <Route path="/"             element={<Layout><HomePage /></Layout>} />
            <Route path="/films/:slug"  element={<Layout><FilmDetailPage /></Layout>} />
            <Route path="/about"        element={<Layout><AboutPage /></Layout>} />
            <Route path="*"             element={<NotFoundPage />} />
          </Routes>
        </PageFade>
      </Suspense>
    </BrowserRouter>
  )
}
