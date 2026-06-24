const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");


// const dns = require("dns");
// dns.setDefaultResultOrder("ipv4first");


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
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running successfully",
    timestamp: new Date(),
  });
});

app.get("/api/test-email", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "sajindushamalka@gmail.com", // change if needed
      subject: "Railway Email Test",
      html: `
        <h2>Email Test Successful 🎉</h2>
        <p>Your Railway backend can send emails.</p>
        <p>Time: ${new Date().toISOString()}</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Email Error:", error);

    res.status(500).json({
      success: false,
      message: "Email sending failed",
      error: error.message,
    });
  }
});

// ======================================
// SERVER
// ======================================

const PORT = process.env.PORT || 5000;

app.listen(PORT,"0.0.0.0", () => {
  console.log(`Server Running On Port ${PORT}`);
});