import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "serif"].join(","),
    fontWeight: 500,
  },
});

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
