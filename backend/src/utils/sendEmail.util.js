import nodemailer from "nodemailer";
import dns from "dns";

// ✅ Force IPv4 (IMPORTANT for Render / VPS)
dns.setDefaultResultOrder("ipv4first");

const sendEmail = async ({ to, subject, html }) => {
  try {
    // ✅ Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // ✅ better than 465 on cloud servers
      secure: false, // ❗ must be false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // helps in production SSL issues
      },
    });

    // Optional: verify connection (good for debugging)
    await transporter.verify();

    // ✅ Send mail
    const info = await transporter.sendMail({
      from: `"Skool" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ EMAIL SENT SUCCESSFULLY:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ EMAIL SEND ERROR:");
    console.error("Message:", error.message);
    console.error("Code:", error.code);

    throw new Error("Email could not be sent");
  }
};

export default sendEmail;

// import nodemailer from "nodemailer";
// const sendEmail = async ({ to, subject, html }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true, // SSL
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: `"Skool" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });

//     console.log("✅ EMAIL SENT SUCCESSFULLY:");

//     return info;
//   } catch (error) {
//     console.error("❌ EMAIL SEND ERROR:");
//     console.error("Message:", error.message);
//     console.error("Full Error:", error);

//     // optional: rethrow so backend also knows it failed
//     throw error;
//   }
// };

// export default sendEmail;
