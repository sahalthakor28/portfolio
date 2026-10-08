"use client";
import { CERTIFICATIONS } from "@/lib/data";
import { cv } from "@/lib/css";
import { SectionHeading, SectionTag } from "../ui/SectionHead";

const css = `
.cert{background:var(--card);border-block:1px solid var(--line)}
.cert-g{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(24px,5vw,80px);align-items:start}
.cert-l{position:sticky;top:120px}
.cert-l p.c{margin-top:22px;color:var(--mute);font-size:15px}
.clist{border-top:1px solid var(--line)}
.crow{position:relative;display:flex;align-items:center;gap:20px;padding:24px 20px;border-bottom:1px solid var(--line);overflow:hidden;isolation:isolate;transition:color .5s var(--ease)}
.crow::before{content:"";position:absolute;inset:0;background:var(--ink);transform:scaleX(0);transform-origin:0 50%;transition:transform .7s var(--ease);z-index:-1}
.crow:hover::before,.crow:focus-visible::before,.crow:focus-within::before{transform:scaleX(1)}
.crow:hover,.crow:focus-visible{color:#fff}
.crow .n{font-family:var(--f-mono);font-size:12px;color:var(--mute);width:28px;transition:color .5s}
.crow:hover .n,.crow:focus-visible .n{color:rgba(255,255,255,.6)}
.crow .t{flex:1;font-size:clamp(20px,2.2vw,30px);font-weight:600;letter-spacing:-.03em}
.crow .ar{font-size:22px;transform:translateX(-14px);opacity:0;transition:transform .6s var(--ease),opacity .4s}
.crow:hover .ar,.crow:focus-visible .ar{transform:none;opacity:1}
@media(max-width:900px){.cert-g{grid-template-columns:1fr}.cert-l{position:static}}
`;

export default function Certifications() {
  return (
    <section id="certifications" className="sec cert">
      <style>{css}</style>
      <div className="wrap cert-g">
        <div className="cert-l">
          <SectionTag n="04" label="Certifications" />
          <SectionHeading lead="Always" accent="learning." />
          <p className="c rv">{CERTIFICATIONS.length} areas of study and training</p>
        </div>
        <ul className="clist" aria-label="Certifications and learning">
          {CERTIFICATIONS.map((c, i) => (
            <li key={c} className="crow rv" tabIndex={0} style={cv({ "--i": Math.min(i, 6) })}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <span className="t">{c}</span>
              <span className="ar" aria-hidden="true">↗</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
