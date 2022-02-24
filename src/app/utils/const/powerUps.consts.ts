import { PowerUps } from '../interfaces/power-ups.interfaace';

const MAX_AMOUNT_USE_UPS = 3;

const captainAmericaShield: PowerUps = {
  name: 'Captain America shield',
  img: 'https://inlnk.ru/go9PDg',
  description: 'durability +10',
  bonus: 10,
  remainAmount: MAX_AMOUNT_USE_UPS,
  active: false
}

const nanoArmor: PowerUps = {
  name: 'Ironman nano armor',
  img: 'https://inlnk.ru/YA19mo',
  description: 'combat +10',
  bonus: 10,
  remainAmount: MAX_AMOUNT_USE_UPS,
  active: false
}

const mjolnir: PowerUps = {
  name: 'Mjolnir',
  img: 'https://inlnk.ru/kXev8o',
  description: 'power +10',
  bonus: 10,
  remainAmount: MAX_AMOUNT_USE_UPS,
  active: false
}

const cloak: PowerUps = {
  name: 'Dr. Stranges cloak',
  img: 'https://inlnk.ru/571Azx',
  description: 'intelligence +10',
  bonus: 10,
  remainAmount: MAX_AMOUNT_USE_UPS,
  active: false
}

const ring: PowerUps = {
  name: 'Green lanterns ring',
  img: 'https://inlnk.ru/BpBnQo',
  description: 'strength +10',
  bonus: 10,
  remainAmount: MAX_AMOUNT_USE_UPS,
  active: false
}

const flashBoots: PowerUps = {
  name: 'Flash boots',
  img: 'https://inlnk.ru/20QRde',
  description: 'speed +10',
  bonus: 10,
  remainAmount: MAX_AMOUNT_USE_UPS,
  active: false
}

export const POWER_UPS: PowerUps[] = [
  captainAmericaShield,
  nanoArmor,
  mjolnir,
  ring,
  cloak,
  flashBoots,
]
