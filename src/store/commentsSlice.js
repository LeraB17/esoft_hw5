import { createSlice } from "@reduxjs/toolkit";
import { commentsData } from "./commentsData";

const initialState = {
  comments: commentsData,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    fetchComments(state, action) {
      state.comments = action.payload;
    },
    addComment(state, action) {
      if (state.comments) {
        state.comments.push(action.payload);
      }
    },
  },
});

export const { fetchComments, addComment } = commentsSlice.actions;

export default commentsSlice.reducer;
