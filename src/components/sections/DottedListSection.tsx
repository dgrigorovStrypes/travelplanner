import { DottedInput } from "@/components/DottedInput";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";

interface DottedListProps {
  id: string;
  title: React.ReactNode;
  lines: string[];
  onChange: (lines: string[]) => void;
}

/** Page of dotted writing lines ("Tours … I like", "Trip highlights"). */
export function DottedListSection({
  id,
  title,
  lines,
  onChange,
}: DottedListProps) {
  return (
    <section id={id} className="mx-auto max-w-3xl px-6 py-20">
      <SectionTitle>{title}</SectionTitle>
      <div className="mt-14 space-y-8">
        {lines.map((line, i) => (
          <DottedInput
            // index keys are fine: lines are positional writing rows
            key={i}
            value={line}
            onValueChange={(value) =>
              onChange(lines.map((l, j) => (j === i ? value : l)))
            }
            placeholder={i === 0 ? "add text" : ""}
            aria-label={`Line ${i + 1}`}
          />
        ))}
      </div>
      <div className="mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => onChange([...lines, ""])}
          className="rounded-full border-rose bg-transparent font-display tracking-[0.15em] hover:bg-blush-softer"
        >
          + Add line
        </Button>
      </div>
    </section>
  );
}
