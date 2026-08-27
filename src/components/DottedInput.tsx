import { cn } from "@/lib/utils";

interface DottedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onValueChange: (value: string) => void;
}

/** Text input rendered as a pink dotted writing line, like the diary pages. */
export function DottedInput({
  value,
  onValueChange,
  className,
  placeholder = "add text",
  ...rest
}: DottedInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        "dotted-line w-full bg-transparent px-1 py-2 font-serif text-base text-foreground",
        "placeholder:font-display placeholder:tracking-[0.2em] placeholder:text-terracotta/70",
        "focus:outline-none focus-visible:border-b-rose-dotted",
        className,
      )}
      {...rest}
    />
  );
}

interface LabeledDottedInputProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

/** "CHECK-OUT TIME  ........" row from the departure page. */
export function LabeledDottedInput({
  label,
  value,
  onValueChange,
  className,
}: LabeledDottedInputProps) {
  return (
    <label className={cn("block", className)}>
      <span className="diary-heading block text-lg sm:text-xl">{label}</span>
      <DottedInput value={value} onValueChange={onValueChange} />
    </label>
  );
}
