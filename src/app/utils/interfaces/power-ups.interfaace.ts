export interface PowerUps {
  name: string;
  img: string;
  description: string;
  bonus: number;
  remainAmount: number;
}

export interface PowerUpsArray {
  [key: string]: PowerUps;
}
