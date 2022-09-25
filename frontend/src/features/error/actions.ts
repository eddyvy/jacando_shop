import { PayloadAction } from '@reduxjs/toolkit'
import { errorInitialState } from './slice'
import { ErrorState } from './types'

export function setErrorAction(
  state: ErrorState,
  action: PayloadAction<{ from: string; message: string } | false>,
): ErrorState {
  if (action.payload === false) return errorInitialState

  return {
    from: action.payload.from,
    isError: true,
    message: action.payload.message,
  }
}
