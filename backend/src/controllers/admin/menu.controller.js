import Menu from "../../models/menu.model.js";

const defaultMenu = [
  {
    day: "Sunday",
    breakfast: "",
    lunch: "",
    dinner: "",
  },
  {
    day: "Monday",
    breakfast: "",
    lunch: "",
    dinner: "",
  },
  {
    day: "Tuesday",
    breakfast: "",
    lunch: "",
    dinner: "",
  },
  {
    day: "Wednesday",
    breakfast: "",
    lunch: "",
    dinner: "",
  },
  {
    day: "Thursday",
    breakfast: "",
    lunch: "",
    dinner: "",
  },
  {
    day: "Friday",
    breakfast: "",
    lunch: "",
    dinner: "",
  },
  {
    day: "Saturday",
    breakfast: "",
    lunch: "",
    dinner: "",
  },
];

// GET MENU
export const getMenu = async (req, res) => {
  try {
    let menu = await Menu.findOne();

    // first time create menu
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
      message: error.message,
    });
  }
};

// UPDATE MENU
export const updateMenu = async (req, res) => {
  try {
    const { weeklyMenu } = req.body;

    let menu = await Menu.findOne();

    // if menu not exist
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
      message: error.message,
    });
  }
};
