import { LabeledDottedInput } from "@/components/DottedInput";
import { SectionTitle } from "@/components/SectionTitle";
import { emptyDay } from "@/lib/defaultPlan";
import type { PlanUpdater } from "@/hooks/usePlan";
import type { TravelPlan } from "@/types/plan";

interface Props {
  plan: TravelPlan;
  update: PlanUpdater;
}

function calcNights(start: string, end: string): number {
  if (!start || !end) return 0;
  const s = new Date(start + "T00:00:00").getTime();
  const e = new Date(end + "T00:00:00").getTime();
  return Math.max(0, Math.round((e - s) / 86_400_000));
}

export function TripOverview({ plan, update }: Props) {
  const set =
    (key: keyof TravelPlan["overview"]) =>
    (value: string) =>
      update((p) => ({ ...p, overview: { ...p.overview, [key]: value } }));

  const handleDateChange =
    (key: "startDate" | "endDate") => (value: string) => {
      update((p) => {
        const newOverview = { ...p.overview, [key]: value };
        const start = key === "startDate" ? value : p.overview.startDate;
        const end = key === "endDate" ? value : p.overview.endDate;
        const nights = calcNights(start, end);
        const needed = Math.max(0, nights - 1);
        let days = [...p.days];
        if (days.length < needed) {
          days = [
            ...days,
            ...Array.from({ length: needed - days.length }, emptyDay),
          ];
        } else if (days.length > needed) {
          days = days.slice(0, needed);
        }
        return { ...p, overview: newOverview, days };
      });
    };

  const o = plan.overview;
  const nights = calcNights(o.startDate, o.endDate);

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
          <div className="space-y-2">
            <LabeledDottedInput
              label="Start date"
              value={o.startDate}
              onValueChange={handleDateChange("startDate")}
              type="date"
            />
          </div>
          <div className="space-y-2">
            <LabeledDottedInput
              label="End date"
              value={o.endDate}
              onValueChange={handleDateChange("endDate")}
              type="date"
            />
          </div>
        </div>
        {nights > 0 ? (
          <p className="font-serif text-sm text-muted-foreground">
            {nights} night{nights !== 1 ? "s" : ""} · {nights + 1} day
            {nights + 1 !== 1 ? "s" : ""} · {plan.days.length} full day
            {plan.days.length !== 1 ? "s" : ""} scheduled
          </p>
        ) : null}
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
