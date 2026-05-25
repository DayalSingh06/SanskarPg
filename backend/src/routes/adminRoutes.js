import express from "express";

import {
  getPendingUsers,
  getRegisteredUsers,
  getRejectedUsers,
  approveUser,
  rejectUser,
  getDashboardCounts,
} from "../controllers/admin/table.controller.js";

import { getMenu, updateMenu } from "../controllers/admin/menu.controller.js";

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

router.get("/pending", getPendingUsers);
router.get("/registered", getRegisteredUsers);
router.get("/rejected", getRejectedUsers);

router.get("/get/menu", getMenu);
router.put("/update/menu", updateMenu);

// UPDATE USER STATE

router.put("/approve/:id", approveUser);
router.put("/reject/:id", rejectUser);

// DASHBOARD COUNTS

router.get("/dashboard-counts", getDashboardCounts);

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
  createPg,
);
// GET ALL PGS
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
  updatePg,
);

router.delete("/delete/:id", deletePg);

export default router;
