import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    isAuthenticated : false ,
    isLoading : true,
    user : null
}
export const registerUser = createAsyncThunk("/auth/Register",
    async (FormData)=>{
        const response = await axios.post("http://localhost:5000/api/v1/register",FormData,{
            withCredentials:true
        })

        return response.data
    }
)
export const loginuser = createAsyncThunk("/auth/login",
    async (FormData)=>{
        const response = await axios.post("http://localhost:5000/api/v1/login",FormData,{
            withCredentials:true
        })

        return response.data
    }
)
export const checkuser = createAsyncThunk("/auth/checkauth",
    async ()=>{
        const response = await axios.get("http://localhost:5000/api/v1/authcheck",{
          withCredentials:true,
          headers:{
            'Cache-control' : 'no-store,no-cache,must-revalidate,proxy-revalidate'
          },
        }
      )
      
        return response.data
    }
)
export const logoutuser = createAsyncThunk("/auth/logout",
    async ()=>{
        const response = await axios.get("http://localhost:5000/api/v1/logout",{
          withCredentials:true,
         
        }
      )
      
        return response.data
    }
)
const authslice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setUser  : (state,action)=>{

        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
          })
          .addCase(registerUser.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
          })
          .addCase(loginuser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(loginuser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user :null;
            state.isAuthenticated =  action.payload.success 
          })
          .addCase(loginuser.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
          })
          .addCase(checkuser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(checkuser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user :null;
            state.isAuthenticated =  action.payload.success 
          })
          .addCase(checkuser.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
          }).addCase(logoutuser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
          })
        }
})

export const {setUser} = authslice.actions;
export default authslice.reducer