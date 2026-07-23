export const SERVICES = [
  { id: 'technology',       title: 'Technology Consulting',   count: 3, img: '/categories/technology.webp',       hoverImg: '/services/svc-tech-rollover.webp',            icon: '/icons/tech.svg',             subs: ['Web Development', 'App Development', 'Tech Strategy'] },
  { id: 'programmatic',     title: 'Programmatic',            count: 4, img: '/categories/programmatic.webp',     hoverImg: '/services/svc-programmatic-rollover.webp',    icon: '/icons/programmatic.svg',     subs: ['SEM', 'AEO', 'GEO', 'SEO'] },
  { id: 'social',           title: 'Social Media',            count: 4, img: '/categories/social.webp',           hoverImg: '/services/svc-social-rollover.webp',          icon: '/icons/social.svg',           subs: ['Content Creation', 'Paid Social', 'Community Mgmt', 'Influencer Mktg'] },
  { id: 'fraud',            title: 'Fraud Protection Gurus',  count: 3, img: '/categories/fraud.webp',            hoverImg: '/services/svc-fraud-rollover.webp',           icon: '/icons/fraud.svg',            subs: ['Ad Fraud Detection', 'Click Fraud', 'Brand Safety'] },
  { id: 'brand-creation',   title: 'Brand Creation',          count: 3, img: '/categories/brand-creation.webp',   hoverImg: '/categories/brand-creation.webp',            icon: '/icons/brand-creation.svg',   subs: ['Brand Identity', 'Logo Design', 'Brand Guidelines'] },
  { id: 'trad',             title: 'Traditional Full Service', count: 6, img: '/categories/trad-full-service.webp', hoverImg: '/services/svc-trad-rollover.webp',           icon: '/icons/trad-full-service.svg', subs: ['Print', 'TV & Radio', 'Out of Home', 'Direct Mail', 'Events', 'PR'] },
  { id: 'brand-building',   title: 'Brand Building',          count: 4, img: '/categories/brand-building.webp',   hoverImg: '/categories/brand-building.webp',            icon: '/icons/brand-building.svg',   subs: ['Strategy', 'Positioning', 'Campaigns', 'Analytics'] },
  { id: 'brand-specialties',title: 'Brand Specialties',       count: 7, img: '/categories/brand-specialties.webp', hoverImg: '/services/svc-brandspecialties-rollover.webp', icon: '/icons/brand-specialties.svg', subs: ['Packaging', 'Copywriting', 'Photography', 'Video Prod.', 'Experiential', 'Activation', 'Sponsorship'] },
]

export const MEGA_SERVICES = [
  { id: 'programmatic',  title: 'Programmatic',            count: 4, img: '/services/svc-programmatic-rollover.webp',    icon: '/icons/programmatic.svg' },
  { id: 'social',        title: 'Social Media',            count: 4, img: '/services/svc-social-rollover.webp',          icon: '/icons/social.svg' },
  { id: 'fraud',         title: 'Fraud Protection',        count: 3, img: '/services/svc-fraud-rollover.webp',           icon: '/icons/fraud.svg' },
  { id: 'technology',    title: 'Technology Consulting',   count: 3, img: '/services/svc-tech-rollover.webp',            icon: '/icons/tech.svg' },
  { id: 'brand-creation',title: 'Brand Creation',          count: 3, img: '/services/svc-brand-creation-rollover.webp',   icon: '/icons/brand-creation.svg' },
  { id: 'brand-building',title: 'Brand Building',          count: 4, img: '/services/svc-brand-building-rollover.webp',   icon: '/icons/brand-building.svg' },
  { id: 'trad',          title: 'Traditional Full Service',count: 6, img: '/services/svc-trad-rollover.webp',           icon: '/icons/trad-full-service.svg' },
  { id: 'brand-specialties', title: 'Brand Specialties',   count: 7, img: '/services/svc-brandspecialties-rollover.webp', icon: '/icons/brand-specialties.svg' },
]

/* Rich, per-service detail content. Only services present here render the
   expanded alternating-feature layout; others fall back to the generic body. */
export const SERVICE_DETAILS = {
  programmatic: {
    hero: {
      eyebrow: 'Programmatic Marketing',
      title: 'Programmatic',
      lead: 'Data-driven media that finds the right audience, in the right moment, across every screen — bought and optimized in real time by machines that never sleep.',
      bg: '/services/programmatic/hero.webp',
      bottom: true,
      heroAccent: 'Programmatic',
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
      eyebrow: 'Technology Consulting',
      title: 'Technology',
      lead: 'The engineering muscle behind great marketing — websites, apps, and technical strategy built to load fast, scale cleanly, and convert.',
      bg: '/services/technology/hero.webp',
      bottom: true,
      heroAccent: 'Technology',
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
      eyebrow: 'Social Media',
      title: 'Social Media',
      lead: 'Scroll-stopping content and paid strategy that turn followers into a community — and a community into customers.',
      bg: '/services/social/hero.webp',
      bottom: true,
      heroTitle: 'Social',
      heroAccent: 'Media',
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
      eyebrow: 'Fraud Protection Gurus',
      title: 'Fraud Protection',
      lead: 'Every dollar of ad spend defended. We hunt bots, block invalid traffic, and keep your brand out of the wrong places — before the damage is done.',
      bg: '/services/fraud/hero.webp',
      bottom: true,
      heroTitle: 'Fraud',
      heroAccent: 'Protection',
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
      eyebrow: 'Brand Creation',
      title: 'Brand Creation',
      lead: 'The identity, the mark, and the rules that make a brand unmistakable — designed from a blank page to feel inevitable.',
      bg: '/services/brand-creation/hero.webp',
      bottom: true,
      heroTitle: 'Brand',
      heroAccent: 'Creation',
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
      eyebrow: 'Traditional Full Service',
      title: 'Traditional',
      lead: 'The channels that built brands still build them best — print, broadcast, out-of-home, and live experiences, executed end to end.',
      bg: '/services/trad/hero.webp',
      bottom: true,
      heroTitle: 'Traditional',
      heroAccent: 'Full Service',
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
      eyebrow: 'Brand Building',
      bg: '/services/brand-building/hero.webp',
      bottom: true,
      heroTitle: 'Brand',
      heroAccent: 'Building',
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
      eyebrow: 'Brand Specialties',
      title: 'Brand Specialties',
      lead: 'The craft disciplines that bring a brand to life — packaging, copy, photography, video, and experiences made with obsessive attention to detail.',
      bg: '/services/brand-specialties/hero.webp',
      bottom: true,
      heroTitle: 'Brand',
      heroAccent: 'Specialties',
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
  { id: 'covertcom',  label: 'Covert Communication', icon: '/icons/about/about-covertcom.png',    img: '/about/about-covertcom-rollover.webp',   cardBg: '/about/about-covertcom-rollover.webp', href: '/about/covertcom',
    heroImg: '/about/about-covertcom-emblem.webp', heroBg: '/about/about-hero-texture.webp', heroEmblem: '/about/about-hero-emblem.webp', tagline: 'The full-service agency behind the brand.' },
  { id: 'anna',       label: 'Anna Covert',           icon: '/icons/about/about-anna.png',  img: '/about/about-anna-rollover.webp',        cardBg: '/about/card-anna.webp', href: '/about/anna',
    heroImg: '/about/about-anna-emblem.webp', heroBg: '/about/about-hero-texture.webp', heroEmblem: '/about/about-anna-hero-emblem.webp', heroEmblemSharp: true, figure: '/about/about-anna-figure.webp', photo: '/about/about-anna-photo.webp', tagline: 'Founder, author, and the voice behind Covert Communication.' },
  { id: 'covertteam',label: 'The Covert Team',        icon: '/icons/about/about-covertteam.png',           img: '/about/about-covertteam-rollover.webp',  cardBg: '/about/card-covertteam.webp', href: '/about/covertteam',
    heroBg: '/about/about-hero-texture.webp', heroEmblem: '/about/about-hero-emblem.webp', heroTitle: 'About', heroAccent: 'The Covert Team',
    tagline: 'The people who make it happen, every day.' },
  { id: 'books',      label: 'Books',       badge: '2 Titles', icon: '/icons/about/about-books.svg',  img: '/about/about-books-rollover.webp',   cardBg: '/about/card-books.webp', href: '/about/books',
    heroImg: '/about/about-books-cover.webp', heroBg: '/about/about-hero-texture.webp', heroEmblem: '/about/about-books-hero.webp', heroEmblemWide: true, heroTitle: 'Books', heroAccent: 'by Anna Covert', tagline: 'Bestselling reads on marketing and the solar industry.' },
  { id: 'podcasts',   label: 'Podcasts',    badge: '2 Series', icon: '/icons/about/about-podcasts.png', img: '/about/about-podcasts-rollover.webp', cardBg: '/about/card-podcasts.webp', href: '/about/podcasts',
    heroBg: '/about/about-hero-texture.webp', heroEmblem: '/about/about-anna-headshot.webp', heroEmblemFigure: true, heroTitle: 'Podcasts', heroAccent: 'with Anna Covert',
    tagline: 'Conversations on marketing, media, and solar.' },
  { id: 'otherbrands',label: 'Other Brands',badge: '4 Brands', icon: '/icons/about/about-otherbrands.png',             img: '/about/about-otherbrands-rollover.webp', cardBg: '/about/card-otherbrands.webp', href: '/about/otherbrands',
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
  { id: 'trusting-solar-calculator', name: 'Trusting SolarCalculator', logo: '/about/brand-trusting-solar.webp',
    caption: 'CAPTION GOES HERE', copy: BRAND_LOREM, href: '#' },
  { id: 'mana', name: 'Mana', logo: '/about/brand-mana.webp',
    caption: 'CAPTION GOES HERE', copy: BRAND_LOREM, href: '#' },
  { id: 'switch-it-solar', name: 'Switch It Solar', logo: '/about/brand-switch-it.webp',
    caption: 'CAPTION GOES HERE', copy: BRAND_LOREM, href: '#' },
  { id: 'solar-assault', name: 'Solar Assault', logo: '/about/brand-solar-assault.webp',
    caption: 'CAPTION GOES HERE', copy: BRAND_LOREM, href: '#' },
  { id: 'reactium', name: 'Reactium', logo: '/about/brand-reactium.webp',
    caption: 'CAPTION GOES HERE', copy: BRAND_LOREM, href: '#' },
]

export const HOW_DID_YOU_HEAR = [
  { label: 'Please choose one', value: '' },
  { label: 'Online', value: 'online' },
  { label: 'Mail', value: 'mail' },
  { label: 'Family/Friend', value: 'familyfriend' },
  { label: 'Other', value: 'other' },
]

/* Labels are laid out at equal angles around the logo in App.jsx, so the
   order here is the order they appear going clockwise around the ring. */
export const HERO_PILLS = [
  { label: 'Programmatic\nSEM / AEO / GEO / SEO' },
  { label: 'Brand Creation' },
  { label: 'Traditional Full Service' },
  { label: 'Brand Building' },
  { label: 'Brand Specialties' },
  { label: 'Technology Consulting' },
  { label: 'Fraud Protection Gurus' },
  { label: 'Social Media' },
]

/* ---------- THE LATEST ---------- */
/* Category order drives the filter-pill row on /the-latest.
   'All' is prepended in-page; each LATEST item's `category`
   must match one of these labels. */
export const LATEST_CATEGORIES = ['All', 'Books', 'Podcasts', 'Solar', 'Technology']

export const LATEST = [
  { id: "3547-thecovertcode", slug: "episode-122-embrace-the-pilgrim-spirit", category: "Podcasts", title: "Episode 122 – Gideon Enok", img: "https://thecovertcode.com/wp-content/uploads/2026/07/Screenshot-2026-07-15-at-6.23.54-PM-1024x575.png" },
  { id: "3527-thecovertcode", slug: "gina-riley-why-being-qualified-isnt-enough-anymore-ep-121", category: "Podcasts", title: "Episode 121 – Gina Riley", img: "https://thecovertcode.com/wp-content/uploads/2026/07/COVERT-CODE-TITLES-1.png" },
  { id: "3508-thecovertcode", slug: "marty-fahncke-build-a-business-worth-selling", category: "Podcasts", title: "Episode 120 – Marty Fahncke", img: "https://thecovertcode.com/wp-content/uploads/2026/07/COVERT-CODE-TITLES.png" },
  { id: "3491-thecovertcode", slug: "episode-119-dr-annu-navani", category: "Podcasts", title: "Episode 119 – Dr. Annu Navani", img: "https://thecovertcode.com/wp-content/uploads/2026/06/COVERT-CODE-TITLES-1.png" },
  { id: "3495-thecovertcode", slug: "why-leaders-must-be-more-visible-vocal-and-vulnerable-to-win-consumer-trust", category: "Technology", title: "Why Leaders Must Be More Visible, Vocal, and Vulnerable to Win Consumer Trust", img: "https://thecovertcode.com/wp-content/uploads/2026/06/pexels-yankrukov-7793149-1024x683.jpg" },
  { id: "3477-thecovertcode", slug: "episode-118-charlene-rose", category: "Podcasts", title: "Episode 118 – Charlene Rose", img: "https://thecovertcode.com/wp-content/uploads/2026/06/COVERT-CODE-TITLES.png" },
  { id: "3455-thecovertcode", slug: "episode-117-dave-gulas", category: "Podcasts", title: "Episode 117 – Dave Gulas", img: "https://thecovertcode.com/wp-content/uploads/2026/06/dave-gulas-founder-led-selling-headshot-1024x819.jpg" },
  { id: "3443-thecovertcode", slug: "episode-116-rob-aquino", category: "Podcasts", title: "Episode 116 – Rob Aquino", img: "https://thecovertcode.com/wp-content/uploads/2026/06/8.png" },
  { id: "3439-thecovertcode", slug: "chatgpt-advertising-future-marketing", category: "Technology", title: "What ChatGPT Advertising Means for the Future of Digital Marketing", img: "https://thecovertcode.com/wp-content/uploads/2026/06/2.png" },
  { id: "3430-thecovertcode", slug: "episode-115-lou-chatta", category: "Podcasts", title: "Episode 115 – Lou Chatta", img: "https://thecovertcode.com/wp-content/uploads/2026/05/8.png" },
  { id: "1830-annacovert", slug: "why-leaders-must-be-more-visible-vocal-and-vulnerable-to-win-consumer-trust-annacovert", category: "Technology", title: "Why Leaders Must Be More Visible, Vocal, and Vulnerable to Win Consumer Trust", img: "https://annacovert.com/wp-content/uploads/2026/06/pexels-yankrukov-7793149-1024x683.jpg" },
  { id: "1744-annacovert", slug: "the-next-solar-marketing-shift-why-zero-click-search-changes-everything", category: "Solar", title: "The Next Solar Marketing Shift: Why Zero-Click Search Changes Everything", img: "https://annacovert.com/wp-content/uploads/2026/06/4eb6782d-f5be-423b-8dea-61e5337602ac.png" },
  { id: "1737-annacovert", slug: "chatgpt-ads-are-coming-why-business-leaders-need-an-ai-visibility-strategy-now", category: "Technology", title: "ChatGPT Ads Are Coming: Why Business Leaders Need an AI Visibility Strategy Now", img: "https://annacovert.com/wp-content/uploads/2026/06/1.png" },
  { id: "1694-annacovert", slug: "authority-as-a-growth-strategy-forbes-books-podcast", category: "Books", title: "The Covert Code Launches “Authority as a Growth Strategy” A Forbes Books special podcast series presented by The Covert Code", img: "https://annacovert.com/wp-content/uploads/2026/04/Screenshot-2026-04-20-at-2.57.06-PM.png" },
  { id: "1579-annacovert", slug: "the-covert-code-podcast-celebrates-100000-followers-and-100-episodes", category: "Podcasts", title: "The Covert Code Podcast Celebrates 100,000 Followers and 100 Episodes", img: "https://annacovert.com/wp-content/uploads/2026/01/Untitled-design-4.png" },
  { id: "1517-annacovert", slug: "the-covert-code-podcast-surpasses-45000-followers", category: "Podcasts", title: "The Covert Code Podcast Surpasses 45,000 Followers on YouTube", img: "https://annacovert.com/wp-content/uploads/2025/10/Untitled-design-1.png" },
  { id: "1492-annacovert", slug: "anna-covert-keynote-speaker-at-adwest-conference", category: "Technology", title: "Anna Covert, Keynote Speaker at 2025 AAF AdWest Conference", img: "https://annacovert.com/wp-content/uploads/2025/09/Untitled-design-29.png" },
  { id: "1373-annacovert", slug: "the-solar-coaster-is-the-newly-published-book-by-anna-covert", category: "Books", title: "The Solar Coaster is the Newly Published Book by Anna Covert", img: "https://annacovert.com/wp-content/uploads/2025/09/AC-PR-for-Websites.jpg" },
  { id: "1304-annacovert", slug: "anna-covert-to-lead-mission-driven-marketing-a-digital-marketing-101-workshop", category: "Technology", title: "Anna Covert to Lead “Mission-Driven Marketing: A Digital Marketing 101 Workshop”", img: "https://annacovert.com/wp-content/uploads/2025/08/Screenshot-2025-08-19-at-9.11.45-AM.png" },
  { id: "1252-annacovert", slug: "digimarcon-hawaii-2025-anna-covert", category: "Technology", title: "Anna Covert to Speak at DigiMarCon Hawaii", img: "https://annacovert.com/wp-content/uploads/2025/07/1753352053130.jpg" },
  { id: "3510-solarcoasterbook", slug: "the-patent-battle-behind-the-smart-grid-ep-46", category: "Solar", title: "The Patent Battle Behind the Smart Grid – EP 46", img: "https://solarcoasterbook.com/wp-content/uploads/2026/07/Solar-Coaster-Intro-1.png" },
  { id: "3506-solarcoasterbook", slug: "the-talent-bottleneck-ep-45", category: "Solar", title: "The Talent Bottleneck – EP 45", img: "https://solarcoasterbook.com/wp-content/uploads/2026/07/Solar-Coaster-Intro.png" },
  { id: "3496-solarcoasterbook", slug: "why-safe-harbor-and-domestic-content-are-reshaping-solar-finance", category: "Solar", title: "Why Safe Harbor and Domestic Content Are Reshaping Solar Finance – EP 44", img: "https://solarcoasterbook.com/wp-content/uploads/2026/06/Solar-Coaster-Intro-4.png" },
  { id: "3485-solarcoasterbook", slug: "the-solar-afterlife-what-happens-when-solar-farms-retire-ep-43", category: "Solar", title: "The Solar Afterlife: What Happens When Solar Farms Retire? – EP 43", img: "https://solarcoasterbook.com/wp-content/uploads/2026/06/Solar-Coaster-Intro-3.png" },
  { id: "3480-solarcoasterbook", slug: "made-in-america-the-solar-supply-chain-revolution-ep-42", category: "Solar", title: "Made in America: The Solar Supply Chain Revolution – EP 42", img: "https://solarcoasterbook.com/wp-content/uploads/2026/06/Solar-Coaster-Intro-2.png" },
  { id: "3475-solarcoasterbook", slug: "renewable-energys-new-reality-share-the-risk-or-miss-the-opportunity-ep-41", category: "Solar", title: "Renewable Energy’s New Reality: Share the Risk or Miss the Opportunity – EP 41", img: "https://solarcoasterbook.com/wp-content/uploads/2026/06/Solar-Coaster-Intro-1.png" },
  { id: "3470-solarcoasterbook", slug: "the-great-energy-divide-why-oil-volatility-is-accelerating-the-solar-revolution-ep-40", category: "Solar", title: "The Great Energy Divide: Why Oil Volatility Is Accelerating the Solar Revolution – EP 40", img: "https://solarcoasterbook.com/wp-content/uploads/2026/06/Solar-Coaster-Intro.png" },
  { id: "3457-solarcoasterbook", slug: "the-silent-saboteur-why-solar-is-really-a-30-year-bet-ep-39", category: "Solar", title: "The Silent Saboteur: Why Solar Is Really a 30-Year Bet – EP 39", img: "https://solarcoasterbook.com/wp-content/uploads/2026/05/Solar-Coaster-Intro-3.png" },
  { id: "3456-solarcoasterbook", slug: "the-solar-paradox-why-infrastructure-will-define-the-next-decade-ep-38", category: "Solar", title: "The Solar Paradox: Why Infrastructure Will Define the Next Decade – Ep 38", img: "https://solarcoasterbook.com/wp-content/uploads/2026/05/Solar-Coaster-Intro-2.png" },
  { id: "3455-solarcoasterbook", slug: "the-invisible-architects-behind-the-solar-revolution-ep-37", category: "Solar", title: "The Invisible Architects Behind the Solar Revolution – EP 37", img: "https://solarcoasterbook.com/wp-content/uploads/2026/05/Solar-Coaster-Intro-1.png" },
]

/* ---------- CASE STUDIES ---------- */
const CS_LOREM = 'We partnered end to end — strategy, brand, build, and growth — aligning every touchpoint around a single, measurable goal. From positioning and design system to a fast, SEO-ready site and an always-on acquisition engine, the work was built to convert and to scale.'

export const CASE_STUDIES = [
  {
    slug: 'wolf-river-construction',
    title: 'Wolf River Construction',
    tags: ['Branding', 'Web Development', 'WordPress', 'GoHighLevel', 'PostGrid'],
    excerpt: 'A Midwest roofing and exterior-renovation contractor rebranded and rebuilt on WordPress — with an interactive roofing calculator feeding an automated GoHighLevel and PostGrid follow-up engine.',
    cover: '/case-studies/wolf-river-construction/cover.png',
    description: 'Wolf River Construction is a Midwest roofing and exterior-renovation company that needed a digital presence as dependable as its craftsmanship. We built a bold, high-contrast brand and a conversion-focused WordPress site — anchored by an interactive roofing calculator and clear paths to a free quote — that positions Wolf River as a premium, GAF Master Elite contractor across residential, commercial, and solar work.\n\nBehind the scenes, we wired the site into GoHighLevel so every lead flows straight into an automated follow-up pipeline, and integrated PostGrid to trigger direct-mail outreach without manual effort. The result is a marketing engine that captures homeowners at the moment of intent and keeps Wolf River in front of them across both digital and print.',
    images: ['/case-studies/wolf-river-construction/1.png', '/case-studies/wolf-river-construction/2.png', '/case-studies/wolf-river-construction/3.png', '/case-studies/wolf-river-construction/4.png', '/case-studies/wolf-river-construction/5.png'],
  },
  {
    slug: 'northwind-saas',
    title: 'Northwind SaaS',
    tags: ['Web Design', 'SEO', 'Programmatic'],
    excerpt: 'A B2B SaaS marketing site rebuilt for speed and search — paired with an always-on programmatic engine.',
    cover: '/case-studies/northwind-saas/cover.svg',
    description: 'NORTHWIND is a B2B SaaS platform that needed a marketing site to match its ambition.\n\n' + CS_LOREM,
    images: ['/case-studies/northwind-saas/1.svg', '/case-studies/northwind-saas/2.svg', '/case-studies/northwind-saas/3.svg', '/case-studies/northwind-saas/4.svg'],
  },
  {
    slug: 'lumen-solar',
    title: 'Lumen Solar',
    tags: ['Brand Creation', 'Web Development', 'Paid Social'],
    excerpt: 'A solar installer relaunched with a clean identity, a lead-gen site, and a paid social program that fills the pipeline.',
    cover: '/case-studies/lumen-solar/cover.svg',
    description: 'LUMEN SOLAR came to us to stand out in a crowded, fast-moving market.\n\n' + CS_LOREM,
    images: ['/case-studies/lumen-solar/1.svg', '/case-studies/lumen-solar/2.svg', '/case-studies/lumen-solar/3.svg', '/case-studies/lumen-solar/4.svg'],
  },
  {
    slug: 'meridian-health',
    title: 'Meridian Health',
    tags: ['UX/UI', 'Technology Consulting', 'SEO'],
    excerpt: 'A healthcare platform redesigned around patient clarity, accessibility, and organic discoverability.',
    cover: '/case-studies/meridian-health/cover.svg',
    description: 'MERIDIAN HEALTH needed a digital experience patients could trust at a glance.\n\n' + CS_LOREM,
    images: ['/case-studies/meridian-health/1.svg', '/case-studies/meridian-health/2.svg', '/case-studies/meridian-health/3.svg', '/case-studies/meridian-health/4.svg'],
  },
  {
    slug: 'cobalt-fintech',
    title: 'Cobalt Fintech',
    tags: ['Brand Building', 'SEM', 'Analytics'],
    excerpt: 'A fintech challenger positioned for its Series B — full rebrand, performance search, and a measurement stack that proves ROI.',
    cover: '/case-studies/cobalt-fintech/cover.svg',
    description: 'COBALT is a fintech challenger that needed to look and perform like a category leader.\n\n' + CS_LOREM,
    images: ['/case-studies/cobalt-fintech/1.svg', '/case-studies/cobalt-fintech/2.svg', '/case-studies/cobalt-fintech/3.svg', '/case-studies/cobalt-fintech/4.svg'],
  },
  {
    slug: 'harbor-retail',
    title: 'Harbor Retail',
    tags: ['Traditional Full Service', 'Social Media', 'Web'],
    excerpt: 'An omnichannel retail brand unified across print, broadcast, social, and a conversion-focused storefront.',
    cover: '/case-studies/harbor-retail/cover.svg',
    description: 'HARBOR RETAIL wanted one coherent brand across every channel its customers touch.\n\n' + CS_LOREM,
    images: ['/case-studies/harbor-retail/1.svg', '/case-studies/harbor-retail/2.svg', '/case-studies/harbor-retail/3.svg', '/case-studies/harbor-retail/4.svg'],
  },
]
