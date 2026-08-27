import { SectionTitle } from "@/components/SectionTitle";
import type { PlanUpdater } from "@/hooks/usePlan";
import type { TravelPlan } from "@/types/plan";

interface CoverProps {
  plan: TravelPlan;
  update: PlanUpdater;
}

/** Typographic cover page: watercolor-style backdrop with CITY / COUNTRY title. */
export function Cover({ plan, update }: CoverProps) {
  return (
    <header id="cover" className="relative overflow-hidden">
      {/* watercolor-inspired wash */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 0%, #cfe0e8 0%, transparent 55%)," +
            "radial-gradient(110% 70% at 85% 10%, #bcd4de 0%, transparent 50%)," +
            "radial-gradient(120% 90% at 50% 100%, #7fb5b0 0%, transparent 45%)," +
            "radial-gradient(100% 100% at 60% 55%, #e8cfae 0%, transparent 55%)," +
            "linear-gradient(#f6efe2, #f2e7d3)",
          opacity: 0.9,
        }}
      />
      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-end px-6 pb-6 pt-24 text-center">
        <p className="diary-heading mb-8 text-sm sm:text-base">
          Travel Diary
        </p>
        <input
          value={plan.city}
          onChange={(e) =>
            update((p) => ({ ...p, city: e.target.value }))
          }
          aria-label="City"
          placeholder="CITY"
          className="diary-heading w-full bg-transparent text-center text-6xl leading-tight focus:outline-none sm:text-7xl"
        />
        <input
          value={plan.country}
          onChange={(e) =>
            update((p) => ({ ...p, country: e.target.value }))
          }
          aria-label="Country"
          placeholder="COUNTRY"
          className="diary-heading w-full bg-transparent text-center text-3xl focus:outline-none sm:text-4xl"
        />
      </div>
      <div className="relative bg-background px-6 py-10">
        <SectionTitle as="h1" className="sr-only">
          Travel planner
        </SectionTitle>
      </div>
    </header>
  );
}
