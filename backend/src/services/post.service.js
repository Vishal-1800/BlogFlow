const Post = require("../models/Post.model");
const AppError = require("../utils/AppError");

/**
 * Service layer for Blog Post CRUD operations.
 * Keeps business logic separate from controllers.
 */

/**
 * Create a new blog post.
 * @param {Object} data - Validated post data
 * @returns {Promise<Object>} Created post document
 */
const createPost = async (data) => {
  const post = await Post.create(data);
  return post;
};

/**
 * Get all posts with pagination and optional filters.
 * @param {Object} options
 * @param {number} options.page - Current page (1-based)
 * @param {number} options.limit - Items per page
 * @param {string} [options.category] - Filter by category
 * @param {string} [options.status] - Filter by status
 * @returns {Promise<{posts: Object[], pagination: Object}>}
 */
const getAllPosts = async ({ page = 1, limit = 10, category, status }) => {
  const filter = {};
  if (category) filter.category = category;
  if (status) filter.status = status;

  const skip = (page - 1) * limit;
  const total = await Post.countDocuments(filter);

  const posts = await Post.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Search posts by title, author, or category using MongoDB text index.
 * Falls back to regex search when the text index yields no results.
 * @param {Object} options
 * @param {string} options.query - Search term
 * @param {number} options.page
 * @param {number} options.limit
 * @returns {Promise<{posts: Object[], pagination: Object}>}
 */
const searchPosts = async ({ query, page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  // Try text-index search first
  let filter = { $text: { $search: query } };
  let total = await Post.countDocuments(filter);

  // Fallback to regex if text search finds nothing
  if (total === 0) {
    const regex = new RegExp(query, "i");
    filter = {
      $or: [
        { title: { $regex: regex } },
        { author: { $regex: regex } },
        { category: { $regex: regex } },
      ],
    };
    total = await Post.countDocuments(filter);
  }

  const posts = await Post.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get a single post by its ID.
 * @param {string} id - Mongoose ObjectId
 * @returns {Promise<Object>} Post document
 * @throws {AppError} 404 if not found
 */
const getPostById = async (id) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  return post;
};

/**
 * Update a post by ID.
 * @param {string} id - Mongoose ObjectId
 * @param {Object} data - Fields to update
 * @returns {Promise<Object>} Updated post document
 * @throws {AppError} 404 if not found
 */
const updatePost = async (id, data) => {
  const post = await Post.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  return post;
};

/**
 * Delete a post by ID.
 * @param {string} id - Mongoose ObjectId
 * @returns {Promise<Object>} Deleted post document
 * @throws {AppError} 404 if not found
 */
const deletePost = async (id) => {
  const post = await Post.findByIdAndDelete(id);
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  return post;
};

/**
 * Get posts for CSV export with optional filters (no pagination).
 * @param {Object} [filters]
 * @param {string} [filters.category]
 * @param {string} [filters.status]
 * @returns {Promise<Object[]>}
 */
const getPostsForExport = async ({ category, status } = {}) => {
  const filter = {};
  if (category) filter.category = category;
  if (status) filter.status = status;

  const posts = await Post.find(filter).sort({ createdAt: -1 }).lean();
  return posts;
};

/**
 * Compute dashboard statistics.
 * @returns {Promise<Object>} Stats object
 */
const getStats = async () => {
  const total = await Post.countDocuments();
  const published = await Post.countDocuments({ status: "Published" });
  const draft = await Post.countDocuments({ status: "Draft" });

  const categoriesAgg = await Post.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const categories = categoriesAgg.map((c) => ({
    category: c._id,
    count: c.count,
  }));

  return {
    total,
    published,
    draft,
    categoriesCount: categories.length,
    categories,
  };
};

module.exports = {
  createPost,
  getAllPosts,
  searchPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsForExport,
  getStats,
};
