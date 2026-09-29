import { JoinButton } from "@/components/join-button";

export function WaitlistStrip() {
  return (
    <section aria-label="Join the waitlist" className="border-t border-foreground/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <p className="text-sm leading-snug text-foreground">The private beta opens from the list.</p>
        <JoinButton className="h-8 rounded-md px-3.5 text-sm" />
      </div>
    </section>
  );
}
