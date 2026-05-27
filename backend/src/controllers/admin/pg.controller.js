import Pg from "../../models/pg.model.js";
import { cloudinary } from "../../middleware/upload.js";

// helper: array of file paths to cloudinary urls
const mapFilesToUrls = (files = []) => files.map((f) => f.path); // path = delivery URL

// helper: delete cloudinary by public_id array
const deleteFromCloudinaryByPublicIds = async (publicIds = []) => {
  if (!publicIds.length) return;
  await Promise.all(
    publicIds.map((public_id) =>
      cloudinary.uploader
        .destroy(public_id, { invalidate: true })
        .catch(() => null),
    ),
  );
};

// CREATE PG
export const createPg = async (req, res) => {
  try {
    const parsedData = req.body.data ? JSON.parse(req.body.data) : {};
    const files = req.files || {};

    const gallery = parsedData.gallery.map((section) => {
      const sectionFiles = files[section.key] || [];
      return {
        key: section.key,
        title: section.title,
        images: sectionFiles.map((f) => f.path),
        public_ids: sectionFiles.map((f) => f.filename),
      };
    });

    const mainFiles = files.mainImage || [];
    const mainImageUrl = mainFiles[0]?.path || "";
    const mainImagePublicId = mainFiles[0]?.filename || "";

    const newPg = await Pg.create({
      name: parsedData.name,
      location: parsedData.location,
      phone: parsedData.phone,
      map: parsedData.map,
      rooms: parsedData.rooms,
      mainImage: mainImageUrl,
      mainImagePublicId: mainImagePublicId,
      gallery,
    });

    res.status(201).json({
      success: true,
      message: "PG Created Successfully",
      pg: newPg,
    });
  } catch (error) {
    console.error("CREATE_PG_ERROR_STACK:", error.stack);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// GET ALL PGS
export const getAllPgs = async (req, res) => {
  try {
    const pgs = await Pg.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, pgs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed To Fetch PGs" });
  }
};

// GET SINGLE PG
export const getSinglePg = async (req, res) => {
  try {
    const pg = await Pg.findById(req.params.id);
    if (!pg)
      return res.status(404).json({ success: false, message: "PG Not Found" });

    res.status(200).json({ success: true, pg });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed To Fetch PG" });
  }
};

// UPDATE PG
export const updatePg = async (req, res) => {
  try {
    const { id } = req.params;

    const existingPg = await Pg.findById(id);
    if (!existingPg)
      return res.status(404).json({ success: false, message: "PG Not Found" });

    const parsedData = JSON.parse(req.body.data);

    // MAIN IMAGE update (if new uploaded)
    let mainImageUrl = existingPg.mainImage;
    let mainImagePublicId = existingPg.mainImagePublicId;

    const mainFiles = req.files?.mainImage || [];
    if (mainFiles.length > 0) {
      // delete old
      if (existingPg.mainImagePublicId) {
        await cloudinary.uploader
          .destroy(existingPg.mainImagePublicId, { invalidate: true })
          .catch(() => null);
      }

      mainImageUrl = mainFiles[0].path;
      mainImagePublicId = mainFiles[0].filename;
    }

    // GALLERY update
    const gallery = parsedData.gallery.map((section) => {
      const newFiles = req.files?.[section.key] || [];
      const oldSection = existingPg.gallery.find(
        (g) => g.title === section.title,
      );

      if (newFiles.length > 0) {
        // delete old section images from cloudinary
        const oldPublicIds = oldSection?.public_ids || [];
        deleteFromCloudinaryByPublicIds(oldPublicIds);

        return {
          title: section.title,
          images: newFiles.map((f) => f.path),
          public_ids: newFiles.map((f) => f.filename),
        };
      }

      return {
        title: section.title,
        images: oldSection?.images || [],
        public_ids: oldSection?.public_ids || [],
      };
    });

    const updated = await Pg.findByIdAndUpdate(
      id,
      {
        name: parsedData.name,
        location: parsedData.location,
        phone: parsedData.phone,
        map: parsedData.map,
        rooms: parsedData.rooms,
        mainImage: mainImageUrl,
        mainImagePublicId,
        gallery,
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "PG Updated Successfully",
      pg: updated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Update Failed" });
  }
};

// DELETE PG
export const deletePg = async (req, res) => {
  try {
    const { id } = req.params;

    const pg = await Pg.findById(id);
    if (!pg)
      return res.status(404).json({ success: false, message: "PG Not Found" });

    // delete main
    if (pg.mainImagePublicId) {
      await cloudinary.uploader
        .destroy(pg.mainImagePublicId, { invalidate: true })
        .catch(() => null);
    }

    // delete gallery
    const allPublicIds = [];
    pg.gallery.forEach((section) => {
      (section.public_ids || []).forEach((pid) => allPublicIds.push(pid));
    });

    await deleteFromCloudinaryByPublicIds(allPublicIds);

    await Pg.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "PG Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Delete Failed" });
  }
};
