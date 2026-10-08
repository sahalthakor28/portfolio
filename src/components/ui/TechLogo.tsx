"use client";
import { useState, type ReactNode } from "react";

/** skill / tech name (lower-case) -> devicon folder copied into /public/logos by scripts/copy-assets.mjs */
export const BRAND: Record<string, string> = {
  python: "python", java: "java", javascript: "javascript",
  html5: "html5", html: "html5", css3: "css3", css: "css3",
  django: "django", flutter: "flutter", "android studio": "androidstudio",
  mysql: "mysql", sqlite: "sqlite", pandas: "pandas", numpy: "numpy",
  "scikit-learn": "scikitlearn", opencv: "opencv", aws: "amazonwebservices",
  "google cloud": "googlecloud", github: "github", git: "git", "vs code": "vscode",
  jira: "jira", bitbucket: "bitbucket", powershell: "powershell",
  solidity: "solidity", truffle: "truffle", matplotlib: "matplotlib",
};

type IconKey = "nodes" | "chart" | "bars" | "brackets" | "chain" | "grid" | "globe" | "device" | "download" | "pie" | "term" | "table" | "cube" | "cloud";

/** concept skills get thin line icons */
export const CONCEPT: Record<string, IconKey> = {
  sql: "table", "rest apis": "brackets", "responsive web": "device",
  "machine learning": "chart", "artificial intelligence": "nodes", "data analysis": "bars",
  "tf-idf": "table", linearsvc: "chart", mediapipe: "nodes",
  erpnext: "grid", frappe: "grid", odoo: "grid",
  blockchain: "chain", "smart contracts": "chain", ganache: "chain", "remix ide": "term",
  render: "cloud", svn: "cube", "web scraping": "download", "web crawling": "nodes",
  "data visualization": "pie", tkinter: "device", "pdf generation": "table",
};

export const isBrand = (name: string) => name.toLowerCase() in BRAND;

const ICONS: Record<IconKey, ReactNode> = {
  nodes: (<><circle cx="6" cy="7" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="12" cy="17" r="2" /><path d="M7.7 8l3 7M16.5 7.5l-3 8M8 7h8" /></>),
  chart: (<><path d="M4 4v16h16" /><path d="M7 15l4-4 3 3 5-6" /></>),
  bars: (<><path d="M4 20h16" /><rect x="6" y="11" width="3" height="9" /><rect x="11" y="6" width="3" height="14" /><rect x="16" y="13" width="3" height="7" /></>),
  brackets: (<><path d="M9 6L3 12l6 6M15 6l6 6-6 6" /></>),
  chain: (<><rect x="3" y="9" width="10" height="6" rx="3" /><rect x="11" y="9" width="10" height="6" rx="3" /></>),
  grid: (<><rect x="4" y="4" width="7" height="7" /><rect x="13" y="4" width="7" height="7" /><rect x="4" y="13" width="7" height="7" /><rect x="13" y="13" width="7" height="7" /></>),
  globe: (<><circle cx="12" cy="12" r="8" /><ellipse cx="12" cy="12" rx="3.5" ry="8" /><path d="M4 12h16" /></>),
  device: (<><rect x="3" y="5" width="14" height="10" rx="1.5" /><rect x="15" y="9" width="6" height="10" rx="1.5" /></>),
  download: (<><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></>),
  pie: (<><circle cx="12" cy="12" r="8" /><path d="M12 12V4M12 12l6 5" /></>),
  term: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 10l3 2-3 2M12 15h5" /></>),
  table: (<><rect x="4" y="5" width="16" height="14" rx="1.5" /><path d="M4 10h16M10 10v9" /></>),
  cube: (<><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" /></>),
  cloud: (<><path d="M7 18a4 4 0 1 1 .8-7.9A5 5 0 0 1 17.5 11 3.5 3.5 0 0 1 17 18z" /></>),
};

function mono(name: string) {
  const m = name.replace(/[^A-Za-z0-9]/g, "");
  return m.slice(0, 2);
}

export default function TechLogo({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  const key = name.toLowerCase();
  const [broken, setBroken] = useState(false);
  const brand = BRAND[key];
  if (brand && !broken) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={`/logos/${brand}.svg`} alt="" width={size} height={size} className={className} loading="lazy" decoding="async" onError={() => setBroken(true)} style={{ width: size, height: size, objectFit: "contain" }} />
    );
  }
  const icon = CONCEPT[key] ?? "cube";
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-fallback={mono(name)}>
      {ICONS[icon]}
    </svg>
  );
}
