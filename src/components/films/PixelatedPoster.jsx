import { useEffect, useRef } from 'react'

// Heavily pixelated "video" — draws the poster onto a tiny canvas and scales
// up via CSS image-rendering. A subtle flicker + jitter loop gives it motion.
export default function PixelatedPoster({ src, resolution = 64, className }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf
    let cancelled = false

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src

    img.onload = () => {
      if (cancelled) return
      const aspect = img.naturalHeight / img.naturalWidth || 9 / 16
      const w = resolution
      const h = Math.max(8, Math.round(w * aspect))
      canvas.width = w
      canvas.height = h

      let t = 0
      const draw = () => {
        t += 1
        ctx.imageSmoothingEnabled = false
        // small horizontal jitter (one pixel) every few frames
        const jx = (t % 12 < 3) ? 1 : 0
        const jy = (t % 30 < 2) ? 1 : 0
        ctx.clearRect(0, 0, w, h)
        ctx.drawImage(img, -jx, -jy, w, h)

        // subtle scanline / flicker
        if (t % 4 === 0) {
          ctx.fillStyle = 'rgba(0,0,0,0.08)'
          ctx.fillRect(0, (t % h), w, 1)
        }

        raf = requestAnimationFrame(draw)
      }
      draw()
    }

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [src, resolution])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        imageRendering: 'pixelated',
      }}
      aria-hidden="true"
    />
  )
}
