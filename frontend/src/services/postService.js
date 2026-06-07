import api from '@/lib/axios';

/**
 * Service layer for all blog post API operations.
 * All methods unwrap the backend response envelope { success, data, message, pagination }
 * and return the relevant data directly.
 */
const postService = {
  /**
   * Fetch paginated posts with optional filters.
   * @returns {Promise<{ posts: Array, pagination: object }>}
   */
  getPosts: async ({ page = 1, limit = 10, category = '', status = '' } = {}) => {
    const { data: res } = await api.get('/posts', {
      params: { page, limit, category, status },
    });
    // Backend returns { success, data: [...posts], pagination: {...} }
    return {
      posts: res.data,
      pagination: res.pagination,
    };
  },

  /**
   * Search posts by query string.
   * @returns {Promise<{ posts: Array, pagination: object }>}
   */
  searchPosts: async ({ query, page = 1, limit = 10 }) => {
    const { data: res } = await api.get('/posts/search', {
      params: { query, page, limit },
    });
    return {
      posts: res.data,
      pagination: res.pagination,
    };
  },

  /**
   * Get a single post by ID.
   * @param {string} id - Post ID
   * @returns {Promise<object>} Post object
   */
  getPost: async (id) => {
    const { data: res } = await api.get(`/posts/${id}`);
    // Backend returns { success, data: {post} }
    return res.data;
  },

  /**
   * Create a new post.
   * @param {object} postData - Post fields
   * @returns {Promise<object>} Created post
   */
  createPost: async (postData) => {
    const { data: res } = await api.post('/posts', postData);
    return res.data;
  },

  /**
   * Update an existing post.
   * @param {string} id - Post ID
   * @param {object} postData - Updated fields
   * @returns {Promise<object>} Updated post
   */
  updatePost: async (id, postData) => {
    const { data: res } = await api.put(`/posts/${id}`, postData);
    return res.data;
  },

  /**
   * Delete a post.
   * @param {string} id - Post ID
   * @returns {Promise<object>} Deletion confirmation
   */
  deletePost: async (id) => {
    const { data: res } = await api.delete(`/posts/${id}`);
    return res.data;
  },

  /**
   * Get dashboard statistics.
   * @returns {Promise<{ total: number, published: number, draft: number, categories: number }>}
   */
  getStats: async () => {
    const { data: res } = await api.get('/posts/stats');
    // Backend returns { success, data: { total, published, draft, categories } }
    return res.data;
  },

  /**
   * Export posts as CSV (opens download in new tab).
   * @param {object} params
   * @param {string} [params.category]
   * @param {string} [params.status]
   */
  exportCSV: async ({ category = '', status = '' } = {}) => {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (status) params.append('status', status);
    const url = `${baseURL}/posts/export?${params.toString()}`;
    window.open(url, '_blank');
  },
};

export default postService;
