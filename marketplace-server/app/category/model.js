const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const categorySchema = new Schema(
  {
    ct_code: {
      type: String,
      minLength: [3, "Category Code must be at least 3 characters long"],
      maxLength: [20, "Category Code must not exceed 20 characters"],
      required: [true, "Category Code must be filled"],
    },
    ct_name: {
      type: String,
      minLength: [3, "Category Name must be at least 3 characters long"],
      maxLength: [20, "Category Name must not exceed 20 characters"],
      required: [true, "Category name must be filled"],
    },
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
