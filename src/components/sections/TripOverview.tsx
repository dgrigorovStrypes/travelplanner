import { LabeledDottedInput } from "@/components/DottedInput";
import { SectionTitle } from "@/components/SectionTitle";
import type { PlanUpdater } from "@/hooks/usePlan";
import type { TravelPlan } from "@/types/plan";

interface Props {
  plan: TravelPlan;
  update: PlanUpdater;
}

export function TripOverview({ plan, update }: Props) {
  const set =
    (key: keyof TravelPlan["overview"]) =>
    (value: string) =>
      update((p) => ({ ...p, overview: { ...p.overview, [key]: value } }));

  const o = plan.overview;

  return (
    <section id="overview" className="mx-auto max-w-3xl px-6 py-20">
      <SectionTitle>Trip Overview</SectionTitle>
      <div className="mt-14 space-y-10">
        <LabeledDottedInput
          label="Destination"
          value={o.destination}
          onValueChange={set("destination")}
        />
        <LabeledDottedInput
          label="Country"
          value={o.country}
          onValueChange={set("country")}
        />
        <div className="grid gap-10 sm:grid-cols-2">
          <LabeledDottedInput
            label="Start date"
            value={o.startDate}
            onValueChange={set("startDate")}
          />
          <LabeledDottedInput
            label="End date"
            value={o.endDate}
            onValueChange={set("endDate")}
          />
        </div>
        <LabeledDottedInput
          label="Travelers"
          value={o.travelers}
          onValueChange={set("travelers")}
        />
        <LabeledDottedInput
          label="Notes"
          value={o.notes}
          onValueChange={set("notes")}
        />
      </div>
    </section>
  );
}
