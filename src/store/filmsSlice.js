import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

export const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    fetchData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { fetchData } = filmsSlice.actions;

export default filmsSlice.reducer;
