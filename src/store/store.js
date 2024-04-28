import { configureStore } from "@reduxjs/toolkit";
import filmsSlice from "./filmsSlice";
import filterSortingSlice from "./filterSortingSlice";

const store = configureStore({
    reducer: {
        films: filmsSlice,
        filterSorting: filterSortingSlice,
    }
});

export default store;
