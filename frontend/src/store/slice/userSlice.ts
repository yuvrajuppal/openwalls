import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loginstate: false,
  username: "",
  useremail: "",
  initializing: true,
};

const userslice = createSlice({
  name: "userslice",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; email: string }>) {
      state.loginstate = true;
      state.username = action.payload.username;
      state.useremail = action.payload.email;
    },
    logout(state) {
      state.loginstate = false;
      state.username = "";
      state.useremail = "";
    },
    initialized(state) {
      state.initializing = false;
    },
  },
});

export const { login, logout, initialized } = userslice.actions;
export default userslice.reducer;
