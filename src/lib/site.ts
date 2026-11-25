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

/**
 * Six items. The logo goes Home; About, Testimonials, FAQ and Contact are in the
 * footer. Villas and Invest are one page each, so there are no dropdowns.
 */
export const nav: NavItem[] = [
  { label: "Villas", href: "/villas" },
  { label: "Hotel", href: "/hotel" },
  { label: "Booking", href: "/booking" },
  { label: "Invest", href: "/investment" },
  { label: "Location Highlights", href: "/location" },
  { label: "Gallery", href: "/gallery" },
];

export const footerNav = {
  villas: [
    { label: "The Villas", href: "/villas" },
    { label: "Room by Room", href: "/villas#rooms" },
    { label: "Your Villa · Your Identity", href: "/villas#naming" },
  ],
  invest: [
    { label: "Villa Investment", href: "/investment" },
    { label: "Rental Income", href: "/investment#rental" },
    { label: "ROI Calculator", href: "/investment#calculator" },
  ],
  explore: [
    { label: "Hotel", href: "/hotel" },
    { label: "Booking", href: "/booking" },
    { label: "Location Highlights", href: "/location" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
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
