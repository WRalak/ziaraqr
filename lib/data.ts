import { Trip } from "./types";

export const TRIPS: Trip[] = [
  {
    id: 308,
    packageCode: "18bb6488c26998c5-0c0b7459",
    sourceUrl: "https://ziarra.world/package/18bb6488c26998c5-0c0b7459",
    name: "Yacht Party",
    region: "Kenyan Coast",
    loc: "Mombasa",
    date: "Jul 31–Aug 2, 2026",
    price: 20700,
    seats: 20,
    left: 20,
    difficulty: "Easy",
    vibes: ["Beach", "Party", "Adventure"],
    grad: "linear-gradient(160deg,#1b2a2e,#0a0a0b 70%)",
    image:
      "https://business.ziarra.world/api/uploads/67d30181d5404fbf76be330f147a1d0c.jpg",
    icon: "beach",
    host: "Virgin Explorers",
    hostTag: "Official Ziarra provider",
    going: 0,
    deadline: true,
    desc: "A three-day coastal escape combining a private yacht party, quad biking across the Mambrui Sand Dunes, and a sunset visit to Marafa Hell's Kitchen.",
    highlights: [
      "Private yacht party along the Kenyan coast",
      "Quad biking at Mambrui Sand Dunes",
      "Guided visit to Marafa Hell's Kitchen",
      "Sunset views, music, entertainment, and photography",
    ],
    included: [
      "Return SGR tickets and station transfers",
      "2 nights shared accommodation",
      "Breakfast and dinner",
      "Ground transport for scheduled activities",
      "Professional guide and trip coordination",
    ],
  },
  {
    id: 315,
    packageCode: "18bd4f1b98a6049b-4e45d019",
    sourceUrl: "https://ziarra.world/package/18bd4f1b98a6049b-4e45d019",
    name: "Jinja & Kampala Overland Safari",
    region: "Eastern & Central Uganda",
    loc: "Jinja & Kampala",
    date: "Sep 24–28, 2026",
    price: 54722.75,
    seats: 100,
    left: 100,
    difficulty: "Easy",
    vibes: ["Adventure", "City", "Nature"],
    grad: "linear-gradient(160deg,#1d291d,#0a0a0b 70%)",
    image:
      "https://business.ziarra.world/api/uploads/061e07df403c427e607f77b9cc54c7ed.jpeg",
    icon: "safari",
    host: "Herikwetu Travels Company Ltd",
    hostTag: "Official Ziarra provider",
    going: 0,
    desc: "A five-day overland journey from Nairobi to Uganda, combining the Source of the Nile and Jinja's river experiences with Kampala's leading cultural and historic landmarks.",
    highlights: [
      "Source of the Nile tour and sunset cruise",
      "Jinja walking tour and Itanda Falls",
      "Kyabazinga Palace visit in Bugembe",
      "Kampala city and cultural landmarks tour",
      "Return overland journey from Nairobi",
    ],
    included: [
      "Overland truck transport from Nairobi",
      "4 nights budget accommodation",
      "Guided Jinja and Kampala excursions",
      "Cross-border trip coordination",
    ],
  },
  {
    id: 313,
    packageCode: "18bcaf2050422618-179ba258",
    sourceUrl: "https://ziarra.world/package/18bcaf2050422618-179ba258",
    name: "The Ultimate Naivasha Adventure",
    region: "Rift Valley",
    loc: "Naivasha",
    date: "Aug 20–22, 2026",
    price: 21942.5,
    seats: 10,
    left: 10,
    difficulty: "Moderate",
    vibes: ["Adventure", "Hiking", "Nature", "Wildlife"],
    grad: "linear-gradient(160deg,#182620,#0a0a0b 70%)",
    image:
      "https://business.ziarra.world/api/uploads/0d750214b91540e56f511af73a57eda4.jpeg",
    icon: "mountain",
    host: "Wonderland Aventura",
    hostTag: "Official Ziarra provider",
    going: 0,
    desc: "Explore Naivasha's signature landscapes with a Mount Longonot hike, Lake Naivasha boat ride, and a guided Crescent Island walk among freely roaming wildlife.",
    highlights: [
      "Guided Mount Longonot hike",
      "Lake Naivasha boat ride",
      "Crescent Island wildlife walk",
      "Great Rift Valley views",
      "Time to relax at a modern glamping stay",
    ],
    included: [
      "Return group transport from Nairobi",
      "2 nights glamping accommodation",
      "Bed and breakfast",
      "Guided activities and excursions",
    ],
  },
];

export const VIBES = [
  "All",
  "Beach",
  "Adventure",
  "Hiking",
  "Party",
  "Wildlife",
  "Nature",
  "City",
];

export const DEST_CHIPS = ["Mombasa", "Jinja", "Kampala", "Naivasha"];

export function getTrip(id: number) {
  return TRIPS.find((trip) => trip.id === id);
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
