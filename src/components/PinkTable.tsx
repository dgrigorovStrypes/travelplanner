import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PinkColumn<Row> {
  key: keyof Row & string;
  label: string;
}

interface PinkTableProps<Row extends { id: string }> {
  columns: PinkColumn<Row>[];
  rows: Row[];
  onCellChange: (rowId: string, key: keyof Row & string, value: string) => void;
  onAddRow: () => void;
  onRemoveRow: (rowId: string) => void;
  addLabel?: string;
  /** Optional read-only trailing column (e.g. computed difference). */
  computed?: { label: string; value: (row: Row) => string };
  footer?: React.ReactNode;
}

/**
 * Blush-pink grid table matching the reference pages: pink header cells,
 * first column slightly darker, white gutters between cells.
 */
export function PinkTable<Row extends { id: string }>({
  columns,
  rows,
  onCellChange,
  onAddRow,
  onRemoveRow,
  addLabel = "Add row",
  computed,
  footer,
}: PinkTableProps<Row>) {
  const colCount = columns.length + (computed ? 1 : 0);

  return (
    <div>
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
      >
        {columns.map((col) => (
          <div
            key={col.key}
            className="bg-blush px-2 py-5 text-center font-serif text-sm font-semibold sm:text-base"
          >
            {col.label}
          </div>
        ))}
        {computed ? (
          <div className="bg-blush px-2 py-5 text-center font-serif text-sm font-semibold sm:text-base">
            {computed.label}
          </div>
        ) : null}

        {rows.map((row) => (
          <div key={row.id} className="group contents">
            {columns.map((col, i) => (
              <div
                key={col.key}
                className={cn(
                  "relative",
                  i === 0 ? "bg-blush-mid" : "bg-blush-soft",
                )}
              >
                <input
                  type="text"
                  value={String(row[col.key] ?? "")}
                  onChange={(e) => onCellChange(row.id, col.key, e.target.value)}
                  aria-label={col.label}
                  className="w-full bg-transparent px-3 py-6 text-center font-serif text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-base"
                />
                {i === 0 ? (
                  <button
                    type="button"
                    onClick={() => onRemoveRow(row.id)}
                    aria-label="Remove row"
                    className="absolute top-1 left-1 hidden size-5 items-center justify-center rounded-full text-xs text-terracotta hover:bg-background/60 group-hover:flex"
                  >
                    ✕
                  </button>
                ) : null}
              </div>
            ))}
            {computed ? (
              <div className="flex items-center justify-center bg-blush-soft px-3 py-6 font-serif text-sm sm:text-base">
                {computed.value(row)}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onAddRow}
          className="rounded-full border-rose bg-transparent font-display tracking-[0.15em] hover:bg-blush-softer"
        >
          + {addLabel}
        </Button>
        {footer}
      </div>
    </div>
  );
}
