const mongoose = require("mongoose");

/**
 * Mongoose schema for a Blog Post.
 *
 * Fields:
 *  - title          (String, required, minlength 5)
 *  - author         (String, required)
 *  - email          (String, validated via regex)
 *  - category       (String, required)
 *  - tags           ([String])
 *  - thumbnail      (String, valid URL)
 *  - shortDescription (String, minlength 20)
 *  - content        (String, minlength 100)
 *  - status         ("Draft" | "Published", default "Draft")
 *
 * Timestamps (createdAt, updatedAt) are auto-managed by Mongoose.
 */
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title must be at least 5 characters"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    shortDescription: {
      type: String,
      minlength: [20, "Short description must be at least 20 characters"],
      trim: true,
    },
    content: {
      type: String,
      minlength: [100, "Content must be at least 100 characters"],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["Draft", "Published"],
        message: "Status must be either Draft or Published",
      },
      default: "Draft",
    },
  },
  {
    timestamps: true,
  }
);

/** Text index on title, author, and category for search queries */
postSchema.index({ title: "text", author: "text", category: "text" });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
