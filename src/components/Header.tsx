"use client";

import Image from "next/image";
import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { nav } from "@/lib/site";
import { buttonClass, cn } from "./ui";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

/** The height of the header on wide screens, in pixels. */
const HEADER_HEIGHT = 80;

/**
 * True once the hero has scrolled up behind the header. Until then the header
 * stays clear, so the photograph runs to the top of the screen. Heroes mark
 * themselves with `data-hero`. A page without one counts from the first scroll.
 */
function pastHero(): boolean {
  for (const hero of document.querySelectorAll("[data-hero]")) {
    const box = hero.getBoundingClientRect();
    // Pages kept in memory after you leave them are still in the document, with no size.
    if (box.height === 0) continue;
    return box.bottom <= HEADER_HEIGHT;
  }
  return window.scrollY > 24;
}

/** True for the page itself and for any page beneath it, so "Villas" stays lit on the Model Villa page. */
function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * A line under the label of the link that was clicked, shown only while its page is still loading.
 * It confirms the click when a page takes a moment to arrive. Must sit inside a `Link`.
 */
function PendingLine() {
  const { pending } = useLinkStatus();
  return <span aria-hidden className={cn("nav-pending", pending && "is-pending")} />;
}

export function Header() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, pastHero, () => false);
  /** True once the page has moved at all. Inside a hero this only frosts the header. */
  const moved = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 24,
    () => false,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  /** The label of the open desktop dropdown, or null. */
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  /** What the last press on a dropdown heading was: a finger or not, and whether its menu was already open. */
  const lastPress = useRef({ touch: false, wasOpen: false });
  /** Set just before focus is handed back to a dropdown heading, so that focus does not reopen it. */
  const skipFocusOpen = useRef(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // A press anywhere outside the menu bar closes an open dropdown (needed on touch screens).
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openMenu]);

  const solid = scrolled || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-ink/50 to-transparent transition-opacity duration-300",
          solid ? "opacity-0" : "opacity-100",
        )}
      />
      <div
        // Clear at the top of a page, lightly frosted while the hero scrolls beneath, black after it.
        className={cn(
          "relative transition-[background-color,backdrop-filter] duration-300",
          solid ? "bg-ink" : moved ? "bg-ink/20 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-3 px-6 sm:gap-6 md:h-20 md:px-10">
          <Link
            href="/"
            aria-label="Bilva Resorts, home"
            className="flex shrink-0 items-center gap-2 drop-shadow-[0_1px_8px_rgb(0_0_0/0.45)] md:gap-3.5 lg:gap-2.5 xl:gap-3.5"
            onClick={() => setMenuOpen(false)}
          >
            {/*
              The logo Bilva Resorts supplied, cut out of its background so it sits straight on the
              header: the leaf, then the lettering. The sizes keep it clear of the menu at every width.
            */}
            <Image
              src="/brand/mark.png"
              alt=""
              width={410}
              height={319}
              sizes="68px"
              loading="eager"
              className="h-[34px] w-auto md:h-[52px] lg:h-11 xl:h-[52px]"
            />
            <Image
              src="/brand/wordmark.png"
              alt=""
              width={751}
              height={266}
              sizes="110px"
              loading="eager"
              className="h-[23px] w-auto md:h-[38px] lg:h-7 xl:h-[38px]"
            />
          </Link>

          <nav
            ref={navRef}
            aria-label="Main"
            className="hidden lg:block"
            onKeyDown={(event) => {
              if (event.key === "Escape") setOpenMenu(null);
            }}
          >
            <ul className="flex items-center gap-6 xl:gap-9">
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                const linkClass = cn(
                  "inline-flex h-20 items-center gap-1.5 whitespace-nowrap text-[11px] font-semibold uppercase tracking-nav transition-colors",
                  active ? "text-paper" : "text-paper/75 hover:text-paper",
                );
                if (!item.children) {
                  return (
                    <li key={item.label}>
                      <Link href={item.href} className={linkClass} aria-current={active ? "page" : undefined}>
                        <span className="relative">
                          {item.label}
                          <PendingLine />
                        </span>
                      </Link>
                    </li>
                  );
                }
                const open = openMenu === item.label;
                return (
                  // The dropdown opens on hover and on keyboard focus, and always closes once a link is chosen.
                  <li
                    key={item.label}
                    className="relative"
                    onPointerEnter={(event) => {
                      if (event.pointerType !== "touch") setOpenMenu(item.label);
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType !== "touch") setOpenMenu(null);
                    }}
                    onFocus={(event) => {
                      if (skipFocusOpen.current) {
                        skipFocusOpen.current = false;
                        return;
                      }
                      if (event.target.matches(":focus-visible")) setOpenMenu(item.label);
                    }}
                    onKeyDown={(event) => {
                      // Escape closes the dropdown and hands focus back to its heading, without reopening it.
                      if (event.key !== "Escape" || !open) return;
                      const heading = event.currentTarget.querySelector<HTMLElement>("a[aria-haspopup]");
                      if (heading && document.activeElement !== heading) {
                        skipFocusOpen.current = true;
                        heading.focus();
                      }
                    }}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) setOpenMenu(null);
                    }}
                  >
                    <Link
                      href={item.href}
                      className={linkClass}
                      aria-haspopup="true"
                      aria-expanded={open}
                      aria-current={pathname === item.href ? "page" : undefined}
                      onPointerDown={(event) => {
                        lastPress.current = { touch: event.pointerType === "touch", wasOpen: open };
                      }}
                      onClick={(event) => {
                        // On a touch screen the first tap opens the dropdown; a second tap follows the link.
                        const { touch, wasOpen } = lastPress.current;
                        lastPress.current = { touch: false, wasOpen: false };
                        if (touch && !wasOpen) {
                          event.preventDefault();
                          setOpenMenu(item.label);
                          return;
                        }
                        setOpenMenu(null);
                      }}
                    >
                      <span className="relative">
                        {item.label}
                        <PendingLine />
                      </span>
                      <svg
                        aria-hidden
                        width="8"
                        height="5"
                        viewBox="0 0 8 5"
                        className={cn("opacity-70 transition-transform duration-200", open && "rotate-180")}
                      >
                        <path d="M1 1l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </Link>
                    <div
                      // Inert while closed, so its links cannot be reached or clicked during the fade-out.
                      inert={!open}
                      className={cn(
                        "absolute left-1/2 top-full w-[320px] -translate-x-1/2 transition-[opacity,translate,visibility] duration-200",
                        open ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0",
                      )}
                    >
                      <ul className="border border-paper/10 bg-ink p-2 shadow-2xl">
                        {item.children.map((child) => {
                          const current = pathname === child.href;
                          return (
                            <li key={child.href + child.label}>
                              <Link
                                href={child.href}
                                aria-current={current ? "page" : undefined}
                                className={cn(
                                  "block border-l px-4 py-3 transition-colors hover:bg-paper/10 focus-visible:bg-paper/10",
                                  current ? "border-paper bg-paper/[0.06]" : "border-transparent",
                                )}
                                onClick={() => setOpenMenu(null)}
                              >
                                <span className="relative inline-block text-[11px] font-semibold uppercase tracking-nav text-paper">
                                  {child.label}
                                  <PendingLine />
                                </span>
                                {child.note ? (
                                  <span className="mt-1 block text-xs text-paper/55">{child.note}</span>
                                ) : null}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Written out in full, so the smaller phone size is not overridden by the shared button style. */}
            <Link
              href="/contact"
              className="inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-[4px] border border-paper bg-paper px-3.5 text-[11px] font-semibold uppercase tracking-button text-ink transition-colors duration-200 hover:border-white hover:bg-white max-[349px]:hidden sm:h-12 sm:px-6 sm:text-xs"
              onClick={() => setMenuOpen(false)}
            >
              Enquire now
            </Link>
            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center text-paper lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span
                className={cn(
                  "absolute h-px w-7 bg-current transition-transform duration-300",
                  menuOpen ? "rotate-45" : "-translate-y-[5px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-7 bg-current transition-transform duration-300",
                  menuOpen ? "-rotate-45" : "translate-y-[5px]",
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Always in the page; visibility keeps its links out of the tab order when closed. */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={cn(
          "fixed inset-x-0 bottom-0 top-16 flex flex-col bg-ink text-paper transition-[opacity,visibility] duration-300 md:top-20 lg:hidden",
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pb-6 pt-4">
              <ul>
                {nav.map((item) => (
                  <li key={item.label} className="border-b border-paper/10 py-4">
                    <Link
                      href={item.href}
                      className="block text-2xl font-light uppercase tracking-display"
                      aria-current={pathname === item.href ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children ? (
                      <ul className="mt-1.5 pl-1">
                        {item.children.map((child) => {
                          const current = pathname === child.href;
                          return (
                            <li key={child.href + child.label}>
                              {/* Padding, not gaps, separates these links so each is easy to hit with a thumb. */}
                              <Link
                                href={child.href}
                                aria-current={current ? "page" : undefined}
                                className={cn(
                                  "block py-1.5 text-[11px] font-semibold uppercase tracking-nav",
                                  current ? "text-paper" : "text-paper/65",
                                )}
                                onClick={() => setMenuOpen(false)}
                              >
                                {child.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-paper/10 p-6">
              <Link
                href="/contact"
                className={buttonClass("solid-light", "w-full")}
                onClick={() => setMenuOpen(false)}
              >
                Enquire now
              </Link>
            </div>
      </div>
    </header>
  );
}
