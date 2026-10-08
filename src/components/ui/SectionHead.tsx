import type { ReactNode } from "react";

export function SectionTag({ n, label }: { n: string; label: string }) {
  return (
    <p className="tag rv">
      {n} — {label}
    </p>
  );
}

/** Heading whose last word is a serif italic accent, e.g. "Things I've" + "built." */
export function SectionHeading({ lead, accent, id }: { lead: ReactNode; accent: string; id?: string }) {
  return (
    <h2 className="h2" id={id}>
      <span className="rv-mask"><span>{lead} <em>{accent}</em></span></span>
    </h2>
  );
}
