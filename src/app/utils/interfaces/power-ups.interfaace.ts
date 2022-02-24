export interface PowerUps {
  name: string;
  img: string;
  description: string;
  bonus: number;
  remainAmount: number;
  active: boolean;
  id: number;
}

export interface PowerUpsArray {
  [key: string]: PowerUps;
}
