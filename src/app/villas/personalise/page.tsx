import type { Metadata } from "next";
import { EnquirySection, PageHero, SectionHeader, StepRow } from "@/components/blocks";
import { NameplatePreview } from "@/components/NameplatePreview";
import { Photo } from "@/components/Photo";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { ButtonLink, Container, Section } from "@/components/ui";
import { namingSteps, nakshatras } from "@/lib/content";
import { ILLUSTRATIVE, ref } from "@/lib/images";

export const metadata: Metadata = {
  title: "Your Villa, Your Identity: Nakshatra Villa Names",
  description:
    "Give your villa at Bilva Resorts a name inspired by your Nakshatram. Preview your nameplate and send your request.",
};

export default function PersonalisePage() {
  return (
    <>
      <PageHero
        eyebrow="Your villa. Your identity."
        image={{ ...ref.heroDuskVilla, note: ILLUSTRATIVE }}
        light="A home"
        bold="named after you."
        summary="Your villa is more than a property. It is your personal sanctuary. Make it uniquely yours with a name inspired by your Nakshatram."
      >
        <ButtonLink href="#preview" variant="solid-light">
          Preview your nameplate
        </ButtonLink>
      </PageHero>

      <Section tone="ink" id="preview" labelledBy="preview-title">
        <Container>
          <div className="grid gap-12 xl:grid-cols-[0.8fr_1.2fr] xl:gap-20">
            <SectionHeader id="preview-title" eyebrow="Try it" light="Preview" bold="your nameplate." onDark column>
              <p>
                Enter your name, choose your Nakshatram and see how your villa could be named. Vijay, born
                under Sravana, would own Villa Sravana.
              </p>
            </SectionHeader>
            <Reveal delay={0.15} from="right">
              <NameplatePreview />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="naming-steps-title">
        <Container>
          <SectionHeader id="naming-steps-title" eyebrow="How it works" light="Five steps to" bold="your villa name." />
          <div className="mt-12 md:mt-16">
            <StepRow steps={namingSteps} columns="lg:grid-cols-5" />
          </div>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="names-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="group">
              <Photo
                src="/images/nakshatra-board.jpg"
                alt="Garden signboard carrying a plaque for each of the 27 Nakshatras"
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="aspect-[5/6] w-full"
                note="Concept image"
              />
            </div>
            <div>
              <SectionHeader id="names-title" eyebrow="The 27 Nakshatras" light="Twenty-seven stars." bold="One is yours." column>
                <p>
                  Every villa name comes from this list. If you spell your Nakshatram differently, tell us and
                  we will use your spelling.
                </p>
              </SectionHeader>
              <Stagger
                as="ol"
                className="mt-10 grid grid-cols-2 gap-x-8 border-t border-rule text-sm sm:grid-cols-3"
                gap={0.03}
              >
                {nakshatras.map((name) => (
                  <StaggerItem as="li" key={name} className="border-b border-rule py-3">
                    {name}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Container>
      </Section>

      <EnquirySection
        eyebrow="Personalise"
        light="Request"
        bold="your villa name."
        text="Send your details with the name you would like. Bilva Resorts confirms the name with you at booking."
        points={["Your villa name travels with your enquiry", "Not sure of your Nakshatram? Ask us", "Naming is your choice"]}
        image={{ src: ref.bandGardenDusk.src }}
        source="personalise page"
      />
    </>
  );
}
