import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../modules/filterSlice';
import markerReducer from '../modules/markerSlice';
import searchReducer from '../modules/searchSlice';

const store = configureStore({
  reducer: {
    marker: markerReducer,
    search: searchReducer,
    filter: filterReducer
  }
});

export default store;
