import { z } from "zod";
import type { TravelPlan } from "@/types/plan";

const dayNotesSchema = z.object({
  morning: z.string().catch(""),
  afternoon: z.string().catch(""),
  evening: z.string().catch(""),
});

const dayPlanSchema = z.object({
  id: z.string(),
  notes: dayNotesSchema,
});

const overviewSchema = z.object({
  destination: z.string().catch(""),
  country: z.string().catch(""),
  startDate: z.string().catch(""),
  endDate: z.string().catch(""),
  travelers: z.string().catch(""),
  notes: z.string().catch(""),
});

const arrivalSchema = z.object({
  arrivalTime: z.string().catch(""),
  transport: z.string().catch(""),
  transferToAccommodation: z.string().catch(""),
  checkInTime: z.string().catch(""),
  firstActivities: z.string().catch(""),
});

const departureSchema = z.object({
  checkOutTime: z.string().catch(""),
  lastActivities: z.string().catch(""),
  departureTime: z.string().catch(""),
  transferFromAccommodation: z.string().catch(""),
  station: z.string().catch(""),
});

const bookedActivitySchema = z.object({
  id: z.string(),
  date: z.string().catch(""),
  name: z.string().catch(""),
  startTime: z.string().catch(""),
  endTime: z.string().catch(""),
  price: z.string().catch(""),
});

const restaurantSchema = z.object({
  id: z.string(),
  name: z.string().catch(""),
  famousFor: z.string().catch(""),
  location: z.string().catch(""),
});

const accommodationSchema = z.object({
  name: z.string().catch(""),
  address: z.string().catch(""),
  checkIn: z.string().catch(""),
  checkOut: z.string().catch(""),
  confirmation: z.string().catch(""),
  notes: z.string().catch(""),
});

const budgetRowSchema = z.object({
  id: z.string(),
  category: z.string().catch(""),
  planned: z.string().catch(""),
  actual: z.string().catch(""),
});

const expenseRowSchema = z.object({
  id: z.string(),
  date: z.string().catch(""),
  expense: z.string().catch(""),
  category: z.string().catch(""),
  amount: z.string().catch(""),
});

const checklistItemSchema = z.object({
  id: z.string(),
  text: z.string().catch(""),
  done: z.boolean().catch(false),
});

const checklistSectionSchema = z.object({
  id: z.string(),
  title: z.string().catch(""),
  items: z.array(checklistItemSchema).catch([]),
});

export const travelPlanSchema = z.object({
  version: z.literal(1),
  city: z.string().catch(""),
  country: z.string().catch(""),
  currency: z.enum(["USD", "EUR"]).catch("EUR"),
  overview: overviewSchema,
  arrival: arrivalSchema,
  days: z.array(dayPlanSchema),
  departure: departureSchema,
  wishlist: z.array(z.string()),
  bookedActivities: z.array(bookedActivitySchema),
  restaurants: z.array(restaurantSchema),
  accommodation: accommodationSchema,
  budget: z.array(budgetRowSchema),
  expenses: z.array(expenseRowSchema),
  packing: z.array(checklistSectionSchema),
  beforeYouGo: z.array(checklistSectionSchema),
  highlights: z.array(z.string()),
});

/** Validate untrusted data (imported files, URL, localStorage). Returns null when invalid. */
export function parsePlan(data: unknown): TravelPlan | null {
  const result = travelPlanSchema.safeParse(data);
  return result.success ? (result.data satisfies TravelPlan) : null;
}
