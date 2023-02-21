const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const productSlice = createSlice({
    name: 'product',
    item: 'products',
    initialState: {
        data: [],
        data1: [],
        status: STATUSES.IDLE,
    },
   
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });

            
    },

    extraReducers1: (builder) => {
      builder
          .addCase(fetchImage.pending, (state, action) => {
              state.status = STATUSES.LOADING;
          })
          .addCase(fetchImage.fulfilled, (state, action) => {
              state.data = action.payload;
              state.status = STATUSES.IDLE;
          })
          .addCase(fetchImage.rejected, (state, action) => {
              state.status = STATUSES.ERROR;
          });

          
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

// Thunks
export const fetchImage = createAsyncThunk('products/fetch', async (image) => {
  const res = await fetch(`http://45.13.132.197:4000/api/file/${image}`);
  const imageBlob = await res.blob();
  const imageurl = URL.createObjectURL(imageBlob);
  return imageurl;
});




export const fetchProducts = createAsyncThunk('products/fetch', async (id) => {
  const response = await  fetch(`http://45.13.132.197:4000/api/post/fetch/${id}`);
  const data = await response.json();
  return data ;
});






    
   



