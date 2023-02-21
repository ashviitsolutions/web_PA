import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchImage = createAsyncThunk('products/fetchImage', async (image) => {
  const res = await fetch(`http://45.13.132.197:4000/api/file/${image}`);
  const imageBlob = await res.blob();
  const imageurl = URL.createObjectURL(imageBlob);
  return imageurl;
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (id) => {
  const response = await fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`);
  const data = await response.json();
  return data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: [],
    isLoading: false,
    isError: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const selectData = (state) => state.product.data;
export const selectIsLoading = (state) => state.product.isLoading;
export const selectIsError = (state) => state.product.isError;

export default productSlice.reducer;
