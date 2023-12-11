import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';

export default function useMarkerFromKaKao({ kakao, searchAddress }) {
  //
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ['kakao/places', { kakao, searchAddress }],
    queryFn: fetchMarkerByAddress,
    staleTime: Infinity,
    enabled: false
  });
  const queryClient = useQueryClient();

  /* const {fetchMarkerFromKaKao: mutate} = useMutation({mutationFn: () => {}, onSuccess:() => {
    queryClient.invalidateQueries('kakao/places');
  }}); */

  return { markersFromKaKao: data, isLoadingFromKakao: isLoading, isError, error, refetch };
}

export const MarkerFromKakaoProvider = ({ children }) => {
  return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
};

const fetchMarkerByAddress = async ({ queryKey }) => {
  const [_key, { kakao, searchAddress }] = queryKey;
  return new Promise((resolve, reject) => {
    const placeSearchInstance = new kakao.maps.services.Places();
    const searchCallBackFunc = function (data, status) {
      if (status === kakao.maps.services.Status.OK) {
        resolve(data);
      } else {
        reject(new Error('Failed to fetch data'));
      }
    };
    placeSearchInstance.keywordSearch(searchAddress, searchCallBackFunc);
  });
};
