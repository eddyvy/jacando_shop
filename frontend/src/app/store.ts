import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from '../features/loading/slice'
import errorReducer from '../features/error/slice'

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    error: errorReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
