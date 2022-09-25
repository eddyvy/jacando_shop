import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from '../features/loading/slice'
import errorReducer from '../features/error/slice'
import productsReducer from '../features/product/slice'
import cartReducer from '../features/cart/slice'

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    error: errorReducer,
    products: productsReducer,
    cart: cartReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
