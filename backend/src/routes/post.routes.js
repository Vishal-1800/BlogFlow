const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const {
  createPostSchema,
  updatePostSchema,
  validate,
} = require("../validations/post.validation");

/**
 * Blog Post Routes
 *
 * NOTE: Static routes (/search, /export, /stats) MUST be defined
 * BEFORE the dynamic /:id route, otherwise Express will try to
 * match "search", "export", or "stats" as an id parameter.
 */

// --- Static routes ---
router.get("/search", postController.searchPosts);
router.get("/export", postController.exportPosts);
router.get("/stats", postController.getStats);

// --- CRUD routes ---
router
  .route("/")
  .post(validate(createPostSchema), postController.createPost)
  .get(postController.getAllPosts);

router
  .route("/:id")
  .get(postController.getPostById)
  .put(validate(updatePostSchema), postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
