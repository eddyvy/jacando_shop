import apple from '../assets/img/apple.png'
import avocado from '../assets/img/avocado.png'
import banana from '../assets/img/banana.png'
import bell from '../assets/img/bell-pepper.png'
import blue from '../assets/img/blue-cheese.png'
import blueberry from '../assets/img/blueberry.png'
import broccoli from '../assets/img/broccoli.png'
import carrot from '../assets/img/carrot.png'
import cheddar from '../assets/img/cheddar.png'
import cheese from '../assets/img/cheese.png'
import cherries from '../assets/img/cherries.png'
import corn from '../assets/img/corn.png'
import cucumber from '../assets/img/cucumber.png'
import eggplant from '../assets/img/eggplant.png'
import foodDefault from '../assets/img/food-default.png'
import fruits from '../assets/img/fruits.png'
import grape from '../assets/img/grape.png'
import kiwi from '../assets/img/kiwi.png'
import lemon from '../assets/img/lemon.png'
import mango from '../assets/img/mango.png'
import mozzarella from '../assets/img/mozzarella.png'
import mushroom from '../assets/img/mushroom.png'
import onion from '../assets/img/onion.png'
import orange from '../assets/img/orange.png'
import papaya from '../assets/img/papaya.png'
import parmesan from '../assets/img/parmesan.png'
import peach from '../assets/img/peach.png'
import peas from '../assets/img/peas.png'
import pineapple from '../assets/img/pineapple.png'
import potato from '../assets/img/potato.png'
import pumpkin from '../assets/img/pumpkin.png'
import raspberries from '../assets/img/raspberries.png'
import spinach from '../assets/img/spinach.png'
import strawberry from '../assets/img/strawberry.png'
import tomato from '../assets/img/tomato.png'
import vegetable from '../assets/img/vegetable.png'
import watermelon from '../assets/img/watermelon.png'

export const getImage = (file: string): string => {
  switch (file) {
    case 'apple.png':
      return apple
    case 'avocado.png':
      return avocado
    case 'banana.png':
      return banana
    case 'bell.png':
      return bell
    case 'blue.png':
      return blue
    case 'blueberry.png':
      return blueberry
    case 'broccoli.png':
      return broccoli
    case 'carrot.png':
      return carrot
    case 'cheddar.png':
      return cheddar
    case 'cheese.png':
      return cheese
    case 'cherries.png':
      return cherries
    case 'corn.png':
      return corn
    case 'cucumber.png':
      return cucumber
    case 'eggplant.png':
      return eggplant
    case 'fruits.png':
      return fruits
    case 'grape.png':
      return grape
    case 'kiwi.png':
      return kiwi
    case 'lemon.png':
      return lemon
    case 'mango.png':
      return mango
    case 'mozzarella.png':
      return mozzarella
    case 'mushroom.png':
      return mushroom
    case 'onion.png':
      return onion
    case 'orange.png':
      return orange
    case 'papaya.png':
      return papaya
    case 'parmesan.png':
      return parmesan
    case 'peach.png':
      return peach
    case 'peas.png':
      return peas
    case 'pineapple.png':
      return pineapple
    case 'potato.png':
      return potato
    case 'pumpkin.png':
      return pumpkin
    case 'raspberries.png':
      return raspberries
    case 'spinach.png':
      return spinach
    case 'strawberry.png':
      return strawberry
    case 'tomato.png':
      return tomato
    case 'vegetable.png':
      return vegetable
    case 'watermelon.png':
      return watermelon
    default:
      return foodDefault
  }
}

export const capitalize = (str: string): string => {
  if (str.length === 0) return str
  return str[0].toUpperCase() + str.slice(1, str.length).toLowerCase()
}
