import { resolveHeadline } from "@/config/site";
import { Audiences } from "@/components/audiences";
import { ExperimentBeacon } from "@/components/experiment-beacon";
import { Hero } from "@/components/hero";
import { Close, Faq, Marquee, PlainWords, Platforms, Problem, Workflow } from "@/components/home-sections";
import { Journey } from "@/components/journey";
import { Reviews } from "@/components/reviews";

export default async function Page({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const variant = resolveHeadline(params.v);

  return (
    <>
      <ExperimentBeacon variant={variant} />
      <Hero variant={variant} />
      <Marquee />
      <PlainWords />
      <Problem />
      <Journey />
      <Workflow />
      <Audiences />
      <Reviews />
      <Platforms />
      <Faq />
      <Close />
    </>
  );
}
