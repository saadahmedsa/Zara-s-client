import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addproduct",
  async (formData) => {
    const result = await axios.post(
      "https://hackathon-ecommerce-backend.vercel.app/api/v1/addproduct",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const getallproduct = createAsyncThunk(
  "/products/getAllProducts",
  async () => {
    const result = await axios.get(
      "https://hackathon-ecommerce-backend.vercel.app/api/v1/All"
    );
// console.log(result?.data);

    return result?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formdata }) => {
    const result = await axios.put(
      `https://hackathon-ecommerce-backend.vercel.app/api/v1/edit/${id}`,
      formdata,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log( result?.data);
    

    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `https://hackathon-ecommerce-backend.vercel.app/api/v1/delete/${id}`
    );

    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getallproduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallproduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getallproduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;