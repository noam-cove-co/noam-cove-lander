# Cove social + B2B content desk

Managed by two Cursor project skills (see `.cursor/agents/README.md`):

1. **cove-social-executive** — Social Media Executive + B2B copywrite manager (posts, press, blogs, calendars)
2. **cove-week1-social-pack** — regenerates `week-1/` post files from campaign assets only

## Layout

```
docs/social/
  VOICE.md
  _templates/          post + press templates
  week-1/              first approval pack (12 posts + calendar)
  press/               press releases
  blog/                long-form drafts
  b2b/                 (optional) founder notes, sales one-pagers
```

## Status field

Every post/press/blog file uses YAML `status`:

| Value | Meaning |
| --- | --- |
| `draft` | Agent or human wrote it; not cleared |
| `approved` | Human signed off |
| `scheduled` | In Buffer/Later/native |
| `published` | Live |

Agents always leave new work as `draft`.

## Run again

In Cursor:

- “Follow the cove-social-executive skill. Draft a LinkedIn carousel script for own-drive.”
- “Run the cove-week1-social-pack skill and refresh week-1 from current PNGs.”
