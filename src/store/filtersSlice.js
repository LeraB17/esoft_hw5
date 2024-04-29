import { sortByOptions, typesOptions } from "#utils/filterSortingOptions";
import { createSlice } from "@reduxjs/toolkit";

const filtersDefault = {
  sort: sortByOptions.RATING_DOWN,
  type: typesOptions.ALL,
  searchName: "",
  searchDescription: "",
  searchGenres: [],
};

const initialState = { ...filtersDefault };

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSort(state, action) {
      state.sort = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    setSearchName(state, action) {
      state.searchName = action.payload;
    },
    setSearchDescription(state, action) {
      state.searchDescription = action.payload;
    },
    setSearchGenres(state, action) {
      state.searchGenres = action.payload;
    },
    resetFilters(state) {
      state.sort = filtersDefault.sort;
      state.type = filtersDefault.type;
      state.searchName = filtersDefault.searchName;
      state.searchDescription = filtersDefault.searchDescription;
      state.searchGenres = filtersDefault.searchGenres;
    },
  },
});

export const {
  setSort,
  setType,
  setSearchName,
  setSearchDescription,
  setSearchGenres,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
