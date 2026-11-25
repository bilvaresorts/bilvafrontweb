/**
 * Gallery images.
 *
 * `kind` drives the corner caption:
 *   photo         a photograph supplied by Bilva Resorts
 *   render        an artist's impression supplied by Bilva Resorts
 *   illustrative  a reference image from balitecture.com (see src/lib/images.ts)
 */

export type GalleryCategory =
  | "Villa Exteriors"
  | "Villa Interiors"
  | "Private Pools"
  | "Hotel"
  | "Villa Naming"
  | "Site Progress";

export type GalleryKind = "render" | "photo" | "illustrative";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  kind: GalleryKind;
  categories: GalleryCategory[];
};

export const kindLabel: Record<GalleryKind, string> = {
  render: "Artist's impression",
  photo: "Photograph",
  illustrative: "Illustrative image",
};

const refImage = (
  name: string,
  width: number,
  height: number,
  caption: string,
  alt: string,
  categories: GalleryCategory[],
): GalleryImage => ({
  src: `/images/ref/${name}.jpg`,
  alt,
  caption,
  width,
  height,
  kind: "illustrative",
  categories,
});

/** The six tiles shown on the Home page, in order. */
export const galleryHighlights: GalleryImage[] = [
  refImage(
    "gallery-arched-pools",
    2880,
    1920,
    "Arched terrace between twin pools",
    "Cream stone villa with arched openings and twin pools either side of a walkway",
    ["Villa Exteriors", "Private Pools"],
  ),
  refImage(
    "gallery-sunken-lounge",
    2000,
    1500,
    "Sunken lounge facing the pool",
    "Sunken lounge with striped cushions looking out to a pool",
    ["Villa Interiors"],
  ),
  refImage(
    "gallery-pool-deck",
    2400,
    1600,
    "Pool deck with loungers",
    "Timber pool deck with sun loungers and parasols",
    ["Private Pools"],
  ),
  refImage(
    "gallery-dining-pavilion",
    2400,
    1800,
    "Open dining and lounge pavilion",
    "Open dining and lounge pavilion under a timber lattice roof",
    ["Villa Interiors"],
  ),
  refImage(
    "gallery-pool-niche",
    2400,
    1800,
    "Loungers beside a pool waterfall",
    "Sun loungers in a white arched niche beside a pool waterfall",
    ["Private Pools"],
  ),
  refImage(
    "gallery-pool-loungers",
    2880,
    1923,
    "Poolside under a timber roof",
    "Sun loungers beside a narrow pool, under a timber-lined roof",
    ["Villa Exteriors", "Private Pools"],
  ),
];

/** The villa render is kept out of this list on purpose: it appears only on the Villas for sale card. */
export const galleryImages: GalleryImage[] = [
  ...galleryHighlights,
  {
    src: "/images/hotel-pool.jpg",
    alt: "Three-storey hotel with arched ground floor and balconies behind an infinity pool",
    caption: "The hotel and its pool deck",
    width: 1536,
    height: 963,
    kind: "render",
    categories: ["Hotel"],
  },
  refImage(
    "gallery-thatch-lounge",
    2400,
    1600,
    "Lounge with a hanging chair",
    "Thatched lounge with a hanging rattan chair, an arch and a plunge pool",
    ["Villa Interiors", "Private Pools"],
  ),
  {
    src: "/images/villa-sravana-entrance.jpg",
    alt: "Villa entrance at dusk with a bronze Villa Sravana nameplate beside glass doors to the living room",
    caption: "Villa Sravana: entrance and nameplate",
    width: 898,
    height: 1528,
    kind: "render",
    categories: ["Villa Interiors", "Villa Naming"],
  },
  {
    src: "/images/hotel-lawn.jpg",
    alt: "Hotel event lawn with a white arched pavilion and seating, looking out to the sea",
    caption: "The hotel lawn, looking towards the sea",
    width: 1536,
    height: 1024,
    kind: "render",
    categories: ["Hotel"],
  },
  refImage(
    "gallery-kitchen-living",
    2400,
    1603,
    "Kitchen bar and sunken sofa",
    "White kitchen bar and sunken sofa under a timber ceiling with rattan pendants",
    ["Villa Interiors"],
  ),
  {
    src: "/images/villa-sravana.jpg",
    alt: "Lawn, parasol and blue plunge pool at Villa Sravana, framed by large tropical leaves",
    caption: "Villa Sravana: garden and pool",
    width: 1207,
    height: 1600,
    kind: "photo",
    categories: ["Private Pools", "Villa Exteriors"],
  },
  refImage(
    "gallery-garden-bath",
    2400,
    1603,
    "Garden bathtub",
    "Stone bathtub on white pebbles in front of a bamboo screen",
    ["Villa Interiors"],
  ),
  {
    src: "/images/site-entrance.jpg",
    alt: "Red-earth approach road cut through the hillside, with street lights and a valley beyond",
    caption: "The approach road to the site",
    width: 1196,
    height: 806,
    kind: "photo",
    categories: ["Site Progress"],
  },
  {
    src: "/images/nakshatra-board.jpg",
    alt: "Garden signboard carrying a plaque for each of the 27 Nakshatras",
    caption: "Concept for the Nakshatra name boards",
    width: 1089,
    height: 1177,
    kind: "render",
    categories: ["Villa Naming"],
  },
];

export const galleryCategories: GalleryCategory[] = [
  "Villa Exteriors",
  "Villa Interiors",
  "Private Pools",
  "Hotel",
  "Villa Naming",
  "Site Progress",
];
