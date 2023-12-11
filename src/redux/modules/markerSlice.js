import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  markers: [],
  hoveredMarkerId: '',
  selectedMarker: {}
};

const markerSlice = createSlice({
  name: 'marker',
  initialState,
  reducers: {
    setMarkers: (state, action) => {
      state.markers = [...action.payload];
    },
    setHoveredMarker: (state, action) => {
      state.hoveredMarkerId = action.payload;
    },
    setSelectedMarker: (state, action) => {
      const { markers, id } = action.payload;
      const marker = markers.find((item) => item?.id === id);
      state.selectedMarker = marker;
      localStorage.setItem('selectedMarker', JSON.stringify(marker));
    }
  }
});

export const { setMarkers, setHoveredMarker, setSelectedMarker } = markerSlice.actions;
export default markerSlice.reducer;
