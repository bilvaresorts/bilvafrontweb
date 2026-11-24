/**
 * Reference images.
 *
 * Every file under /public/images/ref comes from balitecture.com. They are used
 * on Bilva Resorts' confirmation that Balitecture gave permission. They show
 * Balitecture's villas, not Bilva's, so wherever one is shown as a picture
 * (rather than a darkened background) it carries the "Illustrative image" label.
 *
 * To replace one, drop a new file in /public/images and change its `src` here.
 */

export const ILLUSTRATIVE = "Illustrative image";

export type RefImage = { src: string; alt: string; position?: string };

const at = (name: string) => `/images/ref/${name}.jpg`;

export const ref = {
  /* Home */
  heroHome: {
    src: at("hero-home"),
    alt: "Timber and stone villa with hanging greenery, opening onto a turquoise pool",
  },
  intro: {
    src: at("intro"),
    alt: "White villa with arched glass doors beside a turquoise pool and tropical planting",
  },
  livingDining: {
    src: at("living-dining"),
    alt: "Open-plan dining and living room with a timber table and woven pendant lights",
  },
  bedroom: {
    src: at("bedroom"),
    alt: "Bedroom with a low bed, pendant lamps and a large artwork",
  },
  poolGarden: {
    src: at("pool-garden"),
    alt: "Long turquoise pool running through a tropical garden towards the villa",
  },

  /* Page heroes */
  heroWhiteVilla: {
    src: at("hero-white-villa"),
    alt: "White two-storey villa with black-framed windows around a turquoise pool",
  },
  heroOpenLiving: {
    src: at("hero-open-living"),
    alt: "Open living room under a planted roof, facing a private pool",
  },
  heroDuskVilla: {
    src: at("hero-dusk-villa"),
    alt: "Villa at dusk with warm interior lights and a small pool",
  },
  heroResortPool: {
    src: at("hero-resort-pool"),
    alt: "Long pool at dusk beside a villa with a timber-slatted roof",
  },
  heroPoolLifestyle: {
    src: at("hero-pool-lifestyle"),
    alt: "Pool terrace with a hanging chair and an open pavilion",
  },
  heroWhiteCourtyard: {
    src: at("hero-white-courtyard"),
    alt: "White villa with black-framed windows and a small pool, framed by banana leaves",
  },
  heroCourtyardPool: {
    src: at("hero-courtyard-pool"),
    alt: "Courtyard pool beside a dark stone wall and tropical planting",
  },
  heroGreyVilla: {
    src: at("hero-grey-villa"),
    alt: "Two-storey grey villa with planted terraces, seen across its pool",
  },
  heroGreenVilla: {
    src: at("hero-green-villa"),
    alt: "Villa with greenery hanging from its roof line, behind a blue pool",
  },
  heroGardenVilla: {
    src: at("hero-garden-villa"),
    alt: "Two-storey villa seen from its garden, with planting along the balcony",
  },
  heroJungleVilla: {
    src: at("hero-jungle-villa"),
    alt: "Glass-fronted villa with a steep roof and a pool, set among palms",
  },

  heroDuskLiving: {
    src: at("hero-dusk-living"),
    alt: "Pool at dusk beside an open, lit living room",
  },
  heroPoolLane: {
    src: at("hero-pool-lane"),
    alt: "Long turquoise pool between a timber-clad villa and a wall of tropical planting",
  },
  heroGardenWall: {
    src: at("hero-garden-wall"),
    alt: "Pool edged by a wall of tropical planting",
  },
  heroNightCourtyard: {
    src: at("hero-night-courtyard"),
    alt: "Courtyard pool lit at night, with planting behind",
  },

  /*
   * Stand-ins for things still to come: the bathroom render, the 360-degree
   * tour, the floor plan and the site layout. The last two are photographs on
   * purpose. Another developer's drawing is never shown as Bilva's plan.
   */
  bathroom: {
    src: at("bathroom"),
    alt: "Bathroom with a double vanity, two lit mirrors and a stone-walled shower",
  },
  tourLiving: {
    src: at("tour-open-living"),
    alt: "Open living room and kitchen bar under a timber ceiling, looking out to the garden",
  },
  planLiving: {
    src: at("plan-living-kitchen"),
    alt: "Sunken sofa and kitchen bar opening onto a pool",
  },
  siteAerial: {
    src: at("site-aerial"),
    alt: "A villa development seen from the air, among fields and trees",
  },

  /* Model villa and investment */
  exterior: {
    src: at("exterior"),
    alt: "Villa exterior with planted roof edges, seen across the pool",
  },
  kitchen: {
    src: at("kitchen"),
    alt: "Kitchen with a lit stone counter, bar stools and dark cabinetry",
  },
  outdoorLounge: {
    src: at("outdoor-lounge"),
    alt: "Outdoor lounge with white sofas under a timber roof",
  },
  poolDeck: {
    src: at("pool-deck"),
    alt: "Timber deck with a lounge seat beside a narrow pool",
  },

  /* Darkened backgrounds behind the enquiry bands. Decorative, so no alt text is read out. */
  bandNightPool: { src: at("band-night-pool"), alt: "" },
  bandDuskLoungers: { src: at("band-dusk-loungers"), alt: "" },
  bandBlueDusk: { src: at("band-blue-dusk"), alt: "" },
  bandPavilionPool: { src: at("band-pavilion-pool"), alt: "" },
  bandGardenDusk: { src: at("band-garden-dusk"), alt: "" },
  bandVillaDusk: { src: at("band-villa-dusk"), alt: "" },
  bandTerraceDusk: { src: at("band-terrace-dusk"), alt: "" },
  bandNightGarden: { src: at("band-night-garden"), alt: "" },
  bandJungleVilla: { src: at("band-jungle-villa"), alt: "" },
  bandRooftop: { src: at("band-rooftop"), alt: "" },
  bandPoolBedroom: { src: at("band-pool-bedroom"), alt: "" },
  bandLongPool: { src: at("band-long-pool"), alt: "" },
  bandTerraces: { src: at("band-terraces"), alt: "" },
} satisfies Record<string, RefImage>;
