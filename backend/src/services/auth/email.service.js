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
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <style>
    @media only screen and (max-width: 600px) {

      .container {
        width: 100% !important;
      }

      .content {
        padding: 20px !important;
      }

      .otp-box h1 {
        font-size: 28px !important;
        letter-spacing: 5px !important;
      }

      .heading {
        font-size: 24px !important;
      }

      .text {
        font-size: 14px !important;
      }
    }
  </style>
</head>

<body style="
  margin:0;
  padding:0;
  background:#f4f7fb;
  font-family:Arial,sans-serif;
">

  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:20px;">

        <table 
          class="container"
          width="500"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            width:100%;
            max-width:500px;
            background:#ffffff;
            border-radius:12px;
            overflow:hidden;
          "
        >

          <!-- Header -->
          <tr>
            <td style="
              background:#0d6efd;
              padding:25px;
              text-align:center;
            ">
              <h1 style="
                color:white;
                margin:0;
                font-size:30px;
              ">
                Sanskar Boys PG
              </h1>

              <p style="
                color:#dbe9ff;
                margin-top:8px;
                font-size:14px;
              ">
                Secure Email Verification
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td 
              class="content"
              style="
                padding:35px 30px;
                text-align:center;
              "
            >

              <h2 
                class="heading"
                style="
                  margin-top:0;
                  color:#222;
                "
              >
                Email Verification
              </h2>

              <p 
                class="text"
                style="
                  color:#555;
                  line-height:1.6;
                  margin-bottom:25px;
                "
              >
                Use the OTP below to verify your email address.
              </p>

              <!-- OTP BOX -->
              <div 
                class="otp-box"
                style="
                  background:#f1f7ff;
                  border:1px dashed #0d6efd;
                  border-radius:10px;
                  padding:20px;
                  margin:20px 0;
                "
              >

                <h1 style="
                  margin:0;
                  color:#0d6efd;
                  font-size:38px;
                  letter-spacing:8px;
                ">
                  ${otp}
                </h1>

              </div>

              <p 
                class="text"
                style="
                  color:#777;
                  font-size:14px;
                  margin-top:20px;
                "
              >
                This OTP is valid for 5 minutes.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              background:#f8f9fa;
              padding:15px;
              text-align:center;
              color:#777;
              font-size:12px;
            ">
              © ${new Date().getFullYear()} Sanskar Boys PG
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
      `,
    });

    return true;
  } catch (error) {
    console.log("OTP EMAIL ERROR:", error);
    throw error;
  }
};
