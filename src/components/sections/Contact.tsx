"use client";
import { useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
import { cv } from "@/lib/css";
import { SectionTag } from "../ui/SectionHead";

const css = `
.ct{padding-bottom:40px}
.big{font-weight:700;letter-spacing:-.05em;line-height:.95;font-size:clamp(48px,10vw,168px);margin-top:8px}
.big .wd{display:inline-block;white-space:nowrap}
.big .ch{display:inline-block;transition:transform .5s var(--ease)}
.big .ch.hop{animation:hop .7s var(--ease)}
.big em{font-family:var(--f-serif);font-style:italic;font-weight:400;color:var(--mute);letter-spacing:-.02em}
@keyframes hop{0%{transform:translateY(0)}35%{transform:translateY(-.16em)}100%{transform:translateY(0)}}
.ct-row{display:flex;flex-wrap:wrap;align-items:center;gap:20px 28px;margin-top:clamp(36px,6vh,64px)}
.mail{font-size:clamp(22px,3.4vw,52px);font-weight:600;letter-spacing:-.035em;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:.14em;overflow-wrap:anywhere}
.copy{height:36px;padding:0 16px;border-radius:999px;box-shadow:inset 0 0 0 1px var(--line);font-size:13px;font-weight:600;transition:background .4s var(--ease),color .4s var(--ease)}
.copy:hover{background:var(--ink);color:#fff}
.ct-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}
.badge{position:absolute;right:var(--gutter);top:var(--sec-pad);width:130px;height:130px;animation:spin 18s linear infinite}
.badge text{font-family:var(--f-mono);font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;fill:var(--ink)}
@keyframes spin{to{transform:rotate(360deg)}}
.foot{margin-top:clamp(80px,14vh,160px);padding-top:22px;border-top:1px solid var(--line);display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;font-size:13px;color:var(--mute)}
.foot a:hover{color:var(--ink)}
@media(max-width:700px){.badge{display:none}}
`;

function Letters({ text }: { text: string }) {
  const hop = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;
    el.classList.remove("hop");
    void el.offsetWidth;
    el.classList.add("hop");
  };
  return (
    <>
      {text.split(" ").map((w, wi) => (
        <span key={wi} className="wd">
          {w.split("").map((c, ci) => (
            <span key={ci} className="ch" aria-hidden="true" onPointerEnter={hop}>{c}</span>
          ))}{" "}
        </span>
      ))}
    </>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };
  return (
    <section id="contact" className="sec ct">
      <style>{css}</style>
      <svg className="badge" viewBox="0 0 130 130" aria-hidden="true">
        <defs><path id="circ" d="M65 65 m-50 0 a50 50 0 1 1 100 0 a50 50 0 1 1 -100 0" /></defs>
        <text><textPath href="#circ">say hello · say hello · say hello · </textPath></text>
      </svg>
      <div className="wrap">
        <SectionTag n="06" label="Contact" />
        <h2 className="big" aria-label="Let’s build something together.">
          <span className="rv-mask"><span><Letters text="Let’s build" /></span></span>
          <span className="rv-mask" style={cv({ "--i": 1 })}><span><Letters text="something" /> <em><Letters text="together." /></em></span></span>
        </h2>
        <div className="ct-row rv">
          <a className="mail" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <button className="copy" onClick={copy}>{copied ? "Copied ✓" : "Copy"}</button>
          <span className="sr-only" role="status" aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{copied ? "Email copied to clipboard" : ""}</span>
        </div>
        <div className="ct-links rv">
          <a className="btn btn-primary" href={PROFILE.phoneHref}>{PROFILE.phone}</a>
          <a className="btn btn-ghost" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a className="btn btn-ghost" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
        <footer className="foot">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <a href="#top" onClick={(e) => { e.preventDefault(); scrollToTarget("#top"); }}>Back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}
