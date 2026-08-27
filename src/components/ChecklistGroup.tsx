import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { uid } from "@/lib/defaultPlan";
import type { ChecklistSection } from "@/types/plan";

interface ChecklistGroupProps {
  section: ChecklistSection;
  onChange: (next: ChecklistSection) => void;
}

/** Titled checklist with the dusty-rose highlight bar, as on the packing pages. */
export function ChecklistGroup({ section, onChange }: ChecklistGroupProps) {
  const setItems = (items: ChecklistSection["items"]) =>
    onChange({ ...section, items });

  return (
    <div>
      <h3 className="rose-highlight inline-block text-xl sm:text-2xl">
        {section.title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {section.items.map((item) => (
          <li key={item.id} className="group flex items-center gap-3">
            <Checkbox
              id={item.id}
              checked={item.done}
              onCheckedChange={(checked) =>
                setItems(
                  section.items.map((i) =>
                    i.id === item.id ? { ...i, done: checked === true } : i,
                  ),
                )
              }
              className="border-rose-dotted data-[state=checked]:border-rose-dotted data-[state=checked]:bg-rose-dotted"
            />
            <label
              htmlFor={item.id}
              className={
                "flex-1 font-serif text-base " +
                (item.done ? "text-muted-foreground line-through" : "")
              }
            >
              {item.text}
            </label>
            <button
              type="button"
              onClick={() =>
                setItems(section.items.filter((i) => i.id !== item.id))
              }
              aria-label={`Remove ${item.text}`}
              className="hidden text-xs text-terracotta group-hover:block"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      <AddItem
        onAdd={(text) =>
          setItems([...section.items, { id: uid(), text, done: false }])
        }
      />
    </div>
  );
}

function AddItem({ onAdd }: { onAdd: (text: string) => void }) {
  return (
    <form
      className="mt-3 flex items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        const input = e.currentTarget.elements.namedItem(
          "newItem",
        ) as HTMLInputElement;
        const text = input.value.trim();
        if (text) {
          onAdd(text);
          input.value = "";
        }
      }}
    >
      <input
        type="text"
        name="newItem"
        placeholder="add item"
        className="dotted-line w-full bg-transparent px-1 py-1.5 font-serif text-sm placeholder:font-display placeholder:tracking-[0.2em] placeholder:text-terracotta/60 focus:outline-none"
      />
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="font-display tracking-[0.15em] text-terracotta hover:bg-blush-softer"
      >
        + Add
      </Button>
    </form>
  );
}
