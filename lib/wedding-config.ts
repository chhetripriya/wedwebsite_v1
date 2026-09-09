export const wedding = {
  bride: {
    name: "Priya Chhetri",
    firstName: "Priya",
    father: "Mr. Amar Bahadur",
    mother: "Smt. Leela Devi",
    message:
      "With hearts full of joy and gratitude, we invite you to celebrate the beautiful beginning of Priya & Sunil’s life together. Your love, blessings and presence will make these precious moments even more special.",
  },
  groom: {
    name: "Sunil Tandon",
    firstName: "Sunil",
    father: "Mr. Durga Bahadur",
    mother: "Smt. Ishwari Devi",
    message:
      "You are my calm, my laughter and my favourite adventure. Here's to a lifetime of building our story together, one day at a time.",
  },
  weddingDate: new Date("2026-11-22T00:00:00+05:30"),
  weddingDateLabel: "21 · 11 · 2026",
  weddingDateLong: "21st November 2026",
  venue: {
    name: "Lakshmi Farmhouse",
    mapsUrl: "https://maps.app.goo.gl/S9PpcyM5qW5HdirBA",
    note: "All celebrations will be hosted at Lakshmi Farmhouse. Ample parking is available on the grounds.",
  },
  // WhatsApp number that receives RSVP messages (country code, no + or spaces)
  rsvpWhatsApp: "917903557640",
  hashtag: "#PriyaWedsSunil",
}

export type WeddingEvent = {
  id: string
  name: string
  tagline: string
  date: string
  time: string
  venue: string
  themeName: string
  colors: string[]
  accent: string
}

export const events: WeddingEvent[] = [
  {
    id: "mehendi",
    name: "Mehendi",
    tagline: "Henna, giggles and a garden full of colour",
    date: "19 November 2026",
    time: "5:00 PM onwards",
    venue: "Lakshmi Farmhouse",
    themeName: "Teal & Blue Shades",
    colors: ["#0F766E", "#14B8A6", "#5EEAD4", "#38BDF8", "#1E6FA8"],
    accent: "#5EEAD4",
  },
  {
    id: "haldi",
    name: "Haldi",
    tagline: "Sunshine, turmeric and blessings",
    date: "20 November 2026",
    time: "11:00 AM onwards",
    venue: "Lakshmi Farmhouse",
    themeName: "Pastel Shades",
    colors: ["#F7C8D4", "#D8CCF1", "#CBE8DD", "#FBE7B5", "#CFE2F3"],
    accent: "#F7C8D4",
  },
  {
    id: "sangeet",
    name: "Sangeet",
    tagline: "An evening of music, dance and dhol",
    date: "20 November 2026",
    time: "6:00 PM onwards",
    venue: "Lakshmi Farmhouse",
    themeName: "Shimmer & Gold",
    colors: ["#C9A24A", "#E9D28A", "#F5E9C8", "#2B2340", "#7C5CB0"],
    accent: "#E9D28A",
  },
  {
    id: "wedding",
    name: "Wedding",
    tagline: "A beautiful morning of sacred vows and blessings",
    date: "21 November 2026",
    time: "11:00 AM",
    venue: "Lakshmi Farmhouse",
    themeName: "Royal Red & Ivory",
    colors: ["#9B1B30", "#C8324A", "#E8B4B8", "#F8F1E7", "#D4AF37"],
    accent: "#E8B4B8",
  },
  {
    id: "reception",
    name: "Reception",
    tagline: "A joyful afternoon of love, laughter and togetherness",
    date: "21 November 2026",
    time: "1:30 PM",
    venue: "Lakshmi Farmhouse",
    themeName: "Champagne & Blush",
    colors: ["#F3E2C7", "#E7C6B0", "#F5CBD3", "#B08D57", "#FFF8F0"],
    accent: "#F5CBD3",
  },
]
