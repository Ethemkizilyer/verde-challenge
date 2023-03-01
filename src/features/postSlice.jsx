import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const url = `https://jsonplaceholder.typicode.com/posts?userId=1`;
  const { data } = await axios.get(url);
  return data;
});

const initialState = {
  posts: [],
  addedPost: {},
  updatedPost: {},
  deleteText: "",
  loading: false,
  bakar: false,
  isEdit: false,
  showUpdated: false,
  showAddedPost: false,
  isOpen: false,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    gtPosts: (state) => {
      return state.posts;
    },
    addText: (state, { payload }) => {
      state.posts = [...state.posts, payload].reverse();
    },
    removeDeleteText: (state, action) => {
      state.deleteText = "";
      state.posts = state.posts.filter((item) => item.id != action.payload.id);
    },
    changeEdit: (state, action) => {
      state.isEdit = action.payload;
      state.posts = state.posts.map(
        (item) => (item = item.id == action.payload.id ? action.payload : item)
      );
    },
    bakarEdit: (state) => {
      state.bakar = true;
    },
    modalOpen(state) {
      state.isOpen = !state.isOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      //GET
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { removeDeleteText, bakarEdit, changeEdit, addText, gtPosts, modalOpen } =
  postSlice.actions;

export default postSlice.reducer;
