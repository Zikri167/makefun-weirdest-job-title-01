// Weirdest Job Title: Blind Judge Showdown.
// Winner of 12 scored candidates: a real-sounding job ("Senior ... Tester
// for Luxury ... Showrooms") with one specific, instantly picturable twist:
// getting paid to nap. 47 characters, inside the 1-60 gate.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TITLE = "Senior Nap Tester for Luxury Mattress Showrooms";
const MIN_LENGTH = 1;
const MAX_LENGTH = 60;

function main(): void {
  const title = TITLE.trim();
  if (title.length < MIN_LENGTH || title.length > MAX_LENGTH) {
    throw new Error(
      `entry must be ${MIN_LENGTH}-${MAX_LENGTH} characters, got ${title.length}`,
    );
  }
  if (title !== TITLE) {
    throw new Error("entry must not start or end with whitespace");
  }
  // One title only: no line breaks, tabs, or other control characters.
  if (/[\u0000-\u001f\u007f]/.test(title)) {
    throw new Error("entry must not contain control characters");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, title, "utf8");
  // Self-check: what landed on disk must be exactly the validated title.
  if (readFileSync(outPath, "utf8") !== title) {
    throw new Error("entry.txt does not match the validated title");
  }
}

main();
