const { Parser } = require("json2csv");

/**
 * Converts an array of post documents into a CSV string.
 *
 * @param {Array<Object>} posts - Array of post objects (plain JS or Mongoose docs)
 * @returns {string} CSV-formatted string
 */
const exportPostsToCSV = (posts) => {
  const fields = [
    { label: "ID", value: "_id" },
    { label: "Title", value: "title" },
    { label: "Author", value: "author" },
    { label: "Email", value: "email" },
    { label: "Category", value: "category" },
    { label: "Tags", value: (row) => (row.tags || []).join("; ") },
    { label: "Short Description", value: "shortDescription" },
    { label: "Status", value: "status" },
    { label: "Created At", value: "createdAt" },
    { label: "Updated At", value: "updatedAt" },
  ];

  const parser = new Parser({ fields });
  return parser.parse(posts);
};

module.exports = { exportPostsToCSV };
