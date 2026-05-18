import { useEffect, useRef, useState } from 'react'
import styles from './Hud.module.css'

function rndHex(len) {
  return Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

function formatTime(d) {
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

function formatDate(d) {
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(d.getMonth() + 1)}.${pad(d.getDate())}.${d.getFullYear()}`
}

export function HudTopBar() {
  const [now, setNow] = useState(() => new Date())
  const [stream, setStream] = useState(() => rndHex(8))
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    const b = setInterval(() => setBlink((v) => !v), 1100)
    const s = setInterval(() => setStream(rndHex(8)), 3600)
    return () => {
      clearInterval(t)
      clearInterval(b)
      clearInterval(s)
    }
  }, [])

  return (
    <div className={styles.topbar}>
      <span className={styles.dot} style={{ opacity: blink ? 1 : 0.18 }}>■</span>
      <span>LIVE</span>
      <span className={styles.sep}>·</span>
      <span>{formatDate(now)}</span>
      <span className={styles.sep}>·</span>
      <span>{formatTime(now)}</span>
      <span className={styles.sep}>·</span>
      <span>N40°42′ · W73°59′</span>
      <span className={styles.sep}>·</span>
      <span>STREAM 0x{stream}</span>
    </div>
  )
}

const FLIP_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·.-'
const SHUFFLE_FRAMES = 8

function FlipText({ value, width }) {
  const [display, setDisplay] = useState(value)
  const frameRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const target = value.padEnd(width).slice(0, width)
    const start = display.padEnd(width).slice(0, width)
    let frame = 0
    const step = () => {
      frame += 1
      const out = target
        .split('')
        .map((ch, i) => {
          if (frame >= SHUFFLE_FRAMES - i % 3) return ch
          if (ch === ' ') return ' '
          return FLIP_CHARS[Math.floor(Math.random() * FLIP_CHARS.length)]
        })
        .join('')
      setDisplay(out)
      if (frame < SHUFFLE_FRAMES + width) {
        rafRef.current = setTimeout(step, 35)
      } else {
        setDisplay(target)
      }
    }
    if (target !== start) step()
    return () => clearTimeout(rafRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, width])

  return <span className={styles.flipText}>{display}</span>
}

export function HudCounters({ films }) {
  const counts = films.reduce(
    (acc, f) => {
      const y = (f.year || '').toString().toLowerCase()
      if (/^\d{4}$/.test(f.year)) acc.released++
      else if (y.includes('post')) acc.post++
      else if (y.includes('production')) acc.prod++
      else if (y.includes('coming')) acc.soon++
      return acc
    },
    { released: 0, post: 0, prod: 0, soon: 0 },
  )

  const pad = (n) => String(n).padStart(2, '0')

  const cells = [
    { label: 'Active',        val: pad(films.length) },
    { label: 'Released',      val: pad(counts.released) },
    { label: 'In post',       val: pad(counts.post) },
    { label: 'In production', val: pad(counts.prod) },
    { label: 'Coming soon',   val: pad(counts.soon) },
  ]

  return (
    <div className={styles.flipBoard} aria-label="Studio status board">
      {cells.map((c) => (
        <span key={c.label} className={styles.flipCell}>
          <span className={styles.flipVal}>
            <FlipText value={c.val} width={2} />
          </span>
          <span className={styles.flipLabel}>{c.label}</span>
        </span>
      ))}
    </div>
  )
}

// Derive a short status tag from a film's year/format
export function statusFor(film) {
  const y = (film.year || '').toString().toLowerCase()
  if (/^\d{4}$/.test(film.year)) {
    if (film.partners?.includes('HBO')) return 'HBO'
    return 'RELEASED'
  }
  if (y.includes('post')) return 'IN POST'
  if (y.includes('production')) return 'IN PROD'
  if (y.includes('coming')) return 'COMING SOON'
  return film.year || ''
}
