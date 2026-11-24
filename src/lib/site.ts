/**
 * Site-wide settings.
 *
 * Everything here moves into the CMS "Site settings" document in milestone 5.
 * Empty strings mean "not supplied yet": the UI hides the matching element
 * instead of showing a placeholder value.
 */

export const site = {
  name: "Bilva Resorts",
  legalName: "", // Awaiting: selling company's legal name (PRD section 28, item 3)
  tagline: "Private pool villas in Gokarna",
  url: "https://www.bilvaresorts.com",
  copyrightYear: 2026,

  /** Flip to true at Gate 3. Until then every page is served with noindex. */
  launched: false,

  address: {
    line1: "Survey No. 296/1",
    line2: "Uttara Kannada District",
    locality: "Gokarna",
    region: "Karnataka",
    postalCode: "581319",
    country: "India",
  },

  /** Awaiting: PRD section 28, item 10. */
  contact: {
    phone: "",
    whatsapp: "", // digits only, with country code, e.g. 9198XXXXXXXX
    salesEmail: "",
    hotelEmail: "",
  },

  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },

  /** Awaiting: PRD section 28, item 2. Shown in the footer only when set. */
  reraNumber: "",

  features: {
    /** Hidden until sold and reserved counts are confirmed. */
    availability: false,
  },
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; note?: string }[];
};

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Villas",
    href: "/villas",
    children: [
      { label: "The Villas", href: "/villas", note: "Specification, price and site layout" },
      { label: "Model Villa", href: "/villas/model-villa", note: "Room by room" },
      {
        label: "Your Villa · Your Identity",
        href: "/villas/personalise",
        note: "A name inspired by your Nakshatram",
      },
    ],
  },
  {
    label: "Invest",
    href: "/investment",
    children: [
      { label: "Villa Investment", href: "/investment", note: "Price, process and costs" },
      {
        label: "Rental Income",
        href: "/investment/rental-income",
        note: "The optional rental programme",
      },
      { label: "ROI Calculator", href: "/investment/calculator", note: "Test your own assumptions" },
    ],
  },
  { label: "Hotel", href: "/hotel" },
  { label: "Gallery", href: "/gallery" },
  { label: "Location", href: "/location" },
  { label: "Testimonials", href: "/testimonials" },
];

export const footerNav = {
  villas: [
    { label: "The Villas", href: "/villas" },
    { label: "Model Villa", href: "/villas/model-villa" },
    { label: "Your Villa · Your Identity", href: "/villas/personalise" },
  ],
  invest: [
    { label: "Villa Investment", href: "/investment" },
    { label: "Rental Income", href: "/investment/rental-income" },
    { label: "ROI Calculator", href: "/investment/calculator" },
  ],
  explore: [
    { label: "About", href: "/about" },
    { label: "Hotel", href: "/hotel" },
    { label: "Gallery", href: "/gallery" },
    { label: "Location", href: "/location" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ],
};

/** The site in Google Maps, as supplied by Bilva Resorts. The illustrated map's pin opens it. */
export const mapsUrl = "https://maps.app.goo.gl/85XH6uJ6dTRD27FG6";

/** Coordinates of the same pin, taken from the Google Maps embed Bilva supplied. */
export const geo = { latitude: 14.587415, longitude: 74.328712 };

export function whatsappHref(message: string): string | null {
  if (!site.contact.whatsapp) return null;
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
