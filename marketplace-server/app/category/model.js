const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const categorySchema = Schema({
  ct_code: {
    type: String,
    minLength: [3, "Code must be at least 3 characters long"],
    maxLength: [20, "Code must not exceed 20 characters"],
    required: [true, "Category Code must be filled"],
  },
  ct_name: {
    type: String,
    minLength: [3, "Category Name must be at least 3 characters long"],
    maxLength: [20, "Category Name must not exceed 20 characters"],
    required: [true, "Category name must be filled"],
  },
});

module.exports = model("Category", categorySchema);
