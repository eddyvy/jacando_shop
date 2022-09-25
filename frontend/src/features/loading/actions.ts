import { PayloadAction } from '@reduxjs/toolkit'
import { loadingInitialState } from './slice'
import { LoadingState } from './types'

export function setLoadingAction(
  state: LoadingState,
  action: PayloadAction<string | false>,
): LoadingState {
  if (action.payload === false) return loadingInitialState

  return {
    from: action.payload,
    isLoading: true,
  }
}
