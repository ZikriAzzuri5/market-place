const Category = require("./model");
const Joi = require("joi");

const categorySchema = Joi.object({
  ct_code: Joi.string().min(3).max(20).required(),
  ct_name: Joi.string().min(3).max(20).required(),
});

// Helper function to handle validation errors
const handleValidationError = (err, res) => {
  return res.status(400).json({
    success: false,
    message: err.details[0].message, // Mengambil pesan error dari Joi
  });
};

// Create Category
const create = async (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) return handleValidationError(error, res);

  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
};

// Update Category
const update = async (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) return handleValidationError(error, res);

  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    category
      ? res.status(200).json({ success: true, data: category })
      : res.status(404).json({ success: false, message: "Category not found" });
  } catch (err) {
    next(err);
  }
};

// Get Categories
// const index = async (req, res, next) => {
//   try {
//     const { skip = 0, limit = 10 } = req.query;
//     const categories = await Category.find()
//       .skip(parseInt(skip))
//       .limit(parseInt(limit));
//     res.status(200).json({ success: true, data: categories });
//   } catch (err) {
//     next(err);
//   }
// };

// const index = async (req, res, next) => {
//   try {
//     const { skip = 0, limit = 10 } = req.query;
//     const categories = await Category.find()
//       .skip(parseInt(skip))
//       .limit(parseInt(limit));

//     res.status(200).json({ success: true, data: categories });
//   } catch (err) {
//     console.error("Error fetching categories:", err); // Tampilkan error di console
//     next(err); // Kirim error ke error handler
//   }
// };

const index = async (req, res, next) => {
  console.log("Fetching categories...");
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    console.error("Error fetching categories:", err);
    next(err);
  }
};

// Delete Category
const destroy = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    category
      ? res.status(200).json({ success: true, data: category })
      : res.status(404).json({ success: false, message: "Category not found" });
  } catch (err) {
    next(err);
  }
};

module.exports = { create, index, update, destroy };
