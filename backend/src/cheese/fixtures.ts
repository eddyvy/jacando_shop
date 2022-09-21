import { Cheese } from './types'

export const cheeseFixtures: Cheese[] = [
  {
    id: 29,
    category: 'cheese',
    price: 6.71,
    name: 'cheddar',
    description:
      'Cheddar cheese (or simply cheddar) is a natural cheese that is relatively hard,' +
      'off-white (or orange if colourings such as annatto are added), and sometimes sharp-tasting. ',
    stock: 13,
    smellLevel: 2,
    image: 'cheddar.png',
  },
  {
    id: 30,
    category: 'cheese',
    price: 13.75,
    name: 'parmesan',
    description:
      'True Parmesan cheese has a hard, gritty texture and is fruity and nutty in taste.' +
      'Cheeses mocking Parmesan or inferior Parmesan may have a bitter taste.',
    stock: 8,
    smellLevel: 3,
    image: 'parmesan.png',
  },
  {
    id: 31,
    category: 'cheese',
    price: 8.32,
    name: 'mozzarella',
    description:
      'Mozzarella is a plastic or stretched-curd cheese; the curd is mixed with heated' +
      'whey and stretched and kneaded until it attains a smooth, pliable consistency.' +
      'It is then molded into spheres or ovals and stored in water to keep it moist.',
    stock: 12,
    smellLevel: 1,
    image: 'mozzarella.png',
  },
  {
    id: 32,
    category: 'cheese',
    price: 14.95,
    name: 'blue cheese',
    description:
      'Blue cheese is a unique category of mould-ripened cheese with a pungent salty,' +
      'piquant flavour. Its natural, crusty rind gives it a rustic appearance and' +
      'develops as the cheese matures in humidity-controlled cellars.',
    stock: 3,
    smellLevel: 5,
    image: 'blue-cheese.png',
  },
]
