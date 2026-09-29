/**
 * Cove marketing campaign kit.
 *
 * Two funnel campaigns for the next release:
 * - own-drive: product awareness
 * - join-the-list: waitlist conversion
 *
 * Creatives follow a print-ad grammar: generous air, one line that lands,
 * small Cove lockup. Instrument Serif + Sans, paper / ink / cove green only.
 */

export type CreativeTone = "paper" | "ink" | "mist";

export type CreativeFormat =
  | "og"
  | "linkedin-og"
  | "facebook-feed"
  | "instagram-square"
  | "instagram-portrait"
  | "instagram-story"
  | "poster"
  | "linkedin-square";

export type CreativeSpec = {
  id: string;
  format: CreativeFormat;
  label: string;
  width: number;
  height: number;
  tone: CreativeTone;
  /** Large serif line — the ad. */
  headline: string;
  /** Optional second line in the same serif voice. */
  line?: string;
  /** Small sans support. */
  support?: string;
  /** Bottom-right or footer cue. */
  cue?: string;
  /** Accent word inside headline rendered in cove green when set. */
  accent?: string;
};

export type CampaignDef = {
  id: string;
  name: string;
  purpose: "awareness" | "waitlist";
  /** Future /land/[slug] page. */
  landSlug: string;
  summary: string;
  defaultUtm: {
    source: string;
    medium: string;
    campaign: string;
  };
  creatives: CreativeSpec[];
};

const sizes = {
  og: { width: 1200, height: 630, label: "Open Graph · 1200×630" },
  "linkedin-og": { width: 1200, height: 627, label: "LinkedIn · 1200×627" },
  "facebook-feed": { width: 1200, height: 628, label: "Facebook feed · 1200×628" },
  "instagram-square": { width: 1080, height: 1080, label: "Instagram / Facebook square · 1080×1080" },
  "instagram-portrait": { width: 1080, height: 1350, label: "Instagram portrait · 1080×1350" },
  "instagram-story": { width: 1080, height: 1920, label: "Stories / Reels · 1080×1920" },
  poster: { width: 1080, height: 1520, label: "Poster · 1080×1520" },
  "linkedin-square": { width: 1080, height: 1080, label: "LinkedIn square · 1080×1080" },
} as const;

function creative(
  format: CreativeFormat,
  partial: Omit<CreativeSpec, "format" | "width" | "height" | "label"> & { label?: string },
): CreativeSpec {
  const size = sizes[format];
  return {
    format,
    width: size.width,
    height: size.height,
    label: partial.label ?? size.label,
    ...partial,
  };
}

export const campaigns: CampaignDef[] = [
  {
    id: "own-drive",
    name: "Own Drive",
    purpose: "awareness",
    landSlug: "own-drive",
    summary:
      "Product awareness. Print-ad quiet: one truth about Cove, then the mark. For Meta, LinkedIn, and link previews.",
    defaultUtm: {
      source: "paid",
      medium: "social",
      campaign: "own-drive",
    },
    creatives: [
      creative("og", {
        id: "od-og-always",
        tone: "paper",
        headline: "A cloud drive that shows up like it was always there.",
        support: "Cove · your own cloud drive, on your Mac",
        cue: "noam.co",
      }),
      creative("linkedin-og", {
        id: "od-li-light",
        tone: "paper",
        headline: "Your Mac stays light.",
        line: "The library doesn’t.",
        support: "Cove · one click, and the drive shows up in Finder",
        cue: "Private beta",
      }),
      creative("facebook-feed", {
        id: "od-fb-heavy",
        tone: "ink",
        headline: "The heavy files left the laptop.",
        support: "Your own cloud drive. On your Mac in one click.",
        cue: "Cove",
      }),
      creative("instagram-square", {
        id: "od-ig-ohio",
        tone: "paper",
        headline: "Dads keep the family films here.",
        support: "Cove · a drive that simply shows up",
        cue: "Yorkshire",
      }),
      creative("instagram-portrait", {
        id: "od-ig-always",
        tone: "mist",
        headline: "Like it was always there.",
        support: "Your own cloud drive, on your Mac.",
        cue: "Cove",
      }),
      creative("instagram-story", {
        id: "od-story-click",
        tone: "ink",
        headline: "One click.",
        line: "Then it is simply a drive.",
        support: "Cove · private beta",
        cue: "Swipe up later. For now: the list.",
      }),
      creative("poster", {
        id: "od-poster-own",
        tone: "paper",
        headline: "Your own cloud drive,",
        line: "on your Mac.",
        accent: "on your Mac.",
        support: "One click. The files stay in the cloud.",
        cue: "Cove · NOAM Co.",
      }),
      creative("linkedin-square", {
        id: "od-li-square",
        tone: "paper",
        headline: "Not another folder in the browser.",
        line: "A drive. On the Mac.",
        support: "Cove · crafted by NOAM Co.",
        cue: "Private beta",
      }),
    ],
  },
  {
    id: "join-the-list",
    name: "Join the List",
    purpose: "waitlist",
    landSlug: "join-the-list",
    summary:
      "Waitlist conversion. Same quiet voice, clearer ask: join the private beta. For ads that end on /land/join-the-list.",
    defaultUtm: {
      source: "paid",
      medium: "social",
      campaign: "join-the-list",
    },
    creatives: [
      creative("og", {
        id: "jl-og-seat",
        tone: "paper",
        headline: "A seat on the private beta.",
        line: "When one opens, we write.",
        support: "Cove · join the waitlist",
        cue: "noam.co",
      }),
      creative("linkedin-og", {
        id: "jl-li-reserved",
        tone: "mist",
        headline: "Your own cloud drive.",
        line: "Reserved.",
        support: "Private beta for Mac. Join the list.",
        cue: "Cove",
      }),
      creative("facebook-feed", {
        id: "jl-fb-write",
        tone: "ink",
        headline: "We’ll write when a seat opens.",
        support: "Cove · private beta waitlist",
        cue: "Join the list",
      }),
      creative("instagram-square", {
        id: "jl-ig-list",
        tone: "paper",
        headline: "Join the list.",
        line: "Keep the Mac light.",
        support: "Your own cloud drive, when it’s ready for you.",
        cue: "Private beta",
      }),
      creative("instagram-portrait", {
        id: "jl-ig-click",
        tone: "paper",
        headline: "One click onto your Mac.",
        line: "First: the list.",
        support: "Cove private beta",
        cue: "NOAM Co. · Yorkshire",
      }),
      creative("instagram-story", {
        id: "jl-story-beta",
        tone: "ink",
        headline: "Private beta.",
        line: "Not a launch party.",
        support: "A drive for people who are already full.",
        cue: "Join the list →",
      }),
      creative("poster", {
        id: "jl-poster-wait",
        tone: "paper",
        headline: "The waitlist is the door.",
        support: "Cove · your own cloud drive, on your Mac",
        cue: "Join · noam.co",
      }),
      creative("linkedin-square", {
        id: "jl-li-square",
        tone: "mist",
        headline: "Leave the disk light.",
        line: "Join the list.",
        support: "Cove private beta · Mac first",
        cue: "NOAM Co.",
      }),
    ],
  },
];

export function campaignById(id: string) {
  return campaigns.find((campaign) => campaign.id === id);
}

export function allCampaignIds() {
  return campaigns.map((campaign) => campaign.id);
}
