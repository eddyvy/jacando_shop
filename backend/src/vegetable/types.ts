import { Product } from '../product'

export type Vegetable = Product & {
  isLocal: boolean
}
