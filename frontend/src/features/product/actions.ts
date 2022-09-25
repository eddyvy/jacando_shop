import { PayloadAction } from '@reduxjs/toolkit'
import { Category, Product, ProductsState } from './types'

export function loadProductsAction(
  state: ProductsState,
  action: PayloadAction<{ products: Product[]; category: Category }>,
): ProductsState {
  const arrUniques = (
    arr1: Product[],
    arr2: Product[],
  ): Product[] => {
    const mapIds: Record<number, true> = {}
    const result: Product[] = []
    arr1.forEach((p) => {
      if (!mapIds[p.id]) return
      mapIds[p.id] = true
      result.push(p)
    })
    arr2.forEach((p) => {
      if (!mapIds[p.id]) return
      mapIds[p.id] = true
      result.push(p)
    })
    return result
  }

  switch (action.payload.category) {
    case 'cheese':
      return {
        cheeses: arrUniques(action.payload.products, state.cheeses),
        fruits: state.fruits,
        vegetables: state.vegetables,
      }

    case 'fruit':
      return {
        cheeses: state.cheeses,
        fruits: arrUniques(action.payload.products, state.fruits),
        vegetables: state.vegetables,
      }

    case 'vegetable':
      return {
        cheeses: state.cheeses,
        fruits: state.fruits,
        vegetables: arrUniques(
          action.payload.products,
          state.vegetables,
        ),
      }

    default:
      return state
  }
}
