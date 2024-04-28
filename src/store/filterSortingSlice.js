import { createSlice } from "@reduxjs/toolkit";
import { filterOptions, sortByOptions } from "#utils/filterSortingOptions";

const initialState = {
  sortBy: sortByOptions.DEFAULT,
  filter: filterOptions,
};

export const filterSortingSlice = createSlice({
  name: "filterSort",
  initialState,
  reducers: {
    setSorting(state, action) {
      state.sortBy = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { setSorting, setFilter } = filterSortingSlice.actions;

export default filterSortingSlice.reducer;
