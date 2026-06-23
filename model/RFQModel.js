const mongoose = require("mongoose");

const RFQSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },

    contactPerson: {
      type: String,
      required: true,
    },

    businessEmail: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    projectName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    files: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RFQ", RFQSchema);