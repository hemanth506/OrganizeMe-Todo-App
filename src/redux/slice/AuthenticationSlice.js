import { createSlice } from "@reduxjs/toolkit";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, details: null },
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