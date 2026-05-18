import { useState } from 'react'
import Drawer from './Drawer'
import SEO from '../global/SEO'
import { siteSettings } from '../../data/siteSettings'
import styles from './InfoDrawer.module.css'
import formStyles from './ContactForm.module.css'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvzyoand'

export default function ContactDrawer() {
  const email = siteSettings.contactEmail
  const socials = siteSettings.footer?.socials ?? {}

  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        const json = await res.json().catch(() => ({}))
        setErrorMsg(json?.errors?.[0]?.message || 'Send failed. Try again.')
        setStatus('error')
      }
    } catch (_err) {
      setErrorMsg('Network error. Try again.')
      setStatus('error')
    }
  }

  return (
    <>
    <SEO
      title="Contact"
      description="Get in touch with Deep Dive Films about new projects and collaborations."
      canonical="/contact"
      breadcrumbs={[{ name: 'Contact', url: '/contact' }]}
    />
    <Drawer title="Contact">
      <p className={styles.lead}>
        We're always interested in developing new projects and working with filmmakers who feel deeply connected to the stories they're telling.
      </p>

      {status === 'sent' ? (
        <div className={formStyles.success}>
          <p className={formStyles.successTitle}>Message sent.</p>
          <p className={formStyles.successBody}>We'll get back to you soon.</p>
        </div>
      ) : (
        <form className={formStyles.form} onSubmit={onSubmit} noValidate>
          <label className={formStyles.field}>
            <span className={formStyles.label}>Name</span>
            <input
              className={formStyles.input}
              type="text"
              name="name"
              required
              autoComplete="name"
            />
          </label>

          <label className={formStyles.field}>
            <span className={formStyles.label}>Email</span>
            <input
              className={formStyles.input}
              type="email"
              name="email"
              required
              autoComplete="email"
            />
          </label>

          <label className={formStyles.field}>
            <span className={formStyles.label}>Subject</span>
            <input
              className={formStyles.input}
              type="text"
              name="subject"
            />
          </label>

          <label className={formStyles.field}>
            <span className={formStyles.label}>Message</span>
            <textarea
              className={formStyles.textarea}
              name="message"
              rows={5}
              required
            />
          </label>

          {/* honeypot */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            style={{ position: 'absolute', left: '-9999px' }}
          />

          <div className={formStyles.actions}>
            <button
              type="submit"
              className={formStyles.submit}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            {status === 'error' && <span className={formStyles.errorText}>{errorMsg}</span>}
          </div>
        </form>
      )}

      <dl className={styles.info} style={{ marginTop: 'var(--sp-10)' }}>
        <dt>Email</dt>
        <dd><a href={`mailto:${email}`}>{email}</a></dd>

        <dt>Location</dt>
        <dd>Brooklyn, NY</dd>

        {(socials.instagram || socials.vimeo) && (
          <>
            <dt>Follow</dt>
            <dd>
              {socials.instagram && <a href={socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
              {socials.instagram && socials.vimeo && <span className={styles.sep}> · </span>}
              {socials.vimeo && <a href={socials.vimeo} target="_blank" rel="noopener noreferrer">Vimeo</a>}
            </dd>
          </>
        )}
      </dl>
    </Drawer>
    </>
  )
}
