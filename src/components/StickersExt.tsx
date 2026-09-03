import type { ReactNode } from "react";
import type { StickerType } from "../lib/types";

/* ------------------------------------------------------------------ */
/*  constructores paramétricos                                          */
/* ------------------------------------------------------------------ */

const D = "#3b2c07"; // tinta oscura para rasgos

function Face({
  skin = "#fde047",
  stroke = "#7c5310",
  brows,
  eyes,
  mouth,
  extra,
}: {
  skin?: string;
  stroke?: string;
  brows?: ReactNode;
  eyes?: ReactNode;
  mouth?: ReactNode;
  extra?: ReactNode;
}) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="50" cy="50" r="42" fill={skin} stroke={stroke} strokeWidth="4" />
      {brows}
      {eyes}
      {mouth}
      {extra}
    </svg>
  );
}

/* ojos reutilizables */
const eyeDots = (
  <>
    <circle cx="36" cy="42" r="5.5" fill={D} />
    <circle cx="64" cy="42" r="5.5" fill={D} />
  </>
);
const eyeHappy = (
  <>
    <path d="M28 44a8 8 0 0 0 16 0" fill="none" stroke={D} strokeWidth="5" strokeLinecap="round" />
    <path d="M56 44a8 8 0 0 0 16 0" fill="none" stroke={D} strokeWidth="5" strokeLinecap="round" />
  </>
);
const eyeX = (
  <>
    <path d="m30 36 12 12M42 36 30 48" stroke={D} strokeWidth="5" strokeLinecap="round" />
    <path d="m58 36 12 12M70 36 58 48" stroke={D} strokeWidth="5" strokeLinecap="round" />
  </>
);
const eyeHeart = (
  <>
    <path d="M36 48s-9-5.5-9-11c0-3 2.4-5 5-5 1.8 0 3.3 1 4 2.4.7-1.4 2.2-2.4 4-2.4 2.6 0 5 2 5 5 0 5.5-9 11-9 11z" fill="#e05a5a" />
    <path d="M64 48s-9-5.5-9-11c0-3 2.4-5 5-5 1.8 0 3.3 1 4 2.4.7-1.4 2.2-2.4 4-2.4 2.6 0 5 2 5 5 0 5.5-9 11-9 11z" fill="#e05a5a" />
  </>
);
const eyeStar = (
  <>
    <path d="m36 32 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#f6bc55" stroke={D} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="m64 32 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#f6bc55" stroke={D} strokeWidth="2.5" strokeLinejoin="round" />
  </>
);
const eyeWide = (
  <>
    <circle cx="36" cy="42" r="8" fill="#fff" stroke={D} strokeWidth="3" />
    <circle cx="64" cy="42" r="8" fill="#fff" stroke={D} strokeWidth="3" />
    <circle cx="36" cy="42" r="3.5" fill={D} />
    <circle cx="64" cy="42" r="3.5" fill={D} />
  </>
);
const eyeWink = (
  <>
    <circle cx="36" cy="42" r="5.5" fill={D} />
    <path d="M56 44a8 8 0 0 0 16 0" fill="none" stroke={D} strokeWidth="5" strokeLinecap="round" />
  </>
);
const eyeShades = (
  <>
    <rect x="24" y="34" width="22" height="13" rx="5" fill="#151a26" />
    <rect x="54" y="34" width="22" height="13" rx="5" fill="#151a26" />
    <path d="M46 39h8" stroke="#151a26" strokeWidth="4" />
    <path d="M24 38l-6-2M76 38l6-2" stroke="#151a26" strokeWidth="4" strokeLinecap="round" />
  </>
);

/* bocas reutilizables */
const mouthSmile = <path d="M30 58a22 20 0 0 0 40 0" fill="none" stroke={D} strokeWidth="5.5" strokeLinecap="round" />;
const mouthBig = <path d="M28 56a24 22 0 0 0 44 0z" fill="#7c2d12" stroke={D} strokeWidth="4" strokeLinejoin="round" />;
const mouthFlat = <path d="M34 64h32" stroke={D} strokeWidth="5.5" strokeLinecap="round" />;
const mouthFrown = <path d="M32 68a20 16 0 0 1 36 0" fill="none" stroke={D} strokeWidth="5.5" strokeLinecap="round" />;
const mouthO = <circle cx="50" cy="62" r="8" fill="#7c2d12" stroke={D} strokeWidth="4" />;
const mouthSmirk = <path d="M34 62c8 8 24 6 32-4" fill="none" stroke={D} strokeWidth="5.5" strokeLinecap="round" />;
const mouthTongue = (
  <>
    <path d="M30 58a22 18 0 0 0 40 0" fill="none" stroke={D} strokeWidth="5.5" strokeLinecap="round" />
    <path d="M42 66a8 10 0 0 0 16 0v-4H42z" fill="#f472b6" stroke={D} strokeWidth="3.5" strokeLinejoin="round" />
  </>
);
const mouthZip = (
  <>
    <path d="M28 62h44" stroke={D} strokeWidth="5" strokeLinecap="round" />
    {[32, 41, 50, 59, 68].map((x) => (
      <path key={x} d={`M${x} 57v10`} stroke={D} strokeWidth="3" />
    ))}
  </>
);

const browAngry = (
  <>
    <path d="M28 30l14 6" stroke={D} strokeWidth="5" strokeLinecap="round" />
    <path d="M72 30 58 36" stroke={D} strokeWidth="5" strokeLinecap="round" />
  </>
);

/* base de puño / mano */
function HandBase({ children }: { children?: ReactNode }) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      {children}
    </svg>
  );
}

const SKIN_HAND = "#fcd7a8";
const SKIN_LINE = "#b06f2e";
const SLEEVE = "#38bdf8";
const SLEEVE_LINE = "#0e7490";

/* dedo tipo cápsula (rectángulo muy redondeado) */
function Finger({ x, y, w, h, cx, cy, rot }: { x: number; y: number; w: number; h: number; cx: number; cy: number; rot: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={w / 2}
      fill={SKIN_HAND}
      stroke={SKIN_LINE}
      strokeWidth="4"
      transform={rot ? `rotate(${rot} ${cx} ${cy})` : undefined}
    />
  );
}

/* manga / puño de la camisa en la base de la mano */
function Cuff({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <rect x={x} y={y} width={w} height={h} rx="6" fill={SLEEVE} stroke={SLEEVE_LINE} strokeWidth="4" />;
}

/* ------------------------------------------------------------------ */
/*  glifos nuevos                                                       */
/* ------------------------------------------------------------------ */

export function GlyphExt({ type }: { type: StickerType }): ReactNode {
  switch (type) {
    /* ============ CARAS ============ */
    case "grin":
      return <Face eyes={eyeHappy} mouth={mouthBig} />;
    case "joy":
      return (
        <Face
          eyes={eyeHappy}
          mouth={mouthBig}
          extra={<path d="M78 50c4 6 4 12-1 15s-9-1-9-7" fill="#38bdf8" stroke="#0e7490" strokeWidth="3" />}
        />
      );
    case "wink":
      return <Face eyes={eyeWink} mouth={mouthSmile} />;
    case "coolface":
      return <Face eyes={eyeShades} mouth={mouthSmirk} />;
    case "loveeyes":
      return <Face eyes={eyeHeart} mouth={mouthSmile} />;
    case "angry":
      return <Face skin="#fca5a5" stroke="#7f1d1d" brows={browAngry} eyes={eyeDots} mouth={mouthFrown} />;
    case "sad":
      return <Face eyes={eyeDots} mouth={mouthFrown} extra={<path d="M30 52c-3 5-3 9 1 11" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />} />;
    case "cry":
      return (
        <Face
          eyes={eyeDots}
          mouth={mouthFrown}
          extra={
            <>
              <path d="M30 50c-4 7-4 13 1 16s9 0 9-8" fill="#38bdf8" stroke="#0e7490" strokeWidth="3" />
              <path d="M70 50c4 7 4 13-1 16s-9 0-9-8" fill="#38bdf8" stroke="#0e7490" strokeWidth="3" />
            </>
          }
        />
      );
    case "surprised":
      return <Face eyes={eyeWide} mouth={mouthO} />;
    case "sleepy":
      return (
        <Face
          eyes={eyeHappy}
          mouth={mouthO}
          extra={<text x="78" y="26" fontSize="16" fontWeight="bold" fill="#38bdf8">z</text>}
        />
      );
    case "dizzy":
      return (
        <Face
          eyes={
            <>
              <path d="m30 36 12 12M42 36 30 48" stroke={D} strokeWidth="4.5" strokeLinecap="round" />
              <path d="m58 36 12 12M70 36 58 48" stroke={D} strokeWidth="4.5" strokeLinecap="round" />
            </>
          }
          mouth={<path d="M34 64c5-4 11 4 16 0s11-4 16 0" fill="none" stroke={D} strokeWidth="5" strokeLinecap="round" />}
        />
      );
    case "silly":
      return <Face eyes={eyeWink} mouth={mouthTongue} />;
    case "smirk":
      return <Face eyes={eyeDots} mouth={mouthSmirk} />;
    case "thinking":
      return (
        <Face
          brows={<path d="M28 30c4-3 10-3 14 0" fill="none" stroke={D} strokeWidth="4.5" strokeLinecap="round" />}
          eyes={<><circle cx="36" cy="44" r="5" fill={D} /><circle cx="64" cy="40" r="5" fill={D} /></>}
          mouth={<path d="M40 64h14" stroke={D} strokeWidth="5.5" strokeLinecap="round" />}
          extra={<circle cx="82" cy="66" r="6" fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="3" />}
        />
      );
    case "dead":
      return <Face eyes={eyeX} mouth={mouthFlat} />;
    case "stareyes":
      return <Face eyes={eyeStar} mouth={mouthBig} />;
    case "devil":
      return (
        <Face
          skin="#c4b5fd"
          stroke="#4c1d95"
          eyes={eyeDots}
          mouth={mouthSmirk}
          extra={
            <>
              <path d="M24 16c2 6 6 9 10 10l-8 6z" fill="#c4b5fd" stroke="#4c1d95" strokeWidth="3" strokeLinejoin="round" />
              <path d="M76 16c-2 6-6 9-10 10l8 6z" fill="#c4b5fd" stroke="#4c1d95" strokeWidth="3" strokeLinejoin="round" />
            </>
          }
        />
      );
    case "angel":
      return (
        <Face
          eyes={eyeHappy}
          mouth={mouthSmile}
          extra={<ellipse cx="50" cy="10" rx="16" ry="5" fill="none" stroke="#f6bc55" strokeWidth="4" />}
        />
      );
    case "clown":
      return (
        <Face
          eyes={eyeDots}
          mouth={mouthSmile}
          extra={
            <>
              <circle cx="50" cy="54" r="8" fill="#e05a5a" stroke="#7f1d1d" strokeWidth="3" />
              <circle cx="28" cy="56" r="5" fill="#f9a8d4" opacity="0.8" />
              <circle cx="72" cy="56" r="5" fill="#f9a8d4" opacity="0.8" />
            </>
          }
        />
      );
    case "robot":
      return (
        <Face
          skin="#cbd5e1"
          stroke="#334155"
          eyes={<><rect x="30" y="36" width="12" height="12" rx="2" fill="#38bdf8" /><rect x="58" y="36" width="12" height="12" rx="2" fill="#38bdf8" /></>}
          mouth={<path d="M36 64h28" stroke="#334155" strokeWidth="5" strokeLinecap="round" />}
          extra={<><path d="M50 8v6" stroke="#334155" strokeWidth="4" strokeLinecap="round" /><circle cx="50" cy="6" r="3" fill="#38bdf8" stroke="#334155" strokeWidth="2.5" /></>}
        />
      );
    case "blush":
      return (
        <Face
          eyes={eyeHappy}
          mouth={mouthSmile}
          extra={<><circle cx="27" cy="56" r="5.5" fill="#f9a8d4" opacity="0.85" /><circle cx="73" cy="56" r="5.5" fill="#f9a8d4" opacity="0.85" /></>}
        />
      );
    case "zipper":
      return <Face eyes={eyeDots} mouth={mouthZip} />;
    case "partyface":
      return (
        <Face
          eyes={<><circle cx="36" cy="42" r="5.5" fill={D} /><path d="m58 36 12 12M70 36 58 48" stroke={D} strokeWidth="4.5" strokeLinecap="round" /></>}
          mouth={mouthBig}
          extra={<path d="M64 10l14-6-6 14z" fill="#38bdf8" stroke="#0e7490" strokeWidth="3" strokeLinejoin="round" />}
        />
      );
    case "melting":
      return (
        <Face
          eyes={eyeDots}
          mouth={mouthSmile}
          extra={<path d="M20 70c6 14 18 20 30 20s24-6 30-20c-8 6-16 8-30 8s-22-2-30-8z" fill="#fde047" stroke="#7c5310" strokeWidth="3.5" strokeLinejoin="round" />}
        />
      );

    /* ============ MANOS ============ */
    case "thumbsup":
      return (
        <HandBase>
          <Cuff x={40} y={80} w={34} h={16} />
          <Finger x={27} y={14} w={17} h={42} cx={35} cy={50} rot={0} />
          <rect x={38} y={40} width={40} height={42} rx={13} fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="4" />
          <path d="M52 50h18M52 58h18M52 66h18" stroke={SKIN_LINE} strokeWidth="3" strokeLinecap="round" />
        </HandBase>
      );
    case "thumbsdown":
      return (
        <HandBase>
          <Cuff x={40} y={4} w={34} h={16} />
          <rect x={38} y={18} width={40} height={42} rx={13} fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="4" />
          <path d="M52 28h18M52 36h18M52 44h18" stroke={SKIN_LINE} strokeWidth="3" strokeLinecap="round" />
          <Finger x={27} y={44} w={17} h={42} cx={35} cy={50} rot={0} />
        </HandBase>
      );
    case "peace":
      return (
        <HandBase>
          <Cuff x={38} y={82} w={28} h={14} />
          <Finger x={31} y={12} w={15} h={46} cx={38} cy={52} rot={-13} />
          <Finger x={55} y={12} w={15} h={46} cx={62} cy={52} rot={13} />
          <rect x={34} y={48} width={36} height={36} rx={13} fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="4" />
          <path d="M42 58h20M42 66h20" stroke={SKIN_LINE} strokeWidth="3" strokeLinecap="round" />
        </HandBase>
      );
    case "oksign":
      return (
        <HandBase>
          <Finger x={56} y={14} w={13} h={34} cx={62} cy={44} rot={18} />
          <Finger x={68} y={24} w={13} h={34} cx={74} cy={54} rot={34} />
          <Finger x={74} y={38} w={13} h={32} cx={80} cy={66} rot={52} />
          <circle cx={38} cy={58} r={13} fill="none" stroke={SKIN_HAND} strokeWidth="13" />
          <circle cx={38} cy={58} r={19.5} fill="none" stroke={SKIN_LINE} strokeWidth="4" />
          <circle cx={38} cy={58} r={6.5} fill="none" stroke={SKIN_LINE} strokeWidth="4" />
        </HandBase>
      );
    case "fist":
      return (
        <HandBase>
          <Cuff x={34} y={78} w={36} h={16} />
          <rect x={26} y={26} width={52} height={54} rx={17} fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="4" />
          <path d="M39 27v13M52 25v15M65 27v13" stroke={SKIN_LINE} strokeWidth="3" strokeLinecap="round" />
          <path d="M28 58c8 8 20 11 30 9" fill="none" stroke={SKIN_LINE} strokeWidth="3.5" strokeLinecap="round" />
        </HandBase>
      );
    case "pointing":
      return (
        <HandBase>
          <Cuff x={36} y={82} w={32} h={14} />
          <Finger x={42} y={10} w={17} h={46} cx={50} cy={30} rot={0} />
          <rect x={30} y={46} width={44} height={38} rx={14} fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="4" />
          <path d="M38 56h13M38 64h13M38 72h13" stroke={SKIN_LINE} strokeWidth="3" strokeLinecap="round" />
        </HandBase>
      );
    case "waving":
      return (
        <HandBase>
          <Cuff x={36} y={82} w={32} h={14} />
          <path d="M14 42c-5 6-5 16 0 22M86 42c5 6 5 16 0 22" fill="none" stroke="#f6bc55" strokeWidth="4" strokeLinecap="round" />
          <Finger x={24} y={24} w={12} h={36} cx={30} cy={56} rot={-10} />
          <Finger x={37} y={13} w={13} h={47} cx={43} cy={56} rot={-3} />
          <Finger x={51} y={10} w={13} h={50} cx={57} cy={56} rot={3} />
          <Finger x={65} y={16} w={13} h={44} cx={71} cy={56} rot={10} />
          <rect x={26} y={48} width={52} height={36} rx={15} fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="4" />
        </HandBase>
      );
    case "rockon":
      return (
        <HandBase>
          <Cuff x={38} y={82} w={28} h={14} />
          <Finger x={28} y={13} w={14} h={44} cx={35} cy={52} rot={-14} />
          <Finger x={60} y={13} w={14} h={44} cx={67} cy={52} rot={14} />
          <rect x={33} y={46} width={38} height={38} rx={14} fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="4" />
          <path d="M43 56h18M43 64h18" stroke={SKIN_LINE} strokeWidth="3" strokeLinecap="round" />
        </HandBase>
      );
    case "crossed":
      return (
        <HandBase>
          <Cuff x={38} y={82} w={28} h={14} />
          <Finger x={52} y={10} w={15} h={48} cx={59} cy={52} rot={-17} />
          <Finger x={34} y={12} w={15} h={48} cx={41} cy={54} rot={15} />
          <rect x={32} y={48} width={40} height={36} rx={14} fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="4" />
          <path d="M40 58h24M40 66h24" stroke={SKIN_LINE} strokeWidth="3" strokeLinecap="round" />
        </HandBase>
      );
    case "stophand":
      return (
        <HandBase>
          <Cuff x={36} y={82} w={32} h={14} />
          <Finger x={26} y={20} w={12} h={38} cx={32} cy={54} rot={-8} />
          <Finger x={39} y={11} w={13} h={47} cx={45} cy={54} rot={-2} />
          <Finger x={52} y={9} w={13} h={49} cx={58} cy={54} rot={2} />
          <Finger x={65} y={14} w={12} h={44} cx={71} cy={54} rot={8} />
          <rect x={27} y={46} width={50} height={38} rx={15} fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="4" />
        </HandBase>
      );
    case "muscle":
      return (
        <HandBase>
          <path
            d="M20 82V60c0-5 2-10 6-13 1-13 12-22 23-20 10 2 16 11 14 21 8 3 12 11 9 18-2 8-9 13-17 13H30c-6 0-10-3-10-7z"
            fill={SKIN_HAND}
            stroke={SKIN_LINE}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path d="M46 48c9 3 14 11 13 20" fill="none" stroke={SKIN_LINE} strokeWidth="3.5" strokeLinecap="round" />
          <circle cx={27} cy={42} r={9} fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="4" />
          <path d="M22 40l4 3 5-6" fill="none" stroke={SKIN_LINE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </HandBase>
      );
    case "handheart":
      return (
        <HandBase>
          <path
            d="M30 64c0-5 9-7 13-9l15-6c6-2 12 2 12 8v9c0 8-6 14-14 14H43c-8 0-13-6-13-12z"
            fill={SKIN_HAND}
            stroke={SKIN_LINE}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path d="M38 70h26" stroke={SKIN_LINE} strokeWidth="3" strokeLinecap="round" />
          <path
            d="M50 38c-4-9-16-9-18 0-2 7 5 13 18 21 13-8 20-14 18-21-2-9-14-9-18 0z"
            fill="#f472b6"
            stroke="#8f1d5c"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        </HandBase>
      );
    case "callme":
      return (
        <HandBase>
          <Cuff x={38} y={82} w={30} h={14} />
          <Finger x={24} y={18} w={15} h={36} cx={31} cy={48} rot={-22} />
          <Finger x={64} y={30} w={14} h={34} cx={71} cy={58} rot={38} />
          <rect x={32} y={44} width={42} height={40} rx={15} fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="4" />
          <path d="M42 54h22M42 62h22M42 70h22" stroke={SKIN_LINE} strokeWidth="3" strokeLinecap="round" />
        </HandBase>
      );
    case "clap":
      return (
        <HandBase>
          <path d="M50 6v11M31 13l6 9M69 13l-6 9" stroke="#f6bc55" strokeWidth="4" strokeLinecap="round" />
          <g transform="rotate(-15 38 62)">
            <Finger x={27} y={26} w={11} h={28} cx={32} cy={50} rot={-6} />
            <Finger x={40} y={22} w={11} h={32} cx={45} cy={50} rot={4} />
            <rect x={24} y={44} width={32} height={40} rx={14} fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="4" />
          </g>
          <g transform="rotate(15 62 62)">
            <Finger x={50} y={22} w={11} h={32} cx={55} cy={50} rot={-4} />
            <Finger x={63} y={26} w={11} h={28} cx={68} cy={50} rot={6} />
            <rect x={45} y={44} width={32} height={40} rx={14} fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="4" />
          </g>
        </HandBase>
      );

    /* ============ CUERPO ============ */
    case "eyepair":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <ellipse cx="28" cy="50" rx="20" ry="14" fill="#fff" stroke={D} strokeWidth="4" />
          <ellipse cx="72" cy="50" rx="20" ry="14" fill="#fff" stroke={D} strokeWidth="4" />
          <circle cx="30" cy="50" r="7" fill="#38bdf8" stroke={D} strokeWidth="3" />
          <circle cx="70" cy="50" r="7" fill="#38bdf8" stroke={D} strokeWidth="3" />
          <circle cx="30" cy="50" r="3" fill={D} />
          <circle cx="70" cy="50" r="3" fill={D} />
        </svg>
      );
    case "ear":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M62 14c16 4 22 20 16 34-5 11-14 16-16 26-2 8-8 12-14 10-7-2-9-10-6-16" fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="4" strokeLinejoin="round" />
          <path d="M56 30c8 2 10 12 4 20" fill="none" stroke={SKIN_LINE} strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "nose":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M50 14c4 20 14 34 14 46a14 14 0 0 1-28 0c0-12 10-26 14-46z" fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="4" strokeLinejoin="round" />
          <path d="M40 62a6 4 0 0 0 8 2M60 62a6 4 0 0 1-8 2" fill="none" stroke={SKIN_LINE} strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "lips":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M12 50c10-12 26-14 38-4 12-10 28-8 38 4-10 16-26 24-38 24S22 66 12 50z" fill="#e05a5a" stroke="#7f1d1d" strokeWidth="4" strokeLinejoin="round" />
          <path d="M14 50c12 4 60 4 72 0" fill="none" stroke="#7f1d1d" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "brain":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M50 16c-8-6-20-4-24 4-8 0-14 8-12 16-6 6-4 16 2 20-2 8 4 16 12 16 2 8 12 12 22 8 10 4 20 0 22-8 8 0 14-8 12-16 6-4 8-14 2-20 2-8-4-16-12-16-4-8-16-10-24-4z" fill="#f9a8d4" stroke="#8f1d5c" strokeWidth="4" strokeLinejoin="round" />
          <path d="M50 18v64M38 34c6 4 6 12 0 16M62 34c-6 4-6 12 0 16M40 62c5-3 10-3 10 0M60 62c-5-3-10-3-10 0" fill="none" stroke="#8f1d5c" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "tooth":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M30 16c-10 4-14 16-10 28 4 12 6 28 10 40 2 6 10 6 12 0l4-16c1-4 7-4 8 0l4 16c2 6 10 6 12 0 4-12 6-28 10-40 4-12 0-24-10-28-8-3-14 2-20 2s-12-5-20-2z" fill="#fff" stroke="#94a3b8" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      );
    case "tongue":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M26 20h48v40a24 24 0 0 1-48 0z" fill="#f472b6" stroke="#8f1d5c" strokeWidth="4" strokeLinejoin="round" />
          <path d="M50 30v40" stroke="#8f1d5c" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "bone":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M30 30a10 10 0 1 0-12 12 10 10 0 1 0 12 12l28 0a10 10 0 1 0 12-12 10 10 0 1 0-12-12z" fill="#fff" stroke="#94a3b8" strokeWidth="4" strokeLinejoin="round" transform="rotate(45 50 42)" />
        </svg>
      );
    case "footprint":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M38 12c14 0 22 14 20 30-1 10-6 16-6 24h-22c0-8-6-14-7-24-2-16 4-30 15-30z" fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="4" strokeLinejoin="round" />
          <ellipse cx="42" cy="80" rx="13" ry="9" fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="4" />
        </svg>
      );
    case "mustache":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M50 46c-6-10-20-12-28-4-6-8-18-6-20 4 8 14 30 16 48-2 18 18 40 16 48 2-2-10-14-12-20-4-8-8-22-6-28 4z" fill="#57431f" stroke="#2e2210" strokeWidth="3.5" strokeLinejoin="round" transform="translate(0 4) scale(0.92)" />
        </svg>
      );
    case "heartorgan":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M50 86C28 68 14 52 14 36c0-12 9-20 20-20 7 0 13 3 16 8 3-5 9-8 16-8 11 0 20 8 20 20 0 16-14 32-36 50z" fill="#dc2626" stroke="#7f1d1d" strokeWidth="4" strokeLinejoin="round" />
          <path d="M40 22c0-6 4-10 10-10M60 22c0-6-4-10-10-10" fill="none" stroke="#7f1d1d" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "palm":
      return (
        <HandBase>
          <path d="M30 56V32a5 5 0 0 1 10 0v18M42 50V22a5 5 0 0 1 10 0v26M54 50V24a5 5 0 0 1 10 0v26M66 56V38a5 5 0 0 1 10 0v20" fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M28 54h50a2 2 0 0 1 2 2v6a20 20 0 0 1-20 20H46a18 18 0 0 1-18-18z" fill={SKIN_HAND} stroke={SKIN_LINE} strokeWidth="4" strokeLinejoin="round" />
        </HandBase>
      );

    /* ============ OBJETOS ============ */
    case "glasses":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <circle cx="28" cy="54" r="17" fill="#bae6fd" fillOpacity="0.5" stroke="#151a26" strokeWidth="4.5" />
          <circle cx="72" cy="54" r="17" fill="#bae6fd" fillOpacity="0.5" stroke="#151a26" strokeWidth="4.5" />
          <path d="M45 52c2-3 8-3 10 0M11 50l-1-4M89 50l1-4" fill="none" stroke="#151a26" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );
    case "tophat":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <rect x="30" y="12" width="40" height="46" rx="4" fill="#151a26" stroke="#000" strokeWidth="3" />
          <rect x="30" y="46" width="40" height="10" fill="#e05a5a" />
          <ellipse cx="50" cy="66" rx="36" ry="9" fill="#151a26" stroke="#000" strokeWidth="3" />
        </svg>
      );
    case "cap":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M18 52a32 32 0 0 1 64 0v6H18z" fill="#2563eb" stroke="#1e3a8a" strokeWidth="4" strokeLinejoin="round" />
          <path d="M14 58h72a4 4 0 0 1 0 8H22z" fill="#1e3a8a" />
          <circle cx="50" cy="24" r="4" fill="#1e3a8a" />
        </svg>
      );
    case "bowtie":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M12 32l30 18-30 18z" fill="#e05a5a" stroke="#7f1d1d" strokeWidth="4" strokeLinejoin="round" />
          <path d="M88 32 58 50l30 18z" fill="#e05a5a" stroke="#7f1d1d" strokeWidth="4" strokeLinejoin="round" />
          <rect x="42" y="40" width="16" height="20" rx="4" fill="#c23a3a" stroke="#7f1d1d" strokeWidth="4" />
        </svg>
      );
    case "lipstick":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M38 14c6-4 12 0 12 8v20H38z" fill="#e05a5a" stroke="#7f1d1d" strokeWidth="4" strokeLinejoin="round" />
          <rect x="34" y="42" width="20" height="12" rx="3" fill="#f6bc55" stroke="#7c5310" strokeWidth="3.5" />
          <rect x="32" y="54" width="24" height="32" rx="5" fill="#151a26" stroke="#000" strokeWidth="3" />
        </svg>
      );
    case "ring":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <circle cx="50" cy="58" r="24" fill="none" stroke="#f6bc55" strokeWidth="8" />
          <circle cx="50" cy="58" r="24" fill="none" stroke="#7c5310" strokeWidth="2.5" />
          <path d="M50 12l10 12-10 10-10-10z" fill="#38bdf8" stroke="#0e7490" strokeWidth="3.5" strokeLinejoin="round" />
        </svg>
      );
    case "key":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <circle cx="32" cy="32" r="16" fill="none" stroke="#f6bc55" strokeWidth="9" />
          <path d="M43 43 82 82M70 70l10-10M60 60l8-8" stroke="#f6bc55" strokeWidth="9" strokeLinecap="round" />
        </svg>
      );
    case "balloon":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <ellipse cx="50" cy="36" rx="26" ry="30" fill="#e05a5a" stroke="#7f1d1d" strokeWidth="4" />
          <path d="M50 66l-4 8h8z" fill="#e05a5a" stroke="#7f1d1d" strokeWidth="3" />
          <path d="M50 74c-4 8 6 10 2 18" fill="none" stroke="#7f1d1d" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="40" cy="26" rx="6" ry="9" fill="#fff" opacity="0.4" />
        </svg>
      );
    case "gift":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <rect x="20" y="38" width="60" height="48" rx="4" fill="#e05a5a" stroke="#7f1d1d" strokeWidth="4" />
          <rect x="16" y="26" width="68" height="14" rx="4" fill="#c23a3a" stroke="#7f1d1d" strokeWidth="4" />
          <rect x="44" y="26" width="12" height="60" fill="#f6bc55" />
          <path d="M50 26c-4-12-20-14-20-4 0 8 12 8 20 4zm0 0c4-12 20-14 20-4 0 8-12 8-20 4z" fill="#f6bc55" stroke="#7c5310" strokeWidth="3" />
        </svg>
      );
    case "bulb":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M50 10a26 26 0 0 1 16 46c-4 4-6 8-6 12H40c0-4-2-8-6-12A26 26 0 0 1 50 10z" fill="#fde047" stroke="#7c5310" strokeWidth="4" strokeLinejoin="round" />
          <rect x="40" y="68" width="20" height="8" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="3" />
          <rect x="42" y="78" width="16" height="8" rx="3" fill="#94a3b8" stroke="#475569" strokeWidth="3" />
          <path d="M46 40l4 8 4-8" fill="none" stroke="#7c5310" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "magnet":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M24 16v34a26 26 0 0 0 52 0V16H58v34a8 8 0 0 1-16 0V16z" fill="#e05a5a" stroke="#7f1d1d" strokeWidth="4" strokeLinejoin="round" />
          <rect x="24" y="16" width="18" height="12" fill="#e2e8f0" stroke="#7f1d1d" strokeWidth="3" />
          <rect x="58" y="16" width="18" height="12" fill="#e2e8f0" stroke="#7f1d1d" strokeWidth="3" />
        </svg>
      );
    case "dice":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <rect x="18" y="18" width="64" height="64" rx="12" fill="#fff" stroke="#151a26" strokeWidth="4.5" />
          <circle cx="36" cy="36" r="6" fill="#151a26" />
          <circle cx="64" cy="36" r="6" fill="#151a26" />
          <circle cx="50" cy="50" r="6" fill="#151a26" />
          <circle cx="36" cy="64" r="6" fill="#151a26" />
          <circle cx="64" cy="64" r="6" fill="#151a26" />
        </svg>
      );
    case "watch":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <rect x="38" y="6" width="24" height="16" rx="4" fill="#475569" />
          <rect x="38" y="78" width="24" height="16" rx="4" fill="#475569" />
          <circle cx="50" cy="50" r="26" fill="#fff" stroke="#151a26" strokeWidth="4.5" />
          <path d="M50 50V34M50 50l10 8" stroke="#151a26" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );
    case "bell":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M50 12c4 0 7 3 7 7 12 4 17 14 17 28 0 12 4 18 8 22H18c4-4 8-10 8-22 0-14 5-24 17-28 0-4 3-7 7-7z" fill="#f6bc55" stroke="#7c5310" strokeWidth="4" strokeLinejoin="round" />
          <circle cx="50" cy="78" r="7" fill="#f6bc55" stroke="#7c5310" strokeWidth="4" />
        </svg>
      );
    case "candle":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M50 8c5 8 9 12 9 18a9 9 0 0 1-18 0c0-6 4-10 9-18z" fill="#f97316" stroke="#7c2d12" strokeWidth="3.5" strokeLinejoin="round" />
          <rect x="38" y="36" width="24" height="50" rx="4" fill="#fde8e8" stroke="#c23a3a" strokeWidth="4" />
          <path d="M50 26v10" stroke="#7c5310" strokeWidth="3" />
        </svg>
      );
    case "anchor":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <circle cx="50" cy="18" r="8" fill="none" stroke="#334155" strokeWidth="5" />
          <path d="M50 26v52M30 40h40" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
          <path d="M18 62c4 16 16 24 32 24s28-8 32-24l-10 4c-2 8-10 12-22 12s-20-4-22-12z" fill="#334155" />
        </svg>
      );
    case "umbrella":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M10 48a40 40 0 0 1 80 0c-7-6-13-6-20 0-7-6-13-6-20 0-7-6-13-6-20 0-7-6-13-6-20 0z" fill="#e05a5a" stroke="#7f1d1d" strokeWidth="4" strokeLinejoin="round" />
          <path d="M50 48v32a8 8 0 0 0 16 0" fill="none" stroke="#7f1d1d" strokeWidth="5" strokeLinecap="round" />
          <path d="M50 8v6" stroke="#7f1d1d" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case "moneybag":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M38 22c-14 8-22 22-22 36 0 18 15 30 34 30s34-12 34-30c0-14-8-28-22-36l-6 8h-12z" fill="#4ade80" stroke="#166534" strokeWidth="4" strokeLinejoin="round" />
          <path d="M38 22l-4-8h32l-4 8" fill="#4ade80" stroke="#166534" strokeWidth="4" strokeLinejoin="round" />
          <text x="50" y="66" textAnchor="middle" fontFamily="Georgia, serif" fontSize="34" fontWeight="bold" fill="#166534">$</text>
        </svg>
      );
    case "dollar":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <rect x="10" y="26" width="80" height="48" rx="6" fill="#4ade80" stroke="#166534" strokeWidth="4" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="#166534" strokeWidth="3.5" />
          <text x="50" y="59" textAnchor="middle" fontFamily="Georgia, serif" fontSize="26" fontWeight="bold" fill="#166534">$</text>
        </svg>
      );
    case "lollipop":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <circle cx="50" cy="36" r="26" fill="#f472b6" stroke="#8f1d5c" strokeWidth="4" />
          <path d="M50 12a24 24 0 0 1 0 48 18 18 0 0 1 0-36 12 12 0 0 1 0 24 6 6 0 0 1 0-12" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
          <rect x="47" y="62" width="6" height="30" rx="3" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
        </svg>
      );

    /* ============ MEMES EXTRA ============ */
    case "doge":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M24 26 16 8l20 8zM76 26 84 8 64 16z" fill="#e8b878" stroke="#a97b3f" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="50" cy="52" r="36" fill="#e8b878" stroke="#a97b3f" strokeWidth="4" />
          <ellipse cx="50" cy="64" rx="16" ry="12" fill="#f5dcc0" />
          <circle cx="38" cy="44" r="4.5" fill="#2e2210" />
          <circle cx="62" cy="44" r="4.5" fill="#2e2210" />
          <ellipse cx="50" cy="58" rx="5" ry="4" fill="#2e2210" />
          <path d="M50 62c0 5-3 8-3 8M50 62c0 5 3 8 3 8" stroke="#2e2210" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "trollface":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <circle cx="50" cy="50" r="42" fill="#e8e8e8" stroke="#333" strokeWidth="4" />
          <path d="M26 40c4-6 14-6 18 0M56 40c4-6 14-6 18 0" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
          <path d="M22 56c10 18 46 18 56 0-6 4-14 2-18 6-6-6-12-2-16 2-6-6-14-6-22-8z" fill="#fff" stroke="#333" strokeWidth="3.5" strokeLinejoin="round" />
        </svg>
      );
    case "pepe":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M20 40c0-14 14-22 30-22s30 8 30 22c0 8-4 12-8 16 4 4 6 8 6 12 0 10-12 16-28 16S22 78 22 68c0-4 2-8 6-12-4-4-8-8-8-16z" fill="#7cb342" stroke="#33691e" strokeWidth="4" strokeLinejoin="round" />
          <circle cx="36" cy="40" r="9" fill="#fff" stroke="#33691e" strokeWidth="3" />
          <circle cx="64" cy="40" r="9" fill="#fff" stroke="#33691e" strokeWidth="3" />
          <circle cx="37" cy="41" r="3.5" fill="#212121" />
          <circle cx="63" cy="41" r="3.5" fill="#212121" />
          <path d="M32 64c8 8 28 8 36 0" fill="none" stroke="#33691e" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "thisisfine":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M14 88c2-14 8-20 8-30 6 6 8 12 8 20 4-10 10-14 12-24 6 8 8 16 6 26 6-6 10-8 12-16 4 8 4 16 2 24z" fill="#f97316" stroke="#7c2d12" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="56" cy="42" r="24" fill="#e8b878" stroke="#a97b3f" strokeWidth="4" />
          <path d="M40 26l-6-12 16 6zM72 26l6-12-16 6z" fill="#e8b878" stroke="#a97b3f" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="48" cy="38" r="3.5" fill="#2e2210" />
          <circle cx="64" cy="38" r="3.5" fill="#2e2210" />
          <path d="M48 52h14" stroke="#2e2210" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="30" y="52" width="12" height="9" rx="2" fill="#fff" stroke="#94a3b8" strokeWidth="2.5" />
        </svg>
      );
    case "stonks":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M12 78 36 54l14 12 26-30" fill="none" stroke="#22c55e" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M62 32h16v16" fill="none" stroke="#22c55e" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="30" cy="26" r="10" fill="#e8b878" stroke="#a97b3f" strokeWidth="3.5" />
          <path d="M16 48c0-8 6-12 14-12s14 4 14 12v6H16z" fill="#334155" />
        </svg>
      );
    case "nyan":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <rect x="4" y="38" width="40" height="6" fill="#e05a5a" />
          <rect x="4" y="44" width="40" height="6" fill="#f6bc55" />
          <rect x="4" y="50" width="40" height="6" fill="#fde047" />
          <rect x="4" y="56" width="40" height="6" fill="#4ade80" />
          <rect x="4" y="62" width="40" height="6" fill="#38bdf8" />
          <rect x="40" y="34" width="34" height="26" rx="4" fill="#f9a8d4" stroke="#8f1d5c" strokeWidth="3.5" />
          <circle cx="62" cy="44" r="14" fill="#94a3b8" stroke="#475569" strokeWidth="3.5" />
          <path d="M52 34l-2-8 8 5zM72 34l2-8-8 5z" fill="#94a3b8" stroke="#475569" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="57" cy="42" r="2.5" fill="#212121" />
          <circle cx="67" cy="42" r="2.5" fill="#212121" />
          <path d="M60 48h4" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "amongus":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M30 44c0-18 9-30 22-30s22 12 22 30v30a8 8 0 0 1-8 8h-6v-12h-16v12h-6a8 8 0 0 1-8-8z" fill="#e05a5a" stroke="#7f1d1d" strokeWidth="4" strokeLinejoin="round" />
          <path d="M34 34c4-8 10-12 16-12 2 6 2 12 0 18-8 0-14-2-16-6z" fill="#bae6fd" stroke="#0e7490" strokeWidth="3" strokeLinejoin="round" />
          <rect x="22" y="46" width="8" height="20" rx="4" fill="#c23a3a" stroke="#7f1d1d" strokeWidth="3" />
        </svg>
      );
    case "gigachad":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M30 20c0-6 8-10 20-10s20 4 20 10v26c0 6-2 10-6 14l4 16c-10 6-26 6-36 0l4-16c-4-4-6-8-6-14z" fill="#e8e8e8" stroke="#333" strokeWidth="4" strokeLinejoin="round" />
          <path d="M34 34h10M56 34h10" stroke="#333" strokeWidth="4" strokeLinecap="round" />
          <circle cx="39" cy="40" r="2.5" fill="#333" />
          <circle cx="61" cy="40" r="2.5" fill="#333" />
          <path d="M42 56c4 3 12 3 16 0" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
          <path d="M30 20c4 6 12 8 20 8s16-2 20-8" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "lefishe":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <ellipse cx="50" cy="50" rx="34" ry="40" fill="#e8e8e8" stroke="#333" strokeWidth="4" />
          <circle cx="50" cy="42" r="22" fill="#fff" stroke="#333" strokeWidth="3.5" />
          <circle cx="50" cy="42" r="6" fill="#212121" />
          <ellipse cx="50" cy="72" rx="10" ry="7" fill="#fff" stroke="#333" strokeWidth="3.5" />
        </svg>
      );
    case "wojak":
      return (
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <path d="M28 44c0-18 10-30 22-30s22 12 22 30c0 10-2 18-6 26-2 6-6 10-16 10s-14-4-16-10c-4-8-6-16-6-26z" fill="#e8e8e8" stroke="#333" strokeWidth="4" strokeLinejoin="round" />
          <path d="M34 40c3-3 8-3 10 0M56 40c3-3 8-3 10 0" fill="none" stroke="#333" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="39" cy="46" r="2.5" fill="#333" />
          <circle cx="61" cy="46" r="2.5" fill="#333" />
          <path d="M40 62c4-4 16-4 20 0" fill="none" stroke="#333" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M46 66h8" stroke="#333" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  grupos ampliados                                                    */
/* ------------------------------------------------------------------ */

const T = (type: StickerType, label: string) => ({ type, label });

export const EXT_GROUPS = [
  {
    name: "Caras",
    items: [
      T("grin", "Sonrisa"), T("joy", "Risa"), T("wink", "Guiño"), T("coolface", "Gafas"), T("loveeyes", "Enamorado"),
      T("angry", "Enfado"), T("sad", "Triste"), T("cry", "Llorando"), T("surprised", "Sorpresa"), T("sleepy", "Sueño"),
      T("dizzy", "Mareado"), T("silly", "Lengua"), T("smirk", "Pícaro"), T("thinking", "Pensando"), T("dead", "KO"),
      T("stareyes", "Estrellas"), T("devil", "Diablillo"), T("angel", "Angelito"), T("clown", "Payaso"), T("robot", "Robot"),
      T("blush", "Sonrojado"), T("zipper", "Cremallera"), T("partyface", "Fiesta"), T("melting", "Derritiéndose"),
    ],
  },
  {
    name: "Manos",
    items: [
      T("thumbsup", "Pulgar arriba"), T("thumbsdown", "Pulgar abajo"), T("peace", "Victoria"), T("oksign", "OK"),
      T("fist", "Puño"), T("pointing", "Señalar"), T("waving", "Saludo"), T("rockon", "Rock"), T("crossed", "Cruzados"),
      T("stophand", "Alto"), T("muscle", "Músculo"), T("handheart", "Corazón"), T("callme", "Llámame"), T("clap", "Aplauso"),
    ],
  },
  {
    name: "Cuerpo",
    items: [
      T("eyepair", "Ojos"), T("ear", "Oreja"), T("nose", "Nariz"), T("lips", "Labios"), T("brain", "Cerebro"),
      T("tooth", "Diente"), T("tongue", "Lengua"), T("bone", "Hueso"), T("footprint", "Huella"), T("mustache", "Bigote"),
      T("heartorgan", "Corazón"), T("palm", "Palma"),
    ],
  },
  {
    name: "Objetos",
    items: [
      T("glasses", "Gafas"), T("tophat", "Chistera"), T("cap", "Gorra"), T("bowtie", "Pajarita"), T("lipstick", "Lápiz labial"),
      T("ring", "Anillo"), T("key", "Llave"), T("balloon", "Globo"), T("gift", "Regalo"), T("bulb", "Bombilla"),
      T("magnet", "Imán"), T("dice", "Dado"), T("watch", "Reloj"), T("bell", "Campana"), T("candle", "Vela"),
      T("anchor", "Ancla"), T("umbrella", "Paraguas"), T("moneybag", "Dinero"), T("dollar", "Billete"), T("lollipop", "Piruleta"),
    ],
  },
];

export const EXT_MEMES = [
  T("doge", "Doge"), T("trollface", "Troll"), T("pepe", "Pepe"), T("thisisfine", "This is fine"), T("stonks", "Stonks"),
  T("nyan", "Nyan"), T("amongus", "Impostor"), T("gigachad", "Gigachad"), T("lefishe", "Fishe"), T("wojak", "Wojak"),
];
