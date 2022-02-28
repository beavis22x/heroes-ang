export const randomId = (): string => {
  return String(Math.floor(Math.random() * 90000));
}

export const generateToken = (): string => {
  return btoa(Math.random().toString()).substr(10, 5);
}

export const getRandomId = (): string => {
  return Math.round(1 + Math.random() * 731).toString();
}
