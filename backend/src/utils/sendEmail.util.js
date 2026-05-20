import nodemailer from "nodemailer";
import dns from "dns";

// FORCE IPV4
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  family: 4, // IMPORTANT

  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.verify();

    console.log("SMTP READY");

    const info = await transporter.sendMail({
      from: `"Skool" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email Sent:", info.response);

    return {
      success: true,
      info,
    };
  } catch (error) {
    console.log("EMAIL SEND ERROR:", error);

    return {
      success: false,
      error,
    };
  }
};

export default sendEmail;
