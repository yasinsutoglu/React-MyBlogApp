import {createSlice}  from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
}

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    }
  }
});



export const {setUser, clearUser} = AuthSlice.actions
export default AuthSlice.reducer