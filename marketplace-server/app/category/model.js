const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const Product = require("../product/model");

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

categorySchema.pre(
  "remove",
  { document: true, query: false },
  async function (next) {
    try {
      await Product.deleteMany({ pd_ct_id: this._id });
      next();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = model("Category", categorySchema);
