import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: null,
    error: null,
}

export const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
        fetchDataStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchDataSuccess(state, action) {
            state.loading = false;
            state.data = action.payload;
        },
        fetchDataFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
})

export const {
    fetchDataStart,
    fetchDataSuccess,
    fetchDataFailure,
} = filmsSlice.actions;

export default filmsSlice.reducer;