const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();


// ======================================
// MIDDLEWARE
// ======================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));


// ======================================
// DATABASE CONNECTION
// ======================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });


// ======================================
// ROUTES
// ======================================

const rfqRoutes = require("./routes/rfqRoutes");

app.use("/api/rfq", rfqRoutes);


// ======================================
// SERVER
// ======================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});