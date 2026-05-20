import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Skool" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ EMAIL SENT SUCCESSFULLY:");

    return info;
  } catch (error) {
    console.error("❌ EMAIL SEND ERROR:");
    console.error("Message:", error.message);
    console.error("Full Error:", error);

    // optional: rethrow so backend also knows it failed
    throw error;
  }
};

export default sendEmail;
