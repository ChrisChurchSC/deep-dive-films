import { useEffect, useRef } from 'react'

// Three.js loaded inside the effect to keep SSR clean.
export default function ThreeLogo({
  src = '/dd-icon.svg',
  width = 220,
  height = 220,
  depth = 36,
  fitFraction = 0.78, // how much of the canvas width to fill
}) {
  const mountRef = useRef(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    let cancelled = false
    let cleanup = null

    ;(async () => {
      const THREE = await import('three')
      const { SVGLoader } = await import('three/examples/jsm/loaders/SVGLoader.js')
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js')
      if (cancelled) return

      let w = el.clientWidth
      let h = el.clientHeight

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 4000)
      camera.position.set(0, 0, 800)

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(w, h)
      renderer.setClearColor(0x000000, 0)
      el.appendChild(renderer.domElement)

      const pmrem = new THREE.PMREMGenerator(renderer)
      pmrem.compileEquirectangularShader()
      scene.environment = pmrem.fromScene(new RoomEnvironment()).texture

      scene.add(new THREE.AmbientLight(0xffffff, 0.25))
      const key = new THREE.DirectionalLight(0x00bbff, 2.6)
      key.position.set(220, 280, 380)
      scene.add(key)
      const fill = new THREE.DirectionalLight(0x000cff, 0.9)
      fill.position.set(-320, -120, 200)
      scene.add(fill)
      const rim = new THREE.DirectionalLight(0xdedcc3, 0.7)
      rim.position.set(0, -240, -300)
      scene.add(rim)

      const pivot = new THREE.Group()
      const group = new THREE.Group()
      pivot.add(group)
      scene.add(pivot)

      const loader = new SVGLoader()
      loader.load(src, (data) => {
        if (cancelled) return
        const extrudeSettings = {
          depth,
          bevelEnabled: true,
          bevelThickness: 4,
          bevelSize: 3,
          bevelSegments: 10,
        }
        const mat = new THREE.MeshStandardMaterial({
          color: 0xd8dadc,
          metalness: 0.95,
          roughness: 0.2,
          envMapIntensity: 1.7,
        })

        data.paths.forEach((path) => {
          SVGLoader.createShapes(path).forEach((shape) => {
            const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
            group.add(new THREE.Mesh(geo, mat))
          })
        })

        // Center and auto-scale so the SVG fills `fitFraction` of canvas width.
        // Mirror Y because SVG is y-down.
        group.scale.set(1, -1, 1)
        const box = new THREE.Box3().setFromObject(group)
        const size = new THREE.Vector3()
        box.getSize(size)

        // Compute world-units-per-pixel at camera distance to derive scale
        const fovRad = (camera.fov * Math.PI) / 180
        const visibleH = 2 * Math.tan(fovRad / 2) * camera.position.z
        const visibleW = visibleH * camera.aspect
        const targetW = visibleW * fitFraction
        const scaleX = targetW / size.x
        const targetH = visibleH * fitFraction
        const scaleY = targetH / size.y
        const fitScale = Math.min(scaleX, scaleY)

        group.scale.set(fitScale, -fitScale, fitScale)
        const box2 = new THREE.Box3().setFromObject(group)
        const center = box2.getCenter(new THREE.Vector3())
        group.position.set(-center.x, -center.y, -center.z)
      })

      let raf, t = 0
      const animate = () => {
        raf = requestAnimationFrame(animate)
        t += 0.005
        pivot.rotation.y = t
        pivot.rotation.x = Math.sin(t * 0.35) * 0.12
        renderer.render(scene, camera)
      }
      animate()

      const onResize = () => {
        w = el.clientWidth
        h = el.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', onResize)

      cleanup = () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
        if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
      }
    })()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [src, depth, fitFraction])

  return (
    <div
      ref={mountRef}
      style={{ width, height, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  )
}
