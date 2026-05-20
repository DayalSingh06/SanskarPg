import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  type: {
    type: String,
  },

  available: {
    type: Boolean,
    default: false,
  },

  price: {
    type: String,
  },
});

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
  },

  images: [
    {
      type: String,
    },
  ],
});

const pgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    map: {
      type: String,
    },

    mainImage: {
      type: String,
    },

    rooms: [roomSchema],

    gallery: [gallerySchema],
  },
  {
    timestamps: true,
  },
);

const Pg = mongoose.model("Pg", pgSchema);

export default Pg;
