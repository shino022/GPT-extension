import { configureStore } from '@reduxjs/toolkit'
import popupSliceReducer from './popupSlice'

export default configureStore({
  reducer: {popup: popupSliceReducer},
})