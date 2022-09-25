import { createSlice } from '@reduxjs/toolkit'
import { setErrorAction } from './actions'
import { ErrorState } from './types'

export const errorInitialState: ErrorState = {
  from: null,
  isError: false,
  message: null,
}

const ErrorSlice = createSlice({
  name: 'error',
  initialState: errorInitialState,
  reducers: {
    setError: setErrorAction,
  },
})

export const { setError } = ErrorSlice.actions
export default ErrorSlice.reducer
