import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import { parsePlan } from "@/lib/schema";
import type { TravelPlan } from "@/types/plan";

const STORAGE_KEY = "travelplanner.plan.v1";
const HASH_PREFIX = "#plan=";

/* ---------- localStorage ---------- */

export function loadFromStorage(): TravelPlan | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return parsePlan(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function saveToStorage(plan: TravelPlan): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  } catch {
    // storage may be full or unavailable; state still lives in memory/URL
  }
}

/* ---------- URL hash ---------- */

export function loadFromUrl(): TravelPlan | null {
  try {
    const hash = window.location.hash;
    if (!hash.startsWith(HASH_PREFIX)) return null;
    const json = decompressFromEncodedURIComponent(
      hash.slice(HASH_PREFIX.length),
    );
    if (!json) return null;
    return parsePlan(JSON.parse(json));
  } catch {
    return null;
  }
}

export function writeToUrl(plan: TravelPlan): void {
  try {
    const encoded = compressToEncodedURIComponent(JSON.stringify(plan));
    history.replaceState(null, "", `${HASH_PREFIX}${encoded}`);
  } catch {
    // ignore — URL sharing is best-effort
  }
}

/* ---------- file import / export ---------- */

export function exportPlanFile(plan: TravelPlan): void {
  const blob = new Blob([JSON.stringify(plan, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const name = plan.city.trim() || "travel-plan";
  a.download = `${name.toLowerCase().replace(/\s+/g, "-")}-plan.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importPlanFile(file: File): Promise<TravelPlan | null> {
  return file
    .text()
    .then((text) => parsePlan(JSON.parse(text)))
    .catch(() => null);
}

/** Load initial state: URL first, then localStorage, then default. */
export function loadInitialPlan(fallback: () => TravelPlan): TravelPlan {
  return loadFromUrl() ?? loadFromStorage() ?? fallback();
}
