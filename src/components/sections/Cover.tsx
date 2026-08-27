import { SectionTitle } from "@/components/SectionTitle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DESTINATION_GROUPS,
  getCoverGradient,
  getDestinationInfo,
} from "@/lib/destinations";
import type { PlanUpdater } from "@/hooks/usePlan";
import type { TravelPlan } from "@/types/plan";

interface CoverProps {
  plan: TravelPlan;
  update: PlanUpdater;
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function calcNights(start: string, end: string): number {
  if (!start || !end) return 0;
  const s = new Date(start + "T00:00:00").getTime();
  const e = new Date(end + "T00:00:00").getTime();
  return Math.max(0, Math.round((e - s) / 86_400_000));
}

/** Typographic cover page: watercolor-style backdrop with destination selector. */
export function Cover({ plan, update }: CoverProps) {
  const gradient = getCoverGradient(plan.city);
  const nights = calcNights(plan.overview.startDate, plan.overview.endDate);
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const selectDestination = (city: string) => {
    const info = getDestinationInfo(city);
    update((p) => ({
      ...p,
      city,
      country: info?.country ?? p.country,
      overview: {
        ...p.overview,
        destination: city,
        country: info?.country ?? p.overview.country,
      },
    }));
  };

  return (
    <header id="cover" className="relative overflow-hidden">
      {/* Region-tinted watercolor wash — changes with selected destination */}
      <div
        aria-hidden
        className="absolute inset-0 transition-all duration-700"
        style={{ background: gradient, opacity: 0.9 }}
      />

      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-end px-6 pb-6 pt-24 text-center">
        {/* Branding */}
        <p className="diary-heading mb-1 text-xs tracking-[0.3em] opacity-50 sm:text-sm print:hidden">
          Vacationing in Style
        </p>
        <p className="diary-heading mb-6 text-sm sm:text-base">Travel Diary</p>

        {/* Destination dropdown */}
        <Select value={plan.city} onValueChange={selectDestination}>
          <SelectTrigger className="mb-2 h-auto w-full border-none bg-transparent p-0 shadow-none focus:ring-0 [&>svg]:hidden">
            <SelectValue>
              <span className="diary-heading block w-full text-center text-6xl leading-tight sm:text-7xl">
                {plan.city || "SELECT CITY"}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {DESTINATION_GROUPS.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>

        <p className="diary-heading mt-1 text-3xl sm:text-4xl">{plan.country}</p>

        {/* Dates summary */}
        {plan.overview.startDate && plan.overview.endDate ? (
          <div className="mt-6 space-y-1">
            <p className="font-serif text-base opacity-80">
              {formatDate(plan.overview.startDate)} —{" "}
              {formatDate(plan.overview.endDate)}
            </p>
            <p className="font-serif text-sm opacity-60">
              {nights} night{nights !== 1 ? "s" : ""} · {nights + 1} day
              {nights + 1 !== 1 ? "s" : ""}
            </p>
          </div>
        ) : null}

        {/* Current date */}
        <p className="mt-8 font-serif text-xs opacity-40">{today}</p>
      </div>

      <div className="relative bg-background px-6 py-10">
        <SectionTitle as="h1" className="sr-only">
          Travel planner
        </SectionTitle>
      </div>
    </header>
  );
}
