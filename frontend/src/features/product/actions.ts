import { PayloadAction } from '@reduxjs/toolkit'
import { getUniqueProducts } from './helper'
import { Category, Product, ProductsState } from './types'

export function loadProductsAction(
  state: ProductsState,
  action: PayloadAction<{ products: Product[]; category: Category }>,
): ProductsState {
  const { category, products } = action.payload
  const newProducts: Product[] = [...products]

  if (category === 'cheese') {
    newProducts.concat(state.cheeses)
    return {
      cheeses: getUniqueProducts(newProducts),
      fruits: state.fruits,
      vegetables: state.vegetables,
    }
  }

  if (category === 'fruit') {
    newProducts.concat(state.fruits)
    return {
      cheeses: state.cheeses,
      fruits: getUniqueProducts(newProducts),
      vegetables: state.vegetables,
    }
  }

  if (category === 'vegetable') {
    newProducts.concat(state.vegetables)
    return {
      cheeses: state.cheeses,
      fruits: state.fruits,
      vegetables: getUniqueProducts(newProducts),
    }
  }

  return state
}
