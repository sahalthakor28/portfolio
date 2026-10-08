import type { MockKind } from "@/lib/data";

/** Illustrative, grayscale mini-UIs. Pure CSS/JSX, not real screenshots. */
const L = ({ w = "100%", h = 8, dark = false }: { w?: string; h?: number; dark?: boolean }) => (
  <i className={`ml${dark ? " d" : ""}`} style={{ width: w, height: h }} />
);

function Body({ kind }: { kind: MockKind }) {
  switch (kind) {
    case "web":
      return (<>
        <div className="mrow"><L w="30%" h={10} dark /><span className="sp" /><L w="14%" /><L w="14%" /><L w="14%" /></div>
        <div className="mhero"><L w="70%" h={16} dark /><L w="50%" h={16} dark /><L w="60%" /><div className="mrow"><b className="mb dk" /><b className="mb" /></div></div>
        <div className="mcols"><b className="mbox" /><b className="mbox" /><b className="mbox" /></div>
      </>);
    case "filter":
      return (<>
        <div className="mrow"><L w="30%" /><span className="sp" /><L w="20%" /></div>
        <div className="mslide"><i /><b /><b /></div>
        <div className="mgrid"><b className="mbox" /><b className="mbox" /><b className="mbox" /><b className="mbox" /><b className="mbox" /><b className="mbox" /></div>
      </>);
    case "form":
      return (<>
        <div className="mrow"><L w="40%" h={12} dark /><span className="sp" /><b className="mbadge">Draft</b></div>
        <div className="mfields"><L h={26} /><L h={26} /><L h={26} /><L h={26} /></div>
        <div className="mrow"><b className="mup" /><L w="40%" /></div>
      </>);
    case "table":
      return (<>
        <div className="mrow"><b className="mb dk" /><L w="30%" /></div>
        <div className="mtable">{Array.from({ length: 6 }).map((_, i) => (<div key={i} className={`mtr${i === 0 ? " h" : ""}`}><L w="22%" /><L w="30%" /><L w="18%" /></div>))}</div>
      </>);
    case "doc":
      return (<>
        <div className="mpair"><div className="mpage"><L w="60%" h={10} dark /><L /><L /><L w="80%" /><L /></div><span className="marrow">→</span><div className="mpage pdf"><b className="mbadge">PDF</b><L /><L w="70%" /><L /></div></div>
      </>);
    case "query":
      return (<>
        <div className="mcode"><L w="46%" dark /><L w="70%" /><L w="58%" /><L w="64%" /></div>
        <div className="mrow"><b className="mbadge">Q</b><b className="mbadge">|</b><b className="mbadge">&amp;</b></div>
        <div className="mgrid"><b className="mbox" /><b className="mbox" /><b className="mbox" /></div>
      </>);
    case "phone":
      return (<div className="mphone"><div className="mscr"><L w="60%" h={10} dark /><b className="mmap" /><div className="mcard2"><L w="70%" dark /><L w="40%" /></div><div className="mcard2"><L w="60%" dark /><L w="50%" /></div></div></div>);
    case "chat":
      return (<>
        <div className="mbub l"><L w="70%" /></div><div className="mbub r"><L w="55%" /></div><div className="mbub l"><L w="45%" /></div>
        <div className="mrow"><L h={26} /><b className="mb dk" /></div>
        <div className="mchain"><b /><b /><b /><b /></div>
      </>);
    case "chart":
      return (<svg viewBox="0 0 200 120" className="msvg" aria-hidden="true"><path d="M10 10v100h180" fill="none" stroke="#a9a6a0" /><path d="M20 95l35-20 30 10 40-35 40-10 20-18" fill="none" stroke="#0d0d0d" strokeWidth="2" /><g fill="#a9a6a0"><circle cx="55" cy="75" r="2.5" /><circle cx="85" cy="85" r="2.5" /><circle cx="125" cy="50" r="2.5" /><circle cx="165" cy="40" r="2.5" /></g></svg>);
    case "alerts":
      return (<>
        <div className="mrow"><L w="26%" h={10} dark /><span className="sp" /><b className="mbadge">Live</b></div>
        <div className="mpulse"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="mtable"><div className="mtr"><b className="mdot a" /><L w="50%" /></div><div className="mtr"><b className="mdot" /><L w="40%" /></div><div className="mtr"><b className="mdot" /><L w="60%" /></div></div>
      </>);
    case "gallery":
      return (<><div className="mmain" /><div className="mstrip"><b /><b /><b /><b /></div><div className="mrow"><b className="mb">‹</b><span className="sp" /><b className="mb">›</b></div></>);
  }
}

export default function Mock({ kind }: { kind: MockKind }) {
  return (
    <figure className="mock" aria-label="Illustrative UI sketch, not a real screenshot">
      <div className="mbar"><i /><i /><i /></div>
      <div className="mbody"><Body kind={kind} /></div>
      <figcaption>Illustrative UI</figcaption>
    </figure>
  );
}

export const mockCss = `
.mock{margin:0;position:relative;width:100%;background:#fff;border-radius:18px;box-shadow:inset 0 0 0 1px var(--line),0 24px 50px rgba(13,13,13,.1);overflow:hidden;display:flex;flex-direction:column}
.mbar{display:flex;gap:5px;padding:10px 12px;border-bottom:1px solid var(--line)}
.mbar i{width:8px;height:8px;border-radius:50%;background:var(--soft)}
.mbody{padding:16px;display:flex;flex-direction:column;gap:12px;min-height:230px;flex:1}
.mock figcaption{position:absolute;right:10px;bottom:8px;font-family:var(--f-mono);font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--faint)}
.ml{display:block;border-radius:4px;background:var(--soft)}.ml.d{background:var(--ink-2)}
.mrow{display:flex;gap:8px;align-items:center}.sp{flex:1}
.mb{width:46px;height:22px;border-radius:999px;box-shadow:inset 0 0 0 1px var(--line);display:inline-grid;place-items:center;font-size:11px;font-style:normal}.mb.dk{background:var(--ink)}
.mbox{display:block;height:54px;border-radius:10px;background:var(--paper);box-shadow:inset 0 0 0 1px var(--line)}
.mcols,.mgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.mhero{display:flex;flex-direction:column;gap:8px;padding:12px 0}
.mslide{height:6px;border-radius:3px;background:var(--soft);position:relative;margin:10px 0}
.mslide i{position:absolute;left:20%;right:30%;top:0;bottom:0;background:var(--ink);border-radius:3px}
.mslide b{position:absolute;top:-5px;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 0 0 1.5px var(--ink)}
.mslide b:nth-of-type(1){left:calc(20% - 8px)}.mslide b:nth-of-type(2){right:calc(30% - 8px)}
.mfields{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.mbadge{font-style:normal;font-family:var(--f-mono);font-size:10px;padding:3px 9px;border-radius:999px;background:var(--ink);color:#fff}
.mup{width:30px;height:30px;border-radius:8px;border:1.5px dashed var(--faint)}
.mtable{display:flex;flex-direction:column;border-radius:10px;box-shadow:inset 0 0 0 1px var(--line);overflow:hidden}
.mtr{display:flex;gap:12px;align-items:center;padding:9px 12px;border-top:1px solid var(--line)}.mtr:first-child{border-top:0}.mtr.h{background:var(--paper)}
.mpair{display:flex;align-items:center;gap:10px;flex:1}
.mpage{flex:1;display:flex;flex-direction:column;gap:8px;padding:14px;border-radius:10px;box-shadow:inset 0 0 0 1px var(--line);min-height:150px}.mpage.pdf{background:var(--paper)}
.marrow{font-size:20px;color:var(--mute)}
.mcode{display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:10px;background:var(--paper)}
.mphone{margin:0 auto;width:150px;border-radius:24px;padding:8px;box-shadow:inset 0 0 0 2px var(--ink)}
.mscr{display:flex;flex-direction:column;gap:8px;padding:10px 6px}
.mmap{display:block;height:80px;border-radius:10px;background:repeating-linear-gradient(45deg,var(--paper) 0 8px,var(--soft) 8px 9px)}
.mcard2{display:flex;flex-direction:column;gap:6px;padding:8px;border-radius:10px;box-shadow:inset 0 0 0 1px var(--line)}
.mbub{padding:10px 12px;border-radius:14px;width:62%}.mbub.l{background:var(--paper)}.mbub.r{background:var(--soft);align-self:flex-end}
.mchain{display:flex;gap:6px}.mchain b{flex:1;height:18px;border-radius:5px;box-shadow:inset 0 0 0 1.5px var(--ink-2)}
.msvg{width:100%;height:100%;min-height:200px}
.mpulse{display:flex;align-items:flex-end;gap:6px;height:70px}.mpulse i{flex:1;background:var(--soft);border-radius:3px}
.mpulse i:nth-child(1){height:30%}.mpulse i:nth-child(2){height:50%}.mpulse i:nth-child(3){height:40%}.mpulse i:nth-child(4){height:90%;background:var(--ink)}.mpulse i:nth-child(5){height:35%}.mpulse i:nth-child(6){height:55%}.mpulse i:nth-child(7){height:45%}.mpulse i:nth-child(8){height:30%}.mpulse i:nth-child(9){height:60%}
.mdot{width:8px;height:8px;border-radius:50%;background:var(--faint)}.mdot.a{background:var(--ink)}
.mmain{flex:1;min-height:130px;border-radius:10px;background:repeating-linear-gradient(45deg,var(--paper) 0 10px,var(--soft) 10px 11px)}
.mstrip{display:flex;gap:6px}.mstrip b{flex:1;height:36px;border-radius:6px;background:var(--soft)}.mstrip b:first-child{box-shadow:0 0 0 1.5px var(--ink)}
`;
