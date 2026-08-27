import { ChecklistGroup } from "@/components/ChecklistGroup";
import { SectionTitle } from "@/components/SectionTitle";
import type { PlanUpdater } from "@/hooks/usePlan";
import type { ChecklistSection, TravelPlan } from "@/types/plan";

interface ChecklistPageProps {
  id: string;
  title: React.ReactNode;
  sub?: string;
  sections: ChecklistSection[];
  field: "packing" | "beforeYouGo";
  update: PlanUpdater;
}

export function ChecklistPage({
  id,
  title,
  sub,
  sections,
  field,
  update,
}: ChecklistPageProps) {
  const setSection = (next: ChecklistSection) =>
    update((p) => ({
      ...p,
      [field]: (p[field] as ChecklistSection[]).map((s) =>
        s.id === next.id ? next : s,
      ),
    }));

  return (
    <section id={id} className="mx-auto max-w-4xl px-6 py-20">
      <SectionTitle sub={sub}>{title}</SectionTitle>
      <div className="mt-14 grid gap-x-14 gap-y-12 sm:grid-cols-2">
        {sections.map((section) => (
          <ChecklistGroup
            key={section.id}
            section={section}
            onChange={setSection}
          />
        ))}
      </div>
    </section>
  );
}

export function PackingList({
  plan,
  update,
}: {
  plan: TravelPlan;
  update: PlanUpdater;
}) {
  return (
    <ChecklistPage
      id="packing"
      title="Packing List"
      sub="A few tips from vacationing in style"
      sections={plan.packing}
      field="packing"
      update={update}
    />
  );
}

export function BeforeYouGo({
  plan,
  update,
}: {
  plan: TravelPlan;
  update: PlanUpdater;
}) {
  return (
    <ChecklistPage
      id="before-you-go"
      title="Before You Go"
      sub="A few tips from vacationing in style"
      sections={plan.beforeYouGo}
      field="beforeYouGo"
      update={update}
    />
  );
}
