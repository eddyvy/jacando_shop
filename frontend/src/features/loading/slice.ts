import { createSlice } from '@reduxjs/toolkit'
import { setLoadingAction } from './actions'
import { LoadingState } from './types'

export const loadingInitialState: LoadingState = {
  from: null,
  isLoading: false,
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState: loadingInitialState,
  reducers: {
    setLoading: setLoadingAction,
  },
})

export const { setLoading } = loadingSlice.actions
export default loadingSlice.reducer
