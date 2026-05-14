import styles from './SectionRule.module.css'

// counter: '01', '02', etc.
// label: section name
// dark: renders on a dark background
export default function SectionRule({ counter, label, dark = false }) {
  return (
    <div className={`${styles.root} ${dark ? styles.dark : ''}`}>
      <div className={styles.inner}>
        <div className={styles.rule} />
        <div className={styles.meta}>
          {counter && <span className={styles.counter}>{counter}</span>}
          {label && <span className={styles.label}>{label}</span>}
        </div>
      </div>
    </div>
  )
}
