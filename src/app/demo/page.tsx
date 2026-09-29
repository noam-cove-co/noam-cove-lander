import type { Metadata } from "next";
import { DemoSwitcher } from "@/components/demo-switcher";

export const metadata: Metadata = {
  title: "Demo",
  description: "See Cove mount on a Mac, then switch to Mt. Mtn. for the organisation-sized drive.",
};

export default function DemoPage() {
  return (
    <main>
      <DemoSwitcher />
    </main>
  );
}
