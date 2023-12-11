import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { getComments } from '../api/comments';

export default function useComments(postId) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['firebase/comments'],
    queryFn: () => getComments(postId),
    staleTime: 0
  });

  return { data, isLoading, isError, error };
}

export const CommentsProvider = ({ children }) => {
  return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
};
