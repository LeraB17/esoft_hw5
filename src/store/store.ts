import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filtersSlice from "./filtersSlice";
import userSlice from "./userSlice";
import { userAPI } from "#services/UserService";
import { filmsAPI } from "#services/FilmsService";
import { commentsAPI } from "#services/ComentsService";

const rootReducer = combineReducers({
    filters: filtersSlice,
    user: userSlice,
    [userAPI.reducerPath]: userAPI.reducer,
    [filmsAPI.reducerPath]: filmsAPI.reducer,
    [commentsAPI.reducerPath]: commentsAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(userAPI.middleware)
                .concat(filmsAPI.middleware)
                .concat(commentsAPI.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
