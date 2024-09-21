const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const expressFileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

dotenv.config({ path: path.resolve(__dirname, "config/.env") });

const mongodb = require("./config/mongodb");
const error = require("./middlewares/error");

const userRoute = require("./routers/userRouter");
const productRoute = require("./routers/productRouter");
const orderRoute = require("./routers/orderRouter");

const app = express();
mongodb();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressFileUpload());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(express.static(path.resolve(path.join(__dirname, "../front/build"))));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);

// app.get("*", (req, res, next) => {
//   res.sendFile(path.resolve(path.join(__dirname, "../front/build/index.html")));
// });

app.use(error);
app.listen(port);
