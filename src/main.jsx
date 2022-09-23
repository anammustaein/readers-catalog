import React from "react";
import ReactDOM from "react-dom/client";
import { FavContextProvider } from "./components/context/FavContext";
// import { SearchContextProvider } from "./components/context/searchContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <SearchContextProvider> */}
      <FavContextProvider>
        <App />
      </FavContextProvider>
    {/* </SearchContextProvider> */}
  </React.StrictMode>
);
