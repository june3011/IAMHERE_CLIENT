import { useState } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Main from "./page/main";

function App() {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <Main />
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
