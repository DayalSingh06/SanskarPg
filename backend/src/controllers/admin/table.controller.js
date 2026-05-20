import Users from "../../models/user.model.js";

// GET PENDING USERS

export const getPendingUsers = async (req, res) => {
  try {
    const users = await Users.find({
      state: "pending",
      isVerified: true,
    }).sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ADMITED USERS

export const getRegisteredUsers = async (req, res) => {
  try {
    const users = await Users.find({
      state: "registered",
      isVerified: true,
    }).sort({ registeredAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET REJECTED USERS

export const getRejectedUsers = async (req, res) => {
  try {
    const users = await Users.find({
      state: "rejected",
      isVerified: true,
    }).sort({ rejectedAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// APPROVE USER
// pending -> admited
// rejected -> admited

export const approveUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findById(id);

    // USER NOT FOUND
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // USER MUST BE VERIFIED
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Only verified users can be admitted",
      });
    }

    // UPDATE USER
    user.state = "registered";

    user.registeredAt = new Date();

    user.rejectedAt = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User admitted successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// REJECT USER
// pending -> rejected
// admited -> rejected

export const rejectUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findById(id);

    // USER NOT FOUND
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // USER MUST BE VERIFIED
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Only verified users can be rejected",
      });
    }

    // UPDATE USER
    user.state = "rejected";

    user.rejectedAt = new Date();

    await user.save();

    res.status(200).json({
      success: true,
      message: "User rejected successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DASHBOARD COUNTS
// =========================================

export const getDashboardCounts = async (req, res) => {
  try {
    const totalUsers = await Users.countDocuments({
      isVerified: true,
    });

    const pendingUsers = await Users.countDocuments({
      state: "pending",
      isVerified: true,
    });

    const registeredUsers = await Users.countDocuments({
      state: "registered",
      isVerified: true,
    });

    const rejectedUsers = await Users.countDocuments({
      state: "rejected",
      isVerified: true,
    });

    res.status(200).json({
      success: true,

      counts: {
        totalUsers,
        pendingUsers,
        registeredUsers,
        rejectedUsers,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
