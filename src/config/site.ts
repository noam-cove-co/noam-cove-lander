/**
 * Cove marketing content.
 *
 * The studio backend should edit this file: copy, campaign, the headline
 * experiment, and analytics event names. Pages read it. They do not keep
 * their own campaign copy.
 *
 * Public language stays plain: your own cloud drive, kept in the cloud,
 * showing up on your Mac. Specialist words live on each desk in `desks`.
 */

export const roles = [
  { id: "home", label: "Home & family" },
  { id: "marketing", label: "Marketing" },
  { id: "music", label: "Music" },
  { id: "photo", label: "Photography" },
  { id: "video", label: "Video" },
  { id: "agents", label: "Building with agents" },
  { id: "other", label: "Something else" },
] as const;

export const macs = [
  { id: "air", label: "MacBook Air" },
  { id: "pro", label: "MacBook Pro" },
  { id: "studio", label: "Mac Studio" },
  { id: "mini", label: "Mac mini" },
  { id: "none", label: "Not a Mac yet" },
] as const;

export type RoleId = (typeof roles)[number]["id"];
export type MacId = (typeof macs)[number]["id"];
export type HeadlineVariant = "a" | "b";

const file = {
  doc: "doc",
  folder: "folder",
  cut: "cut",
  photo: "photo",
  film: "film",
  code: "code",
} as const;

export type FileKind = (typeof file)[keyof typeof file];

export const site = {
  product: "Cove",
  company: "NOAM Co.",
  companyLong: "NOAM Consultancy",
  studio: "Yorkshire",
  email: "studio@noam.co",
  description:
    "Cove is your own cloud drive. One click, and it shows up on your Mac. The files stay in the cloud. Crafted by NOAM Co.",

  campaign: {
    id: "founding-beta",
    name: "Founding beta",
    publicRelease: false,
    badge: "Private beta",
    cta: "Join the waitlist",
    downloadUrl: null as string | null,
  },

  campaignOptions: [
    {
      id: "founding-beta",
      name: "Founding beta",
      publicRelease: false,
      cta: "Join the waitlist",
    },
    {
      id: "public-launch",
      name: "Public release",
      publicRelease: true,
      cta: "Download for Mac",
    },
  ],

  experiment: {
    id: "hero-headline-001",
    active: "a" as HeadlineVariant,
    variants: {
      a: {
        before: "Your own cloud drive, ",
        accent: "on your Mac",
        after: " in one click.",
      },
      b: {
        before: "A cloud drive that shows up ",
        accent: "like it was always there.",
        after: "",
      },
    },
  },

  analytics: {
    provider: "mixpanel" as const,
    tokenEnv: "NEXT_PUBLIC_MIXPANEL_TOKEN",
    events: {
      headlineView: "Headline Viewed",
      mountDemo: "Drive Shown",
      waitlistJoined: "Waitlist Joined",
      installPrompt: "Add To Home Screen",
    },
  },

  nav: [
    { href: "/#product", label: "Product" },
    { href: "/why", label: "Why Cove?" },
    { href: "/#audiences", label: "Who it’s for" },
    { href: "/#reviews", label: "Notes" },
    { href: "/team", label: "Studio" },
    { href: "/mt", label: "Mt. Mtn." },
    { href: "/download", label: "Download" },
  ],

  range: {
    path: "/mt",
    name: "Mt. Mtn.",
    spoken: "Mount Mountain",
    kicker: "The range",
    title: "Cove, at the size of a mountain.",
    lede: "Same gesture. You mount a drive on the Mac. This one is dedicated, shared across an organisation, and rather larger than a laptop can hold.",
    nameNote:
      "Mt. for mount. Mtn. for mountain. You mount it, and the capacity is the point. The short name is deliberate. The long version is a specification.",
    gesture: {
      title: "Still one click.",
      body: "It shows up under Locations, beside Macintosh HD, like Cove. The difference is what is behind the click: a drive kept for your organisation, not a corner of a shared cloud.",
    },
    specs: [
      { label: "Capacity", value: "From 50 TB, and on into petabytes." },
      { label: "Mount", value: "One click on the Macs that should see it. The same path for all of them." },
      { label: "Who", value: "A floor, a company, an archive. People, machines, and the agents working with them." },
      { label: "Throughput", value: "Built for rushes, libraries, and repos that do not like to wait." },
      { label: "Governance", value: "Who mounted it, from which machine, and what they opened." },
      { label: "Care", value: "A person at NOAM Co. You are not writing to a queue." },
    ],
    desks: [
      { name: "Archives and broadcasters", body: "Years of film, not a folder that syncs when it feels like it." },
      { name: "Agencies", body: "Several teams, one mountain, the campaign still a drive on each Mac." },
      { name: "Labels and post", body: "Sessions and masters with somewhere serious to live." },
      { name: "Agent desks", body: "When the repos and the transcripts outgrow the laptop, they still need a real path." },
    ],
    aside: "The family album is Cove. Mt. Mtn. is for when the work has become a landscape.",
    enquire: {
      title: "Tell us the size of it.",
      body: "No public download. Write with the rough capacity and who would mount it. The studio reads every note.",
    },
  },

  hero: {
    eyebrow: "Private beta for Mac",
    sub: "Click once and Cove appears on your Mac, next to your other drives. Photos, videos, a campaign, or a whole project open in the apps you already have. The files themselves stay in the cloud.",
    secondaryCta: "See it on a Mac",
    platforms: "On the Mac today. iPhone, when it’s ready.",
  },

  beats: [
    {
      title: "Yours",
      body: "A drive with your name on it. Not a pile of links, and not the Mac’s own disk.",
    },
    {
      title: "In the cloud",
      body: "The photos, films, and projects live there. Your Mac does not have to hold them all.",
    },
    {
      title: "On your Mac",
      body: "One click, and the drive shows up, ready to open. Like a drive you plugged in.",
    },
  ],

  disciplines: [
    "Your own cloud drive",
    "Shows up on your Mac",
    "Lives in the cloud",
    "Family photos",
    "Marketing teams",
    "Studios",
    "Agent developers",
  ],

  problem: {
    kicker: "The Mac, lately",
    title: "The work got heavy. The laptop stayed the same size.",
    items: [
      {
        title: "Little hard drives",
        body: "Holiday videos and client files end up in a bag, a drawer, or on somebody else’s desk.",
      },
      {
        title: "Links that expire",
        body: "A review link does its job, then dies on a Friday while the notes are still being written.",
      },
      {
        title: "One small disk",
        body: "Family films, a campaign, and a project should not have to share 256 gigabytes.",
      },
    ],
  },

  journey: {
    id: "product",
    kicker: "How it sits on a Mac",
    title: "One click, then it is simply a drive.",
    steps: [
      {
        index: "01",
        title: "Name your drive",
        body: "Family. Spring campaign. The florist’s website. Give it a name people will say out loud, and a size you can grow.",
      },
      {
        index: "02",
        title: "It shows up on your Mac",
        body: "One click. Cove appears under Locations, beside Macintosh HD. People who build software call this mounting. On the Mac, it simply shows up.",
      },
      {
        index: "03",
        title: "Open it like any other drive",
        body: "Photos, Finder, Premiere, Logic, Cursor. They see a normal drive. What you open comes from the cloud as you need it.",
      },
      {
        index: "04",
        title: "The heavy files stay in the cloud",
        body: "A library can be enormous. The Mac stays light, until you choose to keep a copy of something close.",
      },
    ],
  },

  workflow: {
    kicker: "Same drive, different folders",
    title: "A family album and a project can share the shape.",
    caption:
      "The drive on the Mac does not care what you call the folders. Photos, a campaign, or an agent’s notes. One click either way.",
    lanes: [
      {
        desk: "At home",
        items: ["Summer holiday", "School play.mov", "Favourites"],
      },
      {
        desk: "Marketing",
        items: ["Brief", "The cut", "Masters"],
      },
      {
        desk: "With an agent",
        items: ["The repo", "Notes", "Transcripts"],
      },
    ],
  },

  audiences: {
    id: "audiences",
    kicker: "Who it’s for",
    title: "One drive. The words change with the work.",
    intro:
      "Cove is your own cloud drive, kept in the cloud, and mounted on your Mac in one click. Built first for marketing teams. The same drive holds a family’s photos and videos, or the repo an AI agent is building with you.",
  },

  desks: [
    {
      id: "home",
      label: "At home",
      badge: "",
      title: "Years of photos and videos, without filling the Mac.",
      body: "Holiday films, school plays, the folder the phone keeps filling. Cove is a cloud drive you open on your Mac. The pictures stay in the cloud. The laptop just shows them. A brother can open the same drive and find Christmas without a link.",
      say: "At home there is nothing to learn. It is a drive for the family’s photos and videos.",
      terms: [
        { word: "Drive", means: "The place the photos live, sitting on your Mac after one click." },
        { word: "In the cloud", means: "Kept for you, so the laptop does not have to store every film." },
        { word: "Album", means: "A folder. Summer. Christmas. The dog." },
      ],
      volume: "Family",
      cloudSize: "2.4 TB of photos and videos",
      onMac: "Almost nothing on this Mac",
      files: [
        { name: "Summer holiday", meta: "1,204 photos", kind: file.folder },
        { name: "Beach.jpg", meta: "18 MB", kind: file.photo },
        { name: "School play.mov", meta: "4.6 GB", kind: file.film },
        { name: "Grandma’s birthday", meta: "86 videos", kind: file.folder },
        { name: "Christmas.mov", meta: "8.1 GB", kind: file.film },
        { name: "Favourites", meta: "40 photos", kind: file.folder },
      ],
    },
    {
      id: "marketing",
      label: "Marketing",
      badge: "First seats",
      title: "The campaign, on one drive the whole team can open.",
      body: "Decks, cuts, brand kits, and the seventeenth version of a banner. Each person shows the same cloud drive on their own Mac. The producer on a train and the editor in the studio open the same folders.",
      say: "With a team we say mount, because every Mac shows the same drive.",
      terms: [
        { word: "Mount", means: "One click, and the shared cloud drive appears on your Mac." },
        { word: "Campaign", means: "The job, in one place, rather than four." },
        { word: "Masters", means: "The finished files. Not a link that expires on Friday." },
      ],
      volume: "Spring campaign",
      cloudSize: "186 GB of campaign files",
      onMac: "Almost nothing on this Mac",
      files: [
        { name: "spring-brief.pdf", meta: "2.4 MB", kind: file.doc },
        { name: "01-selects", meta: "842 files", kind: file.folder },
        { name: "hero-30.prproj", meta: "186 MB", kind: file.cut },
        { name: "masters", meta: "Ready", kind: file.folder },
        { name: "brand-kit", meta: "Folder", kind: file.folder },
        { name: "banner-v17.png", meta: "6.2 MB", kind: file.photo },
      ],
    },
    {
      id: "studio",
      label: "Studio",
      badge: "",
      title: "Sessions, photographs, and cuts. Still just a drive.",
      body: "For producers, photographers, and editors, Cove replaces the drive you used to carry. Logic, Capture One, Premiere, and Final Cut open the work as if it were plugged in. The heavy files stay in the cloud.",
      say: "In the studio the words get specific. The thing on the Mac is still a drive.",
      terms: [
        { word: "Selects", means: "The photographs you actually kept." },
        { word: "Session", means: "The song, with its stems, opening in Logic." },
        { word: "Cut", means: "The film, opened in the app you already use." },
      ],
      volume: "Studio",
      cloudSize: "640 GB of sessions and rushes",
      onMac: "Almost nothing on this Mac",
      files: [
        { name: "album-two", meta: "Session", kind: file.folder },
        { name: "selects", meta: "Raws", kind: file.folder },
        { name: "hero-cut.prproj", meta: "220 MB", kind: file.cut },
        { name: "mixes", meta: "Today", kind: file.folder },
        { name: "stems", meta: "Folder", kind: file.folder },
        { name: "contact-sheet.jpg", meta: "14 MB", kind: file.photo },
      ],
    },
    {
      id: "agents",
      label: "Agents",
      badge: "New",
      title: "A cloud drive for the repo, and for the agent beside you.",
      body: "If you build websites with AI agents, Cove does not become a different product. It is still your cloud drive, mounted on the Mac. Point Cursor, Claude, or a copilot at it. The repo, the notes, and the agent’s transcripts have a home that is not the system disk.",
      say: "Here the words are technical, on purpose. Mount means the cloud drive appears on the Mac, so you and the agent share a path.",
      terms: [
        { word: "Mount", means: "The cloud drive shows up on the Mac as a real drive." },
        { word: "Repo", means: "The project, living on Cove rather than on the laptop’s disk." },
        { word: "Agent", means: "Your copilot reads and writes the same files you do." },
      ],
      volume: "florist-shop",
      cloudSize: "48 GB of project files",
      onMac: "Almost nothing on this Mac",
      files: [
        { name: "florist", meta: "Repo", kind: file.folder },
        { name: "page.tsx", meta: "8 KB", kind: file.code },
        { name: "voice.md", meta: "Today", kind: file.doc },
        { name: "transcript.json", meta: "12 MB", kind: file.code },
        { name: "design", meta: "Folder", kind: file.folder },
      ],
    },
  ],

  reviews: {
    id: "reviews",
    kicker: "From the private beta",
    title: "People wrote back.",
    annotation: "This is a real note we got",
    featured: {
      to: "Noam",
      from: "Helen Park",
      role: "Keeping the family videos",
      subject: "the holiday videos finally have a home",
      initials: "HP",
      paragraphs: [
        "Noam —",
        "I put ten years of family videos on Cove and opened them on the MacBook Air. They show up like a drive. They do not fill the laptop. My brother put the same drive on his Mac and found the Christmas film without me sending a link.",
        "I have stopped buying the little hard drives that live in the kitchen drawer.",
        "Helen",
      ],
      aside:
        "Helen was too kind. The little hard drives are still in a drawer in Leeds. That is the product.",
    },
    quotes: [
      {
        quote:
          "The spring campaign used to live in four places. Now it is one cloud drive the freelancer and the editor both open on their Macs. I have stopped answering which folder.",
        name: "Jonah Adeyemi",
        role: "Head of Brand, Halden & Co",
      },
      {
        quote:
          "I showed Cove on the M3 Air and opened last month’s photographs on the train. Nothing copied. The laptop did not get hot. We cancelled the second shuttle drive.",
        name: "Mara Ellison",
        role: "Producer, Northline",
      },
      {
        quote:
          "Logic treated the session as if the drive was inside the Mac. It is in the cloud. I checked twice, and then I wrote the chorus.",
        name: "Ellis Ward",
        role: "Music producer",
      },
      {
        quote:
          "I pointed the agent at the drive and it read the repo without me dragging the project onto the laptop. Same cloud drive as my photos. Different folders.",
        name: "Priya Raman",
        role: "Builds websites with AI agents",
      },
    ],
  },

  platforms: {
    title: "Mac first. The phone, in time.",
    macos: {
      name: "Mac",
      status: "Private beta",
      detail: "Air, Pro, Studio, and Mac mini. One click, and your cloud drive shows up.",
    },
    ios: {
      name: "iPhone",
      status: "Coming soon",
      detail: "Look at the same drive from your pocket. Not in this beta. Leave a note and the studio will write when it is real.",
    },
  },

  faq: {
    title: "Questions, in plain words.",
    items: [
      {
        q: "What is Cove?",
        a: "Your own cloud drive. The files live in the cloud. One click, and the drive shows up on your Mac, ready to open like any other drive.",
      },
      {
        q: "Who is it for?",
        a: "Marketing teams are the first seats. It is the same drive at home, for years of photos and videos, and for someone building a website with an AI agent who wants the repo off the laptop’s disk. The click does not change. The folders do.",
      },
      {
        q: "Can I download it?",
        a: "Not publicly. The Mac app is in a private beta, and the list is how a seat opens. iPhone is still to come.",
      },
      {
        q: "Will it fill my Mac?",
        a: "The drive can be vast, because it lives in the cloud. Your Mac opens what you ask for. A MacBook Air can show a library that would never have fitted on its own disk.",
      },
      {
        q: "Which apps does it open with?",
        a: "If an app can open a file from a drive you plugged in, it can open it from Cove. Photos, Finder, Premiere, Final Cut, Logic, Capture One, Cursor, and the agents you already run.",
      },
      {
        q: "Who makes it?",
        a: "NOAM Co., a small consultancy in Yorkshire. Cove is the product. The studio stays small on purpose.",
      },
    ],
  },

  close: {
    title: "Ready when your Mac is.",
    body: "Public release is closed. Join the list and the studio will write when a seat opens for the Mac drive.",
  },

  download: {
    title: "The Mac drive is in a private beta.",
    body: "Public release is waitlisted. Leave your name, and the kind of work the drive is for. We write once, from the studio, when a seat opens.",
    includes: [
      "Your own cloud drive, with a name you choose",
      "One click, and it shows up on your Mac",
      "The same drive a teammate or your family can open",
      "A letter back from a person at NOAM Co.",
    ],
  },

  team: {
    title: "A small studio in Yorkshire.",
    body: "NOAM Consultancy makes Cove. The mark is a monogram. The product is a cloud drive for your Mac. The rose in the footer is the only map we need.",
    letter: [
      "Cove started because the Mac was full. Family videos, a client’s campaign, a project an agent was writing: all of them wanted a home, and every workaround made the desk noisier.",
      "I wanted one kind of thing. Your own drive. Living in the cloud. Showing up on the Mac in one click, in the apps already there.",
      "NOAM Co. will stay small. If you write, a person reads it.",
    ],
    sign: "Noam",
    role: "Founder, NOAM Co.",
    principles: [
      {
        title: "Monogram",
        body: "Traditional on the outside. A seal, a quiet colour, a rose kept in the footer.",
      },
      {
        title: "A real drive",
        body: "Modern where it counts. A cloud drive your Mac already knows how to open.",
      },
      {
        title: "Plain words",
        body: "Families hear photos and videos. Teams hear a campaign. Agent developers hear a repo. Same click.",
      },
    ],
  },

  why: {
    kicker: "Why Cove?",
    title: "A drive. Not a brick, a cupboard, or a server.",
    lede: "There are plenty of places to put a file. Very few of them are a drive on your Mac.",
    chapters: [
      {
        index: "01",
        name: "The external SSD",
        headline: "Fast. Also losable.",
        lines: [
          "An external drive is a marvellous bit of kit.",
          "It is also a thing you can leave in the other bag, the other city, the other person’s shoot.",
          "It fills up. It fails. It does not come with you on the train unless you remembered it.",
          "Cove is the drive, without the brick.",
        ],
      },
      {
        index: "02",
        name: "iCloud",
        headline: "A library is not a drive.",
        lines: [
          "iCloud is a fine cupboard for the photos and documents Apple already understands.",
          "It is not a volume Premiere, Logic, Capture One, or an agent can simply open.",
          "Sync keeps a copy. Cove is the place.",
        ],
      },
      {
        index: "03",
        name: "Drive, OneDrive, and a VPS",
        headline: "Useful. Not a drive.",
        lines: [
          "Google Drive, OneDrive, Dropbox: lovely for a document, a shared folder, a link.",
          "A bit hopeless when the work is a film, a session, or a repo an agent is writing into.",
          "A VPS is the other road. You can mount one. You are then minding a computer.",
          "Cove is one click. The files stay in the cloud. The Mac just sees a drive.",
        ],
      },
    ],
    columns: ["", "External SSD", "iCloud", "Drive & OneDrive", "A VPS", "Cove"],
    rows: [
      ["Where it lives", "In your bag", "In Apple’s cloud", "In their cloud", "On a server you rent", "In your cloud drive"],
      ["On the Mac", "If you brought it", "As a library", "As a sync folder", "If you set it up", "One click"],
      ["Opens in your apps", "Yes", "Sometimes", "Sometimes", "Yes, after a faff", "Yes"],
      ["You carry it", "Yes", "No", "No", "No", "No"],
      ["Someone else, same work", "Hand it over", "A shared album", "A shared folder", "Share the machine", "They mount it too"],
    ],
    close: ["Cove.", "Your own cloud drive.", "On your Mac."],
  },

  footer: {
    note: "Private beta. Your own cloud drive, on your Mac. iPhone coming.",
  },
};

export function headlineFor(variant: HeadlineVariant) {
  return site.experiment.variants[variant];
}

export function resolveHeadline(value: string | string[] | undefined): HeadlineVariant {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "a" || raw === "b") return raw;
  return site.experiment.active;
}
