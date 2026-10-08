// Usage: npm run build && npm start   (in another terminal)  then:
//   npx playwright install chromium && node scripts/check-overflow.mjs
import { chromium } from "playwright";
const url = process.env.URL ?? "http://localhost:3000";
const sizes = [[360, 740], [390, 844], [768, 1024], [1440, 900], [1920, 1080]];
const browser = await chromium.launch();
let bad = false;
for (const [w, h] of sizes) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(url, { waitUntil: "networkidle" });
  const ok = await page.evaluate(() => document.documentElement.scrollWidth === window.innerWidth);
  if (w === 1440 || w === 390) await page.screenshot({ path: `shot-${w}x${h}.png`, fullPage: true });
  console.log(`${w}x${h}: overflow-free=${ok} console-errors=${errors.length}`);
  if (!ok || errors.length) bad = true;
  await page.close();
}
await browser.close();
process.exit(bad ? 1 : 0);
