import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userName: "Анонимный пользователь",
  favoriteFilms: null,
  watchLaterFilms: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserData(state, action) {
      state.userId = action.payload.id;
      state.userName = action.payload.name;
      state.favoriteFilms = action.payload.favoriteFilms;
      state.watchLaterFilms = action.payload.watchLaterFilms;
    },
    addFavoriteFilm(state, action) {
      if (state.favoriteFilms) {
        state.favoriteFilms.push(action.payload);
      }
    },
    addWatchLaterFilm(state, action) {
      if (state.watchLaterFilms) {
        state.watchLaterFilms.push(action.payload);
      }
    },
    removeFavoriteFilm(state, action) {
      if (state.favoriteFilms) {
        state.favoriteFilms.filter((film) => film.id !== action.payload);
      }
    },
    removeWatchLaterFilm(state, action) {
      if (state.watchLaterFilms) {
        state.watchLaterFilms.filter((film) => film.id !== action.payload);
      }
    },
  },
});

export const {
  fetchUserData,
  addFavoriteFilm,
  addWatchLaterFilm,
  removeFavoriteFilm,
  removeWatchLaterFilm,
} = userSlice.actions;

export default userSlice.reducer;
