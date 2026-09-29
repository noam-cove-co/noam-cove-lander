import type { Metadata } from "next";
import { LanesPlay } from "@/components/lanes-play";
import { Pipeline } from "@/components/pipeline";
import { QuizBanner } from "@/components/quiz-banner";
import { UseCases } from "@/components/use-cases";

export const metadata: Metadata = {
  title: "How Cove works",
  description:
    "Same cloud drive, different folders. See the work it holds, and how far the Mac app has come.",
};

export default function HowPage() {
  return (
    <main>
      <LanesPlay className="pt-28 sm:pt-36" />
      <QuizBanner />
      <UseCases />
      <Pipeline />
    </main>
  );
}
