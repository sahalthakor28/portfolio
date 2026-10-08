"use client";
import { useEffect, useRef, useState } from "react";
import { EDUCATION, EXPERIENCE, PROFILE, PROJECTS } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";
import { cv } from "@/lib/css";
import { SectionTag } from "../ui/SectionHead";

const css = `
.ab{padding-top:calc(var(--sec-pad)*.6)}
.ab-grid{display:grid;grid-template-columns:minmax(0,1fr) 320px minmax(0,1fr);gap:clamp(24px,4vw,64px);align-items:stretch}
.ab-l{display:flex;flex-direction:column;gap:22px;padding-top:56px}
.ab-l h2{font-size:clamp(40px,5vw,72px)}
.ab-l p{color:var(--ink-2);font-size:17px;max-width:46ch}
.ab-l .extra{color:var(--mute)}
.ab-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:auto}
.ab-r{display:flex;flex-direction:column;gap:28px;padding-top:56px}
.facts{display:flex;flex-direction:column}
.facts div{display:flex;justify-content:space-between;gap:16px;padding:16px 0;border-top:1px solid var(--line);font-size:15px}
.facts div:last-child{border-bottom:1px solid var(--line)}
.facts dt{font-family:var(--f-mono);font-size:11.5px;letter-spacing:.07em;text-transform:uppercase;color:var(--mute);padding-top:3px}
.facts dd{margin:0;text-align:right;overflow-wrap:anywhere}
.quote{font-family:var(--f-serif);font-style:italic;font-size:clamp(24px,2.4vw,32px);line-height:1.2;color:var(--ink-2);margin-top:auto}
.lanyard{min-height:640px}
.sw{position:absolute;top:0;left:50%;z-index:2;width:0;height:0;transform-origin:0 0}
.hook{position:absolute;left:-7px;top:0;width:14px;height:14px;border-radius:50%;box-shadow:inset 0 0 0 2px var(--ink);background:var(--paper)}
.cord{position:absolute;left:-.5px;top:12px;width:1px;height:calc(var(--sec-pad)*.6 + 40px);background:var(--ink-2)}
.strap{position:absolute;left:-15px;top:calc(var(--sec-pad)*.6 + 50px);width:30px;height:56px;background:var(--ink);border-radius:3px;overflow:hidden;color:#fff}
.strap span{display:block;writing-mode:vertical-rl;font-family:var(--f-mono);font-size:8px;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;padding:3px 0 3px 10px;animation:strap 9s linear infinite}
@keyframes strap{from{transform:translateY(60px)}to{transform:translateY(-100%)}}
.clip{position:absolute;left:-11px;top:calc(var(--sec-pad)*.6 + 104px);width:22px;height:20px;border-radius:3px 3px 6px 6px;background:var(--faint);box-shadow:inset 0 0 0 1px rgba(13,13,13,.35),inset 0 -5px 0 rgba(13,13,13,.12)}
.card-w{position:absolute;left:-150px;top:calc(var(--sec-pad)*.6 + 118px);width:300px;height:404px;perspective:1100px}
.idc{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .9s var(--ease);cursor:pointer;border-radius:22px;outline-offset:6px}
.idc.flip{transform:rotateY(180deg)}
.face{position:absolute;inset:0;border-radius:22px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line),0 30px 60px rgba(13,13,13,.14);backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow:hidden;display:flex;flex-direction:column}
.face.back{transform:rotateY(180deg);padding:26px 24px}
.band{background:var(--ink);color:#fff;font-family:var(--f-mono);font-size:11px;letter-spacing:.22em;text-align:center;padding:12px 0}
.pic{margin:18px auto 0;width:128px;height:156px;border-radius:18px;padding:3px;background:conic-gradient(#d4d2cc,#7d7b76,#d4d2cc,#a9a6a0,#d4d2cc);position:relative}
.pic::before{content:"";position:absolute;inset:-14px;border-radius:28px;background:radial-gradient(closest-side,rgba(13,13,13,.1),transparent);z-index:-1}
.pic div{width:100%;height:100%;border-radius:15px;overflow:hidden;background:#fff}
.pic img{width:100%;height:100%;object-fit:cover;object-position:50% 12%;transition:transform .9s var(--ease)}
.idc:hover .pic img{transform:scale(1.08)}
.id-n{text-align:center;margin-top:14px;font-weight:700;font-size:19px;letter-spacing:-.03em}
.id-r{text-align:center;font-size:13px;color:var(--mute)}
.id-rows{margin:12px 22px 0;display:flex;flex-direction:column;gap:5px;font-size:12px}
.id-rows div{display:flex;justify-content:space-between;border-top:1px dashed var(--line);padding-top:5px}
.id-rows dt{font-family:var(--f-mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.id-rows dd{margin:0}
.id-foot{margin-top:auto;display:flex;align-items:flex-end;justify-content:space-between;padding:0 22px 16px}
.bars{height:30px;width:150px;background:repeating-linear-gradient(90deg,var(--ink) 0 2px,transparent 2px 4px,var(--ink) 4px 5px,transparent 5px 8px,var(--ink) 8px 11px,transparent 11px 12px)}
.holo{width:34px;height:34px;border-radius:50%;background:conic-gradient(#e9e6e0,#a9a6a0,#f4f2ee,#77756f,#e9e6e0);box-shadow:inset 0 0 0 1px var(--line)}
.back h3{font-size:22px;font-weight:700;letter-spacing:-.03em;margin-bottom:12px}
.back ul{display:flex;flex-direction:column;gap:9px;font-size:13px;color:var(--ink-2)}
.back li::before{content:"— ";color:var(--faint)}
.sig{margin-top:auto;font-family:var(--f-serif);font-style:italic;font-size:26px;border-bottom:1px solid var(--line);padding-bottom:4px}
.found{font-family:var(--f-mono);font-size:10px;letter-spacing:.05em;color:var(--mute);margin-top:10px;overflow-wrap:anywhere}
@media(max-width:1000px){
 .ab-grid{grid-template-columns:1fr}
 .lanyard{order:-1;min-height:560px}
 .ab-l,.ab-r{padding-top:0}
 .quote{margin-top:0}
}
`;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export default function About() {
  const sec = useRef<HTMLElement>(null);
  const sw = useRef<HTMLDivElement>(null);
  const [flip, setFlip] = useState(false);
  const ptype = useRef("mouse");

  // damped pendulum: pointer velocity -> angle, spring back, plus a faint idle sway
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ang = 0, vel = 0, raf = 0, lastX = 0, lastT = 0, active = false;
    const el = sw.current;
    const onMove = (e: PointerEvent) => {
      if (!active) return;
      const dt = Math.max(8, e.timeStamp - lastT);
      vel += clamp(((e.clientX - lastX) / dt) * 0.35, -1.2, 1.2);
      lastX = e.clientX; lastT = e.timeStamp;
    };
    const section = sec.current;
    const io = new IntersectionObserver(([e]) => { active = e.isIntersecting; }, { threshold: 0 });
    if (section) io.observe(section);
    const loop = (t: number) => {
      vel += -ang * 0.014 - vel * 0.028;
      ang = clamp(ang + vel, -26, 26);
      const sway = Math.sin(t / 1700) * 1.4;
      if (el && active) el.style.transform = `rotate(${(ang + sway).toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  const exp = EXPERIENCE[EXPERIENCE.length - 1];
  const edu = EDUCATION[0];
  const projectNames = PROJECTS.slice(0, 3).map((p) => p.title.replace(/ — .*/, "")).join(", ");

  return (
    <section id="about" ref={sec} className="sec ab">
      <style>{css}</style>
      <div className="wrap">
        <div className="ab-grid">
          <div className="ab-l">
            <SectionTag n="01" label="About" />
            <h2 className="h2"><span className="rv-mask"><span>Hi, I’m {PROFILE.firstName}.</span></span></h2>
            <p className="rv">{PROFILE.resumeSummary}</p>
            <p className="rv extra">{PROFILE.extraLine}</p>
            <div className="ab-btns rv">
              <a className="btn btn-primary" href={PROFILE.resume} download>Résumé ↓</a>
              <a className="btn btn-ghost" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a className="btn btn-ghost" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
          </div>

          <div className="lanyard">
            <div className="sw" ref={sw}>
              <i className="hook" />
              <i className="cord" />
              <div className="strap" aria-hidden="true"><span>{PROFILE.name} · {PROFILE.role} · {PROFILE.name} · {PROFILE.role}</span></div>
              <i className="clip" />
              <div className="card-w">
                <div
                  className={`idc${flip ? " flip" : ""}`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={flip}
                  aria-label={`${PROFILE.name} developer ID card. Press to flip.`}
                  onPointerEnter={(e) => { ptype.current = e.pointerType; if (e.pointerType === "mouse") setFlip(true); }}
                  onPointerLeave={(e) => { if (e.pointerType === "mouse") setFlip(false); }}
                  onPointerDown={(e) => { ptype.current = e.pointerType; }}
                  onClick={() => { if (ptype.current !== "mouse") setFlip((f) => !f); }}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlip((f) => !f); } }}
                >
                  <div className="face front">
                    <div className="band">DEVELOPER ID</div>
                    <div className="pic"><div>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/portrait-bust.webp" alt={`Portrait of ${PROFILE.name}`} /></div></div>
                    <p className="id-n">{PROFILE.name}</p>
                    <p className="id-r">{PROFILE.role}</p>
                    <dl className="id-rows">
                      <div><dt>Dept.</dt><dd>{edu.title}</dd></div>
                      <div><dt>Graduated</dt><dd>{edu.when}</dd></div>
                      <div><dt>Based in</dt><dd>Anand, Gujarat</dd></div>
                    </dl>
                    <div className="id-foot" aria-hidden="true"><i className="bars" /><i className="holo" /></div>
                  </div>
                  <div className="face back">
                    <h3>What I am</h3>
                    <ul>
                      <li>{PROFILE.headline.split(" | ").join(" · ")}</li>
                      <li>{edu.title}, graduated {edu.when}</li>
                      <li>Latest role: {exp.title}, {exp.place}</li>
                      <li>Projects include {projectNames}</li>
                      <li>{PROJECTS.length} projects, from development through deployment</li>
                    </ul>
                    <p className="sig">{PROFILE.name}</p>
                    <p className="found">If found, say hello · {PROFILE.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ab-r">
            <dl className="facts rv">
              <div><dt>Location</dt><dd>{PROFILE.location}</dd></div>
              <div><dt>Education</dt><dd>{edu.title}, {edu.when}</dd></div>
              <div><dt>Latest role</dt><dd>{exp.title} · {exp.place}</dd></div>
              <div><dt>Email</dt><dd><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></dd></div>
            </dl>
            <p className="quote rv" style={cv({ "--i": 2 })}>“{PROFILE.quote}”</p>
          </div>
        </div>
      </div>
    </section>
  );
}
