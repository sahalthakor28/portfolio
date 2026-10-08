"use client";
import { EDUCATION, EXPERIENCE } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";
import { cv } from "@/lib/css";
import { SectionHeading, SectionTag } from "../ui/SectionHead";

const css = `
.path{position:relative;margin-top:64px;padding-left:clamp(28px,5vw,72px);max-width:980px}
.spine-l,.spine-f{position:absolute;left:6px;top:8px;bottom:8px;width:2px}
.spine-l{background:var(--line)}
.spine-f{background:var(--ink);transform-origin:50% 0;transform:scaleY(var(--p,0))}
.stop{position:relative;padding:0 0 clamp(44px,7vh,76px);opacity:.35;transition:opacity .8s var(--ease)}
.stop.lit{opacity:1}
.stop::before{content:"";position:absolute;left:calc(-1*clamp(28px,5vw,72px) + 0px);top:10px;width:14px;height:14px;border-radius:50%;background:var(--paper);box-shadow:inset 0 0 0 2px var(--faint);transition:background .5s var(--ease),box-shadow .5s var(--ease)}
.stop.lit::before{background:var(--ink);box-shadow:inset 0 0 0 2px var(--ink),0 0 0 6px rgba(13,13,13,.08)}
.stop .w{font-family:var(--f-mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.stop h3{margin-top:8px;font-size:clamp(28px,3.6vw,52px);font-weight:700;letter-spacing:-.04em;line-height:1.02}
.stop .pl{margin-top:6px;font-size:17px;color:var(--ink-2)}
.stop p.dt{margin-top:12px;color:var(--mute);max-width:62ch;font-size:15px}
.next{margin-top:8px;border:1.5px dashed var(--faint);border-radius:24px;padding:28px 30px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;transition:background .5s var(--ease)}
.next:hover{background:var(--card)}
.next b{font-size:clamp(22px,2.6vw,34px);letter-spacing:-.035em;font-weight:700}
.next em{font-family:var(--f-serif);color:var(--mute)}
.next .mono{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
`;

export default function Experience() {
  const [ref, p] = useScrollProgress<HTMLDivElement>();
  const stops = [...EXPERIENCE, ...EDUCATION];
  const n = stops.length;
  return (
    <section id="experience" className="sec">
      <style>{css}</style>
      <div className="wrap">
        <SectionTag n="05" label="Experience & education" />
        <SectionHeading lead="The path so" accent="far." />
        <div className="path" ref={ref} style={cv({ "--p": p })}>
          <i className="spine-l" aria-hidden="true" />
          <i className="spine-f" aria-hidden="true" />
          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {stops.map((s, i) => (
              <li key={s.title} className={`stop${p >= (i + 0.35) / (n + 0.6) ? " lit" : ""}`}>
                <p className="w">{s.when}</p>
                <h3>{s.title}</h3>
                <p className="pl">{s.place}</p>
                {s.detail.map((d) => <p key={d} className="dt">{d}</p>)}
              </li>
            ))}
          </ol>
          <div className="next rv">
            <span className="mono">Next</span>
            <b>Your <em>team?</em></b>
          </div>
        </div>
      </div>
    </section>
  );
}
