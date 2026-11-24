import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Make the Judge Smile — a single line, 1–200 chars, about a small good thing
// that happened today, written to /output/entry.txt. The judge compares two
// lines at a time on subject, warmth, surprise, one concrete detail, and
// fresh wording — so the line needs a real detail and a small turn.
const line =
  "The warung lady tucked one last krupuk into my nasi uduk this morning and whispered, 'for the road' — I crunched it at the red light, still warm, and grinned like I'd won something.";

// Hard guard: fail loudly instead of submitting an over-long line.
if (line.length > 200) {
  throw new Error(`Entry line is ${line.length} chars, over the 200-char limit.`);
}
if (line.length < 1) {
  throw new Error("Entry line must not be empty.");
}
if (line.trim().length === 0) {
  throw new Error("Entry line must not be only whitespace.");
}
if (line.includes("\n")) {
  throw new Error("Entry line must be a single line.");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), line + "\n", "utf8");
console.log("Wrote entry.txt, chars:", line.length);
