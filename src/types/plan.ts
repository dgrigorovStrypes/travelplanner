export interface DayNotes {
  morning: string;
  afternoon: string;
  evening: string;
}

export interface DayPlan {
  id: string;
  notes: DayNotes;
}

export interface TripOverview {
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  travelers: string;
  notes: string;
}

export interface ArrivalDetails {
  arrivalTime: string;
  transport: string;
  transferToAccommodation: string;
  checkInTime: string;
  firstActivities: string;
}

export interface DepartureDetails {
  checkOutTime: string;
  lastActivities: string;
  departureTime: string;
  transferFromAccommodation: string;
  station: string;
}

export interface BookedActivity {
  id: string;
  date: string;
  name: string;
  startTime: string;
  endTime: string;
  price: string;
}

export interface Restaurant {
  id: string;
  name: string;
  famousFor: string;
  location: string;
}

export interface Accommodation {
  name: string;
  address: string;
  checkIn: string;
  checkOut: string;
  confirmation: string;
  notes: string;
}

export interface BudgetRow {
  id: string;
  category: string;
  planned: string;
  actual: string;
}

export interface ExpenseRow {
  id: string;
  date: string;
  expense: string;
  category: string;
  amount: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface ChecklistSection {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface TravelPlan {
  version: 1;
  city: string;
  country: string;
  overview: TripOverview;
  arrival: ArrivalDetails;
  days: DayPlan[];
  departure: DepartureDetails;
  wishlist: string[];
  bookedActivities: BookedActivity[];
  restaurants: Restaurant[];
  accommodation: Accommodation;
  budget: BudgetRow[];
  expenses: ExpenseRow[];
  packing: ChecklistSection[];
  beforeYouGo: ChecklistSection[];
  highlights: string[];
}
