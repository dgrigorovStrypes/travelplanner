import { LabeledDottedInput } from "@/components/DottedInput";
import { SectionTitle } from "@/components/SectionTitle";
import type { PlanUpdater } from "@/hooks/usePlan";
import type { TravelPlan } from "@/types/plan";

interface Props {
  plan: TravelPlan;
  update: PlanUpdater;
}

export function AccommodationSection({ plan, update }: Props) {
  const set =
    (key: keyof TravelPlan["accommodation"]) =>
    (value: string) =>
      update((p) => ({
        ...p,
        accommodation: { ...p.accommodation, [key]: value },
      }));

  const a = plan.accommodation;

  return (
    <section id="accommodation" className="mx-auto max-w-3xl px-6 py-20">
      <SectionTitle>Accommodation &amp; Reservations</SectionTitle>
      <div className="mt-14 space-y-10">
        <LabeledDottedInput
          label="Accommodation name"
          value={a.name}
          onValueChange={set("name")}
        />
        <LabeledDottedInput
          label="Address"
          value={a.address}
          onValueChange={set("address")}
        />
        <div className="grid gap-10 sm:grid-cols-2">
          <LabeledDottedInput
            label="Check-in"
            value={a.checkIn}
            onValueChange={set("checkIn")}
          />
          <LabeledDottedInput
            label="Check-out"
            value={a.checkOut}
            onValueChange={set("checkOut")}
          />
        </div>
        <LabeledDottedInput
          label="Booking confirmation"
          value={a.confirmation}
          onValueChange={set("confirmation")}
        />
        <LabeledDottedInput
          label="Notes"
          value={a.notes}
          onValueChange={set("notes")}
        />
      </div>
    </section>
  );
}
