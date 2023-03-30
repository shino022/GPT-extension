import { createSlice } from '@reduxjs/toolkit'

export const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    command: localStorage.getItem("command") || "Summerize this article",
  },
  reducers: {
    setCommand: (state, action) => {
      state.command = action.payload
      localStorage.setItem("command", action.payload);
    }
  },
})

export const { setCommand } = popupSlice.actions

export default popupSlice.reducer