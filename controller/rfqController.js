const RFQ = require("../model/RFQModel");

const sendRFQMail = require("../services/sendMail");

const createRFQ = async (req, res) => {
  try {

    const {
      companyName,
      contactPerson,
      businessEmail,
      phoneNumber,
      projectName,
      description,
    } = req.body;

    const uploadedFiles = req.files
      ? req.files.map((file) => file.filename)
      : [];

    const newRFQ = new RFQ({
      companyName,
      contactPerson,
      businessEmail,
      phoneNumber,
      projectName,
      description,
      files: uploadedFiles,
    });

    await newRFQ.save();


    // =========================================
    // SEND EMAIL
    // =========================================

    await sendRFQMail(req.body, req.files);


    res.status(201).json({
      success: true,
      message: "RFQ Submitted Successfully",
      data: newRFQ,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createRFQ,
};