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
          <ContactForm />
        </div>
      </section>
      )}

      {/* ===================== FOOTER ===================== */}
      <footer className="footer">
        <div className="footer__inner">
          <img src="/CC_Icon.png" alt="Covert Communication" className="footer__logo" />
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
            <a href="#">Privacy Policy</a> |{' '}
            <a href="#">Cookie Preferences</a> |{' '}
            <a href="#">Terms of Service</a> |{' '}
            <a href="#">Site Map</a> | 808-272-9952
          </p>
        </div>
      </footer>
    </>
  )
}
