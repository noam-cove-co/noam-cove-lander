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

## Analytics

Set `NEXT_PUBLIC_MIXPANEL_TOKEN` if you want events sent to Mixpanel. Without a token, events stay in the browser console during development.

`NEXT_PUBLIC_SITE_URL` sets the canonical site URL used for metadata. It defaults to `http://127.0.0.1:4317`.
