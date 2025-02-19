import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { EthereumProvider } from "./context/ContractProvider.tsx";
import React from "react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <EthereumProvider>
        <App />
      </EthereumProvider>
    </BrowserRouter>
  </React.StrictMode>
);
