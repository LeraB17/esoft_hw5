import { sortByOptions, typesOptions } from "#utils/filterSortingOptions";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FilterState {
    sort: string;
    type: string;
    searchName: string;
    searchDescription: string;
    searchGenres: string[];
    page: number;
    limit: number;
}

const filtersDefault: FilterState = {
    sort: sortByOptions.RATING_DOWN,
    type: typesOptions.ALL,
    searchName: "",
    searchDescription: "",
    searchGenres: [],
    page: 0,
    limit: 6,
};

const initialState = { ...filtersDefault };

export const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setSort(state, action: PayloadAction<string>) {
            state.sort = action.payload;
        },
        setType(state, action: PayloadAction<string>) {
            state.type = action.payload;
        },
        setSearchName(state, action: PayloadAction<string>) {
            state.searchName = action.payload;
        },
        setSearchDescription(state, action: PayloadAction<string>) {
            state.searchDescription = action.payload;
        },
        setSearchGenres(state, action: PayloadAction<string[]>) {
            state.searchGenres = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            console.log("page", action.payload);
            state.page = action.payload;
        },
        resetFilters(state) {
            state.sort = filtersDefault.sort;
            state.type = filtersDefault.type;
            state.searchName = filtersDefault.searchName;
            state.searchDescription = filtersDefault.searchDescription;
            state.searchGenres = filtersDefault.searchGenres;
            state.page = filtersDefault.page;
        },
    },
});

export const { setSort, setType, setSearchName, setSearchDescription, setSearchGenres, setPage, resetFilters } =
    filtersSlice.actions;

export default filtersSlice.reducer;
