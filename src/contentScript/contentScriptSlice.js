import { createSlice } from '@reduxjs/toolkit'

export const contentScriptSlice = createSlice({
  name: 'contentScript',
  initialState: {
    showPopup: false,
    command: localStorage.getItem("command"),
    isOn: true
  },
  reducers: {
    togglePopup: (state) => {
      state.showPopup = !state.showPopup
    },
    setCommand: (state, action) => {
      state.command = action.payload;
      localStorage.setItem("command", action.payload);
    },
    toggleSwitch: (state) => {
      state.isOn = !state.isOn
    }
  },
})

export const { togglePopup, setCommand, toggleSwitch } = contentScriptSlice.actions

export default contentScriptSlice.reducer