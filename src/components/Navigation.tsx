"use client";
import { useEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { cv } from "@/lib/css";
import { lockScroll, scrollToTarget } from "@/lib/scroll";

const css = `
.nav{position:fixed;top:0;left:0;right:0;z-index:50;padding:calc(14px + env(safe-area-inset-top,0px)) var(--gutter) 0;display:flex;align-items:center;justify-content:space-between;pointer-events:none}
.nav>*{pointer-events:auto}
.nav-bar{position:fixed;top:0;left:0;right:0;height:2px;z-index:60;background:transparent}
.nav-bar i{display:block;height:100%;background:var(--ink);transform-origin:0 50%;transform:scaleX(0)}
.mark{display:flex;align-items:center;gap:12px}
.mark-c{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:15px;letter-spacing:-.02em;box-shadow:inset 0 0 0 1.5px var(--ink);transition:background .5s var(--ease),color .5s var(--ease),transform .9s var(--ease)}
.mark:hover .mark-c{transform:rotate(360deg)}
.nav.solid .mark-c{background:var(--ink);color:var(--paper)}
.mark-n{font-weight:600;letter-spacing:-.02em;transition:opacity .5s var(--ease),transform .5s var(--ease)}
.nav.solid .mark-n{opacity:0;transform:translateX(-8px)}
.pill{position:relative;display:flex;gap:2px;padding:5px;border-radius:999px;transition:background .5s var(--ease),box-shadow .5s var(--ease),backdrop-filter .5s}
.nav.solid .pill{background:rgba(255,255,255,.72);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px var(--line),0 10px 30px rgba(13,13,13,.06)}
.pill a{position:relative;z-index:1;padding:9px 18px;font-size:14px;font-weight:500;border-radius:999px;transition:color .4s var(--ease)}
.pill a.on{color:#fff}
.ind{position:absolute;top:5px;bottom:5px;left:0;border-radius:999px;background:var(--ink);transition:transform .6s var(--ease),width .6s var(--ease),opacity .3s}
.menu-btn{display:none;height:44px;padding:0 20px;border-radius:999px;background:rgba(255,255,255,.8);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px var(--line);font-weight:600;font-size:14px}
.ov{position:fixed;inset:0;z-index:70;background:var(--paper);clip-path:circle(0 at calc(100% - 60px) 40px);transition:clip-path .9s var(--ease);visibility:hidden;padding:calc(20px + env(safe-area-inset-top,0px)) var(--gutter) 32px;display:flex;flex-direction:column}
.ov.open{clip-path:circle(150% at calc(100% - 60px) 40px);visibility:visible}
.ov-top{display:flex;justify-content:space-between;align-items:center}
.ov ul{margin:auto 0;display:flex;flex-direction:column;gap:6px}
.ov li{overflow:hidden}
.ov li a{display:flex;gap:16px;align-items:baseline;font-size:clamp(44px,13vw,72px);font-weight:700;letter-spacing:-.045em;line-height:1.05;transform:translateY(110%);transition:transform .9s var(--ease);transition-delay:calc(var(--i)*70ms + 200ms)}
.ov li a small{font-family:var(--f-mono);font-size:12px;font-weight:400;color:var(--mute);letter-spacing:.05em}
.ov.open li a{transform:none}
@media(max-width:820px){.pill{display:none}.menu-btn{display:block}.mark-n{display:none}}
`;

export default function Navigation() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [ind, setInd] = useState({ x: 0, w: 0, show: false });
  const barRef = useRef<HTMLElement>(null);
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});
  const menuRef = useRef<HTMLButtonElement>(null);

  // scroll state + progress bar
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setSolid(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const bar = barRef.current?.firstElementChild as HTMLElement | null;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  // active section
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    const hero = document.getElementById("hero");
    const heroIo = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(""); }, { rootMargin: "-45% 0px -50% 0px" });
    if (hero) heroIo.observe(hero);
    return () => { io.disconnect(); heroIo.disconnect(); };
  }, []);

  // sliding indicator
  useEffect(() => {
    const measure = () => {
      const el = links.current[active];
      setInd(el ? { x: el.offsetLeft, w: el.offsetWidth, show: true } : (p) => ({ ...p, show: false }));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  // menu: Esc to close + scroll lock
  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); menuRef.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); lockScroll(false); };
  }, [open]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => scrollToTarget(`#${id}`), open ? 350 : 0);
  };

  return (
    <>
      <style>{css}</style>
      <nav className={`nav${solid ? " solid" : ""}`} aria-label="Primary">
        <a className="mark" href="#top" aria-label={`${PROFILE.name} — back to top`} onClick={(e) => { e.preventDefault(); scrollToTarget("#top"); }}>
          <span className="mark-n">{PROFILE.name}</span>
        </a>
        <div className="pill">
          <span className="ind" aria-hidden="true" style={{ transform: `translateX(${ind.x}px)`, width: ind.w, opacity: ind.show ? 1 : 0 }} />
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} ref={(el) => { links.current[n.id] = el; }} className={active === n.id ? "on" : ""} aria-current={active === n.id ? "true" : undefined} onClick={(e) => go(e, n.id)}>
              {n.label}
            </a>
          ))}
        </div>
        <button ref={menuRef} className="menu-btn" aria-expanded={open} aria-controls="menu-ov" onClick={() => setOpen(true)}>Menu</button>
      </nav>
      <span className="nav-bar" ref={barRef} aria-hidden="true"><i /></span>
      <div id="menu-ov" className={`ov${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
        <div className="ov-top">
          <span className="mono" style={{ fontSize: 12, color: "var(--mute)" }}>{PROFILE.name}</span>
          <button className="menu-btn" style={{ display: "block" }} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>Close</button>
        </div>
        <ul>
          {NAV.map((n, i) => (
            <li key={n.id}>
              <a href={`#${n.id}`} style={cv({ "--i": i })} tabIndex={open ? 0 : -1} onClick={(e) => go(e, n.id)}>
                <small>{String(i + 1).padStart(2, "0")}</small>{n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
