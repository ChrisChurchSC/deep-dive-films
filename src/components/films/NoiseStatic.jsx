import { useEffect, useRef } from 'react'

// CRT-style white-noise static. Renders to a small canvas, scaled up via CSS
// for that chunky pixel look — also keeps the per-frame draw cheap.
export default function NoiseStatic({ resolution = 360, intensity = 1, color = '255,255,255' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })

    const w = resolution
    const h = Math.round(resolution * 0.5625) // ~16:9
    canvas.width = w
    canvas.height = h

    const img = ctx.createImageData(w, h)
    const data = img.data
    let raf

    const draw = () => {
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255 * intensity
        data[i]     = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = 255
      }
      ctx.putImageData(img, 0, 0)
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [resolution, intensity, color])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        imageRendering: 'pixelated',
      }}
      aria-hidden="true"
    />
  )
}
