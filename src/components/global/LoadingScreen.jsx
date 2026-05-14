import { useEffect, useState } from 'react'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 1400)
    const t2 = setTimeout(() => setVisible(false), 1950)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null

  return (
    <div className={`${styles.root} ${exiting ? styles.exiting : ''}`}>
      <div className={styles.inner}>
        <span className={styles.label}>DEEP DIVE</span>
        <div className={styles.track}>
          <div className={styles.fill} />
          <div className={styles.head} />
        </div>
      </div>
    </div>
  )
}
