export default function SectionLabel({ children, className = '' }) {
  return (
    <div className={`section-label ${className}`}>
      {children}
    </div>
  )
}
