import { resolveHeadline } from "@/config/site";
import { Audiences } from "@/components/audiences";
import { BeatsPlay } from "@/components/beats-play";
import { ExperimentBeacon } from "@/components/experiment-beacon";
import { Hero } from "@/components/hero";
import { Close, Faq, Platforms } from "@/components/home-sections";
import { JourneyPlay } from "@/components/journey-play";
import { ProblemPlays } from "@/components/problem-plays";
import { JoinSection } from "@/components/join-section";
import { Reviews } from "@/components/reviews";
import { RoomInvite } from "@/components/room-invite";

export default async function Page({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const variant = resolveHeadline(params.v);

  return (
    <>
      <ExperimentBeacon variant={variant} />
      <Hero variant={variant} />
      <BeatsPlay />
      <ProblemPlays />
      <RoomInvite />
      <JourneyPlay />
      <Audiences />
      <Reviews />
      <Platforms />
      <Faq />
      <JoinSection />
      <Close />
    </>
  );
}
