import express from "express";
import cors from "cors";
import path from "path";

import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sanskar-pg.vercel.app",
      "https://sanskar-pg-git-main-dayalsingh06s-projects.vercel.app",
      "https://sanskar-kygcex0xq-dayalsingh06s-projects.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/api/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Server is running",
//     timestamp: new Date(),
//   });
// });

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/users", userRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/admin", adminRoutes);

export default app;
