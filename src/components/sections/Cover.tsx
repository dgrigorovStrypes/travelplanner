import { emptyDay } from "@/lib/defaultPlan";
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

  function calcNightsLocal(start: string, end: string): number {
    if (!start || !end) return 0;
    const s = new Date(start + "T00:00:00").getTime();
    const e = new Date(end + "T00:00:00").getTime();
    return Math.max(0, Math.round((e - s) / 86_400_000));
  }

  const handleDateChange = (key: "startDate" | "endDate") => (value: string) => {
    update((p) => {
      const newOverview = { ...p.overview, [key]: value };
      const start = key === "startDate" ? value : p.overview.startDate;
      const end = key === "endDate" ? value : p.overview.endDate;
      const nights = calcNightsLocal(start, end);
      const needed = Math.max(0, nights - 1);
      let days = [...p.days];
      if (days.length < needed) {
        days = [...days, ...Array.from({ length: needed - days.length }, emptyDay)];
      } else if (days.length > needed) {
        days = days.slice(0, needed);
      }
      return { ...p, overview: newOverview, days };
    });
  };

  return (
    <header id="cover" className="relative overflow-hidden">
      {/* Region-tinted watercolor wash — changes with selected destination */}
      <div
        aria-hidden
        className="absolute inset-0 transition-all duration-700"
        style={{ background: gradient, opacity: 0.9 }}
      />

      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center px-6 pb-6 pt-16 text-center">
        {/* Date pickers — top of cover */}
        <div className="print:hidden mb-8 flex items-end gap-3 sm:gap-6">
          <div className="text-center">
            <p className="diary-heading mb-1.5 text-[10px] tracking-[0.25em] opacity-60">FROM</p>
            <input
              type="date"
              value={plan.overview.startDate}
              onChange={(e) => handleDateChange("startDate")(e.target.value)}
              className="rounded-xl border border-white/40 bg-white/25 px-3 py-2 font-serif text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
          <span className="mb-3 font-serif opacity-40">—</span>
          <div className="text-center">
            <p className="diary-heading mb-1.5 text-[10px] tracking-[0.25em] opacity-60">TO</p>
            <input
              type="date"
              value={plan.overview.endDate}
              onChange={(e) => handleDateChange("endDate")(e.target.value)}
              min={plan.overview.startDate || undefined}
              className="rounded-xl border border-white/40 bg-white/25 px-3 py-2 font-serif text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>

        {/* Printed date display */}
        {plan.overview.startDate && plan.overview.endDate ? (
          <div className="hidden print:block mb-8 space-y-1">
            <p className="font-serif text-base opacity-80">
              {formatDate(plan.overview.startDate)} — {formatDate(plan.overview.endDate)}
            </p>
          </div>
        ) : null}

        {/* Branding */}
        <p className="diary-heading mb-1 text-xs tracking-[0.3em] opacity-50 sm:text-sm print:hidden">
          Vacationing in Style
        </p>
        <p className="diary-heading mb-6 text-sm sm:text-base">Travel Diary</p>

        {/* Destination dropdown — centered */}
        <Select value={plan.city} onValueChange={selectDestination}>
          <SelectTrigger className="mb-2 h-auto w-full justify-center border-none bg-transparent p-0 shadow-none focus:ring-0 [&>svg]:hidden">
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

        {/* Nights summary */}
        {nights > 0 ? (
          <p className="mt-4 font-serif text-sm opacity-60">
            {nights} night{nights !== 1 ? "s" : ""} · {nights + 1} day
            {nights + 1 !== 1 ? "s" : ""}
          </p>
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
