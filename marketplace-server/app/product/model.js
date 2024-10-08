const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const Order = require("../order/model");

const productSchema = new Schema(
  {
    pd_code: {
      type: String,
      minLength: [3, "Product Code must be at least 3 characters long"],
      maxLength: [20, "Product Code must not exceed 20 characters"],
      required: [true, "Product Code must be filled"],
    },
    pd_name: {
      type: String,
      minLength: [3, "Product Name must be at least 3 characters long"],
      maxLength: [20, "Product Name must not exceed 20 characters"],
      required: [true, "Product name must be filled"],
    },
    pd_price: {
      type: Number,
      min: [1, "Product Price must be at least 1"],
      required: [true, "Product Price must be filled"],
    },
    pd_ct_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function (next) {
    try {
      const productId = this.getFilter()["_id"];

      await Order.deleteMany({ or_pd_id: productId });

      next();
    } catch (err) {
      console.error("Error in pre deleteOne middleware:", err);
      next(err);
    }
  }
);
module.exports = model("Product", productSchema);
