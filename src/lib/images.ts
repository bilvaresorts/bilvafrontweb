/**
 * Reference images.
 *
 * Every file under /public/images/ref comes from balitecture.com. They are used
 * on Bilva Resorts' confirmation that Balitecture gave permission. They show
 * Balitecture's villas, not Bilva's, so wherever one is shown as a picture
 * (rather than a darkened background) it carries the "Illustrative image" label.
 *
 * Resolution: each file is kept at the size Balitecture publishes it, which is
 * between 1,600 and 2,880 px wide. Nothing larger exists on their site. Heroes
 * and backgrounds use the 2,400 to 2,880 px photographs; the 1,600 px images
 * are used only where a picture is shown at half width or less.
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
    alt: "Open-air dining under a thatched roof, beside a pool and an arched timber door",
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
  heroGreyVilla: {
    src: at("hero-grey-villa"),
    alt: "Two-storey grey villa with planted terraces, seen across its pool",
  },
  heroThatchPool: {
    src: at("hero-thatch-pool"),
    alt: "Curved pool between cream stone walls and a thatched pavilion, under a blue sky",
  },
  heroArchedPool: {
    src: at("hero-arched-pool"),
    alt: "Villa at dusk with an arched window and two loungers beside a lit pool",
  },
  heroTimberPool: {
    src: at("hero-timber-pool"),
    alt: "Single-storey villa with a timber-lined roof and glass doors along a turquoise pool",
  },
  heroPoolLoungers: {
    src: at("gallery-pool-loungers"),
    alt: "Sun loungers beside a narrow pool, under a timber-lined roof",
  },
  heroPoolLane: {
    src: at("hero-pool-lane"),
    alt: "Long turquoise pool between a timber-clad villa and a wall of tropical planting",
  },
  heroGardenWall: {
    src: at("hero-garden-wall"),
    alt: "Pool edged by a wall of tropical planting",
  },
  heroPoolParasols: {
    src: at("gallery-pool-deck"),
    alt: "Timber pool deck with sun loungers and parasols",
  },

  /*
   * Stand-ins for things still to come: the bathroom render, the floor plan and
   * the site layout. The last two are photographs on purpose. Another
   * developer's drawing is never shown as Bilva's plan.
   */
  bathroom: {
    src: at("bathroom"),
    alt: "Bathroom with a double vanity, two lit mirrors and a stone-walled shower",
  },
  planLiving: {
    src: at("plan-living-kitchen"),
    alt: "Sunken sofa and kitchen bar opening onto a pool",
  },
  siteAerial: {
    src: at("site-aerial"),
    alt: "A villa development seen from the air, among fields and trees",
  },

  /* Rooms and smaller pictures */
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
  bandDuskLoungers: { src: at("band-dusk-loungers"), alt: "" },
  bandBlueDusk: { src: at("band-blue-dusk"), alt: "" },
  bandVillaDusk: { src: at("band-villa-dusk"), alt: "" },
  bandTerraceDusk: { src: at("band-terrace-dusk"), alt: "" },
  bandDuskPool: { src: at("band-dusk-pool"), alt: "" },
  bandRooftop: { src: at("band-rooftop"), alt: "" },
  bandPoolPlants: { src: at("band-pool-plants"), alt: "" },
  bandPoolStone: { src: at("band-pool-stone"), alt: "" },
  bandNightCourtyard: { src: at("band-night-courtyard"), alt: "" },
} satisfies Record<string, RefImage>;
