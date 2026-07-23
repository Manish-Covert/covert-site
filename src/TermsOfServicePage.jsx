import SiteFooter from './SiteFooter'
import SiteNav from './SiteNav'
import { useSEO } from './useSEO'
import { useReveal } from './useReveal'
import './App.css'
import './TheLatest.css'
import './LegalPage.css'

/* Terms of Service — content mirrored from covertcommunication.com/terms-of-service/. */
export default function TermsOfServicePage() {
  useReveal()
  useSEO({
    title: 'Terms of Service | Covert Communication',
    description:
      'The terms and conditions governing your use of the Covert Communication website and services.',
    path: '/terms-of-service',
    ogType: 'website',
  })

  return (
    <>
      <SiteNav />

      <main className="svcd">
        <section className="latest__hero">
          <div className="container container--narrow">
            <h1 className="latest__title reveal">Terms of Service</h1>
          </div>
        </section>

        <section className="legal__body">
          <div className="container container--narrow legal__prose reveal">
            <p className="legal__updated">Effective: June 25, 2024</p>

            <h2>Terms of Service for COVERT COMMUNICATIONS LLC</h2>
            <p>A Hawaii limited liability company called Covert Communications LLC is in charge of running this website. Throughout the site, the terms &ldquo;we,&rdquo; &ldquo;us,&rdquo; and &ldquo;our&rdquo; refer to COVERT COMMUNICATIONS. COVERT COMMUNICATIONS offers this website, covertcommunication.com, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here. You engage in our &ldquo;service&rdquo; by visiting our website and/or making a purchase from us, and you do so in accordance with the terms and conditions set forth below (the &ldquo;Terms of Service,&rdquo; &ldquo;Terms&rdquo;), as well as any additional terms and conditions and policies referenced herein and/or accessible via hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content. Please read these Terms of Service carefully before accessing or using our website. You agree to abide by these terms of service by accessing or using any part of the website. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service, and acceptance of the offer is deemed to have occurred when you accept our Service and utilize it.</p>
            <p>Any new features or tools which are added to the current website shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes. Our store is hosted on Heroku. They provide us with an online hosting and e-commerce platform that allows us to sell our products and services to you. COVERT COMMUNICATIONS sells marketing services. As part of its service, COVERT COMMUNICATIONS may retain Reactium LLC, an affiliate, to host a website and other services. COVERT COMMUNICATIONS will pay Reactium LLC with the money it receives from you, the user. Should you fail to pay COVERT COMMUNICATIONS for the Services we render, Reactium LLC may, at its discretion, &ldquo;turn off&rdquo; your website or otherwise render it impossible to access. User agrees to defend and hold harmless COVERT COMMUNICATIONS and REACTIUM LLC from any allegation of harm or damage for &ldquo;turning off&rdquo; services. Once &ldquo;turned off,&rdquo; the user may have the site restored to functionality by bringing the account current. After bringing the account current, then COVERT COMMUNICATIONS shall have a reasonable amount of time to request that Reactium LLC restore said website. Reactium LLC shall have a reasonable amount of time to restore said website after receiving payment.</p>
            <p>COVERT COMMUNICATIONS may also provide analysis of website performance, generally known as &ldquo;analytics,&rdquo; for its users, but those analyses are provided to help Users understand current activity and performance and should never be construed as promises of future performance. User agrees to defend and hold harmless COVERT COMMUNICATIONS as well as any service to which COVERT COMMUNICATIONS turns for data, reports or tools. User forever releases COVERT COMMUNICATIONS and any entity COVERT COMMUNICATIONS retains for data, reports, or tools.</p>
            <p>COVERT COMMUNICATIONS does not warrant that the Services will meet the client&rsquo;s expectations or requirements. COVERT COMMUNICATIONS provides its services &ldquo;as is&rdquo; and without warranty of any kind. If any provision of this agreement shall be unlawful, void, or, for any reason, unenforceable, then that provision shall be deemed severable from the agreement and shall not affect the validity and enforceability of any remaining provisions. In no event shall COVERT COMMUNICATIONS be liable to client for any indirect, special, exemplary or consequential damages or any claim of lost profits, whether or not foreseeable or alleged to be based on breach of warranty, contract, negligence or strict liability, arising under this Service Agreement, loss of data or any performance under this Service Agreement.</p>

            <h2>Section 1: Online Services Terms</h2>
            <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</p>
            <p>You may not use our Services for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).</p>
            <p>You must not transmit any worms, viruses, or any code of a destructive nature. &ldquo;Misuse&rdquo; includes interference with our Services or access using a method other than the interface and the instructions that we provide. You may only use our services in accordance with the law, including any applicable export and re-export control laws and regulations. We may suspend or stop providing our Services to you if you do not comply with our terms or policies or if we suspect misuse. You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service, use of the Service, access to the Service or any contact on the website through which the service is provided, without express written permission by us. A breach or violation of any of the Terms will result in the immediate termination of your Services.</p>

            <h2>Section 2: General Conditions</h2>
            <p>We reserve the right to refuse service to anyone for any reason at any time.</p>
            <p>You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.</p>
            <p>The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.</p>

            <h2>Section 3: Accuracy, Completeness and Timeliness of Information</h2>
            <p>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or timelier sources of information. Any reliance on the material on this site is at your own risk.</p>
            <p>This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.</p>

            <h2>Section 4: Modifications to the Service and Prices</h2>
            <p>Prices for our Services are subject to change without notice.</p>
            <p>We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice.</p>
            <p>We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.</p>
            <p>We reserve the right, but are not obligated, to limit the sales of our Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis.</p>

            <h2>Section 10: Personal Information</h2>
            <p>Your submission of personal information is governed by our Privacy Policy. To view our Privacy Policy.</p>

            <h2>Section 12: Prohibited Uses</h2>
            <p>In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.</p>

            <h2>Section 13: Disclaimer of Warranties; Limitation of Liability</h2>
            <p>We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.</p>
            <p>We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.</p>
            <p>You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.</p>

            <h2>Section 14: Indemnification</h2>
            <p>You agree to indemnify, defend and hold harmless COVERT COMMUNICATIONS and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys&rsquo; fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.</p>

            <h2>Section 15: Severability</h2>
            <p>In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, Such determination shall not affect the validity and enforceability of any other remaining provisions.</p>

            <h2>Section 16: Termination</h2>
            <p>The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.</p>
            <p>These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our services or when you cease using our site.</p>
            <p>If, in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we may also terminate this agreement at any time without notice, and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly, we may deny you access to our Services (or any part thereof).</p>

            <h2>Section 17: Entire Agreement</h2>
            <p>The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.</p>
            <p>These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitute the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).</p>
            <p>Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.</p>

            <h2>Section 18: Governing Law</h2>
            <p>The laws of the United States of America shall govern and govern the interpretation of these Terms of Service and any separate agreements by which we provide you with Services.</p>

            <h2>Section 19: Changes to Terms of Service</h2>
            <p>You can review the most current version of the Terms of Service at any time at this page.</p>
            <p>We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.</p>

            <h2>Section 20: Contact Information</h2>
            <p>Questions about the Terms of Service should be sent to us at <a href="mailto:info@covertcommunication.com">info@covertcommunication.com</a></p>
            <p>
              2400 Halekoa Drive<br />
              Honolulu, HI 96821<br />
              808-518-4298
            </p>
          </div>
        </section>
      </main>

      <SiteFooter showContact={false} />
    </>
  )
}
