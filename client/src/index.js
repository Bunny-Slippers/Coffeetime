import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "../public/styles.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <div>hello world</div>,
//   },
// ]);

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
