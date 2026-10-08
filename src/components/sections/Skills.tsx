"use client";
import { useMemo, useState } from "react";
import { PROJECTS, SKILL_GROUPS } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import { cv } from "@/lib/css";
import { SectionHeading, SectionTag } from "../ui/SectionHead";
import TechLogo from "../ui/TechLogo";

const css = `
.sk-layout{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:32px;margin-top:56px;align-items:start}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:40px}
.chip{height:38px;padding:0 16px;border-radius:999px;font-size:13px;font-weight:500;box-shadow:inset 0 0 0 1px var(--line);transition:background .4s var(--ease),color .4s var(--ease)}
.chip:hover{background:var(--soft)}
.chip[aria-pressed="true"]{background:var(--ink);color:#fff}
.tiles{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:8px}
.tile{position:relative;aspect-ratio:1;background:var(--card);border-radius:14px;box-shadow:inset 0 0 0 1px var(--line);padding:8px 9px;display:flex;flex-direction:column;justify-content:space-between;text-align:left;transition:transform .5s var(--ease),opacity .5s var(--ease),box-shadow .5s var(--ease),background .4s var(--ease),color .4s var(--ease);min-width:0}
.tile:hover,.tile:focus-visible,.tile.act{transform:translateY(-3px);background:var(--ink);color:#fff;box-shadow:0 14px 30px rgba(13,13,13,.16)}
.tile .n{font-family:var(--f-mono);font-size:10px;opacity:.55}
.tile .s{font-size:clamp(20px,2.4vw,32px);font-weight:700;letter-spacing:-.04em;line-height:1}
.tile .m{font-size:10.5px;line-height:1.15;font-weight:500;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.tile.dim{opacity:.22}
.tiles:not(.in) .tile{opacity:0}
.tiles.in .tile{animation:wave .9s var(--ease) backwards;animation-delay:calc(var(--d8)*40ms)}
@keyframes wave{from{opacity:0;transform:translateY(18px) scale(.94)}}
.insp{position:sticky;top:110px;padding:28px;min-height:360px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px}
.insp-logo{width:150px;height:150px;display:grid;place-items:center;margin-top:6px;animation:pop .7s var(--ease)}
.insp-logo svg,.insp-logo img{width:150px!important;height:150px!important}
.insp-logo svg{color:var(--ink-2)}
@keyframes pop{0%{transform:scale(.6);opacity:0}60%{transform:scale(1.07);opacity:1}100%{transform:scale(1)}}
.insp h3{font-size:26px;font-weight:700;letter-spacing:-.03em}
.insp .fam{font-family:var(--f-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.insp .used{font-size:13px;color:var(--ink-2)}
.insp .hint{margin:auto;color:var(--mute);font-size:14px;max-width:22ch}
@media(max-width:1100px){.sk-layout{grid-template-columns:1fr}.insp{position:static;min-height:0;order:2}}
@media(max-width:700px){.tiles{grid-template-columns:repeat(4,minmax(0,1fr))}.tiles.in .tile{animation-delay:calc(var(--d4)*40ms)}}
`;

type Tile = { name: string; family: string; n: number; sym: string; used: string[]; r8: number; c8: number; r4: number; c4: number };

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

function buildTiles(): Tile[] {
  const taken = new Set<string>();
  const out: Tile[] = [];
  let n = 0;
  for (const g of SKILL_GROUPS) {
    for (const it of g.items) {
      n += 1;
      const letters = it.name.replace(/[^A-Za-z0-9]/g, "");
      let sym = letters[0].toUpperCase() + (letters[1] ?? "").toLowerCase();
      for (let k = 2; taken.has(sym) && k < letters.length; k++) sym = letters[0].toUpperCase() + letters[k].toLowerCase();
      let extra = 0;
      while (taken.has(sym)) sym = letters[0].toUpperCase() + String.fromCharCode(97 + (extra++ % 26));
      taken.add(sym);
      const names = [it.name, ...(it.aka ?? [])].map(norm);
      const used = PROJECTS.filter((p) => p.tech.some((t) => names.includes(norm(t)))).map((p) => p.title);
      const i = n - 1;
      out.push({ name: it.name, family: g.family, n, sym, used, r8: Math.floor(i / 8), c8: i % 8, r4: Math.floor(i / 4), c4: i % 4 });
    }
  }
  return out;
}

export default function Skills() {
  const tiles = useMemo(buildTiles, []);
  const families = useMemo(() => SKILL_GROUPS.map((g) => g.family), []);
  const [fam, setFam] = useState<string | null>(null);
  const [act, setAct] = useState<Tile | null>(null);
  const [gridRef, seen] = useInView<HTMLDivElement>(0.15);
  const [everSeen, setEverSeen] = useState(false);
  if (seen && !everSeen) setEverSeen(true);

  return (
    <section id="skills" className="sec">
      <style>{css}</style>
      <div className="wrap">
        <SectionTag n="02" label="Skills" />
        <SectionHeading lead="The periodic table of my" accent="stack." />
        <div className="chips rv" role="group" aria-label="Filter skills by family">
          <button className="chip" aria-pressed={fam === null} onClick={() => setFam(null)}>All</button>
          {families.map((f) => (
            <button key={f} className="chip" aria-pressed={fam === f} onClick={() => setFam(fam === f ? null : f)}>{f}</button>
          ))}
        </div>
        <div className="sk-layout">
          <div ref={gridRef} className={`tiles${everSeen ? " in" : ""}`} role="list">
            {tiles.map((t) => (
              <button
                key={t.name}
                role="listitem"
                className={`tile${fam && fam !== t.family ? " dim" : ""}${act?.name === t.name ? " act" : ""}`}
                style={cv({ "--d8": t.r8 + t.c8, "--d4": t.r4 + t.c4 })}
                onMouseEnter={() => setAct(t)}
                onFocus={() => setAct(t)}
                onClick={() => setAct(t)}
                aria-label={`${t.name}, ${t.family}`}
              >
                <span className="n">{String(t.n).padStart(2, "0")}</span>
                <span className="s" aria-hidden="true">{t.sym}</span>
                <span className="m">{t.name}</span>
              </button>
            ))}
          </div>
          <aside className="card insp rv" aria-live="polite" aria-label="Skill details">
            {act ? (
              <>
                <div className="insp-logo" key={act.name}><TechLogo name={act.name} size={150} /></div>
                <h3>{act.name}</h3>
                <p className="fam">{act.family} · {String(act.n).padStart(2, "0")}</p>
                <p className="used">
                  {act.used.length ? <>Used in: {act.used.join(", ")}</> : "Listed in my résumé skills."}
                </p>
              </>
            ) : (
              <p className="hint">Hover or focus an element to inspect it.</p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
