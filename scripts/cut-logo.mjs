/*
 * Cuts the Bilva Resorts logo out of its cream background, for use on the dark
 * header and footer.
 *
 * Source: brand-source/bilva-resorts-logo.jpg, the artwork Bilva Resorts supplied.
 * Run from the project root:  node scripts/cut-logo.mjs
 *
 * It writes:
 *   public/brand/mark.png      the three-leaf mark, transparent
 *   public/brand/wordmark.png  BILVA over RESORTS, off-white, transparent (header)
 *   public/brand/logo.png      the full logo as supplied, off-white lettering (footer)
 *   src/app/icon.png           the mark on the logo's own cream ground (browser tab)
 *
 * The lettering is dark green in the artwork, which cannot be read on black, so it
 * is redrawn in the site's off-white. The leaf keeps its green, lifted a little so
 * its darker half does not sink into the background.
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const SOURCE = "brand-source/bilva-resorts-logo.jpg";
const BRAND_DIR = process.argv[2] ?? "public/brand";
const ICON_PATH = process.argv[3] ?? "src/app/icon.png";

const GROUND = [254, 250, 242]; // the cream the artwork sits on
const PAPER = [243, 243, 243]; // --color-paper
const LEAF_GAIN = Number(process.env.LOGO_GAIN ?? 1.3);
const LEAF_GAMMA = Number(process.env.LOGO_GAMMA ?? 0.86);

const { data, info } = await sharp(SOURCE).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width;
const H = info.height;

/** How far each pixel is from the cream ground, 0 to 255. */
const dark = new Float32Array(W * H);
for (let i = 0; i < W * H; i++) {
  dark[i] = Math.max(0, GROUND[0] - data[i * 3], GROUND[1] - data[i * 3 + 1], GROUND[2] - data[i * 3 + 2]);
}
const darkAt = (x, y) => (x < 0 || y < 0 || x >= W || y >= H ? 0 : dark[y * W + x]);

/** Rows, then columns, that hold ink: the leaf, BILVA, and the RESORTS line. */
function runs(length, hasInk) {
  const found = [];
  let start = -1;
  for (let i = 0; i <= length; i++) {
    const on = i < length && hasInk(i);
    if (on && start < 0) start = i;
    if (!on && start >= 0) {
      found.push([start, i - 1]);
      start = -1;
    }
  }
  return found;
}
const rowHasInk = (y) => {
  for (let x = 0; x < W; x++) if (dark[y * W + x] > 40) return true;
  return false;
};
const columnRuns = ([y0, y1]) =>
  runs(W, (x) => {
    for (let y = y0; y <= y1; y++) if (dark[y * W + x] > 40) return true;
    return false;
  });

const bands = runs(H, rowHasInk);
if (bands.length !== 3) throw new Error(`Expected the leaf, BILVA and RESORTS; found ${bands.length} bands.`);
const [leafRows, bilvaRows, resortsRows] = bands;
const leafCols = columnRuns(leafRows);
const bilvaCols = columnRuns(bilvaRows);
const resortsCols = columnRuns(resortsRows);
const leafBox = { x0: leafCols[0][0], x1: leafCols.at(-1)[1], y0: leafRows[0], y1: leafRows[1] };
const bilvaBox = { x0: bilvaCols[0][0], x1: bilvaCols.at(-1)[1], y0: bilvaRows[0], y1: bilvaRows[1] };
// The first and last runs on the RESORTS line are the two rules; the seven between are letters.
if (resortsCols.length !== 9) throw new Error(`Expected two rules and seven letters; found ${resortsCols.length} runs.`);
const letters = resortsCols.slice(1, -1);
const lineBox = { x0: resortsCols[0][0], x1: resortsCols.at(-1)[1], y0: resortsRows[0], y1: resortsRows[1] };

const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));
const lift = (value) => 255 * Math.pow(Math.min(1, (value * LEAF_GAIN) / 255), LEAF_GAMMA);
const asIs = (value) => value;

const isGround = (x, y) => darkAt(x, y) < 14;
function nearGround(x, y) {
  for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) if (isGround(x + dx, y + dy)) return true;
  return false;
}

/**
 * Paints the leaf onto a canvas. Inside the leaf every pixel is kept solid, so
 * the pale veins stay pale. Only the outer edge is softened, and edge pixels
 * take their colour from the leaf just inside, so no cream fringe is left.
 */
function paintLeaf(canvas, canvasWidth, destX, destY, tone) {
  for (let y = leafBox.y0 - 2; y <= leafBox.y1 + 2; y++) {
    for (let x = leafBox.x0 - 2; x <= leafBox.x1 + 2; x++) {
      const d = darkAt(x, y);
      if (d < 14) continue;
      let r = data[(y * W + x) * 3];
      let g = data[(y * W + x) * 3 + 1];
      let b = data[(y * W + x) * 3 + 2];
      let alpha = 1;
      if (nearGround(x, y)) {
        alpha = Math.min(1, d / 185);
        let count = 0;
        let sumR = 0;
        let sumG = 0;
        let sumB = 0;
        for (let dy = -3; dy <= 3; dy++) {
          for (let dx = -3; dx <= 3; dx++) {
            const xx = x + dx;
            const yy = y + dy;
            if (darkAt(xx, yy) >= 60 && !nearGround(xx, yy)) {
              sumR += data[(yy * W + xx) * 3];
              sumG += data[(yy * W + xx) * 3 + 1];
              sumB += data[(yy * W + xx) * 3 + 2];
              count++;
            }
          }
        }
        if (count) {
          r = sumR / count;
          g = sumG / count;
          b = sumB / count;
        } else {
          r = (r - (1 - alpha) * GROUND[0]) / alpha;
          g = (g - (1 - alpha) * GROUND[1]) / alpha;
          b = (b - (1 - alpha) * GROUND[2]) / alpha;
        }
      }
      const o = ((y - leafBox.y0 + destY) * canvasWidth + (x - leafBox.x0 + destX)) * 4;
      canvas[o] = clamp(tone(Math.max(0, r)));
      canvas[o + 1] = clamp(tone(Math.max(0, g)));
      canvas[o + 2] = clamp(tone(Math.max(0, b)));
      canvas[o + 3] = clamp(alpha * 255);
    }
  }
}

/** How much of a pixel the lettering covers, 0 to 255. The lettering is one flat dark green. */
const cover = (x, y) => clamp(((darkAt(x, y) - 10) / 190) * 255);

/** Paints part of the lettering in off-white, with the artwork's own soft edges. */
function paintInk(canvas, canvasWidth, box, destX, destY) {
  for (let y = box.y0 - 1; y <= box.y1 + 1; y++) {
    for (let x = box.x0 - 1; x <= box.x1 + 1; x++) {
      const alpha = cover(x, y);
      if (!alpha) continue;
      const o = ((y - box.y0 + destY) * canvasWidth + (x - box.x0 + destX)) * 4;
      canvas[o] = PAPER[0];
      canvas[o + 1] = PAPER[1];
      canvas[o + 2] = PAPER[2];
      canvas[o + 3] = Math.max(canvas[o + 3], alpha);
    }
  }
}

const save = (canvas, width, height, file) =>
  sharp(canvas, { raw: { width, height, channels: 4 } }).png({ compressionLevel: 9 }).toFile(file);

mkdirSync(BRAND_DIR, { recursive: true });
const PAD = 8;

/* 1. The mark. */
{
  const width = leafBox.x1 - leafBox.x0 + 1 + PAD * 2;
  const height = leafBox.y1 - leafBox.y0 + 1 + PAD * 2;
  const canvas = Buffer.alloc(width * height * 4);
  paintLeaf(canvas, width, PAD, PAD, lift);
  await save(canvas, width, height, join(BRAND_DIR, "mark.png"));
  console.log("mark.png", width, "x", height);
}

/* 2. The full logo, arranged exactly as supplied. */
{
  const x0 = Math.min(leafBox.x0, bilvaBox.x0, lineBox.x0);
  const x1 = Math.max(leafBox.x1, bilvaBox.x1, lineBox.x1);
  const width = x1 - x0 + 1 + PAD * 2;
  const height = lineBox.y1 - leafBox.y0 + 1 + PAD * 2;
  const canvas = Buffer.alloc(width * height * 4);
  paintLeaf(canvas, width, leafBox.x0 - x0 + PAD, PAD, lift);
  paintInk(canvas, width, bilvaBox, bilvaBox.x0 - x0 + PAD, bilvaBox.y0 - leafBox.y0 + PAD);
  paintInk(canvas, width, lineBox, lineBox.x0 - x0 + PAD, lineBox.y0 - leafBox.y0 + PAD);
  await save(canvas, width, height, join(BRAND_DIR, "logo.png"));
  console.log("logo.png", width, "x", height);
}

/*
 * 3. The wordmark for the header, where the logo runs sideways: leaf, then BILVA
 * with RESORTS beneath. At header size the RESORTS line of the full logo would be
 * about 4 px tall, so here its letters are drawn one and a half times larger and
 * spread to the width of BILVA. The rules either side are left to the full logo.
 */
{
  const SCALE = 1.5;
  const GAP = 40;
  const bilvaWidth = bilvaBox.x1 - bilvaBox.x0 + 1;
  const bilvaHeight = bilvaBox.y1 - bilvaBox.y0 + 1;
  const lineHeight = resortsRows[1] - resortsRows[0] + 1;
  const glyphs = [];
  for (const [gx0, gx1] of letters) {
    const gw = gx1 - gx0 + 3;
    const gh = lineHeight + 2;
    const mask = Buffer.alloc(gw * gh);
    for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) mask[y * gw + x] = cover(gx0 - 1 + x, resortsRows[0] - 1 + y);
    const scaled = await sharp(mask, { raw: { width: gw, height: gh, channels: 1 } })
      .resize({ width: Math.round(gw * SCALE), height: Math.round(gh * SCALE), kernel: "lanczos3" })
      .raw()
      .toBuffer({ resolveWithObject: true });
    glyphs.push({ alpha: scaled.data, width: scaled.info.width, height: scaled.info.height, channels: scaled.info.channels });
  }
  const lettersWidth = glyphs.reduce((sum, glyph) => sum + glyph.width, 0);
  const spacing = (bilvaWidth - lettersWidth) / (glyphs.length - 1);
  const width = bilvaWidth + PAD * 2;
  const height = bilvaHeight + GAP + glyphs[0].height + PAD * 2;
  const canvas = Buffer.alloc(width * height * 4);
  paintInk(canvas, width, bilvaBox, PAD, PAD);
  let cursor = PAD;
  for (const glyph of glyphs) {
    const left = Math.round(cursor);
    const top = PAD + bilvaHeight + GAP;
    for (let y = 0; y < glyph.height; y++) {
      for (let x = 0; x < glyph.width; x++) {
        const alpha = glyph.alpha[(y * glyph.width + x) * glyph.channels];
        if (!alpha) continue;
        const o = ((top + y) * width + left + x) * 4;
        canvas[o] = PAPER[0];
        canvas[o + 1] = PAPER[1];
        canvas[o + 2] = PAPER[2];
        canvas[o + 3] = alpha;
      }
    }
    cursor += glyph.width + spacing;
  }
  await save(canvas, width, height, join(BRAND_DIR, "wordmark.png"));
  console.log("wordmark.png", width, "x", height);
}

/* 4. The browser-tab icon: the mark in its own colours on the logo's cream ground. */
{
  const width = leafBox.x1 - leafBox.x0 + 1 + PAD * 2;
  const height = leafBox.y1 - leafBox.y0 + 1 + PAD * 2;
  const canvas = Buffer.alloc(width * height * 4);
  paintLeaf(canvas, width, PAD, PAD, asIs);
  const leaf = await sharp(canvas, { raw: { width, height, channels: 4 } }).resize({ width: 204 }).png().toBuffer();
  await sharp({ create: { width: 256, height: 256, channels: 4, background: { r: GROUND[0], g: GROUND[1], b: GROUND[2], alpha: 1 } } })
    .composite([{ input: leaf, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toFile(ICON_PATH);
  console.log("icon.png 256 x 256");
}
