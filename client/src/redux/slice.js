import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
  errorMessage: null,
  showModal: false,
  loading: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      state.user.username = action.payload;
      state.errorMessage = null;
    },
    showModal: (state, action) => {
      state.showModal = true;
    },
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});
export const { logIn, showModal, setError } = globalSlice.actions;
export default globalSlice.reducer;
