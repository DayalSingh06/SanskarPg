import cron from "node-cron";
import Users from "../models/user.model.js";
import Otp from "../models/otp.model.js";

cron.schedule("*/10 * * * *", async () => {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago

    const users = await Users.find({
      isVerified: false,
      createdAt: { $lt: oneHourAgo },
    });

    if (!users.length) return;

    const userIds = users.map((u) => u._id);
    await Otp.deleteMany({ userId: { $in: userIds } });
    await Users.deleteMany({ _id: { $in: userIds } });
    console.log(
      ` Cleaned ${users.length} unverified users (older than 1 hour)`,
    );
  } catch (err) {
    console.error("Cleanup job error:", err);
  }
});
