import sendEmail from "../../utils/sendEmail.util.js";

export const sendOtpEmail = async (
  email,
  otp,
  subject = "Sanskar Boys PG - Email Verification",
) => {
  try {
    await sendEmail({
      to: email,
      subject,

      html: `
      <div style="font-family: Arial, sans-serif; background:#f4f7fb; padding:40px;">

        <div style="max-width:500px; margin:auto; background:#fff; border-radius:12px; overflow:hidden;">

          <div style="background:#0d6efd; padding:20px; text-align:center;">
            <h1 style="color:white; margin:0;">
              Sanskar Boys PG
            </h1>

            <p style="color:#dbe9ff;">
              Secure Email Verification
            </p>
          </div>

          <div style="padding:30px; text-align:center;">

            <h2>Email Verification</h2>

            <p style="color:#555;">
              Use the OTP below to verify your email.
            </p>

            <div style="
              background:#f1f7ff;
              padding:20px;
              border-radius:10px;
              margin:25px 0;
              border:1px dashed #0d6efd;
            ">

              <h1 style="
                letter-spacing:8px;
                color:#0d6efd;
                margin:0;
                font-size:36px;
              ">
                ${otp}
              </h1>

            </div>

            <p style="color:#777;">
              This OTP is valid for 5 minutes.
            </p>

          </div>

          <div style="
            background:#f8f9fa;
            padding:15px;
            text-align:center;
            font-size:12px;
            color:#777;
          ">
            © ${new Date().getFullYear()} Sanskar Boys PG
          </div>

        </div>

      </div>
      `,
    });

    return true;
  } catch (error) {
    console.log("OTP EMAIL ERROR:", error);

    throw error;
  }
};
