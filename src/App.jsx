import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import LoadingScreen from './components/global/LoadingScreen'

const HomePage       = lazy(() => import('./pages/HomePage'))
const FilmDrawer     = lazy(() => import('./components/films/FilmDrawer'))
const AboutDrawer    = lazy(() => import('./components/films/AboutDrawer'))
const ContactDrawer  = lazy(() => import('./components/films/ContactDrawer'))
const NotFoundPage   = lazy(() => import('./pages/NotFoundPage'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PageLoader() {
  return <div style={{ minHeight: '100vh' }} />
}

export default function App() {
  return (
    <BrowserRouter>
      <LoadingScreen />
      <ScrollToTop />
      <Analytics />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="about"   element={<AboutDrawer />} />
            <Route path="contact" element={<ContactDrawer />} />
            <Route path=":slug"   element={<FilmDrawer />} />
          </Route>
          <Route path="*"      element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
