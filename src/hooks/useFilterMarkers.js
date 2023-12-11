import { markersFilteredByLocation, markersFilteredByVote } from '../data/filterArrays';

function useFilterMarkers(markers, filter) {
  let filteredMarkers = [];

  switch (filter) {
    case '평점':
      filteredMarkers = filterByVote(markersFilteredByVote, markers);
      break;
    case '지역':
      filteredMarkers = filterByLocation(markersFilteredByLocation, markers);
      break;
    default:
      filteredMarkers = [...markers];
      break;
  }

  return { filteredMarkers };
}

export default useFilterMarkers;

const filterByVote = (filterArray, markers) => {
  markers.forEach((marker) => {
    for (let i = 0; i < filterArray.length; i++) {
      if (marker.vote <= filterArray[i].vote && marker.vote > filterArray[i + 1].vote)
        filterArray[i].places.push({ ...marker });
    }
  });
  return filterArray;
};

const filterByLocation = (filterArray, markers) => {
  markers.forEach((marker) => {
    for (let i = 0; i < filterArray.length; i++) {
      if (marker.road_address_name.slice(0, 2) === filterArray[i].location) filterArray[i].places.push({ ...marker });
    }
  });
  return filterArray;
};
