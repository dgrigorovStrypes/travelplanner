import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: React.ReactNode;
  sub?: string;
  className?: string;
  as?: "h1" | "h2";
}

export function SectionTitle({
  children,
  sub,
  className,
  as: Tag = "h2",
}: SectionTitleProps) {
  return (
    <div className={cn("text-center", className)}>
      <Tag className="diary-heading text-2xl sm:text-3xl">{children}</Tag>
      {sub ? (
        <p className="diary-heading mt-2 text-base tracking-[0.3em] sm:text-lg">
          {sub}
        </p>
      ) : null}
    </div>
  );
}
