import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import postService from '@/services/postService';
import { QUERY_KEYS } from '@/constants';
import { toast } from 'sonner';

/**
 * Hook to fetch paginated posts with optional filters.
 * @param {object} params
 * @param {number} [params.page=1]
 * @param {number} [params.limit=10]
 * @param {string} [params.category]
 * @param {string} [params.status]
 * @returns {import('@tanstack/react-query').UseQueryResult}
 */
export function usePosts({ page = 1, limit = 10, category = '', status = '' } = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.posts, { page, limit, category, status }],
    queryFn: () => postService.getPosts({ page, limit, category, status }),
    keepPreviousData: true,
  });
}

/**
 * Hook to search posts by query.
 * @param {object} params
 * @param {string} params.query
 * @param {number} [params.page=1]
 * @param {number} [params.limit=10]
 * @returns {import('@tanstack/react-query').UseQueryResult}
 */
export function useSearchPosts({ query, page = 1, limit = 10 }) {
  return useQuery({
    queryKey: [QUERY_KEYS.search, { query, page, limit }],
    queryFn: () => postService.searchPosts({ query, page, limit }),
    enabled: !!query && query.length > 0,
    keepPreviousData: true,
  });
}

/**
 * Hook to fetch a single post by ID.
 * @param {string} id - Post ID
 * @returns {import('@tanstack/react-query').UseQueryResult}
 */
export function usePost(id) {
  return useQuery({
    queryKey: [QUERY_KEYS.post, id],
    queryFn: () => postService.getPost(id),
    enabled: !!id,
  });
}

/**
 * Hook to fetch dashboard stats.
 * @returns {import('@tanstack/react-query').UseQueryResult}
 */
export function useStats() {
  return useQuery({
    queryKey: [QUERY_KEYS.stats],
    queryFn: postService.getStats,
  });
}

/**
 * Hook for creating a post with cache invalidation.
 * @returns {import('@tanstack/react-query').UseMutationResult}
 */
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.posts] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.stats] });
      toast.success('Post created successfully!');
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || 'Failed to create post. Please try again.'
      );
    },
  });
}

/**
 * Hook for updating a post with cache invalidation.
 * @returns {import('@tanstack/react-query').UseMutationResult}
 */
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => postService.updatePost(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.posts] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.post, variables.id] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.stats] });
      toast.success('Post updated successfully!');
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || 'Failed to update post. Please try again.'
      );
    },
  });
}

/**
 * Hook for deleting a post with cache invalidation.
 * @returns {import('@tanstack/react-query').UseMutationResult}
 */
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.posts] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.stats] });
      toast.success('Post deleted successfully!');
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || 'Failed to delete post. Please try again.'
      );
    },
  });
}
