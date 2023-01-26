import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: {},
  errorMessage: null,
  events: [],
  modalState: {
    open: false,
    type: null,
    position: { top: 0, left: 0 },
    id: null,
  },
  loading: false,
};

const globalSlice = createSlice({
  name: 'global',
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
export const { logIn, showModal, setError, eventsUpdate, syncEvent, addEvent } =
  globalSlice.actions;
export default globalSlice.reducer;
