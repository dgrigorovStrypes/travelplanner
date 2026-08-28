import { PinkTable } from "@/components/PinkTable";
import { SectionTitle } from "@/components/SectionTitle";
import { uid } from "@/lib/defaultPlan";
import type { PlanUpdater } from "@/hooks/usePlan";
import type { BookedActivity, Restaurant, TravelPlan } from "@/types/plan";

interface Props {
  plan: TravelPlan;
  update: PlanUpdater;
}

export function BookedActivities({ plan, update }: Props) {
  const sym = plan.currency === "USD" ? "$" : "€";

  const setRows = (rows: BookedActivity[]) =>
    update((p) => ({ ...p, bookedActivities: rows }));

  const handleCellChange = (id: string, key: string, value: string) => {
    setRows(
      plan.bookedActivities.map((r) => {
        if (r.id !== id) return r;
        const updated = { ...r, [key]: value };
        // Auto-fill times with defaults when date is set and times are empty
        if (key === "date" && value) {
          if (!updated.startTime) updated.startTime = "09:00";
          if (!updated.endTime) updated.endTime = "17:00";
        }
        return updated;
      }),
    );
  };

  return (
    <section id="booked" className="mx-auto max-w-4xl px-6 py-20">
      <SectionTitle>Booked Activities</SectionTitle>
      <div className="mt-14">
        <PinkTable
          columns={[
            { key: "date", label: "Date", type: "date" },
            { key: "name", label: "Tour name" },
            { key: "startTime", label: "Start time", type: "time" },
            { key: "endTime", label: "End time", type: "time" },
            { key: "price", label: "Price", type: "currency" },
          ]}
          rows={plan.bookedActivities}
          currencySymbol={sym}
          onCellChange={handleCellChange}
          onAddRow={() =>
            setRows([
              ...plan.bookedActivities,
              { id: uid(), date: "", name: "", startTime: "", endTime: "", price: "" },
            ])
          }
          onRemoveRow={(id) =>
            setRows(plan.bookedActivities.filter((r) => r.id !== id))
          }
          addLabel="Add activity"
        />
      </div>
    </section>
  );
}

export function Restaurants({ plan, update }: Props) {
  const setRows = (rows: Restaurant[]) =>
    update((p) => ({ ...p, restaurants: rows }));

  return (
    <section id="restaurants" className="mx-auto max-w-4xl px-6 py-20">
      <SectionTitle>Restaurants &amp; Cafés I Want to Try</SectionTitle>
      <div className="mt-14">
        <PinkTable
          columns={[
            { key: "name", label: "Name" },
            { key: "famousFor", label: "Famous for" },
            { key: "location", label: "Location" },
          ]}
          rows={plan.restaurants}
          onCellChange={(id, key, value) =>
            setRows(
              plan.restaurants.map((r) =>
                r.id === id ? { ...r, [key]: value } : r,
              ),
            )
          }
          onAddRow={() =>
            setRows([
              ...plan.restaurants,
              { id: uid(), name: "", famousFor: "", location: "" },
            ])
          }
          onRemoveRow={(id) =>
            setRows(plan.restaurants.filter((r) => r.id !== id))
          }
          addLabel="Add place"
        />
      </div>
    </section>
  );
}
