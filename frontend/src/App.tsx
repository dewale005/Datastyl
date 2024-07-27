import React from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { ToastContainer } from "react-toastify";

import ProfilePage from "./pages/profile";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <ProfilePage />
      <ToastContainer position="bottom-left" autoClose={5000} />
    </ThemeProvider>
  );
}

export default App;
