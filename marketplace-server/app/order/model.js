const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const orderSchema = new Schema(
  {
    or_amount: {
      type: Number,
      min: [1, "Order amount must be at least 1"],
      required: [true, "Order amount must be filled"],
    },
    or_pd_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Order", orderSchema);
