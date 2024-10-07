const Order = require("./model");
const Product = require("../product/model");
const Joi = require("joi");

const orderSchema = Joi.object({
  or_amount: Joi.number().min(1).required(),
  or_pd_id: Joi.string().required(),
});

const handleValidationError = (err, res) => {
  return res.status(400).json({
    success: false,
    message: err.details.map((e) => e.message).join(", "),
  });
};

const create = async (req, res, next) => {
  const { error } = orderSchema.validate(req.body);
  if (error) return handleValidationError(error, res);

  try {
    const order = await Order.create(req.body);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const update = async (req, res, next) => {
  const { error } = orderSchema.validate(req.body);
  if (error) return handleValidationError(error, res);

  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const index = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("or_pd_id");
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const destroy = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { create, index, update, destroy };
