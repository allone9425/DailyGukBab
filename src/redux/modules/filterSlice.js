import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFiltered: false,
  filter: ''
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setIsFiltered: (state, action) => {
      state.isFiltered = action.payload;
      console.log('from slice : ', action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const { setIsFiltered, setFilter } = filterSlice.actions;
export default filterSlice.reducer;
