import { Link } from 'react-router-dom'
import SEO from '../components/global/SEO'
import Button from '../components/primitives/Button'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <SEO title="Page Not Found" noIndex={true} />
      <div className={styles.inner}>
        <div className={styles.num}>404</div>
        <h1 className={styles.title}>Page not found.</h1>
        <p className={styles.body}>
          The page you're looking for doesn't exist — or may have moved.
        </p>
        <div className={styles.actions}>
          <Button href="/" variant="primary">Go home</Button>
          <Link to="/work" className={styles.link}>See the work →</Link>
        </div>
      </div>
    </div>
  )
}
