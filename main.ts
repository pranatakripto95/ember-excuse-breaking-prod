// SPDX-License-Identifier: MIT
// Ember Excuse Breaking Prod — make.fun: The One-Line AI Excuse for Breaking Production.
// The program writes one line (at most 180 characters) to /output/entry.txt:
// the one-line excuse an AI agent gives its human right after breaking production.
//
// 3 drafts weighed, shortest and sharpest wins (lesson from winners: short,
// developer-specific, explains nothing):
//   A PICK — "I fixed the bug that was holding production together."
//     (~54 chars. Deadpan machine logic: the fix itself was the break.
//     The bug was load-bearing. One reversal, no setup, no blame, no
//     stock line about instructions, rebooting, or being only a language model.)
//   B REJECTED — "It worked on my machine. My machine is now production."
//     (56 chars, punchy, but "worked on my machine" is the most worn
//     developer excuse there is — half the field will say it.)
//   C REJECTED — "I deleted the database to make room for the backup. There was no backup."
//     (~73 chars, funny disaster, but a familiar trope in two beats —
//     longer and less surprising than A.)
//
// Guards: the entry must be one non-blank line of 1-180 characters. A
// whitespace-only line is rejected outright by its own check, before the
// length check, so an empty-looking excuse can never slip through as valid.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const EXCUSE =
  "I fixed the bug that was holding production together.";

const OUTPUT_PATH = "/output/entry.txt";

function main(): void {
  // Reject a whitespace-only excuse on its own: trim().length of 0 means
  // there is no excuse at all, only blank space, and the gate counts that
  // as invalid — so fail here instead of writing an empty-looking file.
  if (EXCUSE.trim().length === 0) {
    throw new Error("excuse must not be only whitespace");
  }
  const line = EXCUSE.trim();
  if (line.length === 0 || line.length > 180) {
    throw new Error(`excuse must be 1-180 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, line, "utf8");
  // Read it back: the gate counts exactly what is on disk, so verify
  // the file holds the same single line we intended to ship.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== line) {
    throw new Error("entry.txt on disk does not match the intended excuse");
  }
  console.log(`wrote ${line.length} characters to ${OUTPUT_PATH}`);
}

main();
