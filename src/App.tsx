import { useState } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Main from "./page/main";
import { ThemeProvider } from "@mui/material";
import { theme } from "./assets/theme";

function App() {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <ToastContainer></ToastContainer>
          <ThemeProvider theme={theme}>
            <Main />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
