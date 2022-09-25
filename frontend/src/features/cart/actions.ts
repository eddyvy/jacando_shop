import { PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../product'
import { cartInitialState } from './slice'
import { CartState } from './types'

export function addToCartAction(
  state: CartState,
  action: PayloadAction<Product>,
): CartState {
  return {
    price: state.price + action.payload.price,
    products: [...state.products, action.payload],
  }
}

export function removeFromCartAction(
  state: CartState,
  action: PayloadAction<Product>,
): CartState {
  if (state.products.length === 0) return cartInitialState

  const prodIds = state.products.map((p) => p.id)
  const fInd = prodIds.indexOf(action.payload.id)
  if (fInd === -1) return state

  const products = [...state.products]
  products.splice(fInd, 1)

  return {
    products,
    price: state.price - action.payload.price,
  }
}

export function cleanCartAction(): CartState {
  return cartInitialState
}
