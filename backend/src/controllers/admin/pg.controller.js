import Pg from "../../models/pg.model.js";
import fs from "fs";

// ==============================
// CREATE PG
// ==============================

export const createPg = async (req, res) => {
  try {
    // PARSE DATA
    const parsedData = JSON.parse(req.body.data);

    // MAIN IMAGE
    const mainImage = req.files.mainImage?.[0]?.path.replace(/\\/g, "/") || "";
    // GALLERY
    const gallery = parsedData.gallery.map((section) => {
      const sectionImages = req.files[section.title] || [];

      return {
        title: section.title,

        images: sectionImages.map((img) => img.path.replace(/\\/g, "/")),
      };
    });

    // CREATE PG
    const newPg = new Pg({
      name: parsedData.name,
      location: parsedData.location,
      phone: parsedData.phone,
      map: parsedData.map,

      rooms: parsedData.rooms,

      mainImage,

      gallery,
    });

    await newPg.save();

    res.status(201).json({
      success: true,
      message: "PG Created Successfully",
      pg: newPg,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// GET ALL PGS
// ==============================

export const getAllPgs = async (req, res) => {
  try {
    const pgs = await Pg.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      pgs,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed To Fetch PGs",
    });
  }
};

// ==============================
// GET SINGLE PG
// ==============================

export const getSinglePg = async (req, res) => {
  try {
    const pg = await Pg.findById(req.params.id);

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: "PG Not Found",
      });
    }

    res.status(200).json({
      success: true,
      pg,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed To Fetch PG",
    });
  }
};

// ==============================
// UPDATE PG
// ==============================

export const updatePg = async (req, res) => {
  try {
    const { id } = req.params;

    const existingPg = await Pg.findById(id);

    if (!existingPg) {
      return res.status(404).json({
        success: false,
        message: "PG Not Found",
      });
    }

    // PARSE DATA
    const parsedData = JSON.parse(req.body.data);

    // ==============================
    // MAIN IMAGE
    // ==============================

    let mainImage = existingPg.mainImage;

    if (req.files?.mainImage?.[0]) {
      // DELETE OLD IMAGE

      if (existingPg.mainImage && fs.existsSync(existingPg.mainImage)) {
        fs.unlinkSync(existingPg.mainImage);
      }

      mainImage = req.files.mainImage[0].path.replace(/\\/g, "/");
    }

    // ==============================
    // GALLERY
    // ==============================

    const gallery = parsedData.gallery.map((section) => {
      const uploadedImages = req.files?.[section.title] || [];

      // OLD SECTION
      const oldSection = existingPg.gallery.find(
        (g) => g.title === section.title,
      );

      return {
        title: section.title,

        images:
          uploadedImages.length > 0
            ? uploadedImages.map((img) => img.path.replace(/\\/g, "/"))
            : oldSection?.images || [],
      };
    });

    // ==============================
    // UPDATE
    // ==============================

    const updatedPg = await Pg.findByIdAndUpdate(
      id,
      {
        name: parsedData.name,
        location: parsedData.location,
        phone: parsedData.phone,
        map: parsedData.map,

        rooms: parsedData.rooms,

        mainImage,

        gallery,
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "PG Updated Successfully",
      pg: updatedPg,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Update Failed",
    });
  }
};

// ==============================
// DELETE PG
// ==============================

export const deletePg = async (req, res) => {
  try {
    const { id } = req.params;

    const pg = await Pg.findById(id);

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: "PG Not Found",
      });
    }

    // ==============================
    // DELETE MAIN IMAGE
    // ==============================

    if (pg.mainImage && fs.existsSync(pg.mainImage)) {
      fs.unlinkSync(pg.mainImage);
    }

    // ==============================
    // DELETE GALLERY IMAGES
    // ==============================

    pg.gallery.forEach((section) => {
      section.images.forEach((img) => {
        if (fs.existsSync(img)) {
          fs.unlinkSync(img);
        }
      });
    });

    // ==============================
    // DELETE FROM DB
    // ==============================

    await Pg.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "PG Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Delete Failed",
    });
  }
};
