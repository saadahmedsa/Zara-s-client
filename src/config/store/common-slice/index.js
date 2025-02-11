import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featurelist: [],
};

// Fetch features
export const getfeature = createAsyncThunk("feature/getfeature", async () => {
  const result = await axios.get(`https://hackathon-ecommerce-backend.vercel.app/api/v1/Allfeature`);
  return result?.data;
});

// Add feature
export const Addfeature = createAsyncThunk("feature/Addfeature", async (image) => {
  const result = await axios.post(`https://hackathon-ecommerce-backend.vercel.app/api/v1/Addfeature`, 
   image,
   {
    headers: {
      "Content-Type": "application/json",
    },
  } 
);
  return result?.data;
});

// Delete feature
export const deletefeature = createAsyncThunk("feature/deletefeature", 
  async (id) => {
  const result = await axios.delete(`https://hackathon-ecommerce-backend.vercel.app/api/v1/deletefeature/${id}`);
  return result?.data;
});

const commonSlice = createSlice({
  name: "commonslice",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      // Get features
      .addCase(getfeature.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getfeature.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featurelist = action.payload.data;
      })
      .addCase(getfeature.rejected, (state) => {
        state.isLoading = false;
        state.featurelist = [];
      })

      // Add feature
      .addCase(Addfeature.fulfilled, (state, action) => {
        state.featurelist.push(action.payload.data);
      })

      // Delete feature
      .addCase(deletefeature.fulfilled, (state, action) => {
        state.featurelist = state.featurelist.filter(
          (feature) => feature._id !== action.meta.arg
        );
      });
  },
});

export default commonSlice.reducer;
