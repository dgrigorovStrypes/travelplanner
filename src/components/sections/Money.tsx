import { PinkTable } from "@/components/PinkTable";
import { SectionTitle } from "@/components/SectionTitle";
import { uid } from "@/lib/defaultPlan";
import type { PlanUpdater } from "@/hooks/usePlan";
import type { BudgetRow, ExpenseRow, TravelPlan } from "@/types/plan";

interface Props {
  plan: TravelPlan;
  update: PlanUpdater;
}

function toNumber(value: string): number {
  const n = Number.parseFloat(value.replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

function formatAmount(n: number, symbol: string): string {
  return (
    symbol +
    n.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
  );
}

export function BudgetPlanner({ plan, update }: Props) {
  const setRows = (rows: BudgetRow[]) =>
    update((p) => ({ ...p, budget: rows }));

  const sym = plan.currency === "USD" ? "$" : "€";
  const totalPlanned = plan.budget.reduce((s, r) => s + toNumber(r.planned), 0);
  const totalActual = plan.budget.reduce((s, r) => s + toNumber(r.actual), 0);

  return (
    <section id="budget" className="mx-auto max-w-4xl px-6 py-20">
      <SectionTitle>Budget Planner</SectionTitle>
      <div className="mt-14">
        <PinkTable
          columns={[
            { key: "category", label: "Category" },
            { key: "planned", label: `Planned (${sym})`, numeric: true },
            { key: "actual", label: `Actual (${sym})`, numeric: true },
          ]}
          computed={{
            label: "Difference",
            value: (r) => {
              if (!r.planned && !r.actual) return "";
              const diff = toNumber(r.planned) - toNumber(r.actual);
              return formatAmount(diff, sym);
            },
          }}
          currencySymbol={sym}
          rows={plan.budget}
          onCellChange={(id, key, value) =>
            setRows(
              plan.budget.map((r) => (r.id === id ? { ...r, [key]: value } : r)),
            )
          }
          onAddRow={() =>
            setRows([
              ...plan.budget,
              { id: uid(), category: "", planned: "", actual: "" },
            ])
          }
          onRemoveRow={(id) => setRows(plan.budget.filter((r) => r.id !== id))}
          addLabel="Add category"
          footer={
            <p className="font-serif text-sm text-muted-foreground sm:text-base">
              Planned {formatAmount(totalPlanned, sym)} · Actual{" "}
              {formatAmount(totalActual, sym)} · Difference{" "}
              {formatAmount(totalPlanned - totalActual, sym)}
            </p>
          }
        />
      </div>
    </section>
  );
}

export function ExpenseTracker({ plan, update }: Props) {
  const setRows = (rows: ExpenseRow[]) =>
    update((p) => ({ ...p, expenses: rows }));

  const sym = plan.currency === "USD" ? "$" : "€";
  const total = plan.expenses.reduce((s, r) => s + toNumber(r.amount), 0);

  return (
    <section id="expenses" className="mx-auto max-w-4xl px-6 py-20">
      <SectionTitle>Expense Tracker</SectionTitle>
      <div className="mt-14">
        <PinkTable
          columns={[
            { key: "date", label: "Date", type: "date" },
            { key: "expense", label: "Expense" },
            { key: "category", label: "Category" },
            { key: "amount", label: `Amount (${sym})`, type: "currency" },
          ]}
          currencySymbol={sym}
          rows={plan.expenses}
          onCellChange={(id, key, value) =>
            setRows(
              plan.expenses.map((r) =>
                r.id === id ? { ...r, [key]: value } : r,
              ),
            )
          }
          onAddRow={() =>
            setRows([
              ...plan.expenses,
              { id: uid(), date: "", expense: "", category: "", amount: "" },
            ])
          }
          onRemoveRow={(id) => setRows(plan.expenses.filter((r) => r.id !== id))}
          addLabel="Add expense"
          footer={
            <p className="font-serif text-sm text-muted-foreground sm:text-base">
              Total {formatAmount(total, sym)}
            </p>
          }
        />
      </div>
    </section>
  );
}
