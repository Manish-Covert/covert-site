import { Link } from 'react-router-dom'
import ContactForm from './ContactForm'

/* Global footer: "Let's Get Started" contact form section + site footer,
   shared across all pages. */
export default function SiteFooter({ showContact = true }) {
  return (
    <>
      {/* ===================== CONTACT ===================== */}
      {showContact && (
      <section id="contact" className="contact">
        <div className="contact__inner">
          <h2 className="contact__title reveal">Let&rsquo;s Get Started</h2>
          <p className="contact__sub reveal">
            Call <strong>808-518-4298</strong> or fill out the form below to learn more about our
            services and innovative agency approach.
          </p>
          <ContactForm formName="footer" />
        </div>
      </section>
      )}

      {/* ===================== FOOTER ===================== */}
      <footer className="footer">
        <div className="footer__inner">
          <img src="/CC_Icon.webp" alt="Covert Communication" className="footer__logo" width="150" height="150" loading="lazy" />
          <div className="footer__social" aria-label="Social links">
            <a href="https://www.linkedin.com/company/covert-communication/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src="/icons/sm_linkdin.svg" alt="LinkedIn" />
            </a>
            <a href="https://facebook.com/covertcommunication" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src="/icons/sm_fb.svg" alt="Facebook" />
            </a>
            <a href="mailto:anna@covertcommunication.com" aria-label="Email">
              <img src="/icons/sm_email.svg" alt="Email" />
            </a>
          </div>
          <p className="footer__legal">
            Copyright 2026 Covert Communication LLC | All Rights Reserved |{' '}
            <Link to="/privacy-policy">Privacy Policy</Link> |{' '}
            <a href="#">Cookie Preferences</a> |{' '}
            <Link to="/terms-of-service">Terms of Service</Link> |{' '}
            <a href="#">Site Map</a> | 808-272-9952
          </p>
        </div>
      </footer>
    </>
  )
}
