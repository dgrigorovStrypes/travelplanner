import { useCallback, useEffect, useRef, useState } from "react";
import { defaultPlan } from "@/lib/defaultPlan";
import {
  loadInitialPlan,
  saveToStorage,
  writeToUrl,
} from "@/lib/persistence";
import type { TravelPlan } from "@/types/plan";

export type PlanUpdater = (updater: (plan: TravelPlan) => TravelPlan) => void;

export function usePlan() {
  const [plan, setPlan] = useState<TravelPlan>(() =>
    loadInitialPlan(defaultPlan),
  );
  const timer = useRef<number | undefined>(undefined);

  // Debounced auto-save to localStorage + shareable URL
  useEffect(() => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      saveToStorage(plan);
      writeToUrl(plan);
    }, 400);
    return () => window.clearTimeout(timer.current);
  }, [plan]);

  const update: PlanUpdater = useCallback((updater) => {
    setPlan((prev) => updater(prev));
  }, []);

  const replace = useCallback((next: TravelPlan) => setPlan(next), []);

  const reset = useCallback(() => setPlan(defaultPlan()), []);

  return { plan, update, replace, reset };
}
