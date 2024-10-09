const Category = require("./model");
const Product = require("../product/model");
const Joi = require("joi");

const categorySchema = Joi.object({
  ct_code: Joi.string().min(3).max(20).required(),
  ct_name: Joi.string().min(3).max(20).required(),
});

const handleValidationError = (err, res) => {
  return res.status(400).json({
    success: false,
    message: err.details[0].message,
  });
};

const create = async (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) return handleValidationError(error, res);

  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const update = async (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) return handleValidationError(error, res);

  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const index = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const destroy = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const result = await Category.deleteOne({ _id: categoryId });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { create, index, update, destroy };
