import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

console.log("Current Directory:", process.cwd());
console.log("Checking API KEY:", process.env.CLOUDINARY_API_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "sanskar-pg",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],

    public_id: (req, file) => {
      const ts = Date.now();
      const rand = Math.round(Math.random() * 1e9);
      return `${file.fieldname}-${ts}-${rand}`;
    },
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpg|jpeg|png|webp/i.test(file.originalname);
  const mimetype = file.mimetype.startsWith("image/");
  if (allowed && mimetype) return cb(null, true);
  cb(new Error("Only Images Allowed"));
};

// upload.js mein
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB ki limit set kar di
});

export { cloudinary, upload };
export default upload;
