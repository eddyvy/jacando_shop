import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from '../features/loading/slice'
import errorReducer from '../features/error/slice'
import productsReducer from '../features/product/slice'

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    error: errorReducer,
    products: productsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
