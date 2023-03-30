import { createSlice } from '@reduxjs/toolkit'

export const contentScriptSlice = createSlice({
  name: 'contentScript',
  initialState: {
    showPopup: false,
  },
  reducers: {
    togglePopup: (state) => {
      state.showPopup = !state.showPopup
    }
  },
})

export const { togglePopup } = contentScriptSlice.actions

export default contentScriptSlice.reducer