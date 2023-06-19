import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    email:null,
    userName:null,
    userID: null,
    isFetching: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
    LOGIN_START (state) {
      state.isFetching=true
    },

 
    SET_ACTIVE_USER (state, action) {
  
      
        const {email, userName, userID} = action.payload
        state.isLoggedIn = true
        state.email = email
        state.userName = userName
        state.userID = userID
        state.isFetching = false
    },

    LOGIN_FAILURE(state){
      state.isLoggedIn=null
      state.email=null
      state.userID = null


    },

    REMOVE_ACTIVE_USER: (state,action)=> {
        state.isLoggedIn = null
        state.email = null
        state.userName = null
        state.userID = null
    }
  }
});

export const {LOGIN_START, LOGIN_SUCCESS,LOGIN_FAILURE,SET_ACTIVE_USER, REMOVE_ACTIVE_USER} = authSlice.actions
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selecttUserEmail = (state) => state.auth.email
export const selectUserID = (state) => state.auth.userID

export default authSlice.reducer