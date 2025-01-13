import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Post {
  id: number;
  text: string;
  name: string;
  image: string;
  createdAt: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  description: string;
}

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost: (state, action: PayloadAction<Post>) => {
      const newPost: Post = {
        ...action.payload,
      };
      state.posts.push(newPost); // Añade el nuevo post al estado
    },
    // Actualizar un post existente
    updatePost: (state, action: PayloadAction<{ id: number; post: Post }>) => {
      const postIndex = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (postIndex !== -1) {
        state.posts[postIndex] = {
          ...state.posts[postIndex],
          ...action.payload.post,
        };
      }
    },
    // Eliminar un post
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { createPost, updatePost, deletePost } = postSlice.actions;

export default postSlice.reducer;
