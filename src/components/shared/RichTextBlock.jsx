import styles from './RichTextBlock.module.css'

export default function RichTextBlock({ children, className = '' }) {
  return (
    <div className={`${styles.rich} ${className}`}>
      {children}
    </div>
  )
}
