import Image from "next/image";
import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { Container } from "./ui";

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-[11px] font-semibold uppercase tracking-eyebrow text-paper/50">{title}</h2>
      <ul className="mt-2">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link href={link.href} className="inline-block py-3 text-sm leading-5 text-paper/80 transition-colors hover:text-paper">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { address, contact, social } = site;
  const socials = [
    { label: "Instagram", href: social.instagram },
    { label: "Facebook", href: social.facebook },
    { label: "YouTube", href: social.youtube },
  ].filter((item) => item.href);
  return (
    <footer className="bg-ink text-paper">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Bilva Resorts, home" className="inline-block rounded-[4px] bg-white p-3">
              <Image
                src="/brand/leaf.png"
                alt="Bilva Resorts"
                width={454}
                height={640}
                sizes="96px"
                className="h-28 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-6 text-paper/70">
              Private pool villas in Gokarna, Karnataka. Own your villa, name it, and choose whether it earns
              when you are away.
            </p>
            <address className="mt-6 text-sm not-italic leading-6 text-paper/70">
              {address.line1}, {address.line2}
              <br />
              {address.locality}, {address.region} {address.postalCode}
              <br />
              {address.country}
            </address>
            {contact.phone || contact.salesEmail ? (
              <ul className="mt-4 space-y-1 text-sm text-paper/80">
                {contact.phone ? (
                  <li>
                    <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="hover:text-paper">
                      {contact.phone}
                    </a>
                  </li>
                ) : null}
                {contact.salesEmail ? (
                  <li>
                    <a href={`mailto:${contact.salesEmail}`} className="hover:text-paper">
                      {contact.salesEmail}
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : null}
            {socials.length ? (
              <ul className="mt-6 flex gap-5">
                {socials.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold uppercase tracking-nav text-paper/70 hover:text-paper"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <Column title="Villas" links={footerNav.villas} />
          <Column title="Invest" links={footerNav.invest} />
          <Column title="Explore" links={footerNav.explore} />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-paper/10 pt-6 text-xs text-paper/50 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {site.copyrightYear} {site.legalName || site.name}. All rights reserved.
            {site.reraNumber ? <span className="ml-3">RERA registration {site.reraNumber}</span> : null}
          </p>
          <ul className="flex gap-6">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-block py-3 hover:text-paper">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 max-w-4xl text-[11px] leading-5 text-paper/40">
          Images marked as renders are artist&rsquo;s impressions. Rental income figures on this site are
          illustrations based on the assumptions shown and are not guaranteed.
        </p>
      </Container>
    </footer>
  );
}
