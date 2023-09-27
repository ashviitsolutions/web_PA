
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {},
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateInputData: (state, action) => {
      const { formName, inputData } = action.payload;
      if (!state.formData[formName]) {
        state.formData[formName] = [];
      }
      // Check if inputData already exists for the form and update it
      const index = state.formData[formName].findIndex(
        (item) => item.id === inputData.id
      );
      if (index !== -1) {
        state.formData[formName][index] = inputData;
      } else {
        state.formData[formName].push(inputData);
      }
    },
    removeInputData: (state, action) => {
      const { formName, inputDataId } = action.payload;
      if (state.formData[formName]) {
        state.formData[formName] = state.formData[formName].filter(
          (item) => item.id !== inputDataId
        );
      }
    },
    clearInputData: (state, action) => {
      const { formName } = action.payload;
      state.formData[formName] = [];
    },
  },
});

export const { updateInputData, removeInputData, clearInputData } =
  counterSlice.actions;
export default counterSlice.reducer;


















// // counterSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     inputData: [],
// };

// const counterSlice = createSlice({
//     name: 'counter',
//     initialState,
//     reducers: {
//         updateInputData: (state, action) => {
//             state.inputData.push(action.payload);
//         },
//         removeInputData: (state, action) => {
//             state.inputData = state.inputData.filter((item) => item !== action.payload); // Remove input data from the array
//         },
//         clearInputData: (state) => {
//             state.inputData = [];
//         },
//     },
// });

// export const { updateInputData } = counterSlice.actions;
// export default counterSlice.reducer;



