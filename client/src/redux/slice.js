import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: { username: "" },
  errorMessage: null,
  events: [],
  modalState: {
    open: false,
    position: { top: 0, left: 0 },
    id: null,
  },
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
    openModal: (state, action) => {
      state.modalState.open = true;
      state.modalState.position.left = action.payload.left;
      state.modalState.position.top = action.payload.top;
      state.modalState.id = action.payload.id;
      state.modalState.value = action.payload.value;
    },
    closeModal: (state, action) => {
      state.modalState = {
        open: false,
        position: { top: 0, left: 0 },
        id: null,
        value: [],
      };
    },
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
    syncEvent: (state, action) => {
      state.events = action.payload;
    },
    eventsUpdate: (state, action) => {
      const id = action.payload._id;
      let newEvents = state.events.map((prevE) => {
        if (id === prevE._id) {
          return { ...prevE, ...action.payload };
        } else {
          return prevE;
        }
      });
      state.events = newEvents;
    },
  },
});
export const {
  logIn,
  openModal,
  closeModal,
  setError,
  eventsUpdate,
  syncEvent,
  addEvent,
} = globalSlice.actions;
export default globalSlice.reducer;
