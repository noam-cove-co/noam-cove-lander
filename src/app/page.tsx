import { resolveHeadline } from "@/config/site";
import { Audiences } from "@/components/audiences";
import { BeatsPlay } from "@/components/beats-play";
import { ExperimentBeacon } from "@/components/experiment-beacon";
import { Hero } from "@/components/hero";
import { Close, Faq, Marquee, Platforms } from "@/components/home-sections";
import { JourneyPlay } from "@/components/journey-play";
import { LanesPlay } from "@/components/lanes-play";
import { ProblemPlays } from "@/components/problem-plays";
import { Reviews } from "@/components/reviews";
import { RoomInvite } from "@/components/room-invite";

export default async function Page({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const variant = resolveHeadline(params.v);

  return (
    <>
      <ExperimentBeacon variant={variant} />
      <Hero variant={variant} />
      <Marquee />
      <BeatsPlay />
      <ProblemPlays />
      <RoomInvite />
      <JourneyPlay />
      <LanesPlay />
      <Audiences />
      <Reviews />
      <Platforms />
      <Faq />
      <Close />
    </>
  );
}
