export interface DestinationInfo {
  city: string;
  country: string;
  region: string;
}

// Per-region CSS gradients for the cover background
const REGION_GRADIENTS: Record<string, string> = {
  italy:
    "radial-gradient(120% 80% at 20% 0%, #d4956a 0%, transparent 55%)," +
    "radial-gradient(110% 70% at 85% 10%, #c8745a 0%, transparent 50%)," +
    "radial-gradient(120% 90% at 50% 100%, #8b5e3c 0%, transparent 45%)," +
    "radial-gradient(100% 100% at 60% 55%, #e8c49a 0%, transparent 55%)," +
    "linear-gradient(#f4ede0, #e8d5b8)",
  spain:
    "radial-gradient(120% 80% at 20% 0%, #e87a4a 0%, transparent 55%)," +
    "radial-gradient(110% 70% at 85% 10%, #d9530f 0%, transparent 50%)," +
    "radial-gradient(120% 90% at 50% 100%, #c04a1a 0%, transparent 45%)," +
    "radial-gradient(100% 100% at 60% 55%, #f4a259 0%, transparent 55%)," +
    "linear-gradient(#f5ede3, #f0d8c0)",
  greece:
    "radial-gradient(120% 80% at 20% 0%, #4a8fd9 0%, transparent 55%)," +
    "radial-gradient(110% 70% at 85% 10%, #1a6fa8 0%, transparent 50%)," +
    "radial-gradient(120% 90% at 50% 100%, #2980b9 0%, transparent 45%)," +
    "radial-gradient(100% 100% at 60% 55%, #87ceeb 0%, transparent 55%)," +
    "linear-gradient(#e8f4f8, #d0e8f2)",
  portugal:
    "radial-gradient(120% 80% at 20% 0%, #1a7b6e 0%, transparent 55%)," +
    "radial-gradient(110% 70% at 85% 10%, #2d9e8a 0%, transparent 50%)," +
    "radial-gradient(120% 90% at 50% 100%, #166355 0%, transparent 45%)," +
    "radial-gradient(100% 100% at 60% 55%, #5ab8a8 0%, transparent 55%)," +
    "linear-gradient(#e8f5f2, #d0ece6)",
  france:
    "radial-gradient(120% 80% at 20% 0%, #9b8fc4 0%, transparent 55%)," +
    "radial-gradient(110% 70% at 85% 10%, #7a6da0 0%, transparent 50%)," +
    "radial-gradient(120% 90% at 50% 100%, #6b5fa8 0%, transparent 45%)," +
    "radial-gradient(100% 100% at 60% 55%, #c4b8e8 0%, transparent 55%)," +
    "linear-gradient(#f0ecf8, #e4ddf2)",
  scandinavia:
    "radial-gradient(120% 80% at 20% 0%, #1a3a5c 0%, transparent 55%)," +
    "radial-gradient(110% 70% at 85% 10%, #2d6a9e 0%, transparent 50%)," +
    "radial-gradient(120% 90% at 50% 100%, #3a4f6b 0%, transparent 45%)," +
    "radial-gradient(100% 100% at 60% 55%, #4a90d9 0%, transparent 55%)," +
    "linear-gradient(#e4eef8, #cce0f0)",
  "eastern-europe":
    "radial-gradient(120% 80% at 20% 0%, #5c3a7a 0%, transparent 55%)," +
    "radial-gradient(110% 70% at 85% 10%, #8b6ba8 0%, transparent 50%)," +
    "radial-gradient(120% 90% at 50% 100%, #4a2d5e 0%, transparent 45%)," +
    "radial-gradient(100% 100% at 60% 55%, #d4af37 0%, transparent 55%)," +
    "linear-gradient(#f0ecf8, #e4d4f0)",
  malta:
    "radial-gradient(120% 80% at 20% 0%, #d4af72 0%, transparent 55%)," +
    "radial-gradient(110% 70% at 85% 10%, #1a6fa8 0%, transparent 50%)," +
    "radial-gradient(120% 90% at 50% 100%, #c4963c 0%, transparent 45%)," +
    "radial-gradient(100% 100% at 60% 55%, #87ceeb 0%, transparent 55%)," +
    "linear-gradient(#f5f0e4, #ece8d4)",
  islands:
    "radial-gradient(120% 80% at 20% 0%, #2d9e8a 0%, transparent 55%)," +
    "radial-gradient(110% 70% at 85% 10%, #1a7b6e 0%, transparent 50%)," +
    "radial-gradient(120% 90% at 50% 100%, #1a6fa8 0%, transparent 45%)," +
    "radial-gradient(100% 100% at 60% 55%, #87ceeb 0%, transparent 55%)," +
    "linear-gradient(#e8f5f2, #d0ece6)",
};

export const DESTINATIONS: DestinationInfo[] = [
  // Italy
  { city: "Rome", country: "Italy", region: "italy" },
  { city: "Florence", country: "Italy", region: "italy" },
  { city: "Venice", country: "Italy", region: "italy" },
  { city: "Milan", country: "Italy", region: "italy" },
  { city: "Puglia", country: "Italy", region: "italy" },
  { city: "Tuscany", country: "Italy", region: "italy" },
  { city: "Lake Como", country: "Italy", region: "italy" },
  { city: "Amalfi Coast", country: "Italy", region: "italy" },
  { city: "Sicily", country: "Italy", region: "italy" },
  { city: "Sardinia", country: "Italy", region: "italy" },
  // Spain
  { city: "Barcelona", country: "Spain", region: "spain" },
  { city: "Madrid", country: "Spain", region: "spain" },
  { city: "Valencia", country: "Spain", region: "spain" },
  { city: "Malaga", country: "Spain", region: "spain" },
  { city: "Marbella", country: "Spain", region: "spain" },
  { city: "Sevilla", country: "Spain", region: "spain" },
  { city: "Toledo", country: "Spain", region: "spain" },
  { city: "Andalusia", country: "Spain", region: "spain" },
  { city: "Mallorca", country: "Spain", region: "islands" },
  { city: "Ibiza", country: "Spain", region: "islands" },
  // Greece
  { city: "Athens", country: "Greece", region: "greece" },
  { city: "Chalkidiki", country: "Greece", region: "greece" },
  { city: "Thasos", country: "Greece", region: "greece" },
  { city: "Kefalonia", country: "Greece", region: "greece" },
  { city: "Santorini", country: "Greece", region: "greece" },
  { city: "Paros", country: "Greece", region: "greece" },
  { city: "Crete", country: "Greece", region: "greece" },
  // Portugal
  { city: "Lisbon", country: "Portugal", region: "portugal" },
  { city: "Porto", country: "Portugal", region: "portugal" },
  { city: "Cascais", country: "Portugal", region: "portugal" },
  { city: "Sintra", country: "Portugal", region: "portugal" },
  { city: "Cabo da Roca", country: "Portugal", region: "portugal" },
  { city: "Aveiro", country: "Portugal", region: "portugal" },
  { city: "Coimbra", country: "Portugal", region: "portugal" },
  { city: "Nazare", country: "Portugal", region: "portugal" },
  { city: "Obidos", country: "Portugal", region: "portugal" },
  { city: "Douro Valley", country: "Portugal", region: "portugal" },
  { city: "Algarve", country: "Portugal", region: "portugal" },
  { city: "Madeira", country: "Portugal", region: "islands" },
  { city: "The Azores", country: "Portugal", region: "islands" },
  // France
  { city: "Paris", country: "France", region: "france" },
  { city: "Lyon", country: "France", region: "france" },
  { city: "Avignon", country: "France", region: "france" },
  { city: "Nice", country: "France", region: "france" },
  { city: "Provence", country: "France", region: "france" },
  { city: "French Riviera", country: "France", region: "france" },
  // Malta
  { city: "Malta", country: "Malta", region: "malta" },
  // Eastern Europe & nearby
  { city: "Budapest", country: "Hungary", region: "eastern-europe" },
  { city: "Vienna", country: "Austria", region: "eastern-europe" },
  { city: "Prague", country: "Czech Republic", region: "eastern-europe" },
  { city: "Copenhagen", country: "Denmark", region: "eastern-europe" },
  { city: "Amsterdam", country: "Netherlands", region: "eastern-europe" },
  { city: "Warsaw", country: "Poland", region: "eastern-europe" },
  { city: "Sofia", country: "Bulgaria", region: "eastern-europe" },
  { city: "Kraków", country: "Poland", region: "eastern-europe" },
  { city: "Varna", country: "Bulgaria", region: "eastern-europe" },
  // Scandinavia
  { city: "Lapland", country: "Finland", region: "scandinavia" },
  { city: "Tromso", country: "Norway", region: "scandinavia" },
];

export function getCoverGradient(city: string): string {
  const dest = DESTINATIONS.find((d) => d.city === city);
  const region = dest?.region ?? "italy";
  return REGION_GRADIENTS[region] ?? REGION_GRADIENTS["italy"];
}

export function getDestinationInfo(city: string): DestinationInfo | undefined {
  return DESTINATIONS.find((d) => d.city === city);
}

// Group destinations by country for the select dropdown
export const DESTINATION_GROUPS: { label: string; cities: string[] }[] = [
  {
    label: "Italy",
    cities: DESTINATIONS.filter((d) => d.country === "Italy").map((d) => d.city),
  },
  {
    label: "Spain",
    cities: DESTINATIONS.filter((d) => d.country === "Spain").map((d) => d.city),
  },
  {
    label: "Greece",
    cities: DESTINATIONS.filter((d) => d.country === "Greece").map((d) => d.city),
  },
  {
    label: "Portugal",
    cities: DESTINATIONS.filter((d) => d.country === "Portugal").map((d) => d.city),
  },
  {
    label: "France",
    cities: DESTINATIONS.filter((d) => d.country === "France").map((d) => d.city),
  },
  {
    label: "Malta",
    cities: ["Malta"],
  },
  {
    label: "Eastern Europe",
    cities: DESTINATIONS.filter((d) => d.region === "eastern-europe").map(
      (d) => d.city,
    ),
  },
  {
    label: "Scandinavia",
    cities: DESTINATIONS.filter((d) => d.region === "scandinavia").map(
      (d) => d.city,
    ),
  },
];
