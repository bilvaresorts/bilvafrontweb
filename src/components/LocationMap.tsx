"use client";

import { motion } from "motion/react";
import { mapsUrl } from "@/lib/site";
import { cn } from "./ui";

/**
 * Illustrated location map for Bilva Resorts.
 *
 * The site pin is placed from the coordinates Bilva supplied (14.5874 N,
 * 74.3287 E): inland, north of Gokarna town and south of the Gangavali River.
 * The pin opens the same place in Google Maps. Everything else is a guide to
 * how places relate, not a survey: positions are approximate and it is not to
 * scale.
 *
 * Roads: the black line from the highway to the resort follows the route
 * OpenStreetMap gives (Gokarna Road, then the village road through
 * Bankikodla). The thinner roads, including the one that crosses the Gangavali
 * to the north, follow the sketch Bilva Resorts supplied.
 */

const WATER = "#cfd2d3";
const LAND = "#eae9e6";
const INK = "#0d0d0d";
const GREY = "#6c6c6c";
const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -15% 0px" } as const;

const draw = (delay: number, duration = 1.6) => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration, ease: EASE, delay } },
});

const fade = (delay: number) => ({
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } },
});

function Beach({ x, y, label, lx, ly, delay }: { x: number; y: number; label: string; lx: number; ly: number; delay: number }) {
  return (
    <motion.g variants={fade(delay)}>
      <circle cx={x} cy={y} r="4.5" fill="#ffffff" stroke={INK} strokeWidth="1.5" />
      <line x1={x - 6} y1={y + 2} x2={lx + 6} y2={ly - 4} stroke={GREY} strokeWidth="0.75" />
      <text x={lx} y={ly} textAnchor="end" fontSize="13" fill={INK}>
        {label}
      </text>
    </motion.g>
  );
}

/** A small marker for a well-known place, with its name to the right or left. */
function Place({
  x,
  y,
  label,
  side = "right",
  gap = 10,
}: {
  x: number;
  y: number;
  label: string;
  side?: "left" | "right";
  gap?: number;
}) {
  return (
    <g>
      <rect x={x - 4} y={y - 4} width="8" height="8" transform={`rotate(45 ${x} ${y})`} fill={INK} />
      <text
        x={side === "right" ? x + gap : x - gap}
        y={y + 4}
        textAnchor={side === "right" ? "start" : "end"}
        fontSize="12.5"
        fill={INK}
      >
        {label}
      </text>
    </g>
  );
}

export function LocationMap({ className }: { className?: string }) {
  return (
    <figure className={cn("relative", className)}>
      <motion.svg
        viewBox="0 0 1000 900"
        role="img"
        aria-labelledby="map-title map-desc"
        className="block h-auto w-full font-sans"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        <title id="map-title">Illustrated map of Bilva Resorts and Gokarna</title>
        <desc id="map-desc">
          Bilva Resorts lies inland, north of Gokarna town. The Arabian Sea is to the west, the Gangavali
          River to the north and the Aghanashini River to the south-east. Gokarna Main, Kudle, Om, Half Moon
          and Paradise beaches run along the coast south of the town. National Highway 66 runs north to south
          on the eastern side, with the railway and Gokarna Road station just west of it. A road leaves the
          highway at Madangeri, runs west towards Gokarna and branches through Bankikodla to the resort.
          Jatayu Teertha, Tadadi port, Mirjan Fort, Navlare View Point and Chamundeshwari Temple are marked.
        </desc>

        {/* Land */}
        <rect width="1000" height="900" fill={LAND} />

        {/* Faint contour lines suggest the hills behind the coast */}
        <g fill="none" stroke="#dcdad6" strokeWidth="1.2">
          <g transform="translate(-146 -18)">
            <path d="M330 250c40-30 110-36 160-10s70 80 30 118-120 44-170 14-60-92-20-122z" />
            <path d="M366 276c28-20 76-24 110-6s46 54 20 78-82 30-116 10-42-62-14-82z" />
          </g>
          <path d="M860 420c30-24 80-20 104 8s14 76-22 96-84 8-100-26-12-54 18-78z" />
          <path d="M560 560c-30 36-34 92-4 120" />
          <path d="M840 150c40-10 90 0 120 30" />
        </g>

        {/* Arabian Sea */}
        <path
          fill={WATER}
          d="M0 0H120C104 80 98 160 112 222L124 252C140 310 168 372 186 420C198 452 204 474 214 492C232 530 262 562 290 586C312 606 340 634 362 652C380 668 396 686 414 698C434 710 452 718 470 722L522 762C546 784 560 800 566 806C596 838 616 868 630 900H0Z"
        />
        {/* Wave marks */}
        <g fill="none" stroke="#bfc3c4" strokeWidth="1.2" strokeLinecap="round">
          <path d="M34 150q10-8 20 0t20 0" />
          <path d="M52 330q10-8 20 0t20 0" />
          <path d="M70 520q10-8 20 0t20 0" />
          <path d="M150 680q10-8 20 0t20 0" />
          <path d="M260 800q10-8 20 0t20 0" />
          <path d="M420 850q10-8 20 0t20 0" />
        </g>

        {/* Gangavali River */}
        <g fill="none" stroke={WATER} strokeLinecap="round">
          <path strokeWidth="13" d="M118 237C200 232 260 196 340 182C430 166 500 150 590 122C680 96 760 92 850 62C910 44 960 36 1000 30" />
          <path strokeWidth="24" d="M118 237C200 232 260 196 340 182C380 175 420 168 456 160" />
          <path strokeWidth="34" d="M112 237C150 236 190 226 226 214" />
        </g>

        {/* Aghanashini River and estuary */}
        <path
          fill={WATER}
          d="M470 722C500 690 520 640 540 600C560 550 600 500 640 450C664 420 690 396 716 384L740 404C712 430 690 470 672 520C650 580 620 660 590 720C570 750 546 762 522 762Z"
        />
        <path
          fill="none"
          stroke={WATER}
          strokeWidth="16"
          strokeLinecap="round"
          d="M726 394C800 356 880 340 1000 300"
        />

        {/* Water names */}
        <motion.g variants={fade(0.2)} fill="#8f9596" fontSize="12" letterSpacing="4.5">
          <text x="34" y="760" fontSize="15" letterSpacing="7">
            ARABIAN SEA
          </text>
          <text x="470" y="128" textAnchor="middle" transform="rotate(-11 470 128)">
            GANGAVALI RIVER
          </text>
          <text x="612" y="566" textAnchor="middle" transform="rotate(-60 612 566)" fill="#7d8384">
            AGHANASHINI RIVER
          </text>
        </motion.g>

        {/* Railway, just west of the highway */}
        <motion.g variants={fade(0.9)}>
          <path
            fill="none"
            stroke={GREY}
            strokeWidth="2.5"
            strokeDasharray="10 8"
            d="M638 0C640 60 634 120 650 190C662 240 664 262 672 290C686 340 706 380 724 440C746 520 770 640 780 760C784 820 786 860 786 900"
          />
          <circle cx="662" cy="250" r="6" fill="#ffffff" stroke={INK} strokeWidth="2" />
          <text x="648" y="246" textAnchor="end" fontSize="13" fontWeight="600" fill={INK}>
            Gokarna Road
          </text>
          <text x="648" y="262" textAnchor="end" fontSize="11.5" fill={GREY}>
            railway station
          </text>
        </motion.g>

        {/* National Highway 66 */}
        <motion.path
          variants={draw(0.3, 1.8)}
          fill="none"
          stroke={INK}
          strokeWidth="9"
          strokeLinecap="round"
          d="M704 0C706 60 700 120 716 190C728 240 730 262 738 290C752 340 772 380 790 440C812 520 836 640 846 760C850 820 852 860 852 900"
        />
        <motion.g variants={fade(1.3)}>
          <rect x="784" y="508" width="62" height="26" rx="4" fill={INK} stroke="#ffffff" strokeWidth="1.5" />
          <text x="815" y="525.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff" letterSpacing="1">
            NH 66
          </text>
          <text x="724" y="30" fontSize="12" fill={GREY}>
            To Ankola and Goa &uarr;
          </text>
          <text x="868" y="868" fontSize="12" fill={GREY}>
            To Kumta and
          </text>
          <text x="868" y="884" fontSize="12" fill={GREY}>
            Mangaluru &darr;
          </text>
          <text x="988" y="236" textAnchor="end" fontSize="12" fill={GREY}>
            To Yana Caves &rarr;
          </text>
        </motion.g>

        {/* Local roads, as in the sketch Bilva Resorts supplied: Gokarna to Bankikodla, and north over the Gangavali */}
        <g fill="none" stroke="#3a3a3a" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round">
          <motion.path variants={draw(1.2, 1.2)} d="M226 488C234 452 248 400 262 350" />
          <motion.path
            variants={draw(1.4, 2)}
            d="M253 300C246 270 238 244 232 222C226 190 240 150 270 118C310 76 380 52 460 44C540 36 620 40 705 62"
          />
        </g>

        {/* Road from the highway to Gokarna town */}
        <motion.path
          variants={draw(0.9, 1.6)}
          fill="none"
          stroke="#3a3a3a"
          strokeWidth="4.5"
          strokeLinecap="round"
          d="M738 290C680 300 630 322 580 344C520 370 470 392 410 410C350 428 290 452 226 488"
        />

        {/* The way in, in black: off the highway at Madangeri, along the Gokarna road, then through Bankikodla */}
        <motion.path
          variants={draw(1.4, 2.4)}
          fill="none"
          stroke={INK}
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M738 290C680 300 630 322 580 344C520 370 470 392 410 410C384 402 360 388 338 375C318 364 300 360 280 358C268 356 262 348 256 334C252 326 250 312 253 300L280 296"
        />

        {/* Junction and village on the way in */}
        <motion.g variants={fade(1.9)}>
          <circle cx="738" cy="290" r="5.5" fill="#ffffff" stroke={INK} strokeWidth="2" />
          <text x="754" y="286" fontSize="13" fontWeight="600" fill={INK}>
            Madangeri
          </text>
          <text x="754" y="302" fontSize="11.5" fill={GREY}>
            turn-off from NH 66
          </text>
          <circle cx="262" cy="350" r="4" fill="#ffffff" stroke={INK} strokeWidth="1.5" />
          <text x="248" y="344" textAnchor="end" fontSize="11.5" fill={GREY}>
            Bankikodla
          </text>
        </motion.g>

        {/* Well-known places */}
        <motion.g variants={fade(2.0)}>
          <Place x={386} y={28} label="Navlare View Point" />
          <Place x={452} y={110} label="Chamundeshwari Temple" side="left" />
          <Place x={498} y={676} label="Tadadi port" side="left" />
          <Place x={810} y={712} label="Mirjan Fort" side="left" gap={44} />
        </motion.g>

        {/* Gokarna town */}
        <motion.g variants={fade(1.5)}>
          <circle cx="226" cy="488" r="8" fill={INK} />
          <circle cx="226" cy="488" r="3" fill="#ffffff" />
          <text x="250" y="510" fontSize="15" fontWeight="700" letterSpacing="3" fill={INK}>
            GOKARNA
          </text>
          <text x="250" y="528" fontSize="12.5" fill={GREY}>
            Mahabaleshwar Temple
          </text>
        </motion.g>

        {/* Beaches */}
        <Beach x={168} y={372} lx={148} ly={366} label="Gokarna Main Beach" delay={1.7} />
        <Beach x={221} y={513} lx={196} ly={522} label="Jatayu Teertha" delay={1.75} />
        <Beach x={246} y={541} lx={222} ly={556} label="Kudle Beach" delay={1.8} />
        <Beach x={290} y={586} lx={262} ly={604} label="Om Beach" delay={1.9} />
        <Beach x={326} y={621} lx={298} ly={646} label="Half Moon Beach" delay={2.0} />
        <Beach x={362} y={652} lx={336} ly={686} label="Paradise Beach" delay={2.1} />

        {/* Bilva Resorts: the pin and its label open the site in Google Maps */}
        <motion.g variants={fade(2.2)}>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bilva Resorts: open the location in Google Maps"
            className="group/pin cursor-pointer outline-none"
          >
            <title>Open Bilva Resorts in Google Maps</title>
            {/* A generous invisible area so the pin is easy to tap */}
            <rect x="254" y="226" width="272" height="96" fill="transparent" />
            <circle className="map-pulse" cx="280" cy="296" r="12" fill={INK} />
            <circle cx="280" cy="296" r="11" fill={INK} />
            <circle cx="280" cy="296" r="4" fill="#ffffff" />
            <path d="M291 288L304 278" stroke={INK} strokeWidth="1.5" />
            <rect
              x="302"
              y="238"
              width="212"
              height="54"
              rx="4"
              fill={INK}
              className="transition-[fill] duration-300 group-hover/pin:fill-[#373737] group-focus-visible/pin:fill-[#373737] group-focus-visible/pin:stroke-white group-focus-visible/pin:[stroke-width:2]"
            />
            <text x="318" y="261" fontSize="14" fontWeight="700" letterSpacing="2.6" fill="#ffffff">
              BILVA RESORTS
            </text>
            <text x="318" y="280" fontSize="11.5" fill="#c8c8c8">
              Open in Google Maps &#8599;
            </text>
          </a>
        </motion.g>

        {/* Key */}
        <motion.g variants={fade(0.6)} fontSize="11.5" fill={GREY}>
          <line x1="34" y1="806" x2="70" y2="806" stroke={INK} strokeWidth="5.5" strokeLinecap="round" />
          <text x="82" y="810">Road to the resort</text>
          <line x1="34" y1="828" x2="70" y2="828" stroke={INK} strokeWidth="9" strokeLinecap="round" />
          <text x="82" y="832">National Highway 66</text>
          <line x1="34" y1="850" x2="70" y2="850" stroke="#3a3a3a" strokeWidth="3.25" strokeLinecap="round" />
          <text x="82" y="854">Other roads</text>
          <line x1="34" y1="872" x2="70" y2="872" stroke={GREY} strokeWidth="2.5" strokeDasharray="10 8" />
          <text x="82" y="876">Railway</text>
        </motion.g>

        {/* Compass */}
        <motion.g variants={fade(0.4)} transform="translate(58 78)">
          <circle r="26" fill="none" stroke={GREY} strokeWidth="1" />
          <path d="M0 -20L6 4H-6Z" fill={INK} />
          <path d="M0 20L6 4H-6Z" fill="none" stroke={INK} strokeWidth="1" />
          <text y="-32" textAnchor="middle" fontSize="12" fontWeight="700" fill={INK}>
            N
          </text>
        </motion.g>
      </motion.svg>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-[11px] leading-5 text-stone">
        <span>Illustrated map, not to scale. Select the Bilva Resorts pin to open Google Maps.</span>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 font-semibold uppercase tracking-button text-ink underline-offset-4 hover:underline"
        >
          Open in Google Maps <span aria-hidden>&#8599;</span>
        </a>
      </figcaption>
    </figure>
  );
}
