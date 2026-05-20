import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import "./jobs/cleanupUnverifiedUsers.job.js";

const PORT = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV !== "production";

connectDB();

app.listen(PORT, () => {
  if (isDev) {
    console.log(`Server running on port ${PORT}`);
  }
});
