"use client";

import { site } from "@/config/site";
import { useWaitlist } from "@/components/waitlist";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

export function JoinButton({
  ios = false,
  label = site.campaign.cta,
  variant = "default",
  className,
}: {
  ios?: boolean;
  label?: string;
  variant?: "default" | "outline" | "ghost";
  className?: string;
}) {
  const { openWaitlist } = useWaitlist();
  return (
    <Button
      type="button"
      variant={variant}
      onClick={() => openWaitlist(ios ? { ios: true } : undefined)}
      className={cn("h-12 rounded-full px-6 text-[15px]", className)}
    >
      {label}
    </Button>
  );
}
