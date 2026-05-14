import styles from './Button.module.css'

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  className = '',
}) {
  const cls = `${styles.btn} ${styles[variant]} ${className}`
  const arrow = <span className={styles.arrow} aria-hidden>→</span>

  if (href) {
    return <a href={href} className={cls}>{children}{arrow}</a>
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}{arrow}
    </button>
  )
}
