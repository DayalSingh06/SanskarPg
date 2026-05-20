import multer from "multer";
import path from "path";
import fs from "fs";

// =========================
// CREATE FOLDER
// =========================

const createFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// =========================
// GET NEXT PG FOLDER
// =========================

const getNextPgFolder = () => {
  const mainPath = "uploads/main";

  createFolder(mainPath);

  const folders = fs
    .readdirSync(mainPath)
    .filter((folder) => folder.startsWith("pg"));

  const numbers = folders.map((folder) => parseInt(folder.replace("pg", "")));

  const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;

  return `pg${nextNumber}`;
};

// =========================
// STORAGE
// =========================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // CREATE PG FOLDER
    if (!req.pgFolder) {
      req.pgFolder = getNextPgFolder();
    }

    let uploadPath = "";

    // MAIN IMAGE
    if (file.fieldname === "mainImage") {
      uploadPath = `uploads/main/${req.pgFolder}`;
    }

    // GALLERY IMAGE
    else {
      // SAFE FOLDER NAME
      const sectionFolder = file.fieldname
        .replace(/\s+/g, "-")
        .replace(/&/g, "and");

      uploadPath = `uploads/gallery/${req.pgFolder}/${sectionFolder}`;
    }

    // CREATE FOLDER
    createFolder(uploadPath);

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname),
    );
  },
});

// =========================
// FILE FILTER
// =========================

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|webp/;

  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  const mimetype = file.mimetype.startsWith("image/");

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only Images Allowed"));
  }
};

// =========================
// MULTER
// =========================

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
