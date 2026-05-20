import sendEmail from "../../utils/sendEmail.util.js";

export const sendOtpEmail = async (
  email,
  otp,
  subject = "Verify Your Email",
) => {
  try {
    await sendEmail({
      to: email,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          
          <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; padding: 20px; text-align: center;">
            
            <h2 style="color: #333;">🔐 Email Verification</h2>
            
            <p style="color: #555;">
              Use the OTP below to verify your email address
            </p>
            
            <div style="margin: 20px 0; padding: 15px; background: #f0f8ff; border-radius: 8px;">
              <h1 style="letter-spacing: 5px; color: #007bff;">
                ${otp}
              </h1>
            </div>
            
            <p style="color: #888;">
              ⏳ This OTP is valid for <b>5 minutes</b>
            </p>
            
            <hr style="margin: 20px 0;" />
            
            <p style="font-size: 12px; color: #aaa;">
              If you didn’t request this, you can safely ignore this email.
            </p>
          
          </div>
          
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.log("OTP EMAIL ERROR :", error);

    throw {
      field: "email",
      message: "Email could not be sent",
    };
  }
};
