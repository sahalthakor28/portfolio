// Runs after `npm install`: copies self-hosted fonts and brand logos out of node_modules.
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const nm = (p) => join("node_modules", p);
mkdirSync("src/fonts", { recursive: true });
mkdirSync("public/logos", { recursive: true });

const fonts = [
  ["@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2", "InterTight-Variable.woff2"],
  ["@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2", "InstrumentSerif-Regular.woff2"],
  ["@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2", "InstrumentSerif-Italic.woff2"],
  ["@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2", "JetBrainsMono-Variable.woff2"],
];
let failed = false;
for (const [from, to] of fonts) {
  if (existsSync(nm(from))) copyFileSync(nm(from), join("src/fonts", to));
  else { console.error("MISSING FONT FILE:", from); failed = true; }
}

// Brand logos: devicon "original" SVGs (MIT). Anything missing falls back to a line icon in the UI.
const logos = ["python","java","javascript","html5","css3","django","flutter","androidstudio","mysql","sqlite",
  "pandas","numpy","scikitlearn","opencv","amazonwebservices","googlecloud","github","git","vscode","jira",
  "bitbucket","powershell","solidity","truffle","matplotlib"];
for (const n of logos) {
  const src = nm(`devicon/icons/${n}/${n}-original.svg`);
  if (existsSync(src)) copyFileSync(src, join("public/logos", `${n}.svg`));
  else console.warn("logo not found (fallback icon will be used):", n);
}
const lic = nm("devicon/LICENSE");
if (existsSync(lic)) writeFileSync("public/logos/LICENSE-devicon.txt", readFileSync(lic));
if (failed) process.exit(1);
console.log("assets copied");
