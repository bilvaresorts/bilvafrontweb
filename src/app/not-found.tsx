import { ButtonLink, Container, Eyebrow, Heading } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-ink pb-20 pt-36 text-paper">
      <Container>
        <Eyebrow onDark>Page not found</Eyebrow>
        <Heading as="h1" light="This page" bold="does not exist." className="mt-5 md:text-7xl" />
        <p className="mt-7 max-w-md text-base leading-7 text-paper/75">
          The address may have changed. Start again from the home page or send us an enquiry.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="solid-light">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-light">
            Enquire now
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
