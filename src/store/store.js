import { configureStore } from "@reduxjs/toolkit";
import filmsSlice from "./filmsSlice";
import filtersSlice from "./filtersSlice";
import commentsSlice from "./commentsSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    films: filmsSlice,
    filters: filtersSlice,
    comments: commentsSlice,
    user: userSlice,
  },
});

export default store;
