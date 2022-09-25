import { createSlice } from '@reduxjs/toolkit'
import { loadProductsAction } from './actions'
import { ProductsState } from './types'

export const productsInitialState: ProductsState = {
  cheeses: [],
  fruits: [],
  vegetables: [],
}

const productsSlice = createSlice({
  name: 'products',
  initialState: productsInitialState,
  reducers: {
    loadProducts: loadProductsAction,
  },
})

export const { loadProducts } = productsSlice.actions
export default productsSlice.reducer
