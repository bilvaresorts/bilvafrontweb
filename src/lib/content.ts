/**
 * Page content for the Home page.
 *
 * Source tags follow the PRD:
 *   [sheet]    taken from the Bilva price sheet
 *   [brief]    supplied in the project brief or brochure
 *   [proposed] written for approval
 * Nothing here is invented project data. Figures marked "illustration" are
 * arithmetic examples, not forecasts.
 */

import { ILLUSTRATIVE, ref } from "./images";

const IMPRESSION = "Artist's impression";

/** [sheet] Standard cost sheet, Part A + Part B. */
export const price = {
  total: 13600000,
  fromLabel: "₹1.36 Cr",
  bookingAmount: 3132000,
  footnote:
    "Price covers the villa, villa amenities and interiors. GST, registration and statutory charges are extra. Prices may change.",
  stages: [
    { share: "20%", when: "On booking, with the Agreement of Sale" },
    { share: "35%", when: "At the start of infrastructure work" },
    { share: "40%", when: "At the start of the ground floor slab" },
    { share: "5%", when: "On handover" },
  ],
};

/** [brief] + [sheet] */
export const heroFacts = [
  { value: "40", label: "Private villas" },
  { value: "2", label: "Bedrooms in every villa" },
  { value: "Private pool", label: "With every villa" },
  { value: "2,000 sq ft", label: "Built-up area" },
];

/** [sheet] */
export const inclusions = [
  {
    title: "The villa",
    items: ["2,000 sq ft built-up area", "Two bedrooms", "Plot of 40 ft × 80 ft", "8 ft compound wall"],
  },
  {
    title: "Villa amenities",
    items: ["Private swimming pool", "Sun loungers by the pool", "Gazebo", "Outdoor shower"],
  },
  {
    title: "Interiors",
    items: [
      "Two 1.5-ton air conditioners",
      "Beds with 8-inch mattresses",
      "65-inch television and TV unit",
      "Sofa and dining table",
      "Fridge, gas stove and chimney",
      "Heat pump, curtains and mats",
    ],
  },
];

/** [sheet] Listed as resort amenities on the price sheet. */
export const resortAmenities = [
  "Common pool",
  "Restaurant",
  "Banquet hall",
  "Spa",
  "Game zone",
  "Coffee shop",
];

/**
 * [proposed] copy. The images are reference images from balitecture.com (see
 * src/lib/images.ts), so each carries the "Illustrative image" label. An empty
 * `src` shows a labelled placeholder.
 */
export const villaSpaces = [
  {
    title: "Living and dining",
    text: "A furnished living room with a sofa, dining table and 65-inch television, ready at handover.",
    src: ref.livingDining.src,
    alt: ref.livingDining.alt,
    note: ILLUSTRATIVE,
  },
  {
    title: "Two bedrooms",
    text: "Both bedrooms come with beds and mattresses. Two air conditioners are included.",
    src: ref.bedroom.src,
    alt: ref.bedroom.alt,
    note: ILLUSTRATIVE,
  },
  {
    title: "Pool and garden",
    text: "Your own swimming pool with sun loungers, a gazebo and an outdoor shower.",
    src: ref.poolGarden.src,
    alt: ref.poolGarden.alt,
    note: ILLUSTRATIVE,
  },
];

/** [brief] Six-step journey from the rental income brief. */
export const journey = [
  {
    title: "Purchase your villa",
    text: "Reserve with the booking amount and pay in four stages linked to construction.",
  },
  {
    title: "Personalise it",
    text: "Give your villa a name inspired by your Nakshatram.",
  },
  {
    title: "Enjoy your holiday home",
    text: "Stay whenever you wish. The villa is yours.",
  },
  {
    title: "Make it available",
    text: "If you choose, Bilva lists your villa for holiday rentals while you are away.",
  },
  {
    title: "Welcome guests",
    text: "Bilva looks after bookings, check-in, housekeeping and guest support.",
  },
  {
    title: "Generate rental revenue",
    text: "Income depends on bookings, season and costs. It is not guaranteed.",
  },
];

/** [brief] Themes from the Gokarna audience chart, shown without percentages. */
export const themes = [
  {
    title: "Spiritual travel",
    text: "Gokarna is a temple town, home to the Mahabaleshwar Temple.",
  },
  {
    title: "Beach life",
    text: "Om, Kudle, Half Moon and Paradise beaches line the coast south of the town.",
  },
  {
    title: "Family holidays",
    text: "A private pool and garden give every generation room of its own.",
  },
  {
    title: "Adventure",
    text: "Coastal walking trails lead from one beach to the next.",
  },
  {
    title: "Retirement",
    text: "A quieter pace of life near the sea, in a home that is your own.",
  },
  {
    title: "Global visitors",
    text: "Gokarna draws travellers from across India and abroad.",
  },
];

/** [proposed] Distances are added once the site pin is confirmed. */
export const nearbyPlaces = [
  "Mahabaleshwar Temple",
  "Gokarna Main Beach",
  "Kudle Beach",
  "Om Beach",
  "Half Moon Beach",
  "Paradise Beach",
  "Gokarna Road railway station",
];

/** [proposed] Only questions answerable from confirmed facts. */
export const faqs = [
  {
    q: "What is included in the villa price?",
    a: "The price from ₹1.36 Cr covers the two-bedroom villa with its compound wall, the villa amenities (private pool, sun loungers, gazebo and outdoor shower) and the interiors, including air conditioners, beds, television, sofa, dining table and kitchen appliances. GST, registration and statutory charges are extra.",
  },
  {
    q: "How is the payment scheduled?",
    a: "In four stages: 20% on booking with the Agreement of Sale, 35% at the start of infrastructure work, 40% at the start of the ground floor slab and 5% on handover. The cost sheet we send you shows the rupee amount for each stage.",
  },
  {
    q: "Can I rent out my villa when I am not using it?",
    a: "Yes, if you choose to. Owners decide whether and when to make their villa available, and Bilva manages rentals for owners who opt in. Nothing obliges you to rent it out.",
  },
  {
    q: "Is the ₹1 lakh a month rental figure guaranteed?",
    a: "No. It is an illustration of what a given nightly rate and occupancy would produce before costs. Actual income depends on bookings, season, nightly rates, platform commissions and running costs, and returns are not guaranteed.",
  },
  {
    q: "Can I choose the name of my villa?",
    a: "Yes. Each villa can carry a name inspired by its owner's Nakshatram, such as Villa Sravana. You can preview a name on this site, and Bilva Resorts confirms it with you at booking.",
  },
];

/** "Sravana" is the spelling confirmed by Bilva Resorts. The other 26 are [proposed]. */
export const nakshatras = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Sravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
];

/**
 * Illustration only. ₹6,575 a night at 50% occupancy is the arithmetic that
 * reaches about ₹1 lakh a month gross. It is not a market rate.
 */
export const rentalIllustration = {
  nightlyRate: 6575,
  occupancy: 50,
  rateMin: 2000,
  rateMax: 25000,
  rateStep: 25,
  occupancyMin: 10,
  occupancyMax: 90,
};

export const calculatorDisclaimer =
  "All investment calculations are indicative estimates based on the assumptions entered. Actual returns depend on occupancy, rental rates, operating expenses, market conditions and other factors. Returns are not guaranteed.";

/* ------------------------------------------------------------------ */
/* Inner pages                                                         */
/* ------------------------------------------------------------------ */

/** [sheet] + [brief] */
export const atAGlance = [
  { value: "40", label: "Private villas" },
  { value: "2", label: "Bedrooms in every villa" },
  { value: "2,000 sq ft", label: "Built-up area" },
  { value: "40 ft × 80 ft", label: "Plot" },
  { value: "₹1.36 Cr", label: "Price from, plus taxes" },
];

/** [sheet] Notes printed on the cost sheet. */
export const charges = [
  {
    title: "GST",
    text: "GST at 5% applies to the villa. Your cost sheet shows the exact amount.",
  },
  {
    title: "Registration",
    text: "Registration charges are not included in the price and are paid separately.",
  },
  {
    title: "A-Khata (e-Swathu)",
    text: "Charges for generating the A-Khata are paid to the panchayat.",
  },
  {
    title: "Local taxes and rates",
    text: "Other taxes and local rates are charged as applicable.",
  },
];

/** [sheet] The payment stages, set out as the path to ownership. */
export const purchaseSteps = [
  { title: "Enquire", text: "Send an enquiry and we share the current cost sheet and availability." },
  { title: "Visit the site", text: "See the location and the model villa at a time that suits you." },
  { title: "Book", text: "Pay 20% on booking and sign the Agreement of Sale." },
  { title: "Infrastructure", text: "Pay 35% when infrastructure work starts." },
  { title: "Ground floor slab", text: "Pay 40% when the ground floor slab starts." },
  { title: "Handover", text: "Pay the final 5% and take the keys to your villa." },
];

/** [brief] Positioning from the project brief. */
export const reasonsToOwn = [
  { title: "Ownership", text: "You buy an individual villa on its own plot. It is yours." },
  { title: "Experiences", text: "A holiday home near the Karnataka coast, ready whenever you want to use it." },
  { title: "Personalisation", text: "Your villa can carry a name inspired by your Nakshatram." },
  { title: "Hospitality", text: "The villas sit within a resort, with a hotel under construction alongside." },
];

/** [brief] How the optional rental programme is meant to run. Fees are still to be published. */
export const rentalProgramme = [
  { title: "You own the villa", text: "The rental programme starts only after handover, and only if you want it.", who: "Owner" },
  { title: "You opt in", text: "You decide whether, and when, your villa is available to guests.", who: "Owner" },
  { title: "You keep your dates", text: "Block the days you want the villa for yourself.", who: "Owner" },
  {
    title: "Bilva lists the villa",
    text: "Your villa is offered on holiday rental platforms such as Airbnb and Booking.com, and for direct bookings.",
    who: "Bilva",
  },
  { title: "Bilva hosts the guests", text: "Bookings, check-in and guest support are handled for you.", who: "Bilva" },
  { title: "Bilva looks after the villa", text: "Housekeeping and maintenance between stays.", who: "Bilva" },
  { title: "You receive your share", text: "Bilva reports revenue and costs and pays the share due to you.", who: "Bilva" },
];

/** Room by room. Entries without `src` wait for renders. */
export const modelVillaRooms = [
  {
    title: "Exterior",
    text: "A single-storey villa in white, with full-height glazing facing the pool.",
    src: ref.exterior.src,
    alt: ref.exterior.alt,
    note: ILLUSTRATIVE,
  },
  {
    title: "Living room",
    text: "Sofa, dining table, TV unit and a 65-inch television are part of the interiors.",
    src: ref.livingDining.src,
    alt: ref.livingDining.alt,
    note: ILLUSTRATIVE,
  },
  {
    title: "Bedrooms",
    text: "Two bedrooms, each with a bed and 8-inch mattress. Two 1.5-ton air conditioners are included.",
    src: ref.bedroom.src,
    alt: ref.bedroom.alt,
    note: ILLUSTRATIVE,
  },
  {
    title: "Private pool",
    text: "Your own swimming pool, with sun loungers beside it.",
    src: ref.poolGarden.src,
    alt: ref.poolGarden.alt,
    note: ILLUSTRATIVE,
  },
  {
    title: "Kitchen",
    text: "Fitted with a fridge, gas stove and chimney.",
    src: ref.kitchen.src,
    alt: ref.kitchen.alt,
    note: ILLUSTRATIVE,
  },
  {
    title: "Bathrooms",
    text: "Hot water is supplied by a heat pump.",
    src: ref.bathroom.src,
    alt: ref.bathroom.alt,
    note: ILLUSTRATIVE,
  },
  {
    title: "Outdoor living",
    text: "A gazebo and an outdoor shower sit beside the pool.",
    src: ref.outdoorLounge.src,
    alt: ref.outdoorLounge.alt,
    note: ILLUSTRATIVE,
  },
  {
    title: "Entrance",
    text: "The name of your villa greets you at the door.",
    src: "/images/villa-sravana-entrance.jpg",
    alt: "Villa entrance at dusk with a bronze Villa Sravana nameplate",
    note: IMPRESSION,
  },
];

export const namingSteps = [
  { title: "Tell us your name", text: "It is used only to greet you and to prepare your enquiry." },
  { title: "Choose your Nakshatram", text: "Pick your birth star from the list of 27." },
  { title: "See your nameplate", text: "The preview shows the name of your villa the moment you choose." },
  { title: "Send your request", text: "Your chosen name travels with your enquiry to our team." },
  { title: "Confirm at booking", text: "Bilva Resorts confirms the name with you when you book." },
];

/** [proposed] Only answers that rest on confirmed facts. */
export const faqGroups = [
  {
    title: "Price and payment",
    items: [
      {
        q: "What is the price of a villa?",
        a: "Villas start from ₹1.36 Cr. GST, registration and statutory charges are extra. Send an enquiry and we will share the current cost sheet.",
      },
      faqs[0],
      faqs[1],
      {
        q: "Which taxes and charges are extra?",
        a: "GST at 5% applies to the villa. Registration charges are not included in the price, charges for generating the A-Khata (e-Swathu) are paid to the panchayat, and other taxes and local rates apply as applicable.",
      },
    ],
  },
  {
    title: "The villa",
    items: [
      {
        q: "How large is each villa?",
        a: "Each villa has two bedrooms and 2,000 sq ft of built-up area, on a plot of 40 ft by 80 ft, with its own swimming pool.",
      },
      {
        q: "How many villas are there?",
        a: "Bilva Resorts is a development of about 40 private villas in Gokarna, Karnataka.",
      },
      {
        q: "Does the villa come furnished?",
        a: "Yes. The price includes interiors: two air conditioners, beds and mattresses, a 65-inch television and TV unit, sofa, dining table, fridge, heat pump, curtains, gas stove and chimney.",
      },
      faqs[4],
    ],
  },
  {
    title: "Rental income",
    items: [
      faqs[2],
      {
        q: "Who manages rentals?",
        a: "Bilva manages rentals for owners who choose to join the rental programme, from listing the villa to hosting guests and housekeeping. Ask us for the current fee and payout terms.",
      },
      faqs[3],
    ],
  },
  {
    title: "Hotel and visits",
    items: [
      {
        q: "Is there a hotel at Bilva Resorts?",
        a: "Yes. A hotel is under construction as part of the same development. You can register your interest and we will contact you when reservations open.",
      },
      {
        q: "How do I arrange a site visit?",
        a: "Choose Site visit on the enquiry form and add your preferred date. Our team will confirm a time with you.",
      },
      {
        q: "Where is Bilva Resorts?",
        a: "At Survey No. 296/1, Uttara Kannada District, Karnataka 581319, inland and north of Gokarna town. The Location page has a map with a link to Google Maps.",
      },
    ],
  },
];
