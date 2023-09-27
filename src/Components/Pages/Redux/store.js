// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'; // Import your slice reducer

const store = configureStore({
  reducer: {
    counter: counterReducer, // Add other slice reducers here if needed
  },
  // other store configuration options
});

export default store;
