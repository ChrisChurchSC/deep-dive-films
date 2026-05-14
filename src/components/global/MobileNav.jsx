import { Link } from 'react-router-dom'
import styles from './MobileNav.module.css'
import Button from '../primitives/Button'

export default function MobileNav({ links, isOpen, onClose }) {
  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
      aria-hidden={!isOpen}
    >
      <nav className={styles.menu}>
        {links.map(l => (
          <Link key={l.to} to={l.to} className={styles.link} onClick={onClose}>
            {l.label}
          </Link>
        ))}
        <div className={styles.cta}>
          <Button href="/contact" variant="primary">Let's Talk</Button>
        </div>
      </nav>
    </div>
  )
}
