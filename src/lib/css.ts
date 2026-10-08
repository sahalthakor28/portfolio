import type { CSSProperties } from "react";
/** Typed helper for inline CSS custom properties: style={cv({ "--i": 2 })} */
export const cv = (vars: Record<string, string | number>): CSSProperties => vars as CSSProperties;
