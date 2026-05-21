// import dotenv from "dotenv";
// dotenv.config();

// import app from "./app.js";
// import connectDB from "./config/db.js";
// import "./jobs/cleanupUnverifiedUsers.job.js";

// const PORT = process.env.PORT || 5000;
// const isDev = process.env.NODE_ENV !== "production";

// connectDB();

// app.listen(PORT, () => {
//   if (isDev) {
//     console.log(`Server running on port ${PORT}`);
//   }
// });

// console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
// console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import "./jobs/cleanupUnverifiedUsers.job.js";

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
console.log("EMAIL_PASS:", process.env.BREVO_API_KEY);
console.log("LOCAL:", process.env.FRONTEND_LOCAL);
console.log("PROD:", process.env.FRONTEND_PROD);
