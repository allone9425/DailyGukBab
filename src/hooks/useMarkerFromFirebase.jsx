import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { getPlaces, getPlacesWithSearchText } from '../api/places';

export default function useMarkerFromFirebase(searchAddress) {
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ['firebase/places', searchAddress],
    queryFn: () => (searchAddress ? getPlacesWithSearchText(searchAddress) : getPlaces()),
    staleTime: Infinity
  });

  return { markersFromFirebase: data, isLoadingFromFirebase: isLoading, isError, error, refetch };
}

export const MarkerFromFirebaseProvider = ({ children }) => {
  return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
};
