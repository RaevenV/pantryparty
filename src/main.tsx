import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { RecipeProvider } from "./context/RecipeContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
