import { createSlice } from '@reduxjs/toolkit'

export const contentScriptSlice = createSlice({
  name: 'contentScript',
  initialState: {
    showPopup: false,
    command: localStorage.getItem("command")
  },
  reducers: {
    togglePopup: (state) => {
      state.showPopup = !state.showPopup
    },
    setCommand: (state, action) => {
      state.command = action.payload;
      localStorage.setItem("command", action.payload);
    }
  },
})

export const { togglePopup, setCommand } = contentScriptSlice.actions

export default contentScriptSlice.reducer