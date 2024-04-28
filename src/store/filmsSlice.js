import { createSlice } from "@reduxjs/toolkit";
import { sortByOptions } from "#utils/filterSortingOptions";

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
    fetchSortedData(state, action) {
      switch (action.payload) {
        case sortByOptions.DEFAULT:
          state.data.sort((a, b) => a.id - b.id);
          break;
        case sortByOptions.RATING_UP:
          state.data.sort((a, b) => a.rating - b.rating);
          break;
        case sortByOptions.RATING_DOWN:
          state.data.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    },
  },
});

export const { fetchData, fetchSortedData } = filmsSlice.actions;

export default filmsSlice.reducer;
