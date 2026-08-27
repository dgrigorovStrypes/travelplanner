import { SectionTitle } from "@/components/SectionTitle";

const ENTRIES = [
  ["Trip overview", "#overview"],
  ["Daily schedule", "#schedule"],
  ["Tours, attractions & experiences", "#tours"],
  ["Restaurants & cafés", "#restaurants"],
  ["Accommodation & reservations", "#accommodation"],
  ["Budget planner", "#budget"],
  ["Expense tracker", "#expenses"],
  ["Packing list", "#packing"],
  ["Before you go", "#before-you-go"],
  ["Trip highlights", "#highlights"],
] as const;

export function TableOfContents() {
  return (
    <section id="contents" className="mx-auto max-w-3xl px-6 py-20">
      <SectionTitle>Table of Contents:</SectionTitle>
      <nav className="mt-14 flex flex-col items-center gap-6">
        {ENTRIES.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="diary-heading text-center text-lg leading-relaxed transition-colors hover:text-terracotta sm:text-xl"
          >
            {label}
          </a>
        ))}
      </nav>
    </section>
  );
}
