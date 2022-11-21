import { configureStore  } from "@reduxjs/toolkit";
import AuthReducer from "../features/AuthSlice";
import BlogReducer from "../features/BlogSlice";

const store = configureStore({
    reducer:{
    auth: AuthReducer,
    blog: BlogReducer
    }
});

export default store;