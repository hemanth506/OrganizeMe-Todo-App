import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "serif"].join(","),
    fontWeight: 500,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
