"use client";

import { useEffect } from "react";
import { site, type HeadlineVariant } from "@/config/site";
import { track } from "@/lib/analytics";

export function ExperimentBeacon({ variant }: { variant: HeadlineVariant }) {
  useEffect(() => {
    track(site.analytics.events.headlineView, {
      experiment: site.experiment.id,
      variant,
    });
  }, [variant]);

  return null;
}
