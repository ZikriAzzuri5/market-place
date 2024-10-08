const Product = require("./model");
const Order = require("../order/model");

const Joi = require("joi");

const productSchema = Joi.object({
  pd_code: Joi.string().min(3).max(20).required(),
  pd_name: Joi.string().min(3).max(20).required(),
  pd_price: Joi.number().min(1).required(),
  pd_ct_id: Joi.string().required(),
});

const handleValidationError = (err, res) => {
  return res.status(400).json({
    success: false,
    message: err.details.map((e) => e.message).join(", "),
  });
};

const create = async (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) return handleValidationError(error, res);

  try {
    const product = await Product.create(req.body);

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const update = async (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) return handleValidationError(error, res);

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const index = async (req, res, next) => {
  try {
    const products = await Product.find().populate("pd_ct_id");
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const destroy = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    await product.remove();
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { create, index, update, destroy };
