import type {
  ChecklistItem,
  ChecklistSection,
  DayPlan,
  TravelPlan,
} from "@/types/plan";

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function items(texts: string[]): ChecklistItem[] {
  return texts.map((text) => ({ id: uid(), text, done: false }));
}

function section(title: string, texts: string[]): ChecklistSection {
  return { id: uid(), title, items: items(texts) };
}

export function emptyDay(): DayPlan {
  return { id: uid(), notes: { morning: "", afternoon: "", evening: "" } };
}

export function defaultPlan(): TravelPlan {
  return {
    version: 1,
    city: "Rome",
    country: "Italy",
    currency: "EUR" as const,
    overview: {
      destination: "",
      country: "",
      startDate: "",
      endDate: "",
      travelers: "",
      notes: "",
    },
    arrival: {
      arrivalTime: "",
      transport: "",
      transferToAccommodation: "",
      checkInTime: "",
      firstActivities: "",
    },
    days: Array.from({ length: 6 }, emptyDay),
    departure: {
      checkOutTime: "",
      lastActivities: "",
      departureTime: "",
      transferFromAccommodation: "",
      station: "",
    },
    wishlist: Array.from({ length: 3 }, () => ""),
    bookedActivities: [],
    restaurants: [],
    accommodation: {
      name: "",
      address: "",
      checkIn: "",
      checkOut: "",
      confirmation: "",
      notes: "",
    },
    budget: [
      "Transport",
      "Accommodation",
      "Food & drink",
      "Activities",
      "Shopping",
      "Other",
    ].map((category) => ({ id: uid(), category, planned: "", actual: "" })),
    expenses: [],
    packing: [
      section("Documents & money", [
        "Passport or ID",
        "Visa, if required",
        "Bank cards",
        "Cash",
        "Travel insurance",
        "Tickets",
        "Driving licence",
        "Copies of important documents",
      ]),
      section("Travel essentials", [
        "Day bag",
        "Reusable water bottle",
        "Sunglasses",
        "Umbrella",
        "Luggage tag",
        "Travel pillow",
        "Laundry bag",
      ]),
      section("Clothes & shoes", [
        "Everyday outfits",
        "Comfortable walking shoes",
        "Jacket or layers",
        "Sleepwear",
        "Underwear and socks",
        "Weather-specific items",
      ]),
      section("Toiletries", [
        "Toothbrush and toothpaste",
        "Skincare",
        "Haircare",
        "Deodorant",
        "Cosmetics",
        "Personal hygiene items",
      ]),
      section("Health & comfort", [
        "Prescription medication",
        "Pain relief",
        "Plasters",
        "Hand sanitiser",
        "Motion-sickness remedies",
        "Sunscreen",
        "Insect repellent",
        "Earplugs or sleep mask",
      ]),
      section("Technology", [
        "Phone and charger",
        "Power bank",
        "Plug adapter",
        "Headphones",
        "Camera",
        "Charging cables",
        "E-reader or tablet",
      ]),
    ],
    beforeYouGo: [
      section("Documents & bookings", [
        "Check passport/ID validity",
        "Check visa requirements",
        "Save travel insurance details",
        "Download booking confirmations",
        "Download transport tickets",
        "Save emergency contacts",
        "Make copies of important documents",
      ]),
      section("Travel preparation", [
        "Check weather forecast",
        "Check luggage restrictions",
        "Reserve airport/station transfer",
        "Confirm attraction bookings",
        "Check public holidays and closures",
        "Check local transport passes",
        "Arrange medication and prescriptions",
      ]),
      section("Home & connectivity", [
        "Arrange roaming or eSIM",
        "Download offline maps",
        "Download translation tools",
        "Save accommodation address",
        "Save booking confirmations offline",
        "Charge devices and power bank",
      ]),
      section("Home checklist", [
        "Secure doors and windows",
        "Pause deliveries",
        "Empty bins",
        "Unplug unnecessary devices",
        "Arrange pet or plant care",
        "Share itinerary with an emergency contact",
      ]),
      section("Money", [
        "Inform bank if necessary",
        "Check card fees",
        "Obtain local currency",
        "Set an emergency budget",
        "Store a backup payment method separately",
      ]),
    ],
    highlights: Array.from({ length: 3 }, () => ""),
  };
}
