export interface Hero {
  name: string;
  powerstats: Powerstats;
  image: {
    url: string
  };
  id: string;
  appearance?: Appearance;
}

export interface Powerstats {
  [key: string]: string;
}

export interface Appearance {
  [key: string]: string;
}

export interface serverResponse {
  response: string;
  "results-for": string;
  results: [];
}
