var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const categoryRoute = require("./app/category/routes");
const productRoute = require("./app/product/routes");
const authRoute = require("./app/auth/routes");
const orderRoute = require("./app/order/routes");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const corsOptions = {
  origin: "https://marketplace-portofolio-zikri.web.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/auth", authRoute);
app.use("/api", orderRoute);

app.use("/", function (req, res, next) {
  res.render("index", {
    title: "Market Place server",
  });
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // Set response untuk error
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render error page di pug
  res.status(err.status || 500);
  res.render("error");
});

// Jika ingin mengirim JSON saat error (ini bisa menggantikan yang di atas jika Anda ingin JSON response)
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    // Menampilkan stack error di development mode
    ...(req.app.get("env") === "development" && { stack: err.stack }),
  });
});

module.exports = app;
