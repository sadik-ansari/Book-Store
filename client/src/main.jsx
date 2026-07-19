import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";

import {
  ThemeProvider,
  CssBaseline,
} from "@mui/material";

import theme from "./theme";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <BrowserRouter>

          <App/>

      </BrowserRouter>
    </ThemeProvider>



);