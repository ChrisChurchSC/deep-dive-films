import { useEffect, useState } from 'react'
import NoiseStatic from '../films/NoiseStatic'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1500)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.noise}>
        <NoiseStatic resolution={1200} intensity={0.9} />
      </div>
      <div className={styles.line} />
    </div>
  )
}
