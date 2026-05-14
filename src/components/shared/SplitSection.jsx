import styles from './SplitSection.module.css'

export default function SplitSection({ media, children, reverse = false, mediaType = 'image' }) {
  return (
    <section className={`${styles.section} ${reverse ? styles.reverse : ''}`}>
      <div className="shell">
        <div className={styles.grid}>
          <div className={styles.content}>{children}</div>
          <div className={styles.media}>
            {mediaType === 'video' ? (
              <video src={media} autoPlay muted loop playsInline className={styles.asset} />
            ) : media ? (
              <img src={media} alt="" className={styles.asset} loading="lazy" />
            ) : (
              <div className={styles.placeholder} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
