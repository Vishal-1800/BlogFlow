const { z } = require("zod");

/**
 * Zod schema used to validate the request body when creating a blog post.
 * Every field mirrors the Mongoose schema constraints so validation
 * happens before hitting the database.
 */
const createPostSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(5, "Title must be at least 5 characters"),
  author: z
    .string({ required_error: "Author is required" })
    .min(1, "Author is required"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Please provide a valid email address"),
  category: z
    .string({ required_error: "Category is required" })
    .min(1, "Category is required"),
  tags: z.array(z.string()).optional().default([]),
  thumbnail: z.string().url("Thumbnail must be a valid URL").optional().or(z.literal("")),
  shortDescription: z
    .string({ required_error: "Short description is required" })
    .min(20, "Short description must be at least 20 characters"),
  content: z
    .string({ required_error: "Content is required" })
    .min(100, "Content must be at least 100 characters"),
  status: z.enum(["Draft", "Published"]).optional().default("Draft"),
});

/**
 * Zod schema used to validate the request body when updating a blog post.
 * All fields are optional so partial updates are allowed.
 */
const updatePostSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .optional(),
  author: z
    .string()
    .min(1, "Author is required")
    .optional(),
  email: z
    .string()
    .email("Please provide a valid email address")
    .optional(),
  category: z
    .string()
    .min(1, "Category is required")
    .optional(),
  tags: z.array(z.string()).optional(),
  thumbnail: z.string().url("Thumbnail must be a valid URL").optional().or(z.literal("")),
  shortDescription: z
    .string()
    .min(20, "Short description must be at least 20 characters")
    .optional(),
  content: z
    .string()
    .min(100, "Content must be at least 100 characters")
    .optional(),
  status: z.enum(["Draft", "Published"]).optional(),
});

/**
 * Express middleware factory that validates req.body against a Zod schema.
 * Returns 400 with field-level errors on failure, otherwise calls next().
 *
 * @param {z.ZodSchema} schema - The Zod schema to validate against
 * @returns {import("express").RequestHandler}
 */
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // Replace body with parsed (and coerced) data
  req.body = result.data;
  next();
};

module.exports = {
  createPostSchema,
  updatePostSchema,
  validate,
};
