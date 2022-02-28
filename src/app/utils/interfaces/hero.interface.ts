export interface Hero {
  name: string;
  powerstats: Powerstats;
  image: {
    url: string
  };
  id: string;
  appearance?: Appearance;
  work?: jsonObj;
  biography?: jsonObj;
}

export interface Powerstats {
  [key: string]: string;
}

export interface jsonObj {
  [key: string]: string;
}
export type Appearance  = {
  [key: string]: string;
} | { [key: string]: string[] };

export interface serverResponse {
  response: string;
  "results-for": string;
  results: [];
}
