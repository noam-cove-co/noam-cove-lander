# Meta creative briefs (phase 0)

Produce against these briefs with existing PNGs first. When `ARCADS_BASIC_AUTH` is set, generate variants via ArcAds skills and drop outputs under `tools/arcads-claude-code/outputs/` (gitignored) or `public/campaign/` after human QA.

## CB-01 — Stays light hero (feed 1:1 / 4:5)

- **Job:** Comprehension + waitlist
- **Visual:** Mac-forward product still; green Cove accent; quiet paper/ink palette
- **On-image text (max 5 words):** The Mac that stays light
- **Existing art:** `public/campaign/own-drive/od-fb-product.png`, `od-ig-hero-cta.png`, `od-og-hero-cta.png`
- **ArcAds next:** `chatgpt-image-ad` or `nano-banana-image-ad` using Apple Notes / editorial hero templates from the 37-template library; brand from MASTER_CONTEXT
- **Landing:** `/land/stays-light` or waitlist
- **Copy body id:** `body-stays-light`

## CB-02 — Look familiar (feed + story)

- **Job:** Pattern interrupt for storage-full Mac owners
- **Visual:** Nearly-full disk energy; scrappy or broadsheet campaign language already in out-of-space kit
- **On-image text:** Look familiar?
- **Existing art:** `public/campaign/out-of-space/`
- **ArcAds next:** UGC-style Seedance still→video of someone glancing at About This Mac storage (no fake OS chrome that violates platform rules; prefer illustrated/own art)
- **Landing:** `/land/out-of-space`
- **Copy body id:** `body-look-familiar`

## CB-03 — Finder mount proof

- **Job:** Show the product behaviour
- **Visual:** Finder sidebar / Locations cue from Cove demo stills (no deceptive Apple UI claims)
- **Existing art:** `od-ig-always.png`, story click assets
- **ArcAds next:** Premium product reveal (no person) via Seedance formulas in `arcads-external-api`
- **Landing:** `/land/own-drive`
- **Copy body id:** `body-finder`

## CB-04 — Desk split (carousel)

- **Job:** Same product, four desks
- **Cards:** Home · Marketing · Studio · Agents
- **Source copy:** `site.desks` / campaign land pages
- **ArcAds next:** four stills with locked palette; optional claymation/pixar only if brand wants playful (default: quiet stills)
- **Landing:** waitlist with `utm_content=desk-<id>`

## CB-05 — Maker strip (low weight)

- **Job:** Trust / craft
- **Line:** Crafted by NOAM Co.
- **Use:** Remarketing later; light prospecting only

## Production checklist

- [ ] British English; no em dashes
- [ ] Safe zone for profile bubble / UI chrome on Meta
- [ ] Export @2x where possible (campaign export script already uses `deviceScaleFactor: 2`)
- [ ] Human visual QA (hands, text, false Apple UI)
- [ ] File naming: `cove-meta-<angle>-<format>-vN.ext`
- [ ] Log winners in Postiz + this folder when testing starts
