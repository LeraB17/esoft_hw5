import { IUser } from "#interfaces/IUser";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
    userId: number | null;
    userName: string;
}

const initialState: UserState = {
    userId: null,
    userName: "Анонимный пользователь",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchUserData(state, action: PayloadAction<IUser>) {
            state.userId = action.payload.id;
            state.userName = action.payload.userName;
        },
    },
});

export const { fetchUserData } = userSlice.actions;

export default userSlice.reducer;
