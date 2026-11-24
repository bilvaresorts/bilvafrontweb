/**
 * Testimonials.
 *
 * Add one entry per genuine review and the Testimonials page shows it at once.
 * Publish a review only when it is real and the person has agreed to it being
 * shown with their name. Nothing on the page is written on a reviewer's behalf.
 *
 * Example of one entry:
 *
 *   {
 *     quote: "The reviewer's own words, as they gave them.",
 *     name: "Full name, or first name and initial if they prefer",
 *     role: "Owner, Villa Sravana",
 *     place: "Bengaluru",
 *     date: "March 2027",
 *     photo: "/images/testimonials/name.jpg",   // optional
 *     videoUrl: "https://...",                  // optional
 *   },
 */

export type Testimonial = {
  /** The review, in the reviewer's own words. */
  quote: string;
  name: string;
  /** Who they are to Bilva Resorts, such as "Owner, Villa Sravana" or "Hotel guest". */
  role: string;
  /** Where they live. Optional. */
  place?: string;
  /** Month and year the review was given. Optional. */
  date?: string;
  /** A portrait in /public/images, used only with the person's consent. Optional. */
  photo?: string;
  /** A link to a video of the review. Optional. */
  videoUrl?: string;
};

/** Empty until Bilva Resorts supplies its first reviews. */
export const testimonials: Testimonial[] = [];

/** [proposed] How reviews are handled. Confirm with Bilva Resorts before launch. */
export const reviewPrinciples = [
  {
    title: "Real people",
    text: "Every review comes from a villa owner or a guest of Bilva Resorts.",
  },
  {
    title: "Their own words",
    text: "Reviews are published as they were given. We do not write or rewrite them.",
  },
  {
    title: "With permission",
    text: "A name or a photograph appears only when the reviewer has agreed to it.",
  },
];
