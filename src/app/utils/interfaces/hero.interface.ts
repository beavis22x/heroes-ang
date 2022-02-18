export interface Hero {
  name: string;
  powerstats: Powerstats;
  image: string;
  id: string;
}

export interface Powerstats {
  [key: string]: string;
}
