import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function Svg({ children, ...p }: P) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      {children}
    </svg>
  );
}

export const IconWand = (p: P) => (
  <Svg {...p}><path d="M4.5 19.5 14 10" /><path d="m12.5 11.5 1.4 1.4" /><path d="M17.5 3.5 18.4 5.6 20.5 6.5 18.4 7.4 17.5 9.5 16.6 7.4 14.5 6.5 16.6 5.6Z" fill="currentColor" stroke="none" /><path d="M8 3.2v2.6M6.7 4.5h2.6" /><path d="M20.2 12.4v2.2M19.1 13.5h2.2" /></Svg>
);
export const IconSparkle = (p: P) => (
  <Svg {...p}><path d="M12 3l2 5.2L19.2 10 14 12l-2 5.2L10 12l-5.2-2L10 8.2 12 3z" fill="currentColor" stroke="none" /></Svg>
);
export const IconUpload = (p: P) => (
  <Svg {...p}><path d="M12 15V4" /><path d="m8 8 4-4 4 4" /><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></Svg>
);
export const IconDownload = (p: P) => (
  <Svg {...p}><path d="M12 4v11" /><path d="m8 11 4 4 4-4" /><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></Svg>
);
export const IconImage = (p: P) => (
  <Svg {...p}><rect x="3.5" y="4.5" width="17" height="15" rx="2.5" /><circle cx="9" cy="10" r="1.6" /><path d="m4.5 17.5 4.5-4.5 3 3 3.5-3.5 4 4" /></Svg>
);
export const IconLock = (p: P) => (
  <Svg {...p}><rect x="5" y="10.5" width="14" height="9.5" rx="2.2" /><path d="M8.2 10.5V8a3.8 3.8 0 0 1 7.6 0v2.5" /><circle cx="12" cy="15.2" r="1.15" fill="currentColor" stroke="none" /></Svg>
);
export const IconUnlock = (p: P) => (
  <Svg {...p}><rect x="5" y="10.5" width="14" height="9.5" rx="2.2" /><path d="M8.2 10.5V7.8a3.8 3.8 0 0 1 7.3-1.5" /><circle cx="12" cy="15.2" r="1.15" fill="currentColor" stroke="none" /></Svg>
);
export const IconCheck = (p: P) => (
  <Svg {...p}><path d="m5 13 4.2 4.2L19 7" /></Svg>
);
export const IconX = (p: P) => (
  <Svg {...p}><path d="m6 6 12 12M18 6 6 18" /></Svg>
);
export const IconShield = (p: P) => (
  <Svg {...p}><path d="M12 3.5 5 6v5.2c0 4.4 3 7.6 7 9.3 4-1.7 7-4.9 7-9.3V6l-7-2.5z" /><path d="m9 11.8 2.2 2.2 4-4.2" /></Svg>
);
export const IconCrown = (p: P) => (
  <Svg {...p}><path d="m4 8 3.8 3.4L12 5.5l4.2 5.9L20 8l-1.4 9.5H5.4L4 8z" /><path d="M5.4 17.5h13.2" /></Svg>
);
export const IconExternal = (p: P) => (
  <Svg {...p}><path d="M14 4.5h5.5V10" /><path d="M19.2 4.8 11 13" /><path d="M19.5 13.5V18a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5h4.5" /></Svg>
);
export const IconTrash = (p: P) => (
  <Svg {...p}><path d="M5 6.5h14" /><path d="M9.5 6.5V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v1.5" /><path d="M6.5 6.5 7.4 19a1.5 1.5 0 0 0 1.5 1.4h6.2a1.5 1.5 0 0 0 1.5-1.4l.9-12.5" /><path d="M10 10.5v6M14 10.5v6" /></Svg>
);
export const IconReset = (p: P) => (
  <Svg {...p}><path d="M4.5 12a7.5 7.5 0 1 1 2.2 5.3" /><path d="M4.5 17.5V12H10" /></Svg>
);
export const IconLoader = (p: P) => (
  <Svg {...p}><path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5" /></Svg>
);
export const IconRadius = (p: P) => (
  <Svg {...p}><path d="M4 20v-6.5A9.5 9.5 0 0 1 13.5 4H20" /><circle cx="13.5" cy="10.5" r="0.9" fill="currentColor" stroke="none" /></Svg>
);
export const IconShadow = (p: P) => (
  <Svg {...p}><rect x="7.5" y="4" width="12.5" height="12.5" rx="2.5" /><path d="M16 20H6.5A2.5 2.5 0 0 1 4 17.5V8" opacity={0.45} /></Svg>
);
export const IconFrame = (p: P) => (
  <Svg {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="2.5" /><rect x="8" y="8" width="8" height="8" rx="1.5" opacity={0.55} /></Svg>
);
export const IconPalette = (p: P) => (
  <Svg {...p}><path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 2-.8 2-1.7 0-.8-.6-1.3-.6-2.1 0-1 .8-1.7 2-1.7h1.8c1.8 0 3.3-1.4 3.3-3.2C20.5 6.6 16.7 3.5 12 3.5z" /><circle cx="8" cy="9.5" r="1.1" fill="currentColor" stroke="none" /><circle cx="12.5" cy="7.3" r="1.1" fill="currentColor" stroke="none" /><circle cx="16.4" cy="10" r="1.1" fill="currentColor" stroke="none" /><circle cx="7.6" cy="14" r="1.1" fill="currentColor" stroke="none" /></Svg>
);
export const IconClipboard = (p: P) => (
  <Svg {...p}><rect x="6" y="5" width="12" height="15.5" rx="2" /><path d="M9.5 5a2.5 2.5 0 0 1 5 0" /><path d="M9.5 12h5M9.5 15.5h3" opacity={0.6} /></Svg>
);
export const IconBorder = (p: P) => (
  <Svg {...p}><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="8" y="8" width="8" height="8" rx="1" strokeDasharray="2.5 2.5" opacity={0.6} /></Svg>
);
export const IconBrightness = (p: P) => (
  <Svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19" /></Svg>
);
export const IconDroplet = (p: P) => (
  <Svg {...p}><path d="M12 3.5s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z" /></Svg>
);
export const IconRotate = (p: P) => (
  <Svg {...p}><path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" /><path d="M19.5 3.5V9H14" /></Svg>
);
export const IconRatio = (p: P) => (
  <Svg {...p}><rect x="3.5" y="6" width="13" height="12" rx="2" /><rect x="12.5" y="3.5" width="8" height="8" rx="2" opacity={0.55} /></Svg>
);
export const IconFilm = (p: P) => (
  <Svg {...p}><rect x="3.5" y="5" width="17" height="14" rx="2" /><path d="M7.5 5v14M16.5 5v14M3.5 9.5h4M3.5 14.5h4M16.5 9.5h4M16.5 14.5h4" /></Svg>
);
export const IconSticker = (p: P) => (
  <Svg {...p}><path d="M12 3.5H6A2.5 2.5 0 0 0 3.5 6v12A2.5 2.5 0 0 0 6 20.5h7L20.5 13V6A2.5 2.5 0 0 0 18 3.5h-6z" /><path d="M13 20.5V15a2 2 0 0 1 2-2h5.5" /></Svg>
);
export const IconCopy = (p: P) => (
  <Svg {...p}><rect x="8.5" y="8.5" width="12" height="12" rx="2" /><path d="M15.5 8.5v-3a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3" /></Svg>
);
export const IconDice = (p: P) => (
  <Svg {...p}><rect x="4" y="4" width="16" height="16" rx="3.5" /><circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none" /><circle cx="15" cy="15" r="1.2" fill="currentColor" stroke="none" /><circle cx="15" cy="9" r="1.2" fill="currentColor" stroke="none" /><circle cx="9" cy="15" r="1.2" fill="currentColor" stroke="none" /></Svg>
);
export const IconChevronL = (p: P) => (
  <Svg {...p}><path d="m14.5 5.5-6.5 6.5 6.5 6.5" /></Svg>
);
export const IconChevronR = (p: P) => (
  <Svg {...p}><path d="m9.5 5.5 6.5 6.5-6.5 6.5" /></Svg>
);
export const IconPlus = (p: P) => (
  <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>
);
export const IconSun = (p: P) => (
  <Svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 3v1.8M12 19.2V21M3 12h1.8M19.2 12H21M5.6 5.6l1.3 1.3M17.1 17.1l1.3 1.3M18.4 5.6l-1.3 1.3M6.9 17.1l-1.3 1.3" /></Svg>
);
export const IconMoon = (p: P) => (
  <Svg {...p}><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" /></Svg>
);
export const IconPanH = (p: P) => (
  <Svg {...p}><path d="M3.5 12h17" /><path d="m7 8.5-3.5 3.5L7 15.5M17 8.5l3.5 3.5L17 15.5" /></Svg>
);
export const IconPanV = (p: P) => (
  <Svg {...p}><path d="M12 3.5v17" /><path d="m8.5 7 3.5-3.5L15.5 7M8.5 17l3.5 3.5L15.5 17" /></Svg>
);
export const IconZoom = (p: P) => (
  <Svg {...p}><circle cx="10.5" cy="10.5" r="6.5" /><path d="m20 20-4.8-4.8" /><path d="M10.5 8v5M8 10.5h5" /></Svg>
);
export const IconPackage = (p: P) => (
  <Svg {...p}><path d="M12 3 4 7v10l8 4 8-4V7l-8-4z" /><path d="M4 7l8 4 8-4M12 11v10" /><path d="m8 5 8 4" opacity={0.55} /></Svg>
);
export const IconBriefcase = (p: P) => (
  <Svg {...p}><rect x="3.5" y="7.5" width="17" height="12" rx="2" /><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" /><path d="M3.5 12.5h17" opacity={0.55} /></Svg>
);
export const IconSmile = (p: P) => (
  <Svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M8.5 14a4.2 4.2 0 0 0 7 0" /><circle cx="9" cy="9.5" r="1" fill="currentColor" stroke="none" /><circle cx="15" cy="9.5" r="1" fill="currentColor" stroke="none" /></Svg>
);
export const IconWindow = (p: P) => (
  <Svg {...p}><rect x="3.5" y="5" width="17" height="14" rx="2.2" /><path d="M3.5 9.2h17" /><circle cx="6.4" cy="7.1" r="0.8" fill="currentColor" stroke="none" /><circle cx="9" cy="7.1" r="0.8" fill="currentColor" stroke="none" /></Svg>
);
