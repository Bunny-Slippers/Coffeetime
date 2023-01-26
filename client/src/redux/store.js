import { configureStore } from "@reduxjs/toolkit";
import global from "./slice";

export const store = configureStore({
  reducer: {
    global,
  },
});
