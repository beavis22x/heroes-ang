export interface Hero {
  name: string;
  powerstats: Powerstats;
  image: {
    url: string
  };
  id: string;
}

export interface Powerstats {
  [key: string]: string;
}
