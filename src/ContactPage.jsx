import ContactForm from './ContactForm'
import SiteFooter from './SiteFooter'
import SiteNav from './SiteNav'
import { useReveal } from './useReveal'
import './App.css'
import './ServicePage.css'
import './TheLatest.css'
import './ContactPage.css'

const PHONE = '808-518-4298'
const EMAIL = 'anna@covertcommunication.com'

export default function ContactPage() {
  useReveal()

  return (
    <>
      <SiteNav />

      <main className="svcd">
        {/* ---------- HERO ---------- */}
        <section className="latest__hero contactpage__hero">
          <div className="container">
            <h1 className="latest__title reveal">Contact</h1>
            <p className="contactpage__sub reveal">
              Tell us about your brand and goals — we&rsquo;ll build the right mix of
              services around them. Call, email, or send us a message below.
            </p>
          </div>
        </section>

        {/* ---------- BODY: info + form ---------- */}
        <section className="contactpage__body">
          <div className="container contactpage__grid">
            {/* Contact options */}
            <aside className="contactpage__info reveal">
              <h2 className="contactpage__info-title">Get in touch</h2>

              <a className="contactpage__item" href={`tel:${PHONE.replace(/[^0-9]/g, '')}`}>
                <span className="contactpage__item-label">Phone</span>
                <span className="contactpage__item-value">{PHONE}</span>
              </a>

              <a className="contactpage__item" href={`mailto:${EMAIL}`}>
                <span className="contactpage__item-label">Email</span>
                <span className="contactpage__item-value">{EMAIL}</span>
              </a>

              <div className="contactpage__item">
                <span className="contactpage__item-label">Follow us</span>
                <div className="contactpage__social">
                  <a href="https://www.linkedin.com/company/covert-communication/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <img src="/icons/sm_linkdin.svg" alt="LinkedIn" />
                  </a>
                  <a href="https://facebook.com/covertcommunication" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <img src="/icons/sm_fb.svg" alt="Facebook" />
                  </a>
                  <a href={`mailto:${EMAIL}`} aria-label="Email">
                    <img src="/icons/sm_email.svg" alt="Email" />
                  </a>
                </div>
              </div>
            </aside>

            {/* Form */}
            <div className="contactpage__form reveal">
              <h2 className="contactpage__form-title">Send us a message</h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer without the duplicate global contact section */}
      <SiteFooter showContact={false} />
    </>
  )
}
