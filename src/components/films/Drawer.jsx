import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Drawer.module.css'

export default function Drawer({ title, children, closeTo = '/' }) {
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') navigate(closeTo)
    }
    document.addEventListener('keydown', onKey)
    // Lock body scroll while drawer is open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [navigate, closeTo])

  return (
    <div className={styles.root} role="dialog" aria-label={title} aria-modal="true">
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close panel"
        onClick={() => navigate(closeTo)}
      />
      <aside className={styles.panel}>
        <header className={styles.head}>
          <span className={styles.headLabel}>{title}</span>
          <button
            type="button"
            className={styles.close}
            onClick={() => navigate(closeTo)}
            aria-label="Close"
          >
            Close ✕
          </button>
        </header>
        <div className={styles.body}>{children}</div>
      </aside>
    </div>
  )
}
