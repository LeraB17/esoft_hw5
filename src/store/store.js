import { configureStore } from "@reduxjs/toolkit";
import filmsSlice from "./filmsSlice";
import filtersSlice from "./filtersSlice";

const store = configureStore({
  reducer: {
    films: filmsSlice,
    filters: filtersSlice,
  },
});

export default store;
