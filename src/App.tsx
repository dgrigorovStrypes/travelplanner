import { TopBar } from "@/components/TopBar";
import { Cover } from "@/components/sections/Cover";
import { TableOfContents } from "@/components/sections/TableOfContents";
import { TripOverview } from "@/components/sections/TripOverview";
import { DailySchedule } from "@/components/sections/DailySchedule";
import { DottedListSection } from "@/components/sections/DottedListSection";
import { BookedActivities, Restaurants } from "@/components/sections/Tables";
import { AccommodationSection } from "@/components/sections/Accommodation";
import { BudgetPlanner, ExpenseTracker } from "@/components/sections/Money";
import { BeforeYouGo, PackingList } from "@/components/sections/Checklists";
import { Separator } from "@/components/ui/separator";
import { usePlan } from "@/hooks/usePlan";

export default function App() {
  const { plan, update, replace, reset } = usePlan();

  return (
    <div className="min-h-screen">
      <TopBar plan={plan} replace={replace} reset={reset} update={update} />
      <Cover plan={plan} update={update} />
      <TableOfContents />
      <Divider />
      <TripOverview plan={plan} update={update} />
      <Divider />
      <DailySchedule plan={plan} update={update} />
      <Divider />
      <DottedListSection
        id="tours"
        title={
          <>
            Tours, Attractions &amp;
            <br />
            Experiences I Like
          </>
        }
        lines={plan.wishlist}
        onChange={(wishlist) => update((p) => ({ ...p, wishlist }))}
      />
      <Divider />
      <BookedActivities plan={plan} update={update} />
      <Divider />
      <Restaurants plan={plan} update={update} />
      <Divider />
      <AccommodationSection plan={plan} update={update} />
      <Divider />
      <BudgetPlanner plan={plan} update={update} />
      <Divider />
      <ExpenseTracker plan={plan} update={update} />
      <Divider />
      <PackingList plan={plan} update={update} />
      <Divider />
      <BeforeYouGo plan={plan} update={update} />
      <Divider />
      <DottedListSection
        id="highlights"
        title={
          <>
            Trip
            <br />
            Highlights
          </>
        }
        lines={plan.highlights}
        onChange={(highlights) => update((p) => ({ ...p, highlights }))}
      />
      <footer className="px-6 pb-16 pt-8 text-center">
        <p className="font-serif text-sm text-muted-foreground">
          Travel Diary by{" "}
          <span className="diary-heading text-xs">Vacationing in Style</span>
        </p>
        <p className="mt-2 font-serif text-xs text-muted-foreground">
          Your plan is saved in this browser and in the page URL — share the
          link or export a file to keep it safe.
        </p>
      </footer>
    </div>
  );
}

function Divider() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <Separator className="bg-input" />
    </div>
  );
}
