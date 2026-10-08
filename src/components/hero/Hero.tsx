"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { cv } from "@/lib/css";
import { scrollToTarget } from "@/lib/scroll";

const css = `
.hero{position:relative;min-height:100svh;display:grid;place-items:center;overflow:clip;padding:0 var(--gutter)}
.ghost{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);z-index:0;font-weight:800;letter-spacing:-.07em;line-height:.8;white-space:nowrap;font-size:clamp(52px,11vw,180px);max-width:100%;overflow:hidden;color:transparent;-webkit-text-stroke:1.5px rgba(13,13,13,.14);user-select:none;pointer-events:none}
.vid{position:relative;z-index:1;height:min(96svh,1040px);aspect-ratio:768/960;max-width:100%;mix-blend-mode:multiply;display:block;margin-top:18px}
.vid video{width:100%;height:100%;object-fit:cover;display:block;opacity:0;transition:opacity .45s ease}
.vid video.ready{opacity:1}
.hero-copy{position:absolute;z-index:2;left:var(--gutter);bottom:clamp(28px,7vh,72px);max-width:min(520px,42vw)}
.hero-copy h1{font-weight:700;letter-spacing:-.045em;line-height:1;font-size:clamp(40px,6.4vw,104px)}
.hero-copy .sub{margin-top:18px;color:var(--mute);font-size:15px;max-width:34ch}
.ctas{display:flex;flex-wrap:wrap;gap:10px;margin-top:26px}
.hero-meta{position:absolute;z-index:2;right:var(--gutter);bottom:clamp(28px,7vh,72px);text-align:right;font-family:var(--f-mono);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute);display:flex;flex-direction:column;gap:6px}
.snd{position:absolute;z-index:3;right:var(--gutter);top:50%;width:46px;height:46px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;transition:transform .5s var(--ease)}
.snd:hover{transform:scale(1.08)}
.snd svg{width:16px;height:16px;fill:currentColor}
.snd.ping::after{content:"";position:absolute;inset:-2px;border-radius:50%;border:1.5px solid var(--ink);animation:ping 2s var(--ease) infinite}
@keyframes ping{0%{transform:scale(1);opacity:.5}100%{transform:scale(1.9);opacity:0}}
@media(max-width:900px){
 .hero{align-content:start;padding-top:96px}
 .vid{height:62svh}
 .hero-copy{position:relative;left:auto;bottom:auto;max-width:none;margin-top:-6svh;z-index:2;justify-self:start;padding-bottom:40px}
 .hero-meta{display:none}
 .snd{top:112px}
}
`;

export default function Hero() {
  const sec = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const visible = useRef(true);
  const userMuted = useRef(false);
  const [on, setOn] = useState(false);       // sound audible
  const [blocked, setBlocked] = useState(false);
  const [ready, setReady] = useState(false);

  const sync = useCallback(() => {
    const v = vid.current;
    if (v) setOn(!v.muted && !v.paused);
  }, []);

  const start = useCallback(async () => {
    const v = vid.current;
    if (!v || !visible.current) return;
    if (!userMuted.current) v.muted = false;
    try {
      await v.play();
      setBlocked(false);
    } catch {
      v.muted = true;
      setBlocked(!userMuted.current);
      try { await v.play(); } catch { /* ignore */ }
    }
    sync();
  }, [sync]);

  // initial autoplay with sound, falling back to muted
  useEffect(() => { start(); }, [start]);

  // unlock sound on first interaction (not on the sound button itself)
  useEffect(() => {
    const unlock = (e: Event) => {
      if ((e.target as Element | null)?.closest?.("[data-sound-btn]")) return;
      if (userMuted.current) return;
      start();
      off();
    };
    const evs = ["pointerdown", "keydown", "touchend"] as const;
    const off = () => evs.forEach((n) => window.removeEventListener(n, unlock));
    evs.forEach((n) => window.addEventListener(n, unlock, { passive: true }));
    return off;
  }, [start]);

  // pause (and silence) when less than 35% of the hero is visible
  useEffect(() => {
    const el = sec.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        const v = vid.current;
        if (!v) return;
        visible.current = e.intersectionRatio >= 0.35;
        if (visible.current) { v.play().then(sync).catch(() => {}); }
        else { v.pause(); sync(); }
      },
      { threshold: [0, 0.35, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [sync]);

  const toggle = () => {
    const v = vid.current;
    if (!v) return;
    if (!v.muted && !v.paused) {
      userMuted.current = true;
      v.muted = true;
      sync();
    } else {
      userMuted.current = false;
      v.muted = false;
      v.play().then(() => { setBlocked(false); sync(); }).catch(() => { v.muted = true; sync(); });
    }
  };

  return (
    <section id="hero" ref={sec} className="hero" aria-label="Introduction">
      <style>{css}</style>
      <div className="ghost" aria-hidden="true">{PROFILE.firstName.toUpperCase()}</div>
      <div className="vid">
        <video ref={vid} loop playsInline preload="auto" className={ready ? "ready" : ""} aria-label={`${PROFILE.name} introducing himself`} onCanPlay={() => setReady(true)} onLoadedData={() => setReady(true)} onPlay={sync} onPause={sync} onVolumeChange={sync}>
          <source src="/hero/hero.webm" type="video/webm" />
          <source src="/hero/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-copy">
        <h1><span className="rv-mask"><span>{PROFILE.role}.</span></span></h1>
        <p className="sub rv" style={cv({ "--i": 3 })}>{PROFILE.headline.split(" | ").join(" · ")}</p>
        <div className="ctas rv" style={cv({ "--i": 4 })}>
          <a className="btn btn-primary" href="#work" onClick={(e) => { e.preventDefault(); scrollToTarget("#work"); }}>Explore work</a>
          <a className="btn btn-ghost" href="#contact" onClick={(e) => { e.preventDefault(); scrollToTarget("#contact"); }}>Let’s talk</a>
          <a className="btn btn-ghost" href={PROFILE.resume} download>Résumé ↓</a>
        </div>
      </div>
      <div className="hero-meta" aria-hidden="true"><span>{PROFILE.location}</span><span>Graduated 2025</span></div>
      <button type="button" data-sound-btn className={`snd${blocked ? " ping" : ""}`} onClick={toggle} aria-label={on ? "Mute intro voice" : "Play intro voice"} aria-pressed={on}>
        {on ? (
          <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2" width="3.4" height="12" rx="1" /><rect x="9.6" y="2" width="3.4" height="12" rx="1" /></svg>
        ) : (
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.2v11.6a.6.6 0 0 0 .9.5l9-5.8a.6.6 0 0 0 0-1L4.9 1.7a.6.6 0 0 0-.9.5z" /></svg>
        )}
      </button>
    </section>
  );
}
