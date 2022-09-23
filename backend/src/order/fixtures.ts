import { Order } from './types'

export const basketsFixtures = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [11, 11, 2, 30, 21, 22, 34],
  [29],
  [23, 21, 33, 21, 18, 8],
  [3, 3, 3, 3, 3, 15, 15, 15, 15],
]

export const orderFixtures: Order[] = [
  {
    id: 1,
    products: [
      {
        product: {
          id: 1,
          category: 'vegetable',
          name: 'broccoli',
          price: 2.5,
          image: 'broccoli.png',
        },
        quantity: 1,
      },
      {
        product: {
          id: 2,
          category: 'vegetable',
          name: 'spinach',
          price: 1.75,
          image: 'spinach.png',
        },
        quantity: 1,
      },
      {
        product: {
          id: 3,
          category: 'vegetable',
          name: 'peas',
          price: 1.02,
          image: 'peas.png',
        },
        quantity: 1,
      },
      {
        product: {
          id: 4,
          category: 'vegetable',
          name: 'cucumber',
          price: 1.75,
          image: 'cucumber.png',
        },
        quantity: 1,
      },
      {
        product: {
          id: 5,
          category: 'vegetable',
          name: 'eggplant',
          price: 3.03,
          image: 'eggplant.png',
        },
        quantity: 1,
      },
      {
        product: {
          id: 6,
          category: 'vegetable',
          name: 'potato',
          price: 3.42,
          image: 'potato.png',
        },
        quantity: 1,
      },
      {
        product: {
          id: 7,
          category: 'vegetable',
          name: 'tomato',
          price: 1.25,
          image: 'tomato.png',
        },
        quantity: 1,
      },
      {
        product: {
          id: 8,
          category: 'vegetable',
          name: 'pumpkin',
          price: 8.45,
          image: 'pumpkin.png',
        },
        quantity: 1,
      },
      {
        product: {
          id: 9,
          category: 'vegetable',
          name: 'corn',
          price: 2.1,
          image: 'corn.png',
        },
        quantity: 1,
      },
      {
        product: {
          id: 10,
          category: 'vegetable',
          name: 'mushroom',
          price: 4.03,
          image: 'mushroom.png',
        },
        quantity: 1,
      },
    ],
    price: 29.3,
  },
  {
    id: 2,
    products: [
      {
        product: {
          id: 2,
          category: 'vegetable',
          name: 'spinach',
          price: 1.75,
          image: 'spinach.png',
        },
        quantity: 1,
      },
      {
        product: {
          id: 11,
          category: 'vegetable',
          name: 'onion',
          price: 0.99,
          image: 'onion.png',
        },
        quantity: 2,
      },
      {
        product: {
          id: 21,
          category: 'fruit',
          name: 'raspberry',
          price: 1.86,
          image: 'raspberries.png',
        },
        quantity: 1,
      },
      {
        product: {
          id: 22,
          category: 'fruit',
          name: 'papaya',
          price: 7.25,
          image: 'papaya.png',
        },
        quantity: 1,
      },
      {
        product: {
          id: 30,
          category: 'cheese',
          name: 'parmesan',
          price: 13.75,
          image: 'parmesan.png',
        },
        quantity: 1,
      },
    ],
    price: 26.59,
  },
  {
    id: 3,
    products: [
      {
        product: {
          id: 29,
          category: 'cheese',
          name: 'cheddar',
          price: 6.71,
          image: 'cheddar.png',
        },
        quantity: 1,
      },
    ],
    price: 6.71,
  },
  {
    id: 4,
    products: [
      {
        product: {
          id: 8,
          category: 'vegetable',
          name: 'pumpkin',
          price: 8.45,
          image: 'pumpkin.png',
        },
        quantity: 1,
      },
      {
        product: {
          id: 18,
          category: 'fruit',
          name: 'cherry',
          price: 1.1,
          image: 'cherries.png',
        },
        quantity: 1,
      },
      {
        product: {
          id: 21,
          category: 'fruit',
          name: 'raspberry',
          price: 1.86,
          image: 'raspberries.png',
        },
        quantity: 2,
      },
      {
        product: {
          id: 23,
          category: 'fruit',
          name: 'kiwi',
          price: 1.5,
          image: 'kiwi.png',
        },
        quantity: 1,
      },
      {
        product: {
          id: 33,
          category: 'vegetable',
          name: 'carrot',
          price: 0.88,
          image: 'carrot.png',
        },
        quantity: 1,
      },
    ],
    price: 15.65,
  },
  {
    id: 5,
    products: [
      {
        product: {
          id: 3,
          category: 'vegetable',
          name: 'peas',
          price: 1.02,
          image: 'peas.png',
        },
        quantity: 5,
      },
      {
        product: {
          id: 15,
          category: 'fruit',
          name: 'orange',
          price: 1.33,
          image: 'orange.png',
        },
        quantity: 4,
      },
    ],
    price: 10.42,
  },
]
