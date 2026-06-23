const nodemailer = require("nodemailer");

const sendRFQMail = async (rfqData, files = []) => {
  try {

    // =========================================
    // TRANSPORTER
    // =========================================

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",

    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

    const transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();

    console.log("SMTP Connected");

    // const transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

    // console.log(process.env.EMAIL_USER);
    // console.log(process.env.EMAIL_PASS);

    // const transporter = nodemailer.createTransport({
    //   host: "142.250.141.108",
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

    // try {
    //   await transporter.verify();
    //   console.log("SMTP VERIFIED");
    // } catch (err) {
    //   console.error("VERIFY ERROR:", err);
    // }


    // =========================================
    // ATTACHMENTS
    // =========================================

    const attachments = files.map((file) => ({
      filename: file.originalname,
      path: file.path,
    }));


    // =========================================
    // EMAIL HTML
    // =========================================

    const htmlContent = `
      <div style="font-family: Arial; padding: 20px;">
        <h2>New RFQ Submission</h2>

        <p><strong>Company Name:</strong> ${rfqData.companyName}</p>

        <p><strong>Contact Person:</strong> ${rfqData.contactPerson}</p>

        <p><strong>Business Email:</strong> ${rfqData.businessEmail}</p>

        <p><strong>Phone Number:</strong> ${rfqData.phoneNumber}</p>

        <p><strong>Project Name:</strong> ${rfqData.projectName}</p>

        <p><strong>Description:</strong></p>

        <p>${rfqData.description}</p>
      </div>
    `;


    // =========================================
    // SEND MAIL
    // =========================================

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: "sajindushamalka@gmail.com",

      subject: "New RFQ Submission",

      html: htmlContent,

      attachments: attachments,
    });

    console.log("Email Sent Successfully");

  } catch (error) {

    console.log("Email Error:", error);

  }
};

module.exports = sendRFQMail;