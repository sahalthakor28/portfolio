"use client";
import { useState } from "react";
import { PROJECTS } from "@/lib/data";
import { SectionHeading, SectionTag } from "../ui/SectionHead";
import Mock, { mockCss } from "../ui/Mock";
import TechLogo from "../ui/TechLogo";

const css = `
.acc{display:flex;gap:10px;margin-top:56px;height:min(78svh,600px)}
.pan{position:relative;flex:1 1 0;min-width:0;background:var(--card);border-radius:26px;box-shadow:inset 0 0 0 1px var(--line);overflow:hidden;transition:flex .8s var(--ease),box-shadow .6s var(--ease)}
.pan.open{flex:12 1 0;box-shadow:inset 0 0 0 1px var(--line),0 30px 70px rgba(13,13,13,.1)}
.spine{position:absolute;inset:0;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:22px 0;transition:opacity .4s var(--ease)}
.pan.open .spine{opacity:0;pointer-events:none}
.sp-n{font-family:var(--f-mono);font-size:11px;color:var(--mute)}
.sp-t{writing-mode:vertical-rl;transform:rotate(180deg);font-weight:600;font-size:15px;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-height:70%}
.sp-plus{width:30px;height:30px;border-radius:50%;box-shadow:inset 0 0 0 1px var(--line);display:grid;place-items:center;font-size:18px;line-height:1;transition:transform .6s var(--ease),background .4s,color .4s}
.spine:hover .sp-plus{transform:rotate(90deg);background:var(--ink);color:#fff}
.pbody{position:absolute;inset:0;min-width:640px;padding:34px;display:grid;grid-template-columns:minmax(0,1fr);gap:28px;opacity:0;visibility:hidden;transition:opacity .35s var(--ease),visibility 0s .35s}
.pan.open .pbody{opacity:1;visibility:visible;transition:opacity .6s var(--ease) .25s,visibility 0s}
.ptxt{display:flex;flex-direction:column;gap:14px;min-height:0;overflow:hidden}
.pk{font-family:var(--f-mono);font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.ptxt h3{font-size:clamp(26px,2.9vw,42px);font-weight:700;letter-spacing:-.04em;line-height:1.02}
.ptxt .d{color:var(--ink-2);font-size:15.5px;max-width:52ch}
.feat{display:grid;grid-template-columns:1fr 1fr;gap:6px 22px;font-size:13px;color:var(--ink-2)}
.feat li{padding-left:14px;position:relative;line-height:1.4}.feat li::before{content:"";position:absolute;left:0;top:.6em;width:5px;height:1px;background:var(--ink)}
.tchips{display:flex;flex-wrap:wrap;gap:7px;margin-top:auto}
.tchip{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 12px 0 9px;border-radius:999px;font-size:12px;font-weight:500;box-shadow:inset 0 0 0 1px var(--line);background:var(--paper)}
.pmock{display:none;clip-path:inset(0 0 0 100%);transition:clip-path 1s var(--ease) .35s;align-self:center}
.pan.open .pmock{clip-path:inset(0)}
@media(min-width:1280px){.pbody{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr)}.pmock{display:block}}
@media(max-width:820px){
 .acc{flex-direction:column;height:auto;margin-top:40px}
 .pan{flex:none;transition:none}
 .spine{position:static;flex-direction:row;padding:20px 22px;gap:14px}
 .sp-t{writing-mode:horizontal-tb;transform:none;flex:1;text-align:left;max-height:none;font-size:16px}
 .pan.open .spine{opacity:1;pointer-events:auto}
 .pan.open .sp-plus{transform:rotate(45deg)}
 .pbody{position:static;min-width:0;padding:0 22px 24px;display:none;opacity:1;visibility:visible}
 .pan.open .pbody{display:grid}
 .feat{grid-template-columns:1fr}
 .pmock{display:block;clip-path:none}
}
${mockCss}
`;

export default function Work() {
  const [open, setOpen] = useState(0);
  const hoverOk = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (min-width: 821px)").matches;

  return (
    <section id="work" className="sec">
      <style>{css}</style>
      <div className="wrap">
        <SectionTag n="03" label="Selected work" />
        <SectionHeading lead="Things I’ve" accent="built." />
        <div className="acc rv">
          {PROJECTS.map((p, i) => (
            <article key={p.id} className={`pan${open === i ? " open" : ""}`} onMouseEnter={() => { if (hoverOk()) setOpen(i); }}>
              <button className="spine" aria-expanded={open === i} aria-controls={`pb-${p.id}`} onClick={() => setOpen(i)} onFocus={() => { if (hoverOk()) setOpen(i); }}>
                <span className="sp-n">{p.index}</span>
                <span className="sp-t">{p.title}</span>
                <span className="sp-plus" aria-hidden="true">+</span>
              </button>
              <div id={`pb-${p.id}`} className="pbody" role="region" aria-label={p.title}>
                <div className="ptxt">
                  <p className="pk">{p.index} — {p.kicker}</p>
                  <h3>{p.title}</h3>
                  <p className="d">{p.description}</p>
                  <ul className="feat">
                    {p.features.slice(0, 6).map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <ul className="tchips" aria-label="Technologies">
                    {p.tech.map((t) => (
                      <li key={t} className="tchip"><TechLogo name={t} size={14} />{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="pmock"><Mock kind={p.mock} /></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
