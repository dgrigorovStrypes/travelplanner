import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { exportPlanFile, importPlanFile } from "@/lib/persistence";
import type { TravelPlan } from "@/types/plan";

interface TopBarProps {
  plan: TravelPlan;
  replace: (plan: TravelPlan) => void;
  reset: () => void;
  update: (updater: (plan: TravelPlan) => TravelPlan) => void;
  onExportPdf: () => void;
}

export function TopBar({ plan, replace, reset, update, onExportPdf }: TopBarProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  const flash = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(null), 2500);
  };

  const onImport = async (file: File | undefined) => {
    if (!file) return;
    const imported = await importPlanFile(file);
    if (imported) {
      replace(imported);
      flash("Plan imported");
    } else {
      flash("Invalid plan file");
    }
  };

  const onShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      flash("Share link copied");
    } catch {
      flash("Copy the address bar URL to share");
    }
  };

  const today = new Date().toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="sticky top-0 z-50 border-b border-input bg-background/90 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-2 px-6 py-2.5">
        <a href="#cover" className="diary-heading mr-auto text-sm leading-tight">
          <span className="block text-xs opacity-50">Vacationing in Style</span>
          Travel Diary
        </a>

        <span className="hidden font-serif text-xs text-muted-foreground sm:block">
          {today}
        </span>

        {message ? (
          <span className="font-serif text-sm text-terracotta">{message}</span>
        ) : null}

        {/* Currency selector */}
        <Select
          value={plan.currency}
          onValueChange={(v) =>
            update((p) => ({ ...p, currency: v as "USD" | "EUR" }))
          }
        >
          <SelectTrigger className="h-8 w-28 font-display text-xs tracking-[0.1em]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EUR">€ EUR</SelectItem>
            <SelectItem value="USD">$ USD</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="sm"
          onClick={onExportPdf}
          className="font-display tracking-[0.1em]"
        >
          PDF
        </Button>
        <Button variant="ghost" size="sm" onClick={onShare} className="font-display tracking-[0.1em]">
          Share
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => exportPlanFile(plan)}
          className="font-display tracking-[0.1em]"
        >
          Export
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => fileRef.current?.click()}
          className="font-display tracking-[0.1em]"
        >
          Import
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (window.confirm("Start over with an empty plan?")) reset();
          }}
          className="font-display tracking-[0.1em] text-terracotta"
        >
          Reset
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            void onImport(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
