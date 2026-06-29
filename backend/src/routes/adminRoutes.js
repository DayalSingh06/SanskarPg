import express from "express";

import {
  getAllUsers,
  getPendingUsers,
  getRegisteredUsers,
  getRejectedUsers,
  approveUser,
  rejectUser,
  getDashboardCounts,
} from "../controllers/admin/table.controller.js";

import { getMenu, updateMenu } from "../controllers/admin/menu.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import {
  createPg,
  getAllPgs,
  getSinglePg,
  updatePg,
  deletePg,
} from "../controllers/admin/pg.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// GET USERS
router.get("/all-users", verifyToken, isAdmin, getAllUsers);
router.get("/pending", verifyToken, isAdmin, getPendingUsers);
router.get("/registered", verifyToken, isAdmin, getRegisteredUsers);
router.get("/rejected", verifyToken, isAdmin, getRejectedUsers);

router.get("/get/menu", getMenu);
router.put("/update/menu", verifyToken, isAdmin, updateMenu);

// UPDATE USER STATE

router.put("/approve/:id", verifyToken, isAdmin, approveUser);
router.put("/reject/:id", verifyToken, isAdmin, rejectUser);

router.get("/dashboard-counts", verifyToken, isAdmin, getDashboardCounts);

const pgUpload = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "outerLook", maxCount: 10 },
  { name: "food", maxCount: 10 },
  { name: "rooms", maxCount: 10 },
  { name: "toiletBathroom", maxCount: 10 },
  { name: "parking", maxCount: 10 },
  { name: "extraFacilities", maxCount: 10 },
]);

router.post(
  "/create",
  (req, res, next) => {
    pgUpload(req, res, (err) => {
      if (err) {
        console.error("PG_UPLOAD_ERROR:", err);
        return res.status(500).json({
          success: false,
          message: "Upload failed",
          error: err.message || err,
        });
      }

      next();
    });
  },
  verifyToken,
  isAdmin,
  createPg,
);

router.get("/allpg", getAllPgs);
router.get("/singlepg/:id", getSinglePg);

router.put(
  "/update/:id",
  (req, res, next) => {
    pgUpload(req, res, (err) => {
      if (err) {
        console.error("PG_UPLOAD_ERROR:", err);
        return res.status(500).json({
          success: false,
          message: "Upload failed",
          error: err.message || err,
        });
      }

      next();
    });
  },
  verifyToken,
  isAdmin,
  updatePg,
);

router.delete("/delete/:id", verifyToken, isAdmin, deletePg);

export default router;
