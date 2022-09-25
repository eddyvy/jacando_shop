import { createSlice } from '@reduxjs/toolkit'
import {
  addToCartAction,
  removeFromCartAction,
  cleanCartAction,
} from './actions'
import { CartState } from './types'

export const cartInitialState: CartState = {
  products: [],
  price: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addToCart: addToCartAction,
    removeFromCart: removeFromCartAction,
    cleanCart: cleanCartAction,
  },
})

export const { addToCart, removeFromCart, cleanCart } =
  cartSlice.actions
export default cartSlice.reducer
