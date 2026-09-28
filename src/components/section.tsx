import { cn } from "cn";

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28", className)}>
      {children}
    </section>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.72rem] font-medium tracking-[0.22em] text-cove uppercase">{children}</p>
  );
}
