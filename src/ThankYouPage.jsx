import { Link } from 'react-router-dom'
import SiteFooter from './SiteFooter'
import SiteNav from './SiteNav'
import { useReveal } from './useReveal'
import './App.css'
import './ServicePage.css'
import './TheLatest.css'
import './ThankYou.css'

export default function ThankYouPage() {
  useReveal()

  return (
    <>
      <SiteNav />

      <main className="svcd">
        <section className="latest__hero thankyou">
          <div className="container">
            <span className="thankyou__badge reveal" aria-hidden="true">✓</span>
            <h1 className="latest__title reveal">Thank you</h1>
            <p className="thankyou__msg reveal">
              We have received your message. Our representative will contact you
              within <strong>2 days</strong>.
            </p>
            <div className="thankyou__actions reveal">
              <Link to="/" className="btn btn--green">Back to Home &rarr;</Link>
              <Link to="/services" className="btn btn--outline-pill"><span>Explore Services</span></Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter showContact={false} />
    </>
  )
}
