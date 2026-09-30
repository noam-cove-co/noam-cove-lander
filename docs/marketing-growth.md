# Cove marketing growth — SEO, AEO, social

## Production OG status (checked 2026-09-29)

**Broken on live today.** `https://getcove.cloud` still emits:

```
og:image → http://127.0.0.1:4317/opengraph-image?...
twitter:image → http://127.0.0.1:4317/twitter-image?...
```

Cause: production is on a **stale deploy** that still had Next’s file-based `opengraph-image` route (resolves to request host / bad localhost). Main already removed those routes and points at the campaign PNG.

Also: live PNG is still **1200×630 @1x**; main has **@2x 2400×1260**.

**Fix:** redeploy main to Vercel with `NEXT_PUBLIC_SITE_URL=https://getcove.cloud`. After deploy, verify:

```bash
curl -s https://getcove.cloud/ | rg 'og:image|twitter:image'
# expect: https://getcove.cloud/campaign/own-drive/od-og-hero-cta.png
```

Then refresh Facebook Sharing Debugger / LinkedIn Post Inspector / X Card Validator once.

---

## SEO (classic)

Shipped / shipping in repo:

- Absolute OG + Twitter images
- `keywords`, canonical, `robots` with sitemap host
- `/sitemap.xml` for core + funnel URLs
- `/robots.txt` allowing public pages; disallow `/internal`, `/api`
- Strong title/description on land pages

Next (human + Search Console):

1. Google Search Console + Bing Webmaster on `getcove.cloud`
2. Submit sitemap
3. One indexable pillar page per intent (already: `/`, `/why`, `/how`, waitlist)
4. Keep British English; one H1; FAQ schema on `/why` later if useful
5. Do **not** index `/internal/*` or the bare `/land` index

Primary phrases to own:

- cloud drive for Mac / Mac cloud drive in Finder  
- mount cloud drive Mac  
- MacBook storage full / private cloud drive Mac  
- Cove NOAM / cloud drive Yorkshire  

---

## Generative SEO + AEO

**llms.txt** (shipped):

- https://getcove.cloud/llms.txt — short machine brief  
- https://getcove.cloud/llms-full.txt — Q&A + cite URLs  

AEO habits (answer-engine optimisation):

- Lead pages with a crisp definition (“Cove is…”) in the first screen  
- FAQ blocks with real questions people ask ChatGPT/Perplexity  
- Consistent entity: Cove · NOAM Co. · Yorkshire · Mac · Finder Locations  
- Prefer quotable one-liners from broadsheet ads (“The Mac that stays light.”)  
- Keep `llms.txt` updated when product facts change  

Measure: brand queries, citations in Perplexity/ChatGPT (manual), referral traffic labeled `utm_source=llm` on any shared answer links.

---

## Social plan (LinkedIn + X primary; Instagram supporting)

**Primary acquisition levers:** LinkedIn and X. See [`docs/growth/linkedin-x-primary.md`](growth/linkedin-x-primary.md). Instagram supports creative; Meta paid stays phase-0 offline until budget.

### Roles

| Channel | Job | Cadence (start) |
| --- | --- | --- |
| LinkedIn (**primary**) | Credibility + waitlist for marketing/studio desks | 3 posts / week |
| X (**primary**) | Sharp hooks + Mac/maker discourse | 5–7 short posts / week |
| Instagram (supporting) | Visual product (Finder UI, print ads @2x) | 2–3 posts / week when art is ready |

### Pillars (rotate)

1. **Recognition** — Look familiar? / nearly full disk (scrappy cuts)  
2. **Class** — Rolex-quiet lines from Stays Light / broadsheet  
3. **Product proof** — Finder under Locations, zero KB until open  
4. **Craft** — NOAM Co., Yorkshire, private beta  
5. **Social proof** — Helen email / desk quotes (with permission framing)  

Always one CTA: Try demo → join list. UTMs: `utm_source=linkedin|instagram|x&utm_campaign=stays-light|out-of-space&utm_content=…`

### Asset sources already in repo

- `public/campaign/out-of-space/*` — pain + print  
- `public/campaign/own-drive/*` — product UI  
- `public/campaign/join-the-list/*` — waitlist / void  
- Land URLs: `/land/stays-light`, `/land/out-of-space`, `/land/join-the-list`

---

## Should a Claude / Cursor agent *run* social?

**Draft and pack, don’t autopilot post.**

Use an agent to:

- Pull approved lines from `site.ts` + campaign creatives  
- Produce weekly calendars (caption + asset path + UTM link + alt text)  
- Resize/export reminders from `/internal/campaign`  
- Adapt one creative across LinkedIn / IG / X formats  

Do **not** give an agent unattended posting keys at this stage:

- Brand voice and legal (testimonials) need a human gate  
- Platform APIs + rate limits + “why was this deleted” risk  
- Paid amplification still needs judgment  

Practical loop:

1. Human sets weekly pillar + offer  
2. Agent drafts 7–12 posts into `docs/social/` or a Notion/Sheet  
3. Human edits + approves  
4. Schedule in Buffer / Later / native schedulers  
5. Agent summarises performance notes weekly (from exported CSV), not live replies  

### Agents (built)

| Skill | Path | Job |
| --- | --- | --- |
| Social Media Executive + B2B copy | `.cursor/skills/cove-social-executive/` | LinkedIn, IG, X, press, blogs |
| Week-1 social pack | `.cursor/skills/cove-week1-social-pack/` | Writes `docs/social/week-1/` only |
| Claude Ads (paid media) | `.cursor/skills/ads/` + `.cursor/agents/cove-ads.md` | Audits, plans, creative, draft launch/optimise, monitor, report |

Week-1 pack is already generated under [`docs/social/week-1/`](../docs/social/week-1/). Approve → schedule. Do not autopost.

Claude Ads profile and commands: [`docs/claude-ads.md`](claude-ads.md). Cove setup is draft-only until dated platform exports and budget exist; no live account writes by default.

---

## Immediate checklist

1. Redeploy production from `main`  
2. Set `NEXT_PUBLIC_SITE_URL=https://getcove.cloud` on Vercel  
3. Confirm OG absolute URL + @2x PNG live  
4. Submit sitemap in Search Console  
5. Approve `docs/social/week-1/` posts and schedule  
6. Supply Meta / Google / LinkedIn exports (or account IDs) and run `/ads plan` then `/ads create` for founding-beta waitlist  
