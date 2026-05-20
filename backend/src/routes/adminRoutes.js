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

router.post(
  "/create",
  upload.fields([
    {
      name: "mainImage",
      maxCount: 1,
    },

    {
      name: "Outer Look",
    },

    {
      name: "Food",
    },

    {
      name: "Rooms",
    },

    {
      name: "Toilet & Bathroom",
    },

    {
      name: "Parking",
    },

    {
      name: "Extra Facilities",
    },
  ]),

  createPg,
);

// GET ALL PGS
router.get("/allpg", getAllPgs);

router.get("/singlepg/:id", getSinglePg);

router.put(
  "/update/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },

    { name: "Outer Look" },

    { name: "Food" },

    { name: "Rooms" },

    { name: "Toilet & Bathroom" },

    { name: "Parking" },

    { name: "Extra Facilities" },
  ]),
  updatePg,
);

router.delete("/delete/:id", deletePg);

export default router;
