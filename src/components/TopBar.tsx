import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { exportPlanFile, importPlanFile } from "@/lib/persistence";
import type { TravelPlan } from "@/types/plan";

interface TopBarProps {
  plan: TravelPlan;
  replace: (plan: TravelPlan) => void;
  reset: () => void;
}

export function TopBar({ plan, replace, reset }: TopBarProps) {
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

  return (
    <div className="sticky top-0 z-50 border-b border-input bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-2 px-6 py-2.5">
        <a href="#cover" className="diary-heading mr-auto text-sm">
          Travel Diary
        </a>
        {message ? (
          <span className="font-serif text-sm text-terracotta">{message}</span>
        ) : null}
        <Button variant="ghost" size="sm" onClick={onShare} className="font-display tracking-[0.1em]">
          Share link
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
