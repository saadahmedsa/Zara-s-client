import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const  initialState = {
    cartItems : [],
    isLoading : false 
}
export const addTocart = createAsyncThunk("cart/addtocart", async({userId,productId,quantity})=>{
 const response = await axios.post(`https://hackathon-ecommerce-backend.vercel.app/api/v1/addtocart`,{
    userId,productId,quantity
 })
  return response?.data
})
export const getcartitems = createAsyncThunk("cart/getcartitem", async(userId)=>{
    const response = await axios.get(`https://hackathon-ecommerce-backend.vercel.app/api/v1/Allcartitem/${userId}`)
      return response?.data
    })
export const editcartitems = createAsyncThunk("cart/editcartitem", async({userId,productId,quantity})=>{
    const response = await axios.put(`https://hackathon-ecommerce-backend.vercel.app/api/v1/editcart`,{
        userId,productId,quantity
     })
      return response?.data
    })
export const deletecartitems = createAsyncThunk("cart/deletecartitems", async({userId,productId})=>{
    const response = await axios.delete(`https://hackathon-ecommerce-backend.vercel.app/api/v1/delcart/${userId}/${productId}`,)
      return response?.data
    })


const shoppingcart = createSlice({
    name : "shoppingcart",
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder
        .addCase(addTocart.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(addTocart.fulfilled, (state, action) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        })
        .addCase(addTocart.rejected, (state) => {
          state.isLoading = false;
          state.cartItems = [];
        })
        .addCase(getcartitems.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getcartitems.fulfilled, (state, action) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        })
        .addCase(getcartitems.rejected, (state) => {
          state.isLoading = false;
          state.cartItems = [];
        })
        .addCase(editcartitems.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(editcartitems.fulfilled, (state, action) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        })
        .addCase(editcartitems.rejected, (state) => {
          state.isLoading = false;
          state.cartItems = [];
        })
        .addCase(deletecartitems.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deletecartitems.fulfilled, (state, action) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        })
        .addCase(deletecartitems.rejected, (state) => {
          state.isLoading = false;
          state.cartItems = [];
        });
    }
})

export default shoppingcart.reducer