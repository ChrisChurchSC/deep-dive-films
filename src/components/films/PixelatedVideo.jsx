import { useEffect, useRef } from 'react'

// Heavily pixelated video — draws each frame to a tiny canvas and scales it
// up via CSS image-rendering. Used as a placeholder when a film has no real
// trailer.
export default function PixelatedVideo({ src, resolution = 64, muted = true, startTime = 0 }) {
  const canvasRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!canvas || !video) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf
    let cancelled = false

    const onMeta = () => {
      const aspect = (video.videoHeight / video.videoWidth) || 9 / 16
      const w = resolution
      const h = Math.max(8, Math.round(w * aspect))
      canvas.width = w
      canvas.height = h
      if (startTime > 0) {
        try { video.currentTime = startTime } catch (_) {}
      }
    }

    const onEnded = () => {
      try { video.currentTime = startTime } catch (_) {}
      video.play().catch(() => {})
    }

    const draw = () => {
      if (cancelled) return
      if (video.readyState >= 2 && video.videoWidth) {
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      }
      raf = requestAnimationFrame(draw)
    }

    video.addEventListener('loadedmetadata', onMeta)
    video.addEventListener('ended', onEnded)
    video.play().catch(() => {})
    draw()

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      video.removeEventListener('loadedmetadata', onMeta)
      video.removeEventListener('ended', onEnded)
    }
  }, [src, resolution, startTime])

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        muted={muted}
        playsInline
        autoPlay
        style={{ display: 'none' }}
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          imageRendering: 'pixelated',
        }}
        aria-hidden="true"
      />
    </>
  )
}
