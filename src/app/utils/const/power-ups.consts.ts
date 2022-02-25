import { PowerUps } from '../interfaces/power-ups.interface';

const MAX_AMOUNT_USE_UPS = 3;

export const POWER_UPS: PowerUps[] = [
  {
    name: 'Captain America shield',
    img: 'https://inlnk.ru/go9PDg',
    description: 'durability +10',
    attribute: 'durability',
    bonus: 10,
    remainAmount: MAX_AMOUNT_USE_UPS,
    active: false,
    id: 1
  },
  {
    name: 'Ironman nano armor',
    img: 'https://inlnk.ru/YA19mo',
    description: 'combat +10',
    attribute: 'combat',
    bonus: 10,
    remainAmount: MAX_AMOUNT_USE_UPS,
    active: false,
    id: 2
  }
  , {
    name: 'Mjolnir',
    img: 'https://inlnk.ru/kXev8o',
    description: 'power +10',
    attribute: 'power',
    bonus: 10,
    remainAmount: MAX_AMOUNT_USE_UPS,
    active: false,
    id: 3
  }
  , {
    name: 'Dr. Stranges cloak',
    img: 'https://inlnk.ru/571Azx',
    description: 'intelligence +10',
    attribute: 'intelligence',
    bonus: 10,
    remainAmount: MAX_AMOUNT_USE_UPS,
    active: false,
    id: 4
  }
  , {
    name: 'Green lanterns ring',
    img: 'https://inlnk.ru/BpBnQo',
    description: 'strength +10',
    attribute: 'strength',
    bonus: 10,
    remainAmount: MAX_AMOUNT_USE_UPS,
    active: false,
    id: 5
  },
  {
    name: 'Flash boots',
    img: 'https://inlnk.ru/20QRde',
    description: 'speed +10',
    attribute: 'speed',
    bonus: 10,
    remainAmount: MAX_AMOUNT_USE_UPS,
    active: false,
    id: 6
  }
]
