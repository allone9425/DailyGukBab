import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchAddress: '',
  searchResult: []
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchAddress: (state, action) => {
      state.searchAddress = action.payload;
      console.log(action.payload);
    },
    setSearchResult: (state, action) => {
      state.searchResult = [...action.payload];
    }
  }
});

export const { setSearchAddress, setSearchText, setSearchResult } = searchSlice.actions;
export default searchSlice.reducer;
