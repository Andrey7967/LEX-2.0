import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/styles.css";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { Store } from "./states/Store.ts"

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={Store}>

    <App />

  </Provider>

);