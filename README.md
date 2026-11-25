# Bilva Resorts website

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 and Motion.
Built to the approved PRD. Current state: all pages built; awaiting content,
contact details and the enquiry database and email connection.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000.

Other commands: `npm run build` for a production build, `npm run lint` for ESLint,
`npx tsc --noEmit` for a type check.

## Where things live

| Path | What it holds |
| --- | --- |
| `src/app/globals.css` | Design tokens: colours, letter-spacing, motion |
| `src/lib/site.ts` | Site settings: contact details, navigation, launch flag, RERA number |
| `src/lib/content.ts` | Home page content, price figures, Nakshatra list, calculator illustration |
| `src/lib/enquiry.ts` | Enquiry validation shared by the form and the API |
| `src/lib/enquiry-store.ts` | Where enquiries are saved |
| `src/lib/gallery.ts` | Gallery images, captions and categories |
| `src/lib/images.ts` | The reference images and where their files are |
| `src/components/` | Header, footer, form, dropdown, calculator, gallery, map, shared blocks |
| `src/components/Reveal.tsx` | The motion toolkit: reveals, staggered groups, image unveils, parallax |
| `src/components/home/` | The fifteen Home sections |
| `src/app/*/page.tsx` | One file per page |
| `src/app/api/enquiries/route.ts` | Enquiry API |

## Structure

The menu has seven items: Home, Villas, Hotel, Booking, Invest, Location Highlights and
Gallery. About, Testimonials, FAQ and Contact are in the footer.

The Home hero (`src/components/home/HomeHero.tsx`) carries one headline and three
panels: Villas, Hotel and Booking. Each panel links to its page, and pointing at one
fades the hero photograph to that offer. The section below repeats the three with
pictures and a line of detail.

Each topic is told in full on one page. Other pages link to it and do not repeat it.

| Topic | Told in full on |
| --- | --- |
| The villa: price, what is included, rooms, plans, amenities, naming | Villas |
| The money: costs, purchase steps, rental programme, calculator | Invest |
| Staying in a villa as a guest | Booking |
| The hotel | Hotel |
| The map, nearby places, connectivity, why Gokarna | Location Highlights |
| Pictures | Gallery |

Villas and Invest used to be three pages each. The old addresses redirect to the
matching part of the single page (see `redirects` in `next.config.ts`).

The full enquiry form sits on Home, Villas, Invest, Booking, Hotel and Contact. Every
other page ends with the slim `NextStep` band (`src/components/blocks.tsx`), whose
button opens the Contact form with the subject already chosen.

## Booking

Confirmed by Bilva Resorts on 24 November 2026: villa stays are not open yet, bookings
are taken as requests through the form, and no nightly rate is published. Nothing on
the Booking page may suggest that a stay can be booked or paid for today. When stays
open, update `bookingSteps` and `bookingNotes` in `src/lib/content.ts` and the hero tag
on the page.

## Location distances

The distances on the Location Highlights page and the Home page are road distances from
the Bilva Resorts pin, worked out on OpenStreetMap routing on 24 November 2026 and
rounded. They live in `src/lib/content.ts` (`locationHighlights`, `connectivity`,
`nearbyPlaces`). On the illustrated map, the black road from the highway to the resort
follows OpenStreetMap's route; the thinner roads follow the sketch Bilva Resorts supplied.

## Testimonials

The Testimonials page reads from `src/lib/testimonials.ts`. The list is empty until
Bilva Resorts supplies genuine reviews; add one entry per review and the page shows it.
While the list is empty and `launched` is `false`, the page shows three placeholder
cards so the layout can be reviewed. They disappear on launch or when the first review
is added. Never add a review that is not real, or without the reviewer's permission.

## Things that are deliberately switched off

Each of these turns on by filling in a value, with no code change:

- **WhatsApp buttons** appear once `contact.whatsapp` is set in `src/lib/site.ts`.
- **Phone, email and social links** appear once set in `src/lib/site.ts`.
- **RERA number** appears in the footer once `reraNumber` is set.
- **Villa availability** is behind a `features` flag.
- **Search engines** are blocked until `launched` is set to `true`.

## Enquiries

In development, enquiries are appended to `.data/enquiries.jsonl` (ignored by Git).
In production the API refuses to save until `ENQUIRY_STORE` is configured, so no
enquiry is dropped silently. The Postgres and email adapters arrive in milestone 4.

## Images

- **Bilva's own images** live in `public/images`. On the Home page they appear in three
  places only: the Villas for sale card (`villa-pool.jpg`), the nameplate beside the
  Nakshatram dropdown (`villa-living.jpg`) and the Hotel section (`hotel-pool.jpg`).
- **Reference images** live in `public/images/ref` and are listed in `src/lib/images.ts`.
  Every one of them comes from balitecture.com and shows Balitecture's villas, not
  Bilva's. They are used on Bilva Resorts' confirmation that Balitecture gave
  permission. Keep that permission in writing, with the scope it covers, before the
  site goes live. Wherever one is shown as a picture it carries the label
  "Illustrative image"; the darkened backgrounds behind the enquiry bands carry none.
- To replace a reference image with one of Bilva's own, add the file to `public/images`
  and change its `src` in `src/lib/images.ts` (or in `src/lib/gallery.ts` for gallery
  tiles), then remove the "Illustrative image" note for that slot.
- `public/images/temp-brochure-villa.jpg` is no longer used and can be deleted.

## Temporary content

- No image slot is empty. Four still wait for Bilva's own material and show a reference
  photograph until it arrives: the bathroom render, the 360-degree tour, the villa floor
  plan and the site layout. The last two are tagged "to follow" and are photographs on
  purpose; another developer's drawing must never be shown as Bilva's plan. Swap each one
  in `src/lib/images.ts` (`bathroom`, `tourLiving`, `planLiving`, `siteAerial`).
- `public/brand/leaf.png` is the bilva leaf Bilva Resorts supplied, cut out of its white
  background. It is the logo in the header and footer, and the browser-tab icon
  (`src/app/icon.png`).
- The illustrated map in `src/components/LocationMap.tsx` places the site pin from the
  coordinates Bilva supplied; the other features are approximate and not to scale. The
  pin opens the Google Maps link held in `src/lib/site.ts` (`mapsUrl`).
- Privacy Policy and Terms are drafts for legal review.
