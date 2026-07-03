export type IconKey =
  | "beach"
  | "lake"
  | "mountain"
  | "park"
  | "city"
  | "safari";

export interface Trip {
  id: number;
  packageCode: string;
  sourceUrl: string;
  name: string;
  region: string;
  loc: string;
  date: string;
  price: number;
  seats: number;
  left: number;
  difficulty: "Easy" | "Moderate" | "Hard";
  vibes: string[];
  grad: string;
  image: string;
  icon: IconKey;
  host: string;
  hostTag: string;
  going: number;
  deadline?: boolean;
  desc: string;
  highlights: string[];
  included: string[];
}
