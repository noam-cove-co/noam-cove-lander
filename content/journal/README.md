# Cove Journal

Drop a Markdown file here to publish (or draft) a Journal piece.

## Front matter

```yaml
---
title: Your headline
slug: your-url-slug
status: published   # or draft
category: Product   # Press | Product | Studio | Notes
publishedAt: 2026-10-06
updatedAt: 2026-10-06
author: NOAM Co.
dek: One short standfirst under the headline.
dateline: Yorkshire, UK   # optional
---
```

Body supports headings, paragraphs, **bold**, *italic*, links, and blockquotes.

Drafts stay off the public index and sitemap. The whole Journal surface is currently **hidden** (`site.journalPublic: false` in `src/config/site.ts`): routes 404 and are omitted from nav, sitemap, and robots. When that flag is true, published pieces appear at `/journal/<slug>`.
