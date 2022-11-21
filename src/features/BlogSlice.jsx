import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    blogs: null,
    loading:false,
    error:false,
    search:"",
}

const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    loadBlogs:(state) => {
      state.loading=true;
      state.error=false;
    },
    readBlogs: (state, {payload})=>{
      state.blogs = payload;
      state.loading=false;
      state.error=false;
    },
    errorBlogs: (state) =>{
      state.error = true;
    },
     searchBlog: (state, {payload})=>{
      state.search = payload;
     }
  }
});

export const {loadBlogs, readBlogs, errorBlogs, searchBlog} = BlogSlice.actions

export default BlogSlice.reducer