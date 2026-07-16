export const SERVICES = [
  { id: 'technology',       title: 'Technology Consulting',   count: 3, img: '/categories/technology.webp',       hoverImg: '/services/svc-tech-rollover.png',            icon: '/icons/tech.svg',             subs: ['Web Development', 'App Development', 'Tech Strategy'] },
  { id: 'programmatic',     title: 'Programmatic',            count: 4, img: '/categories/programmatic.webp',     hoverImg: '/services/svc-programmatic-rollover.png',    icon: '/icons/programmatic.svg',     subs: ['SEM', 'AEO', 'GEO', 'SEO'] },
  { id: 'social',           title: 'Social Media',            count: 4, img: '/categories/social.webp',           hoverImg: '/services/svc-social-rollover.png',          icon: '/icons/social.svg',           subs: ['Content Creation', 'Paid Social', 'Community Mgmt', 'Influencer Mktg'] },
  { id: 'fraud',            title: 'Fraud Protection Gurus',  count: 3, img: '/categories/fraud.webp',            hoverImg: '/services/svc-fraud-rollover.png',           icon: '/icons/fraud.svg',            subs: ['Ad Fraud Detection', 'Click Fraud', 'Brand Safety'] },
  { id: 'brand-creation',   title: 'Brand Creation',          count: 3, img: '/categories/brand-creation.webp',   hoverImg: '/categories/brand-creation.webp',            icon: '/icons/brand-creation.svg',   subs: ['Brand Identity', 'Logo Design', 'Brand Guidelines'] },
  { id: 'trad',             title: 'Traditional Full Service', count: 6, img: '/categories/trad-full-service.webp', hoverImg: '/services/svc-trad-rollover.png',           icon: '/icons/trad-full-service.svg', subs: ['Print', 'TV & Radio', 'Out of Home', 'Direct Mail', 'Events', 'PR'] },
  { id: 'brand-building',   title: 'Brand Building',          count: 4, img: '/categories/brand-building.webp',   hoverImg: '/categories/brand-building.webp',            icon: '/icons/brand-building.svg',   subs: ['Strategy', 'Positioning', 'Campaigns', 'Analytics'] },
  { id: 'brand-specialties',title: 'Brand Specialties',       count: 7, img: '/categories/brand-specialties.webp', hoverImg: '/services/svc-brandspecialties-rollover.png', icon: '/icons/brand-specialties.svg', subs: ['Packaging', 'Copywriting', 'Photography', 'Video Prod.', 'Experiential', 'Activation', 'Sponsorship'] },
]

export const MEGA_SERVICES = [
  { id: 'programmatic',  title: 'Programmatic',            count: 4, img: '/services/svc-programmatic-rollover.png',    icon: '/icons/programmatic.svg' },
  { id: 'social',        title: 'Social Media',            count: 4, img: '/services/svc-social-rollover.png',          icon: '/icons/social.svg' },
  { id: 'fraud',         title: 'Fraud Protection',        count: 3, img: '/services/svc-fraud-rollover.png',           icon: '/icons/fraud.svg' },
  { id: 'technology',    title: 'Technology Consulting',   count: 3, img: '/services/svc-tech-rollover.png',            icon: '/icons/tech.svg' },
  { id: 'brand-creation',title: 'Brand Creation',          count: 3, img: '/categories/brand-creation.webp',           icon: '/icons/brand-creation.svg' },
  { id: 'brand-building',title: 'Brand Building',          count: 4, img: '/categories/brand-building.webp',           icon: '/icons/brand-building.svg' },
  { id: 'trad',          title: 'Traditional Full Service',count: 6, img: '/services/svc-trad-rollover.png',           icon: '/icons/trad-full-service.svg' },
  { id: 'brand-specialties', title: 'Brand Specialties',   count: 7, img: '/services/svc-brandspecialties-rollover.png', icon: '/icons/brand-specialties.svg' },
]

/* Rich, per-service detail content. Only services present here render the
   expanded alternating-feature layout; others fall back to the generic body. */
export const SERVICE_DETAILS = {
  programmatic: {
    hero: {
      bg: '/services/programmatic/hero.svg',
      eyebrow: 'Programmatic Marketing',
      title: 'Programmatic',
      lead: 'Data-driven media that finds the right audience, in the right moment, across every screen — bought and optimized in real time by machines that never sleep.',
    },
    intro: {
      title: 'Precision at machine speed',
      copy: 'We fuse search, answer, and geo intelligence into a single always-on engine. Every impression is measured, every bid is optimized, and every dollar is pointed at outcomes — not vanity metrics.',
      stats: [
        { value: '4.7×', label: 'Average ROAS' },
        { value: '248%', label: 'Organic lift' },
        { value: '<50ms', label: 'Bid decisioning' },
        { value: '24/7', label: 'Optimization' },
      ],
    },
    features: [
      {
        id: 'seo',
        kicker: '01',
        title: 'SEO',
        image: '/services/programmatic/seo.svg',
        copy: 'We engineer organic visibility from the ground up — technical health, content architecture, and authority signals working together. The result is durable rankings that compound long after the campaign spend stops.',
        points: ['Technical & Core Web Vitals', 'Topical authority mapping', 'Link & entity building'],
      },
      {
        id: 'aeo',
        kicker: '02',
        title: 'AEO',
        image: '/services/programmatic/aeo.svg',
        copy: 'Answer Engine Optimization positions your brand inside the AI-generated responses shaping tomorrow’s search. We structure your data so ChatGPT, Gemini, and Perplexity cite you as the source of truth.',
        points: ['Structured & schema data', 'Entity & knowledge graph', 'Citation-ready content'],
      },
      {
        id: 'sem',
        kicker: '03',
        title: 'SEM',
        image: '/services/programmatic/sem.svg',
        copy: 'Paid search that treats every keyword as a P&L line. Automated bidding, tight ad-copy testing, and conversion-first landing experiences turn intent into pipeline at a cost you can scale.',
        points: ['Automated bid strategy', 'Ad copy & creative testing', 'Conversion rate optimization'],
      },
      {
        id: 'geo',
        kicker: '04',
        title: 'GEO',
        image: '/services/programmatic/geo.svg',
        copy: 'Geo-targeting connects digital demand to physical places. Radius bidding, footfall attribution, and local intent signals put your message in front of buyers exactly where — and when — they’re ready.',
        points: ['Radius & polygon bidding', 'Footfall attribution', 'Local intent signals'],
      },
    ],
  },

  technology: {
    hero: {
      bg: '/services/technology/hero.svg',
      eyebrow: 'Technology Consulting',
      title: 'Technology',
      lead: 'The engineering muscle behind great marketing — websites, apps, and technical strategy built to load fast, scale cleanly, and convert.',
    },
    intro: {
      title: 'Marketing needs a backbone',
      copy: 'Beautiful campaigns fall flat on slow, brittle tech. We architect the platforms, pipelines, and products your brand runs on — pairing design sensibility with production-grade engineering.',
      stats: [
        { value: '98', label: 'Avg. Lighthouse' },
        { value: '3×', label: 'Faster load' },
        { value: '99.9%', label: 'Uptime' },
        { value: '0', label: 'Vendor lock-in' },
      ],
    },
    features: [
      { id: 'web', kicker: '01', title: 'Web Development', image: '/services/technology/web.svg',
        copy: 'Fast, accessible, conversion-focused sites built on modern frameworks. We obsess over Core Web Vitals so your marketing spend lands on pages that actually perform.',
        points: ['Modern JS frameworks', 'Core Web Vitals tuned', 'Headless & CMS integration'] },
      { id: 'app', kicker: '02', title: 'App Development', image: '/services/technology/app.svg',
        copy: 'Native and cross-platform apps that feel effortless. From first wireframe to App Store launch, we ship products your customers keep coming back to.',
        points: ['iOS & Android', 'Cross-platform builds', 'Analytics & push baked in'] },
      { id: 'strategy', kicker: '03', title: 'Tech Strategy', image: '/services/technology/strategy.svg',
        copy: 'A clear technical roadmap that de-risks growth. We audit your stack, design the architecture, and choose the tools that keep you moving fast without accruing debt.',
        points: ['Architecture & roadmap', 'Stack selection', 'Scalability & security'] },
    ],
  },

  social: {
    hero: {
      bg: '/services/social/hero.svg',
      eyebrow: 'Social Media',
      title: 'Social Media',
      lead: 'Scroll-stopping content and paid strategy that turn followers into a community — and a community into customers.',
    },
    intro: {
      title: 'Culture moves fast. So do we.',
      copy: 'We live where your audience lives. From thumb-stopping creative to precision paid targeting and always-on community care, we build social presence that compounds.',
      stats: [
        { value: '3.9×', label: 'Paid ROAS' },
        { value: '+180%', label: 'Engagement' },
        { value: '12M', label: 'Monthly reach' },
        { value: '<1h', label: 'Response time' },
      ],
    },
    features: [
      { id: 'content', kicker: '01', title: 'Content Creation', image: '/services/social/content.svg',
        copy: 'Short-form video, motion graphics, and editorial made for the feed. We produce at the pace platforms demand without ever cutting the craft.',
        points: ['Short-form video', 'Motion & graphics', 'Editorial calendars'] },
      { id: 'paid', kicker: '02', title: 'Paid Social', image: '/services/social/paid.svg',
        copy: 'Full-funnel paid campaigns across Meta, TikTok, and LinkedIn. Sharp targeting, relentless creative testing, and budgets pointed squarely at return.',
        points: ['Full-funnel targeting', 'Creative testing', 'ROAS optimization'] },
      { id: 'community', kicker: '03', title: 'Community Mgmt', image: '/services/social/community.svg',
        copy: 'Real conversations, handled with care. We moderate, engage, and nurture the people around your brand so goodwill turns into loyalty.',
        points: ['Daily engagement', 'Moderation & care', 'Community growth'] },
      { id: 'influencer', kicker: '04', title: 'Influencer Marketing', image: '/services/social/influencer.svg',
        copy: 'The right creators, the right message, real results. We source, vet, and manage partnerships that borrow trust you can’t buy with ad spend.',
        points: ['Creator sourcing', 'Campaign management', 'Authenticity & reach'] },
    ],
  },

  fraud: {
    hero: {
      bg: '/services/fraud/hero.svg',
      eyebrow: 'Fraud Protection Gurus',
      title: 'Fraud Protection',
      lead: 'Every dollar of ad spend defended. We hunt bots, block invalid traffic, and keep your brand out of the wrong places — before the damage is done.',
    },
    intro: {
      title: 'Real people. Real placements.',
      copy: 'Up to a third of digital ad spend is lost to fraud and waste. We sit between your budget and the open web, filtering invalid traffic in real time and guarding where your brand shows up.',
      stats: [
        { value: '−92%', label: 'Wasted spend' },
        { value: '99.6%', label: 'Valid traffic' },
        { value: 'Real-time', label: 'Pre-bid filtering' },
        { value: '24/7', label: 'Monitoring' },
      ],
    },
    features: [
      { id: 'addetection', kicker: '01', title: 'Ad Fraud Detection', image: '/services/fraud/addetection.svg',
        copy: 'Pre-bid and post-bid filtering that stops bots and invalid traffic cold. We score every impression so your money reaches humans, not scripts.',
        points: ['Bot & IVT detection', 'Pre-bid filtering', 'Spend recovery'] },
      { id: 'clickfraud', kicker: '02', title: 'Click Fraud', image: '/services/fraud/clickfraud.svg',
        copy: 'Anomaly detection that flags and blocks fraudulent clicks in real time — protecting your PPC budgets from competitors, click farms, and automated abuse.',
        points: ['Anomaly detection', 'IP & device blocking', 'Automated refunds'] },
      { id: 'brandsafety', kicker: '03', title: 'Brand Safety', image: '/services/fraud/brandsafety.svg',
        copy: 'Contextual controls and curated inventory keep your brand away from content that could harm it. You choose the company your ads keep.',
        points: ['Contextual controls', 'Inventory whitelisting', 'Reputation protection'] },
    ],
  },

  'brand-creation': {
    hero: {
      bg: '/services/brand-creation/hero.svg',
      eyebrow: 'Brand Creation',
      title: 'Brand Creation',
      lead: 'The identity, the mark, and the rules that make a brand unmistakable — designed from a blank page to feel inevitable.',
    },
    intro: {
      title: 'Brands people remember',
      copy: 'A brand is more than a logo — it’s a system of voice, color, and meaning working in concert. We craft identities with the strategy to matter and the polish to last.',
      stats: [
        { value: '360°', label: 'Identity systems' },
        { value: '100%', label: 'Original design' },
        { value: '∞', label: 'Scalable assets' },
        { value: '1', label: 'Cohesive voice' },
      ],
    },
    features: [
      { id: 'identity', kicker: '01', title: 'Brand Identity', image: '/services/brand-creation/identity.svg',
        copy: 'The full personality of your brand — voice, palette, typography, and the feeling people carry away. We build identity systems that flex across every touchpoint.',
        points: ['Voice & positioning', 'Color & type systems', 'Visual language'] },
      { id: 'logo', kicker: '02', title: 'Logo Design', image: '/services/brand-creation/logo.svg',
        copy: 'A mark that works everywhere — from a favicon to a billboard. We design distinctive logos with the lockups and variations to keep them sharp at any size.',
        points: ['Primary & secondary marks', 'Lockups & variations', 'Responsive scaling'] },
      { id: 'guidelines', kicker: '03', title: 'Brand Guidelines', image: '/services/brand-creation/guidelines.svg',
        copy: 'The rulebook that keeps everyone on-brand. Clear standards, ready-to-use assets, and usage rules so your brand stays consistent as your team grows.',
        points: ['Usage standards', 'Asset libraries', 'Consistency at scale'] },
    ],
  },

  trad: {
    hero: {
      bg: '/services/trad/hero.svg',
      eyebrow: 'Traditional Full Service',
      title: 'Traditional',
      lead: 'The channels that built brands still build them best — print, broadcast, out-of-home, and live experiences, executed end to end.',
    },
    intro: {
      title: 'Offline still wins hearts',
      copy: 'Digital reaches — traditional resonates. We plan and produce across every classic channel, weaving them with your digital efforts into one seamless brand story.',
      stats: [
        { value: '6', label: 'Channels covered' },
        { value: 'Full', label: 'In-house production' },
        { value: 'National', label: 'Media buying' },
        { value: 'Turnkey', label: 'Execution' },
      ],
    },
    features: [
      { id: 'print', kicker: '01', title: 'Print', image: '/services/trad/print.svg',
        copy: 'Beautifully art-directed print, from layout to press check. We sweat the paper, the ink, and the finishing so the final piece feels premium in hand.',
        points: ['Art direction & layout', 'Press management', 'Premium finishing'] },
      { id: 'tvradio', kicker: '02', title: 'TV & Radio', image: '/services/trad/tvradio.svg',
        copy: 'Broadcast spots that stick, scripted and produced in-house, with airtime bought to reach the right audience at the right moment.',
        points: ['Concept & scripting', 'Production', 'Airtime buying'] },
      { id: 'ooh', kicker: '03', title: 'Out of Home', image: '/services/trad/ooh.svg',
        copy: 'Billboards, transit, and place-based media that command attention at scale. Bold creative and smart placement put your brand in the physical world.',
        points: ['Billboards & transit', 'Placement strategy', 'Large-format creative'] },
      { id: 'directmail', kicker: '04', title: 'Direct Mail', image: '/services/trad/directmail.svg',
        copy: 'Targeted mail that earns a response. We combine sharp lists, tactile design, and measurable offers to turn mailboxes into a channel that pays.',
        points: ['Audience targeting', 'Print & fulfillment', 'Response tracking'] },
      { id: 'events', kicker: '05', title: 'Events', image: '/services/trad/events.svg',
        copy: 'Experiences people talk about. From staging and logistics to the smallest guest detail, we produce events that make your brand impossible to forget.',
        points: ['Staging & logistics', 'Guest experience', 'On-site production'] },
      { id: 'pr', kicker: '06', title: 'Public Relations', image: '/services/trad/pr.svg',
        copy: 'The story, told to the people who matter. We craft narratives and work the outreach that turns your news into earned coverage.',
        points: ['Narrative & messaging', 'Media outreach', 'Earned coverage'] },
    ],
  },

  'brand-building': {
    hero: {
      bg: '/services/brand-building/hero.svg',
      eyebrow: 'Brand Building',
      title: 'Brand Building',
      lead: 'Strategy, positioning, and campaigns that grow a brand’s meaning over time — and the analytics to prove it’s working.',
    },
    intro: {
      title: 'Build equity, not just awareness',
      copy: 'Great brands compound. We define where you play and how you win, then run the campaigns and measurement that turn attention into lasting equity.',
      stats: [
        { value: '+61%', label: 'Brand recall' },
        { value: '4pt', label: 'Consideration lift' },
        { value: '360°', label: 'Campaign reach' },
        { value: 'Data-led', label: 'Decisions' },
      ],
    },
    features: [
      { id: 'strategy', kicker: '01', title: 'Strategy', image: '/services/brand-building/strategy.svg',
        copy: 'The plan behind the brand. We ground every decision in insight — audience, market, and opportunity — so growth is deliberate, not accidental.',
        points: ['Market & audience insight', 'Growth planning', 'Brand architecture'] },
      { id: 'positioning', kicker: '02', title: 'Positioning', image: '/services/brand-building/positioning.svg',
        copy: 'Own a place in the mind of your customer. We define the category, the claim, and the difference that makes your brand the obvious choice.',
        points: ['Category definition', 'Differentiation', 'Value proposition'] },
      { id: 'campaigns', kicker: '03', title: 'Campaigns', image: '/services/brand-building/campaigns.svg',
        copy: 'Big ideas, rolled out everywhere they matter. We concept and orchestrate integrated campaigns that lift recall and move the metrics that count.',
        points: ['Concept & big idea', 'Integrated rollout', 'Recall & lift'] },
      { id: 'analytics', kicker: '04', title: 'Analytics', image: '/services/brand-building/analytics.svg',
        copy: 'Proof, not guesswork. We measure brand health and campaign impact with attribution you can trust, so every next move is sharper than the last.',
        points: ['Brand measurement', 'Attribution', 'Actionable insight'] },
    ],
  },

  'brand-specialties': {
    hero: {
      bg: '/services/brand-specialties/hero.svg',
      eyebrow: 'Brand Specialties',
      title: 'Brand Specialties',
      lead: 'The craft disciplines that bring a brand to life — packaging, copy, photography, video, and experiences made with obsessive attention to detail.',
    },
    intro: {
      title: 'Where craft meets brand',
      copy: 'Some things demand a specialist’s hand. Our studio brings deep craft to the moments that define a brand — on the shelf, on camera, and in the room.',
      stats: [
        { value: '7', label: 'Specialties' },
        { value: 'In-house', label: 'Studio & crew' },
        { value: 'Award', label: 'Winning work' },
        { value: 'End-to-end', label: 'Production' },
      ],
    },
    features: [
      { id: 'packaging', kicker: '01', title: 'Packaging', image: '/services/brand-specialties/packaging.svg',
        copy: 'Structure and story that win the shelf and reward the unbox. We design packaging that protects, sells, and delights in equal measure.',
        points: ['Structural design', 'Shelf impact', 'Unboxing experience'] },
      { id: 'copywriting', kicker: '02', title: 'Copywriting', image: '/services/brand-specialties/copywriting.svg',
        copy: 'Words that carry the brand. From headlines to long-form, we write with a voice that’s unmistakably yours and impossible to skim past.',
        points: ['Brand voice', 'Headlines & taglines', 'Long-form & story'] },
      { id: 'photography', kicker: '03', title: 'Photography', image: '/services/brand-specialties/photography.svg',
        copy: 'Art-directed imagery shot to spec. Lighting, styling, and edit come together into a library of visuals that make your brand look its best everywhere.',
        points: ['Art direction', 'Lighting & styling', 'Retouch & delivery'] },
      { id: 'video', kicker: '04', title: 'Video Production', image: '/services/brand-specialties/video.svg',
        copy: 'From script to final cut, produced in-house. We handle the shoot and the post so you get film that moves people — and metrics.',
        points: ['Scripting & storyboards', 'Production crew', 'Editing & post'] },
      { id: 'experiential', kicker: '05', title: 'Experiential', image: '/services/brand-specialties/experiential.svg',
        copy: 'Immersive moments people step inside and remember. We design experiences that turn your brand into something felt, not just seen.',
        points: ['Immersive concepts', 'Spatial design', 'Memorable moments'] },
      { id: 'activation', kicker: '06', title: 'Activation', image: '/services/brand-specialties/activation.svg',
        copy: 'Launches and sampling that create real buzz. We put your brand directly in people’s hands and turn the moment into momentum.',
        points: ['Launch & sampling', 'Field activation', 'Buzz & word-of-mouth'] },
      { id: 'sponsorship', kicker: '07', title: 'Sponsorship', image: '/services/brand-specialties/sponsorship.svg',
        copy: 'The right partnerships, negotiated and activated. We find and manage sponsorships that borrow the right audiences and amplify your reach.',
        points: ['Partner sourcing', 'Rights negotiation', 'Activation & reach'] },
    ],
  },
}

export const MEGA_ABOUT = [
  { id: 'covertcom',  label: 'Covert Communication', icon: '/icons/programmatic.svg',    img: '/about/about-covertcom-rollover.png',   cardBg: '/about/about-covertcom-rollover.png', href: '/about/covertcom',
    heroImg: '/about/about-covertcom-emblem.webp', heroBg: '/about/about-hero-texture.webp', heroEmblem: '/about/about-hero-emblem.webp', tagline: 'The full-service agency behind the brand.' },
  { id: 'anna',       label: 'Anna Covert',           icon: '/icons/brand-creation.svg',  img: '/about/about-anna-rollover.png',        cardBg: '/about/card-anna.png', href: '/about/anna',
    heroImg: '/about/about-anna-emblem.webp', heroBg: '/about/about-hero-texture.webp', heroEmblem: '/about/about-anna-hero-emblem.webp', figure: '/about/about-anna-figure.png', photo: '/about/about-anna-photo.webp', tagline: 'Founder, author, and the voice behind Covert Communication.' },
  { id: 'covertteam',label: 'The Covert Team',        icon: '/icons/social.svg',           img: '/about/about-covertteam-rollover.png',  cardBg: '/about/card-covertteam.png', href: '/about/covertteam',
    heroBg: '/about/about-hero-texture.webp', heroEmblem: '/about/about-hero-emblem.webp', heroTitle: 'About', heroAccent: 'The Covert Team',
    tagline: 'The people who make it happen, every day.' },
  { id: 'books',      label: 'Books',       badge: '2 Titles', icon: '/icons/brand-building.svg',  img: '/about/about-books-rollover.png',   cardBg: '/about/card-books.png', href: '/about/books',
    heroImg: '/about/about-books-cover.webp', heroBg: '/about/about-hero-texture.webp', heroEmblem: '/about/about-books-hero.webp', heroEmblemWide: true, heroTitle: 'Books', heroAccent: 'by Anna Covert', tagline: 'Bestselling reads on marketing and the solar industry.' },
  { id: 'podcasts',   label: 'Podcasts',    badge: '2 Series', icon: '/icons/trad-full-service.svg', img: '/about/about-podcasts-rollover.png', cardBg: '/about/card-podcasts.png', href: '/about/podcasts',
    heroBg: '/about/about-hero-texture.webp', heroEmblem: '/about/about-anna-headshot.webp', heroEmblemFigure: true, heroTitle: 'Podcasts', heroAccent: 'with Anna Covert',
    tagline: 'Conversations on marketing, media, and solar.' },
  { id: 'otherbrands',label: 'Other Brands',badge: '4 Brands', icon: '/icons/tech.svg',             img: '/about/about-otherbrands-rollover.png', cardBg: '/about/card-otherbrands.png', href: '/about/otherbrands',
    heroBg: '/about/about-otherbrands-hero.webp', tagline: 'Other ventures built by the Covert Communication team.' },
]

export const ABOUT_BOOKS = [
  {
    id: 'covert-code',
    title: 'The Covert Code',
    subtitle: 'Mastering the Art of Digital Marketing',
    author: 'Anna Covert',
    cover: '/about/about-books-cover.webp',
    badges: ['Forbes Books', 'Amazon Best Seller'],
    copy: 'A practical playbook for building and scaling a modern marketing agency, drawn from Anna Covert’s own experience growing Covert Communication.',
    buyHref: '#',
  },
  {
    id: 'solar-coaster',
    title: 'The Solar Coaster',
    subtitle: 'The Solar Industry’s Ultimate Playbook',
    author: 'Anna Covert',
    cover: '/about/about-books-cover.webp',
    badges: ['New!'],
    copy: 'A hands-on guide to marketing and growing a solar business, built on lessons from the front lines of a fast-moving industry.',
    buyHref: '#',
  },
]

export const ABOUT_PODCASTS = [
  {
    id: 'covert-code-podcast',
    title: 'The Covert Code Podcast',
    subscribers: 'Over 150,000+ Subscribers & growing!',
    copy: 'Anna Covert breaks down marketing strategy, brand building, and the business of agency life.',
    listenHref: '#',
  },
  {
    id: 'solar-coaster-podcast',
    title: 'The Solar Coaster Podcast',
    subscribers: 'Over 50,000+ Subscribers & growing!',
    copy: 'A look inside the solar industry, its ups and downs, and how to market and grow within it.',
    listenHref: '#',
  },
]

const BRAND_LOREM = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate'

export const ABOUT_BRANDS = [
  { id: 'trusting-solar-calculator', name: 'Trusting SolarCalculator', logo: '/about/brand-trusting-solar.png',
    caption: 'CAPTION GOES HERE', copy: BRAND_LOREM, href: '#' },
  { id: 'mana', name: 'Mana', logo: '/about/brand-mana.png',
    caption: 'CAPTION GOES HERE', copy: BRAND_LOREM, href: '#' },
  { id: 'switch-it-solar', name: 'Switch It Solar', logo: '/about/brand-switch-it.png',
    caption: 'CAPTION GOES HERE', copy: BRAND_LOREM, href: '#' },
  { id: 'solar-assault', name: 'Solar Assault', logo: '/about/brand-solar-assault.png',
    caption: 'CAPTION GOES HERE', copy: BRAND_LOREM, href: '#' },
  { id: 'reactium', name: 'Reactium', logo: '/about/brand-reactium.png',
    caption: 'CAPTION GOES HERE', copy: BRAND_LOREM, href: '#' },
]

export const HOW_DID_YOU_HEAR = ['Please choose one', 'Google', 'Social Media', 'Referral', 'Event', 'Other']

export const HERO_PILLS = [
  { label: 'Programmatic\nSEM / AEO / GEO / SEO', left: 'calc(50% - 410px)', top: '14%' },
  { label: 'Social Media',                          left: 'calc(50% - 480px)', top: '42%' },
  { label: 'Fraud Protection Gurus',                left: 'calc(50% - 460px)', top: '64%' },
  { label: 'Technology Consulting',                 left: 'calc(50% - 370px)', top: '78%' },
  { label: 'Brand Creation',                        left: 'calc(50% + 250px)', top: '10%' },
  { label: 'Traditional Full Service',              left: 'calc(50% + 300px)', top: '40%' },
  { label: 'Brand Building',                        left: 'calc(50% + 320px)', top: '63%' },
  { label: 'Brand Specialties',                     left: 'calc(50% + 210px)', top: '78%' },
]
