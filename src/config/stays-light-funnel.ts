/**
 * “The Mac that stays light” — classy product-awareness funnel → waitlist.
 * Distinct from the scrappy Look familiar? / out-of-space one-pager.
 * Tone: Rolex / Porsche / Ralph Lauren print quiet. Convert: /land/join-the-list.
 */

export const STAYS_LIGHT_FUNNEL = "stays-light";

export type StaysLightStepId = "manifesto" | "presence" | "libraries" | "craft" | "list";

export type StaysLightStep = {
  id: StaysLightStepId;
  label: string;
  path: string;
  title: string;
  description: string;
  nextLabel?: string;
  og: string;
};

export const staysLightSteps: StaysLightStep[] = [
  {
    id: "manifesto",
    label: "Light",
    path: "/land/stays-light",
    title: "The Mac that stays light.",
    description:
      "A cloud drive, shown in Finder. The library does not live on the system disk. Private beta from NOAM Co.",
    nextLabel: "See it appear",
    og: "/campaign/out-of-space/oos-og-rolex.png",
  },
  {
    id: "presence",
    label: "Presence",
    path: "/land/stays-light/presence",
    title: "It simply shows up.",
    description: "One click under Locations. Beside Macintosh HD. The files stay in the cloud.",
    nextLabel: "Open a library",
    og: "/campaign/own-drive/od-og-hero-cta.png",
  },
  {
    id: "libraries",
    label: "Libraries",
    path: "/land/stays-light/libraries",
    title: "Quiet confidence. Loud libraries.",
    description: "Family film, a campaign, a studio, a repo. Same drive. Different rooms.",
    nextLabel: "The house behind it",
    og: "/campaign/out-of-space/oos-poster-ralph.png",
  },
  {
    id: "craft",
    label: "Craft",
    path: "/land/stays-light/craft",
    title: "Crafted by NOAM Co.",
    description: "NOAM Co. A small consultancy. A private beta that opens from the list.",
    nextLabel: "Reserve a seat",
    og: "/campaign/join-the-list/jl-og-seat.png",
  },
  {
    id: "list",
    label: "Seat",
    path: "/land/join-the-list",
    title: "Join the Cove private beta",
    description: "Join the waitlist. Invite friends to climb the list.",
    og: "/campaign/join-the-list/jl-og-void.png",
  },
];

export function staysLightStepById(id: StaysLightStepId) {
  return staysLightSteps.find((step) => step.id === id);
}

export function staysLightStepIndex(id: StaysLightStepId) {
  return staysLightSteps.findIndex((step) => step.id === id);
}

export function nextStaysLightStep(id: StaysLightStepId) {
  const index = staysLightStepIndex(id);
  if (index < 0 || index >= staysLightSteps.length - 1) return null;
  return staysLightSteps[index + 1];
}

export function prevStaysLightStep(id: StaysLightStepId) {
  const index = staysLightStepIndex(id);
  if (index <= 0) return null;
  return staysLightSteps[index - 1];
}
