## CAN Channels — Beta Overview

- **Live beta URL**: `https://canchannels-beta.vercel.app/`
- **Status**: Public beta. Core experience is live; additional features are being rolled out continuously.

### What’s live today
- **Modern, responsive UI** with Malayalam font support and dark/light themes
- **Homepage** with hero, highlights, and a stream of posts
- **Content detail view** for reading individual stories
- **Cookie preferences** and consent management
- **Admin dashboard** to add/edit/delete posts, mark featured, and manage advertisements
- **Ad banner slots** with a working placeholder and space for partner creatives

### Upcoming features and changes (in active development)
- **Category-based filtering (priority)**
  - Filter posts by category directly on the homepage and listing pages
  - Categories used across the site: `Can News`, `Can Cinema`, `Can Exclusive`
  - URL-based filters and shareable links (e.g., `/content?category=cinema`)

- **Dedicated sections per category**
  - Separate, curated sections and landing pages for each: `Can Exclusive`, `Can News`, `Can Cinema`
  - Section-specific hero, highlights, and quick filters
  - Consistent breadcrumbs and navigational tabs

- **QuickPop notifications**
  - Lightweight, non-intrusive pop-ups to announce breaking posts or premieres
  - Optional social triggers: show “New Release” notices when new videos/posts are published on client social handles (YouTube/Instagram/Facebook)
  - User controlled (respect cookie consent) with simple mute/dismiss actions

- **Design improvements**
  - Refined header/navigation with clearer information hierarchy and sticky behavior
  - Section cards with improved readability, image aspect-ratio handling, and hover states
  - **Micro‑interactions**: subtle shadows, scale/opacity, and easing for hover/focus
  - **Button animations**: pulse on load, ripple/press feedback, and disabled/loading states
  - Consistent spacing, color tokens, and typography scale tuned for Malayalam content

- **Advertise with us — lead form**
  - Prominent “Advertise” CTA opens a form/modal
  - Fields: business name, contact, campaign goal, budget range, creative link/upload, consent
  - Saves to backend and triggers email/Discord notification for the sales team
  - Basic spam protection and input validation

- **Content authoring upgrades**
  - Draft/publish workflow with preview links
  - Scheduled publishing and featured pinning windows
  - Richer metadata: keywords, tags, canonical URL, and OG image helpers

- **Performance and SEO**
  - Image optimization and lazy loading for banners and cards
  - Pre-rendered meta for key pages and structured data (Article/NewsArticle)
  - Caching strategy and Lighthouse tuning for Core Web Vitals

- **Accessibility and localization**
  - Keyboard navigation and ARIA labels for interactive elements
  - High-contrast theme checks and focus states
  - Copy reviewed for Malayalam typography and line-height legibility

- **Analytics and privacy**
  - Privacy-friendly analytics with clear cookie categories
  - Opt-in measurement integrated with the existing Cookie Preferences panel

- **Admin and roles**
  - Role-based access (Admin, Moderator, Editor)
  - Advertisement manager and placements, including upload and scheduling
  - Sub-admin manager and granular permissions

### Known beta limitations
- Content is sample/demo in parts until the initial editorial import is complete
- Some navigation items are placeholders while category pages are finalized
- Direct social media sync for QuickPop is staged behind a feature flag during testing

### How you can review and give feedback
- Browse the beta at `https://canchannels-beta.vercel.app/`
- Share page URLs and screenshots for any issue, along with device and browser
- Prioritize notes about category behavior, layout spacing, and ad placement

### Delivery notes
- Features are rolling out in weekly increments. Category filtering and dedicated category sections are prioritized first, followed by the Advertise form and QuickPop notifications.

If you need any changes prioritized (e.g., a specific category landing page or animation style), let us know and we can reshuffle the order accordingly.


