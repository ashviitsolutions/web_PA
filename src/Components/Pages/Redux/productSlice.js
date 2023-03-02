import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchImage = createAsyncThunk('products/fetchImage', async (image) => {
  const res = await fetch(`http://45.13.132.197:4000/api/file/${image}`);
  const imageBlob = await res.blob();
  const imageurl = URL.createObjectURL(imageBlob);
  return { id: image, url: imageurl };
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
    images: {},
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
      })
      .addCase(fetchImage.fulfilled, (state, action) => {
        state.images[action.payload.id] = action.payload.url;
      });
  },
});

export const selectData = (state) => state.product.data;
export const selectImage = (state, id) => state.product.images[id];
export const selectIsLoading = (state) => state.product.isLoading;
export const selectIsError = (state) => state.product.isError;

export default productSlice.reducer;
