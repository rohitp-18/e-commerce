const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary").v2;

dotenv.config({ path: path.resolve(__dirname, "config/.env") }); // for development

const mongodb = require("./config/mongodb");
const error = require("./middlewares/error");

const userRoute = require("./routers/userRouter");
const productRoute = require("./routers/productRouter");
const orderRoute = require("./routers/orderRouter");
const viewRoute = require("./routers/viewRouter");
const advertRoute = require("./routers/advertisementRouter");
const searchRoute = require("./routers/searchRouter");

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
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // for development
// for deployment
// app.use(express.static(path.resolve(path.join(__dirname, "../front/build"))));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/advert", advertRoute);
app.use("/api/v1/view", viewRoute);
app.use("/api/v1/search", searchRoute);

// for deployment
// app.get("*", (req, res, next) => {
//   res.sendFile(path.resolve(path.join(__dirname, "../front/build/index.html")));
// });

app.use(error);
app.listen(port, () => {
  console.log("service started");
});
