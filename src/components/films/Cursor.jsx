import { useEffect, useRef } from 'react'
import styles from './Cursor.module.css'

const INTERACTIVE_SELECTOR = 'a, button, [data-cursor="frame"]'

export default function Cursor() {
  const frameRef = useRef(null)

  useEffect(() => {
    // Skip on touch-primary devices — leave the native cursor alone.
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const el = frameRef.current
    if (!el) return

    document.body.classList.add('hide-native-cursor')

    let raf
    const mouse = { x: -100, y: -100 }
    let hoverEl = null
    let everMoved = false

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (!everMoved) {
        everMoved = true
        el.classList.add(styles.visible)
      }
    }

    const onOver = (e) => {
      const t = e.target?.closest?.(INTERACTIVE_SELECTOR)
      if (t) {
        hoverEl = t
        el.classList.add(styles.hover)
      }
    }

    const onOut = (e) => {
      if (!hoverEl) return
      const next = e.relatedTarget
      if (!next || !next.closest?.(INTERACTIVE_SELECTOR)) {
        hoverEl = null
        el.classList.remove(styles.hover)
      }
    }

    const onLeave = () => {
      everMoved = false
      el.classList.remove(styles.visible)
    }

    const tick = () => {
      if (hoverEl) {
        const r = hoverEl.getBoundingClientRect()
        const pad = 6
        el.style.transform = `translate3d(${r.left - pad}px, ${r.top - pad}px, 0)`
        el.style.width = r.width + pad * 2 + 'px'
        el.style.height = r.height + pad * 2 + 'px'
      } else {
        const sz = 22
        el.style.transform = `translate3d(${mouse.x - sz / 2}px, ${mouse.y - sz / 2}px, 0)`
        el.style.width = sz + 'px'
        el.style.height = sz + 'px'
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver, true)
    document.addEventListener('mouseout', onOut, true)
    document.addEventListener('mouseleave', onLeave)
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver, true)
      document.removeEventListener('mouseout', onOut, true)
      document.removeEventListener('mouseleave', onLeave)
      document.body.classList.remove('hide-native-cursor')
    }
  }, [])

  return (
    <div ref={frameRef} className={styles.cursor} aria-hidden="true">
      <span className={styles.tl} />
      <span className={styles.tr} />
      <span className={styles.bl} />
      <span className={styles.br} />
    </div>
  )
}
