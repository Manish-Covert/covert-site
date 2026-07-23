import SiteFooter from './SiteFooter'
import SiteNav from './SiteNav'
import { useSEO } from './useSEO'
import { useReveal } from './useReveal'
import './App.css'
import './TheLatest.css'
import './LegalPage.css'

/* Privacy Policy — content mirrored from covertcommunication.com/privacy-policy/. */
export default function PrivacyPolicyPage() {
  useReveal()
  useSEO({
    title: 'Privacy Policy | Covert Communication',
    description:
      'How Covert Communication collects, uses, stores, shares, retains, and protects personal information.',
    path: '/privacy-policy',
    ogType: 'website',
  })

  return (
    <>
      <SiteNav />

      <main className="svcd">
        <section className="latest__hero">
          <div className="container container--narrow">
            <h1 className="latest__title reveal">Privacy Policy</h1>
          </div>
        </section>

        <section className="legal__body">
          <div className="container container--narrow legal__prose reveal">
            <p className="legal__updated">Last Updated: June 25, 2026</p>

            <p>Covert Communication respects your privacy. This Privacy Policy explains how we collect, use, store, share, retain, and protect personal information when you visit our website, submit an inquiry, request availability, subscribe to updates, purchase products or services, communicate with us, or otherwise interact with Covert Communication.</p>
            <p>This Privacy Policy applies to website visitors, newsletter subscribers, podcast guests or listeners who contact us, book purchasers, speaking/event contacts, clients, prospective clients, business contacts, and others who interact with us.</p>
            <p>In this Privacy Policy, &ldquo;we,&rdquo; &ldquo;us,&rdquo; and &ldquo;our&rdquo; refer to Covert Communication.</p>
            <p>By using this website or providing personal information to us, you agree to the practices described in this Privacy Policy. If you do not agree with this Privacy Policy, please do not use the website or submit personal information to us.</p>

            <h2>1. Who We Are</h2>
            <p>Covert Communication provides speaking, consulting, media, publishing, podcast, education, and related business services.</p>
            <p>For questions about this Privacy Policy or to submit a privacy request, you may contact us at:</p>
            <p>
              <strong>Covert Communication</strong><br />
              Email: <a href="mailto:info@covertcommunication.com">info@covertcommunication.com</a><br />
              Phone: 808-351-3629<br />
              Website: <a href="https://covertcommunication.com">https://covertcommunication.com</a><br />
              Privacy Request Form: /dsar/
            </p>

            <h2>2. What Personal Information Means</h2>
            <p>&ldquo;Personal information&rdquo; means information that identifies, relates to, describes, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular person or household.</p>
            <p>Personal information may include your name, email address, phone number, business contact information, billing information, online identifiers, communication history, or information you submit through our website forms.</p>

            <h2>3. Personal Information We Collect</h2>
            <p>The personal information we collect depends on how you interact with us.</p>
            <h3>Information You Provide Directly</h3>
            <p>We may collect personal information that you voluntarily provide, including:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Business name</li>
              <li>Job title</li>
              <li>Mailing address or billing address, where applicable</li>
              <li>Event details</li>
              <li>Event city, date, audience, topic interests, budget range, and related speaking request details</li>
              <li>Podcast, media, or interview inquiry information</li>
              <li>Newsletter signup information</li>
              <li>Book, product, service, or consulting inquiry information</li>
              <li>Messages, comments, or communications you send to us</li>
              <li>Payment or billing-related information needed to complete a purchase or service transaction</li>
              <li>Any other information you choose to provide</li>
            </ul>
            <h3>Information Collected Through Forms and Communications</h3>
            <p>When you submit a form, request availability, subscribe to updates, or contact us, we may collect and store your information using customer relationship management, form, email, automation, or communication tools, including GoHighLevel.</p>
            <p>Information stored in these systems may include:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Inquiry details</li>
              <li>Speaking or event request details</li>
              <li>Communication history</li>
              <li>Marketing preferences</li>
              <li>Appointment or call details</li>
              <li>Notes related to your inquiry or relationship with us</li>
            </ul>
            <h3>Information Collected When You Make a Payment</h3>
            <p>If you purchase a product, service, speaking engagement, consulting service, event-related service, or other offering, we may collect information needed to process and manage the transaction, including:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing address</li>
              <li>Invoice details</li>
              <li>Transaction amount</li>
              <li>Payment status</li>
              <li>Product or service purchased</li>
              <li>Customer service notes</li>
            </ul>
            <p>Payments may be processed through third-party payment providers, including Stripe or QuickBooks. We do not intentionally store full credit card numbers on our website. Payment information is handled by our payment processors according to their own privacy and security practices.</p>
            <h3>Information Collected Automatically</h3>
            <p>When you visit our website, we and our service providers may automatically collect certain information, including:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device type</li>
              <li>Operating system</li>
              <li>Referring website</li>
              <li>Pages viewed</li>
              <li>Time spent on pages</li>
              <li>Clicks and website interactions</li>
              <li>Approximate location derived from IP address</li>
              <li>Cookie identifiers</li>
              <li>Pixel identifiers</li>
              <li>Analytics identifiers</li>
            </ul>
            <p>We use this information to operate the website, understand visitor activity, improve the website, measure marketing effectiveness, detect security issues, and provide relevant content or advertising.</p>

            <h2>4. How We Collect Personal Information</h2>
            <p>We may collect personal information in the following ways:</p>
            <ul>
              <li>When you submit a form on our website</li>
              <li>When you request speaking availability</li>
              <li>When you subscribe to our newsletter or updates</li>
              <li>When you contact us by email, phone, text, form, or other communication method</li>
              <li>When you purchase a product or service</li>
              <li>When you request information about speaking, consulting, podcasts, media, books, or related services</li>
              <li>When you interact with our website, advertisements, or marketing campaigns</li>
              <li>Through GoHighLevel or other customer relationship management and marketing tools</li>
              <li>Through Stripe, QuickBooks, or other payment and invoicing tools</li>
              <li>Through cookies, pixels, analytics tools, and similar technologies</li>
            </ul>

            <h2>5. How We Use Personal Information</h2>
            <p>We may use personal information for the following purposes:</p>
            <ul>
              <li>To respond to your inquiries</li>
              <li>To process speaking, media, podcast, consulting, or business requests</li>
              <li>To evaluate event availability and fit</li>
              <li>To communicate with you about services, opportunities, events, products, or resources</li>
              <li>To send newsletters, updates, announcements, promotions, or marketing communications where permitted</li>
              <li>To schedule calls, meetings, interviews, or appearances</li>
              <li>To process payments, invoices, purchases, or service transactions</li>
              <li>To provide customer service</li>
              <li>To manage client, prospect, subscriber, and business contact relationships</li>
              <li>To improve our website, content, marketing, services, and customer experience</li>
              <li>To measure website and advertising performance</li>
              <li>To conduct analytics and reporting</li>
              <li>To prevent fraud, misuse, security incidents, or illegal activity</li>
              <li>To comply with legal, tax, accounting, payment, contractual, and business obligations</li>
              <li>To maintain internal records</li>
              <li>To enforce our terms, rights, agreements, or policies</li>
              <li>To evaluate or complete a business transaction, such as a sale, transfer, reorganization, or merger</li>
            </ul>

            <h2>6. How We Share Personal Information</h2>
            <p>We may share personal information with trusted third parties when needed to operate our website, manage communications, process payments, provide services, or support our business.</p>
            <p>These third parties may include:</p>
            <ul>
              <li>Website hosting and technology providers</li>
              <li>Customer relationship management providers, including GoHighLevel</li>
              <li>Payment processors, including Stripe</li>
              <li>Accounting and invoicing providers, including QuickBooks</li>
              <li>Email, SMS, and marketing communication providers</li>
              <li>Scheduling and calendar providers</li>
              <li>Advertising, analytics, and website performance providers</li>
              <li>Customer support and business operations providers</li>
              <li>Contractors, consultants, or service providers assisting with our business</li>
              <li>Accounting, tax, legal, insurance, and professional advisors</li>
              <li>Fraud prevention, security, and compliance providers</li>
            </ul>
            <p>We share only the information reasonably needed for these providers to perform their services.</p>
            <p>We do not allow service providers to use your personal information for their own marketing purposes unless permitted by law and disclosed in this Privacy Policy.</p>
            <p>We may also share personal information if required by law, legal process, court order, subpoena, government request, or when we believe disclosure is necessary to protect the rights, property, safety, or security of Covert Communication, our customers, our website, or others.</p>

            <h2>7. Payments</h2>
            <p>Payments may be processed by third-party payment processors, including Stripe or QuickBooks. When you make a payment, your payment information may be submitted directly to the payment processor or handled through payment systems connected to our website, invoices, or sales process.</p>
            <p>We may receive limited transaction information, such as:</p>
            <ul>
              <li>Payment status</li>
              <li>Transaction ID</li>
              <li>Order or invoice amount</li>
              <li>Billing contact information</li>
              <li>Last four digits or payment method reference, where provided by the payment processor</li>
              <li>Fraud or verification status, where applicable</li>
            </ul>
            <p>We do not intentionally collect or store full payment card numbers on our website.</p>

            <h2>8. Cookies, Pixels, Analytics, and Advertising Technologies</h2>
            <p>Our website may use cookies, pixels, tags, scripts, web beacons, analytics tools, advertising technologies, and similar technologies.</p>
            <p>These technologies may be used to:</p>
            <ul>
              <li>Operate the website</li>
              <li>Remember your preferences</li>
              <li>Understand how visitors use the website</li>
              <li>Measure website performance</li>
              <li>Improve website functionality</li>
              <li>Detect fraud or security issues</li>
              <li>Deliver or measure advertisements</li>
              <li>Understand the effectiveness of marketing campaigns</li>
              <li>Provide more relevant content or advertising</li>
            </ul>
            <p>Some cookies are necessary for the website to work. Other cookies and pixels may be used for analytics, advertising, or marketing purposes.</p>
            <p>You may manage cookies through your browser settings. If the website uses a cookie consent or preference management tool, you may also manage your preferences through the Cookie Preferences link or tool available on the website.</p>
            <p>Please note that if you clear your cookies, use a different browser, or use a different device, you may need to reset your cookie preferences.</p>

            <h2>9. Do Not Sell or Share My Personal Information</h2>
            <p>We do not sell personal information in the traditional sense of exchanging personal information for money.</p>
            <p>However, like many websites, we may use cookies, pixels, analytics tools, advertising platforms, and marketing technologies that may be considered a &ldquo;sale,&rdquo; &ldquo;sharing,&rdquo; targeted advertising, or cross-context behavioral advertising under certain privacy laws.</p>
            <p>Where required by applicable law, you may opt out of certain cookies, pixels, analytics, advertising, or marketing technologies by using the &ldquo;Do Not Sell or Share My Personal Information&rdquo; link or Cookie Preferences tool available on our website.</p>

            <h2>10. Email, SMS, and Marketing Communications</h2>
            <p>We may contact you by email, phone, text message, or other communication methods for inquiries, scheduling, service updates, newsletters, promotions, event communications, podcast/media communications, or other communications related to Covert Communication.</p>
            <h3>Email</h3>
            <p>You may opt out of marketing emails by using the unsubscribe link included in the email or by contacting us directly. Even if you opt out of marketing emails, we may still send transactional, scheduling, service, billing, or relationship-related communications.</p>
            <h3>SMS/Text Messages</h3>
            <p>If you provide your mobile phone number and opt in to receive text messages, you consent to receive text messages from or on behalf of Covert Communication. Message frequency may vary. Message and data rates may apply.</p>
            <p>You may opt out of text messages at any time by replying &ldquo;STOP&rdquo; or following the instructions provided in the message.</p>
            <p>We do not sell, rent, or share SMS opt-in consent or mobile phone numbers with third parties for their own promotional use. We may share SMS-related information with service providers who help us send messages on our behalf.</p>

            <h2>11. How Long We Retain Personal Information</h2>
            <p>We retain personal information for as long as reasonably necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>
            <p>Retention periods may vary depending on the type of information, the purpose for collection, legal or business needs, and applicable obligations.</p>
            <p>Examples include:</p>
            <ul>
              <li>Website inquiries may be retained for follow-up, customer service, marketing, reporting, and business record purposes.</li>
              <li>Speaking, podcast, media, consulting, or business inquiry records may be retained for scheduling, relationship management, business development, and internal records.</li>
              <li>Payment, invoice, and transaction records may be retained as required for accounting, tax, audit, dispute, fraud prevention, and legal purposes.</li>
              <li>Marketing records may be retained until you opt out, request deletion, or the information is no longer needed.</li>
              <li>Cookie, pixel, and analytics data may be retained according to our settings and the practices of our analytics, advertising, and consent management providers.</li>
              <li>Suppression records may be retained as needed to honor unsubscribe, opt-out, or do-not-contact requests.</li>
            </ul>
            <p>When personal information is no longer needed, we may delete, anonymize, de-identify, aggregate, archive, or securely retain it as required or permitted by law.</p>

            <h2>12. How We Protect Personal Information</h2>
            <p>We use reasonable administrative, technical, and physical safeguards designed to protect personal information from unauthorized access, disclosure, misuse, loss, alteration, or destruction.</p>
            <p>These safeguards may include:</p>
            <ul>
              <li>Access controls</li>
              <li>Password protection</li>
              <li>Role-based permissions</li>
              <li>Secure cloud-based systems</li>
              <li>Vendor security review</li>
              <li>Encryption where appropriate</li>
              <li>Internal policies and procedures</li>
              <li>Data minimization and retention practices</li>
              <li>Secure deletion or anonymization where appropriate</li>
            </ul>
            <p>No website, system, transmission, or storage method is completely secure. We cannot guarantee absolute security, but we work to protect personal information using reasonable safeguards.</p>
            <p>Please do not send sensitive or confidential information through unsecured email or website forms unless specifically requested.</p>

            <h2>13. Your Privacy Choices</h2>
            <p>Depending on where you live and how you interact with us, you may have certain privacy choices or rights regarding your personal information.</p>
            <p>These may include the ability to:</p>
            <ul>
              <li>Request access to personal information we maintain about you</li>
              <li>Request correction of inaccurate personal information</li>
              <li>Request deletion of personal information</li>
              <li>Request that we stop contacting you</li>
              <li>Opt out of marketing emails</li>
              <li>Opt out of text messages</li>
              <li>Opt out of certain cookies, pixels, analytics, or advertising technologies</li>
              <li>Request information about how we collect, use, share, or retain personal information</li>
            </ul>
            <p>To exercise a privacy choice or submit a privacy request, contact us at:</p>
            <ul>
              <li>Email: <a href="mailto:info@covertcommunication.com">info@covertcommunication.com</a></li>
              <li>Privacy Request Form: /dsar</li>
            </ul>
            <p>We may need to verify your identity before fulfilling certain requests. Verification may require matching information you provide with information we maintain.</p>
            <p>We may deny or limit a request where permitted by law, including where information is needed to complete a transaction, process payment, maintain tax or accounting records, prevent fraud, resolve disputes, comply with legal obligations, enforce agreements, or maintain required business records.</p>

            <h2>14. State-Specific Privacy Rights</h2>
            <p>Residents of certain states may have additional privacy rights under applicable state privacy laws.</p>
            <p>Depending on your state and whether a particular law applies to Covert Communication, these rights may include the right to:</p>
            <ul>
              <li>Know or access the personal information we collect</li>
              <li>Receive a copy of personal information in a portable format</li>
              <li>Correct inaccurate personal information</li>
              <li>Delete personal information</li>
              <li>Opt out of certain sales, sharing, targeted advertising, or profiling</li>
              <li>Limit certain uses or disclosures of sensitive personal information</li>
              <li>Not be discriminated against for exercising privacy rights</li>
            </ul>
            <p>Even where a particular state privacy law may not legally require us to honor every type of request, we strive to provide reasonable privacy choices as a best practice, subject to legal, contractual, payment, tax, accounting, security, fraud prevention, and operational limitations.</p>

            <h2>15. California Privacy Notice</h2>
            <p>This section applies to California residents where applicable.</p>
            <p>Depending on our business activities, applicable law, and the volume and type of personal information processed, certain California privacy laws may or may not apply to Covert Communication in a particular year.</p>
            <p>Even where we may not be legally required to honor every request under the California Consumer Privacy Act or California Privacy Rights Act, we strive to provide reasonable privacy choices as a best practice.</p>
            <h3>Categories of Personal Information We May Collect</h3>
            <p>In the past 12 months, we may have collected the following categories of personal information:</p>
            <ul>
              <li>Identifiers, such as name, email address, phone number, IP address, online identifiers, or similar information</li>
              <li>Customer records, such as billing information, invoice information, transaction details, or inquiry records</li>
              <li>Commercial information, such as products or services purchased, considered, or requested</li>
              <li>Internet or electronic network activity, such as website activity, page views, clicks, and interactions with advertisements</li>
              <li>Geolocation information, such as approximate location from IP address</li>
              <li>Audio, electronic, visual, or similar information, such as communications, inquiry records, customer service notes, or submitted media</li>
              <li>Professional or business contact information, such as company name, job title, event details, or business inquiry information</li>
              <li>Inferences or preferences, such as topic interests, service interests, marketing preferences, or information used to understand audience or customer interests</li>
              <li>Sensitive personal information, where required for payment, tax, fraud prevention, legal, or business purposes</li>
            </ul>
            <h3>Sources of Personal Information</h3>
            <p>We may collect personal information from:</p>
            <ul>
              <li>You directly</li>
              <li>Your communications with us</li>
              <li>Website forms</li>
              <li>Website cookies, pixels, analytics, and advertising technologies</li>
              <li>Payment processors</li>
              <li>Invoicing and accounting providers</li>
              <li>Marketing and communication platforms</li>
              <li>Customer relationship management tools</li>
              <li>Publicly available sources</li>
              <li>Service providers</li>
              <li>Business partners</li>
            </ul>
            <h3>Business or Commercial Purposes</h3>
            <p>We may collect, use, or share personal information for the business or commercial purposes described in this Privacy Policy, including responding to inquiries, managing speaking or consulting requests, processing payments, sending communications, scheduling, customer service, marketing, advertising, analytics, fraud prevention, security, legal compliance, and business operations.</p>
            <h3>Sale or Sharing of Personal Information</h3>
            <p>We do not sell personal information in the traditional sense of exchanging it for money.</p>
            <p>However, our use of certain cookies, pixels, analytics tools, advertising platforms, or marketing technologies may be considered a &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information under California privacy law.</p>
            <p>Where required by applicable law, you may opt out by using the &ldquo;Do Not Sell or Share My Personal Information&rdquo; link or Cookie Preferences tool available on our website.</p>
            <h3>Sensitive Personal Information</h3>
            <p>We do not use or disclose sensitive personal information for purposes other than those reasonably necessary to process payments, fulfill services, comply with legal obligations, prevent fraud, protect security, or support business operations.</p>
            <h3>Children&rsquo;s Personal Information</h3>
            <p>We do not knowingly sell or share personal information of individuals under the age of 16.</p>
            <h3>California Financial Incentive Notice</h3>
            <p>We do not currently offer a loyalty, rewards, or financial incentive program that provides benefits in exchange for the collection, sale, sharing, or retention of personal information.</p>
            <p>If we offer a discount, giveaway, promotion, loyalty program, or similar program that may be considered a financial incentive under applicable privacy laws, we will provide additional terms or notice at the time of participation.</p>

            <h2>16. Children&rsquo;s Privacy</h2>
            <p>Our website and services are intended for adults and are not directed to children.</p>
            <p>We do not knowingly collect personal information from children under 13 without parental or guardian consent. If we learn that we have collected personal information from a child under 13 without appropriate consent, we will take reasonable steps to delete the information.</p>
            <p>If you believe a child has provided us with personal information, please contact us at <a href="mailto:info@covertcommunication.com">info@covertcommunication.com</a>.</p>

            <h2>17. Third-Party Websites and Services</h2>
            <p>Our website may contain links to third-party websites, podcast platforms, media sites, book retailers, event platforms, payment platforms, social media platforms, or other third-party services.</p>
            <p>We are not responsible for the privacy practices, security, or content of third-party websites or services. We encourage you to review the privacy policies of any third-party websites or services you use.</p>

            <h2>18. Business Transfers</h2>
            <p>We may disclose or transfer personal information in connection with a business transaction, such as a merger, acquisition, financing, reorganization, bankruptcy, sale of assets, transfer of client records, or transfer of all or part of our business.</p>

            <h2>19. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices, services, technology, legal requirements, or business operations.</p>
            <p>When we update this Privacy Policy, we will revise the &ldquo;Last Updated&rdquo; date above. If we make material changes, we may provide additional notice where appropriate.</p>
            <p>We encourage you to review this Privacy Policy periodically.</p>

            <h2>20. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, our privacy practices, or your privacy choices, please contact us:</p>
            <p>
              <strong>Covert Communication</strong><br />
              Email: <a href="mailto:info@covertcommunication.com">info@covertcommunication.com</a><br />
              Phone: 808-351-3629<br />
              Website: <a href="https://covertcommunication.com">https://covertcommunication.com</a><br />
              Privacy Request Form: /dsar/
            </p>
          </div>
        </section>
      </main>

      <SiteFooter showContact={false} />
    </>
  )
}
