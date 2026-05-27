import Menu from "../../models/menu.model.js";

const defaultMenu = [
  { day: "Sunday", breakfast: "", lunch: "", dinner: "" },
  { day: "Monday", breakfast: "", lunch: "", dinner: "" },
  { day: "Tuesday", breakfast: "", lunch: "", dinner: "" },
  { day: "Wednesday", breakfast: "", lunch: "", dinner: "" },
  { day: "Thursday", breakfast: "", lunch: "", dinner: "" },
  { day: "Friday", breakfast: "", lunch: "", dinner: "" },
  { day: "Saturday", breakfast: "", lunch: "", dinner: "" },
];

const validDays = new Set(defaultMenu.map((item) => item.day));

const isValidWeeklyMenu = (weeklyMenu) => {
  if (!Array.isArray(weeklyMenu) || weeklyMenu.length !== 7) {
    return false;
  }

  return weeklyMenu.every((item) => {
    return (
      validDays.has(item.day) &&
      typeof item.breakfast === "string" &&
      typeof item.lunch === "string" &&
      typeof item.dinner === "string"
    );
  });
};

// GET MENU
export const getMenu = async (req, res) => {
  try {
    let menu = await Menu.findOne();

    if (!menu) {
      menu = await Menu.create({
        weeklyMenu: defaultMenu,
      });
    }

    res.status(200).json(menu);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch menu",
    });
  }
};

// UPDATE MENU
export const updateMenu = async (req, res) => {
  try {
    const { weeklyMenu } = req.body;

    if (!isValidWeeklyMenu(weeklyMenu)) {
      return res.status(400).json({
        success: false,
        message: "Invalid weekly menu",
      });
    }

    let menu = await Menu.findOne();

    if (!menu) {
      menu = await Menu.create({
        weeklyMenu,
      });
    } else {
      menu.weeklyMenu = weeklyMenu;
      await menu.save();
    }

    res.status(200).json({
      success: true,
      message: "Menu Updated Successfully",
      menu,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update menu",
    });
  }
};
