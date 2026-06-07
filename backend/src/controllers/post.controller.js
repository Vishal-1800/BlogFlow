const asyncHandler = require("../middlewares/asyncHandler");
const postService = require("../services/post.service");
const { exportPostsToCSV } = require("../utils/csvExport");

/**
 * @desc    Create a new blog post
 * @route   POST /api/posts
 */
const createPost = asyncHandler(async (req, res) => {
  const post = await postService.createPost(req.body);

  res.status(201).json({
    success: true,
    data: post,
    message: "Post created successfully",
  });
});

/**
 * @desc    Get all posts (paginated, filterable)
 * @route   GET /api/posts?page=1&limit=10&category=&status=
 */
const getAllPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const { category, status } = req.query;

  const result = await postService.getAllPosts({ page, limit, category, status });

  res.status(200).json({
    success: true,
    data: result.posts,
    message: "Posts retrieved successfully",
    pagination: result.pagination,
  });
});

/**
 * @desc    Search posts by title, author, or category
 * @route   GET /api/posts/search?query=react&page=1&limit=10
 */
const searchPosts = asyncHandler(async (req, res) => {
  const { query } = req.query;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  if (!query || !query.trim()) {
    return res.status(400).json({
      success: false,
      message: "Search query is required",
    });
  }

  const result = await postService.searchPosts({ query: query.trim(), page, limit });

  res.status(200).json({
    success: true,
    data: result.posts,
    message: "Search results retrieved successfully",
    pagination: result.pagination,
  });
});

/**
 * @desc    Get a single post by ID
 * @route   GET /api/posts/:id
 */
const getPostById = asyncHandler(async (req, res) => {
  const post = await postService.getPostById(req.params.id);

  res.status(200).json({
    success: true,
    data: post,
    message: "Post retrieved successfully",
  });
});

/**
 * @desc    Update a post by ID
 * @route   PUT /api/posts/:id
 */
const updatePost = asyncHandler(async (req, res) => {
  const post = await postService.updatePost(req.params.id, req.body);

  res.status(200).json({
    success: true,
    data: post,
    message: "Post updated successfully",
  });
});

/**
 * @desc    Delete a post by ID
 * @route   DELETE /api/posts/:id
 */
const deletePost = asyncHandler(async (req, res) => {
  await postService.deletePost(req.params.id);

  res.status(200).json({
    success: true,
    data: null,
    message: "Post deleted successfully",
  });
});

/**
 * @desc    Export posts as CSV (filterable)
 * @route   GET /api/posts/export?category=&status=
 */
const exportPosts = asyncHandler(async (req, res) => {
  const { category, status } = req.query;
  const posts = await postService.getPostsForExport({ category, status });

  if (posts.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No posts found for the given filters",
    });
  }

  const csv = exportPostsToCSV(posts);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=posts.csv");
  res.status(200).send(csv);
});

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/posts/stats
 */
const getStats = asyncHandler(async (req, res) => {
  const stats = await postService.getStats();

  res.status(200).json({
    success: true,
    data: stats,
    message: "Statistics retrieved successfully",
  });
});

module.exports = {
  createPost,
  getAllPosts,
  searchPosts,
  getPostById,
  updatePost,
  deletePost,
  exportPosts,
  getStats,
};
