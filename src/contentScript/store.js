import { configureStore } from '@reduxjs/toolkit'
import contentScriptReducer from './contentScriptSlice'

export default configureStore({
  reducer: {contentScript: contentScriptReducer},
})