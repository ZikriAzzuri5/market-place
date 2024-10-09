const User = require("../user/model");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const registerSchema = Joi.object({
  us_name: Joi.string().min(3).max(20).required(),
  us_password: Joi.string().min(3).max(20).required(),
  us_email: Joi.string().email().required(),
  us_phone_number: Joi.string().min(1).required(),
  us_address: Joi.string().min(3).max(100).required(),
});

const loginSchema = Joi.object({
  us_password: Joi.string().min(3).max(20).required(),
  us_email: Joi.string().email().required(),
});

const handleValidationError = (err, res) => {
  return res.status(400).json({
    success: false,
    message: err.details.map((e) => e.message).join(", "),
  });
};

const login = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return handleValidationError(error, res);

  const { us_email, us_password } = req.body;
  const user = await User.findOne({ us_email });

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(us_password, user.us_password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
  const token = jwt.sign({ id: user._id }, config.secretKey, {
    expiresIn: "1h",
  });

  res.status(200).json({ success: true, token });
};

const register = async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return handleValidationError(error, res);

  const { us_password, ...rest } = req.body;
  const hashedPassword = await bcrypt.hash(us_password, 10);

  try {
    const user = await User.create({ ...rest, us_password: hashedPassword });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { register, login };
