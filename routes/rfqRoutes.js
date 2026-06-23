const express = require("express");
const router = express.Router();

const multer = require("multer");

const { createRFQ } = require("../controller/rfqController");


// ======================================
// FILE STORAGE CONFIG
// ======================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


// ======================================
// ROUTE
// ======================================

router.post(
  "/create-rfq",
  upload.array("files"),
  createRFQ
);

module.exports = router;