import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    weeklyMenu: [
      {
        day: String,
        breakfast: String,
        lunch: String,
        dinner: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
