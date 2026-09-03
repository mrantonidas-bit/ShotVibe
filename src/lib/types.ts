/* Tipos y valores por defecto de ShotVibe Editor. Todo es local al navegador. */

export type FrameId = string;

export type AspectId = "free" | "1:1" | "4:5" | "3:4" | "9:16" | "16:9" | "2:3" | "1.91:1";

export type StickerType =
  | "star" | "heart" | "spark" | "arrow" | "flame" | "crown" | "bolt" | "smiley" | "wow" | "like"
  | "moon" | "sun" | "cloud" | "rainbow" | "rocket" | "planet" | "gem" | "trophy" | "medal" | "eye"
  | "infinity" | "music" | "camera" | "coffee" | "pizza" | "cherry" | "flower" | "clover" | "target" | "verified"
  | "lol" | "cien" | "xd" | "pressf" | "rip" | "sus" | "epico" | "gg" | "bruh" | "oof"
  /* caras */
  | "grin" | "joy" | "wink" | "coolface" | "loveeyes" | "angry" | "sad" | "cry" | "surprised" | "sleepy"
  | "dizzy" | "silly" | "smirk" | "thinking" | "dead" | "stareyes" | "devil" | "angel" | "clown" | "robot"
  | "blush" | "zipper" | "partyface" | "melting"
  /* manos */
  | "thumbsup" | "thumbsdown" | "peace" | "oksign" | "fist" | "pointing" | "waving" | "rockon" | "crossed"
  | "stophand" | "muscle" | "handheart" | "callme" | "clap"
  /* cuerpo */
  | "eyepair" | "ear" | "nose" | "lips" | "brain" | "tooth" | "tongue" | "bone" | "footprint" | "mustache"
  | "heartorgan" | "palm"
  /* objetos clásicos */
  | "glasses" | "tophat" | "cap" | "bowtie" | "lipstick" | "ring" | "key" | "balloon" | "gift" | "bulb"
  | "magnet" | "dice" | "watch" | "bell" | "candle" | "anchor" | "umbrella" | "moneybag" | "dollar" | "lollipop"
  /* memes extra */
  | "doge" | "trollface" | "pepe" | "thisisfine" | "stonks" | "nyan" | "amongus" | "gigachad" | "lefishe" | "wojak";

export interface StickerItem {
  id: string;
  type: StickerType;
  x: number;
  y: number;
  scale: number;
  rotate: number;
}

export interface FrameTexts {
  top: string;
  bottom: string;
  title: string;
  subtitle: string;
  url: string;
  badge: string;
  tag: string;
}

export const DEFAULT_TEXTS: FrameTexts = {
  top: "CUANDO DESCUBRES SHOTVIBE",
  bottom: "NO HAY VUELTA ATRÁS",
  title: "Mi captura estelar",
  subtitle: "hecha con ShotVibe",
  url: "shotvibe.app",
  badge: "NUEVO",
  tag: "1/5",
};

/* Ajustes globales (marco, fondo, geometría, efectos…) */
export interface Settings {
  radius: number;
  padding: number;
  shadow: number;
  rotate: number;
  border: number;
  borderColor: string;
  saturation: number;
  brightness: number;
  texts: FrameTexts;
}

export const DEFAULT_SETTINGS: Settings = {
  radius: 18,
  padding: 64,
  shadow: 45,
  rotate: 0,
  border: 0,
  borderColor: "#ffffff",
  saturation: 100,
  brightness: 100,
  texts: DEFAULT_TEXTS,
};

/* Ajustes por foto (formato, encuadre y stickers viven en cada imagen) */
export interface PhotoSettings {
  frame: FrameId;
  aspectId: AspectId;
  cropX: number;
  cropY: number;
  cropZoom: number;
  stickers: StickerItem[];
}

export const DEFAULT_PHOTO: PhotoSettings = {
  frame: "none",
  aspectId: "free",
  cropX: 50,
  cropY: 50,
  cropZoom: 100,
  stickers: [],
};

export interface LoadedImage {
  url: string;
  name: string;
  w: number;
  h: number;
  photo: PhotoSettings;
}

export type Theme = "light" | "dark";

export function shadowFor(v: number): string {
  if (v <= 0) return "none";
  const a = v / 100;
  const y = Math.round(10 + a * 34);
  const b = Math.round(24 + a * 66);
  const o1 = (0.16 + a * 0.2).toFixed(2);
  const o2 = (0.08 + a * 0.14).toFixed(2);
  return `0 ${y}px ${b}px rgba(5,9,20,${o1}), 0 ${Math.round(y / 3)}px ${Math.round(b / 3)}px rgba(5,9,20,${o2})`;
}
