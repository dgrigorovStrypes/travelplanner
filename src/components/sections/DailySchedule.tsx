import { LabeledDottedInput } from "@/components/DottedInput";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { emptyDay } from "@/lib/defaultPlan";
import type { PlanUpdater } from "@/hooks/usePlan";
import type { DayNotes, TravelPlan } from "@/types/plan";

interface Props {
  plan: TravelPlan;
  update: PlanUpdater;
}

const PERIODS: (keyof DayNotes)[] = ["morning", "afternoon", "evening"];

export function DailySchedule({ plan, update }: Props) {
  const setDayNote = (dayId: string, period: keyof DayNotes, value: string) =>
    update((p) => ({
      ...p,
      days: p.days.map((d) =>
        d.id === dayId ? { ...d, notes: { ...d.notes, [period]: value } } : d,
      ),
    }));

  const setArrival =
    (key: keyof TravelPlan["arrival"]) =>
    (value: string) =>
      update((p) => ({ ...p, arrival: { ...p.arrival, [key]: value } }));

  const setDeparture =
    (key: keyof TravelPlan["departure"]) =>
    (value: string) =>
      update((p) => ({ ...p, departure: { ...p.departure, [key]: value } }));

  return (
    <section id="schedule" className="mx-auto max-w-3xl px-6 py-20">
      <SectionTitle>Daily Schedule</SectionTitle>

      {/* Day 1 — arrival details */}
      <div className="mt-16">
        <h3 className="diary-heading text-xl sm:text-2xl">
          Day 1 — Arrival Details
        </h3>
        <div className="mt-8 space-y-8">
          <LabeledDottedInput
            label="Arrival time"
            value={plan.arrival.arrivalTime}
            onValueChange={setArrival("arrivalTime")}
          />
          <LabeledDottedInput
            label="Airport / train station"
            value={plan.arrival.transport}
            onValueChange={setArrival("transport")}
          />
          <LabeledDottedInput
            label="Transfer to accommodation"
            value={plan.arrival.transferToAccommodation}
            onValueChange={setArrival("transferToAccommodation")}
          />
          <LabeledDottedInput
            label="Check-in time"
            value={plan.arrival.checkInTime}
            onValueChange={setArrival("checkInTime")}
          />
          <LabeledDottedInput
            label="First activities"
            value={plan.arrival.firstActivities}
            onValueChange={setArrival("firstActivities")}
          />
        </div>
      </div>

      {/* Middle days — morning / afternoon / evening cards */}
      {plan.days.map((day, index) => (
        <div key={day.id} className="mt-20">
          <div className="flex items-center justify-center gap-3">
            <h3 className="diary-heading text-center text-xl sm:text-2xl">
              Day {index + 2}
            </h3>
            <button
              type="button"
              onClick={() =>
                update((p) => ({
                  ...p,
                  days: p.days.filter((d) => d.id !== day.id),
                }))
              }
              aria-label={`Remove day ${index + 2}`}
              className="text-sm text-terracotta/70 hover:text-terracotta"
            >
              ✕
            </button>
          </div>
          <div className="mt-8 space-y-8">
            {PERIODS.map((period) => (
              <div
                key={period}
                className="rounded-3xl border border-foreground/50 px-6 pb-6 pt-5"
              >
                <p className="diary-heading text-center text-lg">{period}</p>
                <Textarea
                  value={day.notes[period]}
                  onChange={(e) => setDayNote(day.id, period, e.target.value)}
                  placeholder="add text"
                  aria-label={`Day ${index + 2} ${period}`}
                  className="mt-4 min-h-28 resize-y border-none bg-transparent text-center font-serif text-base shadow-none placeholder:font-display placeholder:text-lg placeholder:tracking-[0.25em] placeholder:text-terracotta/80 focus-visible:ring-0 dark:bg-transparent"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-12 text-center">
        <Button
          type="button"
          variant="outline"
          onClick={() => update((p) => ({ ...p, days: [...p.days, emptyDay()] }))}
          className="rounded-full border-rose bg-transparent font-display tracking-[0.15em] hover:bg-blush-softer"
        >
          + Add day
        </Button>
      </div>

      {/* Last day — departure details */}
      <div className="mt-20">
        <h3 className="diary-heading text-xl sm:text-2xl">
          Day {plan.days.length + 2} — Departure Details
        </h3>
        <div className="mt-8 space-y-8">
          <LabeledDottedInput
            label="Check-out time"
            value={plan.departure.checkOutTime}
            onValueChange={setDeparture("checkOutTime")}
          />
          <LabeledDottedInput
            label="Last activities"
            value={plan.departure.lastActivities}
            onValueChange={setDeparture("lastActivities")}
          />
          <LabeledDottedInput
            label="Departure time"
            value={plan.departure.departureTime}
            onValueChange={setDeparture("departureTime")}
          />
          <LabeledDottedInput
            label="Transfer from accommodation"
            value={plan.departure.transferFromAccommodation}
            onValueChange={setDeparture("transferFromAccommodation")}
          />
          <LabeledDottedInput
            label="Airport / train station"
            value={plan.departure.station}
            onValueChange={setDeparture("station")}
          />
        </div>
      </div>
    </section>
  );
}
