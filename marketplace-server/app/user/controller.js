const User = require("./model");
const Joi = require("joi");

const userSchema = Joi.object({
  us_name: Joi.string().min(3).max(20).required(),
  us_password: Joi.string().min(3).max(20).required(),
  us_email: Joi.string().email().required(),
  us_phone_number: Joi.string().min(1).required(),
  us_address: Joi.string().min(3).max(100).required(),
});

const handleValidationError = (err, res) => {
  return res.status(400).json({
    success: false,
    message: err.details.map((e) => e.message).join(", "),
  });
};

const create = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return handleValidationError(error, res);

  try {
    const existingUser = await User.findOne({ us_email: req.body.us_email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const update = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return handleValidationError(error, res);

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const index = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const destroy = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { create, index, update, destroy };
