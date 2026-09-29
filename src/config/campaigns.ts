/**
 * Cove marketing campaign kit.
 *
 * Funnel campaigns:
 * - own-drive: product awareness
 * - join-the-list: waitlist conversion
 * - out-of-space: disk-full pain (Look familiar?) + classic print cuts
 *
 * Creatives follow a print-ad grammar: generous air, one line that lands,
 * small Cove lockup | plus product-UI, hero-wash, scrappy, and broadsheet cuts.
 */

export type CreativeTone = "paper" | "ink" | "mist" | "void";

export type CreativeLayout =
  | "print"
  | "leaderboard"
  | "void-logo"
  | "hero-cta"
  | "product-ui"
  | "scrappy"
  | "broadsheet";

export type CreativeFormat =
  | "og"
  | "linkedin-og"
  | "facebook-feed"
  | "instagram-square"
  | "instagram-portrait"
  | "instagram-story"
  | "poster"
  | "linkedin-square";

export type LeaderboardRow = {
  rank: number;
  name: string;
  invites: number;
  you?: boolean;
};

export type CreativeSpec = {
  id: string;
  format: CreativeFormat;
  label: string;
  width: number;
  height: number;
  tone: CreativeTone;
  layout?: CreativeLayout;
  /** Large serif line: the ad. */
  /** Optional marker scribble (Caveat), e.g. Look familiar? */
  scribble?: string;
  /** Small persona line for broadsheet / scrappy cuts. */
  persona?: string;
  headline: string;
  /** Optional second line in the same serif voice. */
  line?: string;
  /** Small sans support. */
  support?: string;
  /** Bottom-right or footer cue. */
  cue?: string;
  /** Accent word inside headline rendered in cove green when set. */
  accent?: string;
  /** Blue CTA label (hero-cta / product-ui). */
  cta?: string;
  /** Leaderboard rows for referral creatives. */
  board?: LeaderboardRow[];
};

export type CampaignDef = {
  id: string;
  name: string;
  purpose: "awareness" | "waitlist" | "pain";
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
    layout: partial.layout ?? "print",
    ...partial,
  };
}

const referralBoard: LeaderboardRow[] = [
  { rank: 1, name: "Amelia K.", invites: 14 },
  { rank: 2, name: "James R.", invites: 11 },
  { rank: 3, name: "You", invites: 9, you: true },
  { rank: 4, name: "Priya S.", invites: 7 },
  { rank: 5, name: "Tom H.", invites: 6 },
];

export const campaigns: CampaignDef[] = [
  {
    id: "own-drive",
    name: "Own Drive",
    purpose: "awareness",
    landSlug: "own-drive",
    summary:
      "Product awareness. Print-ad quiet, plus hero-wash and product-UI cuts that reuse the lander Finder stage and blue Try CTA.",
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
      // Product UI + blue CTA + hero wash
      creative("og", {
        id: "od-og-hero-cta",
        layout: "hero-cta",
        tone: "paper",
        headline: "Your own cloud drive, on your Mac.",
        support: "One click. It shows up in Finder.",
        cta: "Try on this Mac",
        cue: "Private beta",
      }),
      creative("instagram-square", {
        id: "od-ig-hero-cta",
        layout: "hero-cta",
        tone: "paper",
        headline: "On your Mac in one click.",
        support: "Cove · your own cloud drive",
        cta: "Try on this Mac",
        cue: "noam.co",
      }),
      creative("instagram-portrait", {
        id: "od-ig-product",
        layout: "product-ui",
        tone: "paper",
        headline: "Same cloud drive. On this Mac.",
        support: "Show it in Finder. The heavy files leave the laptop.",
        cta: "Try on this Mac",
        cue: "Cove",
      }),
      creative("facebook-feed", {
        id: "od-fb-product",
        layout: "product-ui",
        tone: "paper",
        headline: "It shows up like a normal drive.",
        support: "Cove under Locations. Zero KB on this Mac until you open something.",
        cta: "Try on this Mac",
        cue: "Private beta",
      }),
      creative("linkedin-og", {
        id: "od-li-hero",
        layout: "hero-cta",
        tone: "paper",
        headline: "A drive that simply shows up.",
        support: "Built for Mac. Kept in the cloud.",
        cta: "Try on this Mac",
        cue: "Cove · NOAM Co.",
      }),
      creative("poster", {
        id: "od-poster-product",
        layout: "product-ui",
        tone: "paper",
        headline: "One click. Then Finder.",
        support: "Your own cloud drive: the lander, as an ad.",
        cta: "Try on this Mac",
        cue: "Yorkshire",
      }),
    ],
  },
  {
    id: "join-the-list",
    name: "Join the List",
    purpose: "waitlist",
    landSlug: "join-the-list",
    summary:
      "Waitlist conversion. Quiet ask, plus black premium void-logo set and a referral leaderboard: invite someone, climb the list.",
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
      // Black premium void-logo
      creative("og", {
        id: "jl-og-void",
        layout: "void-logo",
        tone: "void",
        headline: "Private beta.",
        line: "Join the list.",
        support: "Your own cloud drive, on your Mac.",
        cue: "Cove",
      }),
      creative("instagram-square", {
        id: "jl-ig-void",
        layout: "void-logo",
        tone: "void",
        headline: "A seat opens.",
        line: "We write.",
        support: "Cove · waitlist",
        cue: "NOAM Co.",
      }),
      creative("instagram-story", {
        id: "jl-story-void",
        layout: "void-logo",
        tone: "void",
        headline: "Not public.",
        line: "Not yet.",
        support: "Join the private beta list.",
        cue: "Join →",
      }),
      creative("poster", {
        id: "jl-poster-void",
        layout: "void-logo",
        tone: "void",
        headline: "The list is the door.",
        support: "Cove · private beta · Yorkshire",
        cue: "noam.co",
      }),
      // Referral leaderboard
      creative("og", {
        id: "jl-og-board",
        layout: "leaderboard",
        tone: "paper",
        headline: "Invite someone. Climb the list.",
        support: "Each invite moves you up. Seats open from the top.",
        cue: "Private beta",
        board: referralBoard,
      }),
      creative("instagram-square", {
        id: "jl-ig-board",
        layout: "leaderboard",
        tone: "mist",
        headline: "You’re number three.",
        line: "One more invite.",
        support: "Refer a friend. Move up the waitlist.",
        cue: "Cove",
        board: referralBoard,
      }),
      creative("instagram-portrait", {
        id: "jl-ig-board-tall",
        layout: "leaderboard",
        tone: "paper",
        headline: "The list has a ladder.",
        support: "Invite. Climb. Get in sooner.",
        cue: "Join the list",
        board: referralBoard,
      }),
      creative("facebook-feed", {
        id: "jl-fb-board",
        layout: "leaderboard",
        tone: "ink",
        headline: "Referrals move the queue.",
        support: "Share Cove. Jump the waitlist.",
        cue: "Private beta",
        board: referralBoard,
      }),
      creative("linkedin-square", {
        id: "jl-li-board",
        layout: "leaderboard",
        tone: "void",
        headline: "Climb with an invite.",
        support: "Cove waitlist · seats from the top",
        cue: "NOAM Co.",
        board: referralBoard,
      }),
    ],
  },
  {
    id: "out-of-space",
    name: "Out of Space",
    purpose: "pain",
    landSlug: "out-of-space",
    summary:
      "The biggest Cove pain: the Mac is full, the work is not. Scrappy Look familiar? cuts for Meta, plus Rolex / Porsche / New Balance broadsheet ads. One-pager: /land/out-of-space. Print desk: /land/look-familiar. Classy multi-step: /land/stays-light.",
    defaultUtm: {
      source: "paid",
      medium: "social",
      campaign: "out-of-space",
    },
    creatives: [
      // Scrappy funnel ads
      creative("og", {
        id: "oos-og-familiar",
        layout: "scrappy",
        tone: "paper",
        scribble: "Look familiar?",
        headline: "11 GB left. Again.",
        support: "Family film, a campaign, and a project. One small disk.",
        persona: "Every desk",
        cue: "Cove",
        cta: "Get the drive",
      }),
      creative("instagram-square", {
        id: "oos-ig-sound",
        layout: "scrappy",
        tone: "paper",
        scribble: "Sound familiar?",
        headline: "The work got bigger. The disk did not.",
        support: "Your Mac stays light. The library lives in Cove.",
        persona: "Marketing",
        cue: "Private beta",
        cta: "Try on this Mac",
      }),
      creative("instagram-portrait", {
        id: "oos-ig-full",
        layout: "scrappy",
        tone: "mist",
        scribble: "This disk",
        headline: "Nearly full. Still.",
        line: "Cove is the other drive.",
        support: "One click. It shows up in Finder.",
        persona: "At home",
        cue: "Yorkshire",
        cta: "Join the list",
      }),
      creative("facebook-feed", {
        id: "oos-fb-256",
        layout: "scrappy",
        tone: "ink",
        scribble: "256 GB",
        headline: "Not enough for what you actually want to do.",
        support: "A cloud drive on your Mac. The heavy files leave the laptop.",
        persona: "Studio",
        cue: "Cove",
        cta: "Get more room",
      }),
      creative("instagram-story", {
        id: "oos-story-drawer",
        layout: "scrappy",
        tone: "paper",
        scribble: "The drawer of drives",
        headline: "You already know this feeling.",
        line: "There is a better drive.",
        support: "Cove | your own cloud drive, on your Mac",
        cue: "Swipe for the list",
        cta: "Join the list",
      }),
      creative("poster", {
        id: "oos-poster-heavy",
        layout: "scrappy",
        tone: "paper",
        scribble: "Look familiar?",
        headline: "The work got heavy. The laptop stayed the same size.",
        support: "Cove mounts a cloud drive beside Macintosh HD.",
        persona: "Agents & desks",
        cue: "NOAM Co.",
        cta: "Try on this Mac",
      }),
      // Classic print / broadsheet
      creative("og", {
        id: "oos-og-rolex",
        layout: "broadsheet",
        tone: "paper",
        headline: "The Mac that stays light.",
        support: "A cloud drive, shown in Finder. The library does not live on the system disk.",
        persona: "For people who fill a Mac every year",
        cue: "Cove",
      }),
      creative("instagram-square", {
        id: "oos-ig-nb",
        layout: "broadsheet",
        tone: "paper",
        headline: "Dads keep the family films here.",
        support: "Not in a drawer. Not on a full laptop. On a drive that simply shows up.",
        persona: "At home",
        cue: "Cove | private beta",
      }),
      creative("linkedin-og", {
        id: "oos-li-porsche",
        layout: "broadsheet",
        tone: "ink",
        headline: "Performance is nothing without room.",
        support: "Mount Cove. Keep the campaign, the cut, and the masters off the laptop.",
        persona: "Marketing & post",
        cue: "NOAM Co. | Yorkshire",
      }),
      creative("poster", {
        id: "oos-poster-ralph",
        layout: "broadsheet",
        tone: "paper",
        headline: "Quiet confidence. Loud libraries.",
        support: "Your own cloud drive, on your Mac in one click. Crafted for desks that outgrew 256 GB.",
        persona: "Studio",
        cue: "Cove",
      }),
      creative("instagram-portrait", {
        id: "oos-ig-news",
        layout: "broadsheet",
        tone: "paper",
        headline: "Full again?",
        line: "There is another drive.",
        support: "Cove appears under Locations. The heavy files stay in the cloud.",
        persona: "Building with agents",
        cue: "Join the list",
      }),
      creative("facebook-feed", {
        id: "oos-fb-news",
        layout: "broadsheet",
        tone: "mist",
        headline: "Enough space to do the work.",
        support: "Not another browser folder. A drive. On the Mac.",
        persona: "Every desk",
        cue: "Cove",
      }),
      creative("linkedin-square", {
        id: "oos-li-square",
        layout: "broadsheet",
        tone: "paper",
        headline: "The disk is not the limit.",
        support: "Cove | private beta for Mac",
        persona: "Founding seats",
        cue: "noam.co",
      }),
      creative("instagram-story", {
        id: "oos-story-print",
        layout: "broadsheet",
        tone: "ink",
        headline: "Look familiar?",
        line: "Then try Cove.",
        support: "Your own cloud drive. One click onto the Mac.",
        cue: "Private beta",
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
