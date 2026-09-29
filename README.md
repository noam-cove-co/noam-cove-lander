# Cove

Your own cloud drive. It lives in the cloud, and it shows up on your Mac in one click.

Cove is a private-beta product from **NOAM Co.** (NOAM Consultancy), a small studio in Yorkshire. The Mac app mounts a dedicated cloud drive beside Macintosh HD. iPhone is marked as coming soon.

This repository is the marketing site: the landing page, Why Cove?, the studio page, the waitlist, and Mt. Mtn., the dark navy range for organisations.

## Run it

```bash
npm install
npm run dev
```

The site runs at [http://127.0.0.1:4317](http://127.0.0.1:4317).

## What’s on the site

- A landing page in plain language: yours, in the cloud, on your Mac.
- An interactive preview. Pick a desk (home, marketing, studio, agents) and show the drive.
- A “who it’s for” section that keeps the product the same and changes the words: family photos and videos, a campaign, a studio, or a repo an AI agent is writing.
- A private-beta waitlist, an Add to Home Screen prompt, and a studio page.
- [Why Cove?](http://127.0.0.1:4317/why), a short comparison with external SSDs, iCloud, Drive, OneDrive, and a VPS.
- [Mt. Mtn.](http://127.0.0.1:4317/mt), the enterprise range. Same one-click mount, at mountain scale, in a dark navy invert of the Cove site. Enquiries are stored with the waitlist under the source `mt-mtn`.
- [Your room](http://127.0.0.1:4317/room), a short setup: pick a desk, slide the work against the Mac you have, and join the beta. Past 50 TB the same screen becomes Mt. Mtn.

## Content, campaigns, and experiments

All public copy lives in [`src/config/site.ts`](src/config/site.ts). That file is the content surface a later studio backend can edit:

- `campaign` switches the private beta and the call to action.
- `campaignOptions` lists the other modes (including a public release) without rewriting pages.
- `experiment` holds the homepage headline test. The active line is `experiment.active`. Add `?v=b` to preview the other line.
- `desks` is where language changes by audience.
- `analytics.events` names the Mixpanel events.

Waitlist notes are written to `data/waitlist.json` (gitignored) by `POST /api/waitlist`.

## Marketing funnel

Two campaign land pages (bare chrome, Mixpanel + UTM ready):

- [`/land/own-drive`](http://127.0.0.1:4317/land/own-drive) — product awareness
- [`/land/join-the-list`](http://127.0.0.1:4317/land/join-the-list) — waitlist + referral ladder
- [`/land/out-of-space`](http://127.0.0.1:4317/land/out-of-space) — Look familiar? one-page pain journey (scroll)
- [`/land/look-familiar`](http://127.0.0.1:4317/land/look-familiar) — classic print-ad mini page
- [`/land/stays-light`](http://127.0.0.1:4317/land/stays-light) — classy multi-step product funnel (Light → Presence → Libraries → Craft → List)

Campaign creatives live under [`/internal/campaign`](http://127.0.0.1:4317/internal/campaign) (noindex). PNGs are in `public/campaign/`.

Pass UTMs on any URL (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, plus `ref` for invites). Attribution is stored in `localStorage` / cookie and attached to Mixpanel events and waitlist rows.

### Waitlist storage

`POST /api/waitlist` writes to **Vercel Redis** when `KV_REST_API_URL` + `KV_REST_API_TOKEN` (or Upstash `UPSTASH_REDIS_*`) are set. Otherwise it falls back to `data/waitlist.json` (gitignored).

`GET /api/waitlist/leaderboard` returns the invite ladder for the land page.

### Analytics

Set `NEXT_PUBLIC_MIXPANEL_TOKEN` to send events to Mixpanel. Without a token, events log to the browser console in development.

Event names live in `site.analytics.events` (`Land Page Viewed`, `Waitlist Joined`, `Invite Copied`, `Attribution Captured`, …).

`NEXT_PUBLIC_SITE_URL` sets the canonical site URL used for metadata. It defaults to `https://cove.will.me.uk`. **Set this on Vercel production** so OG tags never resolve to localhost. Main OG image is forced absolute: `https://cove.will.me.uk/campaign/own-drive/od-og-hero-cta.png`.

Generative SEO: [`/llms.txt`](http://127.0.0.1:4317/llms.txt), [`/llms-full.txt`](http://127.0.0.1:4317/llms-full.txt), [`/sitemap.xml`](http://127.0.0.1:4317/sitemap.xml). Growth notes: [`docs/marketing-growth.md`](docs/marketing-growth.md).

### Journal

[The Cove Journal](http://127.0.0.1:4317/journal) is the press / blog surface: masthead, breadcrumbs, byline, published/updated dates, reading time, and a green ink scroll line.

Publish by adding Markdown under [`content/journal/`](content/journal/) with front matter (`status: published`). See that folder’s README for the schema. Drafts stay off the public index and sitemap.

### Social + B2B agents

- Skill **cove-social-executive**: Social Media Executive + B2B copy (press, blogs, LinkedIn, IG, X) → [`docs/social/`](docs/social/)
- Skill **cove-week1-social-pack**: writes approval-only post files → [`docs/social/week-1/`](docs/social/week-1/)
- How to invoke: [`.cursor/agents/README.md`](.cursor/agents/README.md)

### Paid media (Claude Ads)

Claude Ads is installed as the paid-ads agent (read-only / draft-only by default).

- Project skills: `.cursor/skills/ads` and `ads-*`
- Cove entry agent: [`.cursor/agents/cove-ads.md`](.cursor/agents/cove-ads.md)
- Setup + brand profile: [`.claude-ads/`](.claude-ads/)
- Install / commands: [`docs/claude-ads.md`](docs/claude-ads.md)
- Re-clone upstream locally under `tools/claude-ads` (gitignored); see [`tools/README.md`](tools/README.md)

Campaign PNGs in `public/campaign/` are exported at **@2x** (`deviceScaleFactor: 2` in `scripts/export-campaign-creatives.mjs`).

Copy `.env.example` to `.env.local` for local secrets.
