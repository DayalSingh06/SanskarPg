import { useState, useRef } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RoomSection from "./RoomSection";
import GallerySection from "./GallerySection";
import { useTheme } from "../../../context/ThemeContext";
import { createPg } from "../../../services/pgService";

const AddPg = () => {
  const [mainImage, setMainImage] = useState(null);
  const fileInputRef = useRef(null);
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    location: "",
    phone: "",
    map: "",

    rooms: [
      {
        type: "Single",
        available: false,
        price: "",
      },

      {
        type: "Double",
        available: false,
        price: "",
      },

      {
        type: "Triple",
        available: false,
        price: "",
      },

      {
        type: "Four Seater",
        available: false,
        price: "",
      },
    ],

    gallery: [
      {
        title: "Outer Look",
        images: [],
      },

      {
        title: "Food",
        images: [],
      },

      {
        title: "Rooms",
        images: [],
      },

      {
        title: "Toilet & Bathroom",
        images: [],
      },

      {
        title: "Parking",
        images: [],
      },

      {
        title: "Extra Facilities",
        images: [],
      },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // MAIN IMAGE
      formData.append("mainImage", mainImage);

      // GALLERY IMAGES
      data.gallery.forEach((section) => {
        section.images.forEach((img) => {
          formData.append(section.title, img);
        });
      });

      // OTHER DATA
      formData.append(
        "data",
        JSON.stringify({
          ...data,
          gallery: data.gallery.map((item) => ({
            title: item.title,
          })),
        }),
      );

      await createPg(formData);

      // RESET ALL DATA
      setMainImage(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setData({
        name: "",
        location: "",
        phone: "",
        map: "",

        rooms: [
          {
            type: "Single",
            available: false,
            price: "",
          },

          {
            type: "Double",
            available: false,
            price: "",
          },

          {
            type: "Triple",
            available: false,
            price: "",
          },

          {
            type: "Four Seater",
            available: false,
            price: "",
          },
        ],

        gallery: [
          {
            title: "Outer Look",
            images: [],
          },

          {
            title: "Food",
            images: [],
          },

          {
            title: "Rooms",
            images: [],
          },

          {
            title: "Toilet & Bathroom",
            images: [],
          },

          {
            title: "Parking",
            images: [],
          },

          {
            title: "Extra Facilities",
            images: [],
          },
        ],
      });

      alert("PG Added Successfully");
      navigate("/admin/allpg");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div
      className={`
        min-h-screen
        p-3
        rounded-[25px]
        transition-all
        duration-500
        sm:p-4
        md:p-6 md:rounded-[40px]
        ${
          darkMode
            ? "bg-linear-to-br from-[#0f172a] via-[#111827] to-[#1e293b]"
            : "bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100"
        }
      `}
    >
      <div
        className={`
          max-w-7xl
          mx-auto
          rounded-[40px] border
          transition-all
          backdrop-blur-xl duration-500
          ${
            darkMode
              ? "bg-white/5 border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
              : "bg-white/70 border-white/30 shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
          }
        `}
      >
        {/* HEADER */}
        <div
          className={`
            overflow-hidden
            px-4 py-6
            rounded-[40px]
            relative
            sm:px-6 sm:py-8
            md:px-10 md:py-12
            ${
              darkMode
                ? "bg-linear-to-r from-[#111827] via-[#1e293b] to-[#312e81]"
                : "bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600"
            }
          `}
        >
          {/* Glow Effect */}
          <div
            className="
              w-72 h-72
              bg-white/10
              rounded-full
              absolute top-0 right-0 blur-3xl
            "
          />

          <div
            className="
              z-10
              relative
            "
          >
            <h1
              className={`
                text-3xl font-black
                sm:text-4xl
                md:text-5xl
                ${darkMode ? "text-white" : "text-white"}
              `}
            >
              Add New PG
            </h1>

            <p
              className={`
                mt-3
                text-sm
                sm:text-base
                md:text-lg
                ${darkMode ? "text-gray-300" : "text-blue-100"}
              `}
            >
              Manage complete PG details with modern dashboard
            </p>
          </div>
        </div>
        <div
          className="
            p-4
            sm:p-6
            md:p-10
          "
        >
          <form onSubmit={handleSubmit}>
            {/* MAIN IMAGE */}
            <div
              className="
                mb-10
              "
            >
              <label
                className={`
                  block
                  mb-2
                  font-semibold
                  ${darkMode ? "text-gray-200" : "text-gray-700"}
                `}
              >
                Main Banner Image
              </label>

              <div
                className="
                  flex flex-col
                  gap-5
                  md:flex-row
                "
              >
                {/* PREVIEW BOX */}
                <div
                  className={`
                    flex overflow-hidden
                    w-full h-52
                    border-2 border-dashed rounded-3xl
                    shadow-sm transition-all
                    relative group items-center justify-center duration-300
                    sm:h-64
                    md:h-70 md:w-200
                    ${darkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-300"}
                  `}
                >
                  {mainImage ? (
                    <>
                      {/* IMAGE */}
                      <img
                        src={URL.createObjectURL(mainImage)}
                        alt="Preview"
                        className="
                          object-cover
                          w-full h-full
                        "
                      />

                      {/* REMOVE BUTTON */}
                      <button
                        type="button"
                        onClick={() => {
                          setMainImage(null);

                          // RESET INPUT
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        className="
                          z-20 flex
                          w-8 h-8
                          text-white
                          bg-red-500/90
                          rounded-full
                          opacity-100 transition-all
                          absolute top-3 right-3 items-center justify-center backdrop-blur-md duration-300 hover:scale-110
                          md:opacity-0 md:group-hover:opacity-100
                        "
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <div
                      className="
                        text-center text-gray-400
                      "
                    >
                      <p
                        className={`
                          text-center
                          ${darkMode ? "text-gray-500" : "text-gray-400"}
                        `}
                      >
                        No Image Selected
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                        "
                      >
                        Upload banner image preview
                      </p>
                    </div>
                  )}
                </div>

                {/* UPLOAD SECTION */}
                <div
                  className="
                    flex flex-col
                    justify-center gap-5
                    lg:flex-row
                  "
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    onChange={(e) => setMainImage(e.target.files[0])}
                  />

                  {/* BUTTON */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className={`
                      px-5 py-3
                      text-base font-semibold text-white
                      rounded-2xl
                      shadow-lg transition-all
                      duration-300 hover:scale-105
                      sm:px-8 sm:py-4 sm:text-lg
                      ${
                        darkMode
                          ? "bg-linear-to-r from-indigo-600 to-purple-600"
                          : "bg-linear-to-r from-blue-600 to-indigo-600"
                      }
                    `}
                  >
                    Upload Image
                  </button>
                </div>
              </div>
            </div>

            {/* BASIC INFO */}
            <div
              className="
                grid
                gap-6
                md:grid-cols-2
              "
            >
              {/* NAME */}
              <div>
                <label
                  className={`
                    block
                    mb-2
                    font-semibold
                    ${darkMode ? "text-gray-200" : "text-gray-700"}
                  `}
                >
                  PG Name
                </label>

                <input
                  type="text"
                  placeholder="Enter PG Name"
                  value={data.name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      name: e.target.value,
                    })
                  }
                  className={`
                    w-full
                    px-4 py-3
                    border rounded-2xl
                    shadow-sm transition-all
                    outline-none duration-300 focus:ring-4 hover:shadow-lg
                    sm:px-5 sm:py-4
                    ${
                      darkMode
                        ? `
        bg-white/5
        border-white/10
        text-white
        placeholder:text-gray-400
        focus:ring-indigo-500/30
        focus:border-indigo-500
      `
                        : `
        bg-white/80
        border-gray-200
        text-gray-700
        placeholder:text-gray-400
        focus:ring-blue-200
        focus:border-blue-500
      `
                    }
                  `}
                />
              </div>

              {/* PHONE */}
              <div>
                <label
                  className={`
                    block
                    mb-2
                    font-semibold
                    ${darkMode ? "text-gray-200" : "text-gray-700"}
                  `}
                >
                  Phone Number
                </label>

                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  value={data.phone}
                  onChange={(e) =>
                    setData({
                      ...data,
                      phone: e.target.value,
                    })
                  }
                  className={`
                    w-full
                    px-4 py-3
                    border rounded-2xl
                    shadow-sm transition-all
                    outline-none duration-300 focus:ring-4 hover:shadow-lg
                    sm:px-5 sm:py-4
                    ${
                      darkMode
                        ? `
        bg-white/5
        border-white/10
        text-white
        placeholder:text-gray-400
        focus:ring-indigo-500/30
        focus:border-indigo-500
      `
                        : `
        bg-white/80
        border-gray-200
        text-gray-700
        placeholder:text-gray-400
        focus:ring-blue-200
        focus:border-blue-500
      `
                    }
                  `}
                />
              </div>
            </div>

            {/* LOCATION */}
            <div
              className="
                mt-6
              "
            >
              <label
                className={`
                  block
                  mb-2
                  font-semibold
                  ${darkMode ? "text-gray-200" : "text-gray-700"}
                `}
              >
                Location
              </label>

              <textarea
                rows="2"
                placeholder="Enter Full Address"
                value={data.location}
                onChange={(e) =>
                  setData({
                    ...data,
                    location: e.target.value,
                  })
                }
                className={`
                  w-full
                  px-4 py-3
                  border rounded-2xl
                  shadow-sm transition-all
                  outline-none duration-300 focus:ring-4 hover:shadow-lg
                  sm:px-5 sm:py-4
                  ${
                    darkMode
                      ? `
        bg-white/5
        border-white/10
        text-white
        placeholder:text-gray-400
        focus:ring-indigo-500/30
        focus:border-indigo-500
      `
                      : `
        bg-white/80
        border-gray-200
        text-gray-700
        placeholder:text-gray-400
        focus:ring-blue-200
        focus:border-blue-500
      `
                  }
                `}
              />
            </div>

            {/* GOOGLE MAP */}
            <div
              className="
                mt-6
              "
            >
              <label
                className={`
                  block
                  mb-2
                  font-semibold
                  ${darkMode ? "text-gray-200" : "text-gray-700"}
                `}
              >
                Google Map Link
              </label>

              <textarea
                rows="2"
                placeholder="Paste Google Map Embed Link"
                value={data.map}
                onChange={(e) =>
                  setData({
                    ...data,
                    map: e.target.value,
                  })
                }
                className={`
                  w-full
                  px-4 py-3
                  border rounded-2xl
                  shadow-sm transition-all
                  outline-none duration-300 focus:ring-4 hover:shadow-lg
                  sm:px-5 sm:py-4
                  ${
                    darkMode
                      ? `
        bg-white/5
        border-white/10
        text-white
        placeholder:text-gray-400
        focus:ring-indigo-500/30
        focus:border-indigo-500
      `
                      : `
        bg-white/80
        border-gray-200
        text-gray-700
        placeholder:text-gray-400
        focus:ring-blue-200
        focus:border-blue-500
      `
                  }
                `}
              />
            </div>

            {/* ROOMS */}
            <RoomSection data={data} setData={setData} />

            {/* GALLERY */}
            <GallerySection data={data} setData={setData} />

            {/* BUTTON */}
            <button
              type="submit"
              className={`
                overflow-hidden
                w-full
                py-4 mt-8
                text-lg font-bold text-white
                rounded-3xl
                transition-all
                relative duration-300 hover:scale-[1.02]
                sm:py-5 sm:mt-12 sm:text-xl
                ${
                  darkMode
                    ? `
        bg-linear-to-r
        from-indigo-700
        via-purple-700
        to-pink-700
        shadow-[0_15px_40px_rgba(139,92,246,0.35)]  
      `
                    : `
        bg-linear-to-r
        from-blue-600
        via-indigo-600
        to-purple-600
        shadow-[0_15px_40px_rgba(79,70,229,0.4)]
      `
                }
              `}
            >
              Add PG
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPg;
