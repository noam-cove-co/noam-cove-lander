/**
 * Look familiar? multi-step education → signup funnel.
 * Entry: /land/out-of-space (paid “Look familiar?” creatives).
 * Convert: /land/join-the-list (existing waitlist page).
 */

export const LOOK_FAMILIAR_FUNNEL = "look-familiar";

export type FunnelStepId = "pain" | "drive" | "desk" | "proof" | "list";

export type FunnelStep = {
  id: FunnelStepId;
  label: string;
  /** Path for education steps; list uses the existing join page. */
  path: string;
  title: string;
  description: string;
  /** Primary continue CTA copy on this step (n/a on list). */
  nextLabel?: string;
};

export const lookFamiliarSteps: FunnelStep[] = [
  {
    id: "pain",
    label: "Pain",
    path: "/land/out-of-space",
    title: "Look familiar? The Mac is full again",
    description:
      "The work got heavy. The laptop stayed the same size. Cove is your own cloud drive, on your Mac.",
    nextLabel: "Continue: there’s another drive",
  },
  {
    id: "drive",
    label: "Drive",
    path: "/land/out-of-space/drive",
    title: "Your own cloud drive, on your Mac",
    description: "One click. Cove shows up under Locations. The heavy files stay in the cloud.",
    nextLabel: "See it on a desk like mine",
  },
  {
    id: "desk",
    label: "Desk",
    path: "/land/out-of-space/desk",
    title: "Same product. Different libraries.",
    description: "Pick the desk that looks like yours. Cove is still just a drive on the Mac.",
    nextLabel: "How a seat opens",
  },
  {
    id: "proof",
    label: "Proof",
    path: "/land/out-of-space/proof",
    title: "People wrote back.",
    description: "From the private beta: a real email, and desks that stopped buying little drives.",
    nextLabel: "Join the private beta",
  },
  {
    id: "list",
    label: "List",
    path: "/land/join-the-list",
    title: "Join the Cove private beta",
    description: "Join the waitlist. Invite friends to climb the list. Your own cloud drive, on your Mac.",
  },
];

export function funnelStepById(id: FunnelStepId) {
  return lookFamiliarSteps.find((step) => step.id === id);
}

export function funnelStepIndex(id: FunnelStepId) {
  return lookFamiliarSteps.findIndex((step) => step.id === id);
}

export function nextFunnelStep(id: FunnelStepId) {
  const index = funnelStepIndex(id);
  if (index < 0 || index >= lookFamiliarSteps.length - 1) return null;
  return lookFamiliarSteps[index + 1];
}

export function prevFunnelStep(id: FunnelStepId) {
  const index = funnelStepIndex(id);
  if (index <= 0) return null;
  return lookFamiliarSteps[index - 1];
}

export const funnelDesks = [
  {
    id: "home",
    persona: "At home",
    headline: "Dads keep the family films here.",
    body: "Not in a drawer. Not on a full laptop. On a drive that simply shows up under Locations.",
    volume: "Family",
    siteDeskId: "home",
  },
  {
    id: "marketing",
    persona: "Marketing",
    headline: "The campaign on one drive the whole desk can open.",
    body: "Briefs, selects, the cut, the masters. Same folders on every Mac. No more which-drive emails.",
    volume: "Spring campaign",
    siteDeskId: "marketing",
  },
  {
    id: "studio",
    persona: "Studio",
    headline: "Sessions and rushes. Still just a drive.",
    body: "Logic, Premiere, Capture One open the work as if it were plugged in. The heavy files stay in the cloud.",
    volume: "Studio",
    siteDeskId: "studio",
  },
  {
    id: "agents",
    persona: "Agents",
    headline: "The repo lives on the drive. So does the agent.",
    body: "Point the copilot at Cove. The project has a home that is not the system disk.",
    volume: "florist-shop",
    siteDeskId: "agents",
  },
] as const;

export type FunnelDeskId = (typeof funnelDesks)[number]["id"];

export const DESK_STORAGE_KEY = "cove_funnel_desk";
