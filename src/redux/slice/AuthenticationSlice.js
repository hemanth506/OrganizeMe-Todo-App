import { createSlice } from "@reduxjs/toolkit";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

// initialState: { isLoggedIn: false, details: null },
const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    login: (state, action) => {
      // useGoogleLogin({
      //   onSuccess: (codeResponse) => {
      //     console.log(codeResponse);
      //     state.isLoggedIn = true;
      //     state.details = codeResponse;
      //   },
      //   onError: (error) => console.log("Login Failed:", error),
      // });
      return state;
    },
    logout: (state, action) => {
      return state;
    }
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;