import { useState, useEffect, useRef } from "react";
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

  const initialData = {
    name: "",
    location: "",
    phone: "",
    map: "",

    rooms: [
      { type: "Single", available: false, price: "" },
      { type: "Double", available: false, price: "" },
      { type: "Triple", available: false, price: "" },
      { type: "Four Seater", available: false, price: "" },
    ],

    gallery: [
      { key: "outerLook", title: "Outer Look", images: [] },
      { key: "food", title: "Food", images: [] },
      { key: "rooms", title: "Rooms", images: [] },
      {
        key: "toiletBathroom",
        title: "Toilet & Bathroom",
        images: [],
      },
      { key: "parking", title: "Parking", images: [] },
      {
        key: "extraFacilities",
        title: "Extra Facilities",
        images: [],
      },
    ],
  };

  const [data, setData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [mainImagePreview, setMainImagePreview] = useState("");

  const handleMainImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  const removeMainImage = () => {
    if (mainImagePreview) {
      URL.revokeObjectURL(mainImagePreview);
    }

    setMainImage(null);
    setMainImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (mainImagePreview) {
        URL.revokeObjectURL(mainImagePreview);
      }
    };
  }, [mainImagePreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (
      !data.name.trim() ||
      !data.location.trim() ||
      !data.phone.trim()
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();

      if (mainImage) {
        formData.append("mainImage", mainImage);
      }

      data.gallery.forEach((section) => {
        section.images.forEach((img) => {
          if (img instanceof File) {
            formData.append(section.key, img);
          }
        });
      });

      const dataToSend = {
        ...data,
        gallery: data.gallery.map((item) => ({
          key: item.key,
          title: item.title,
          images: [],
        })),
      };

      formData.append("data", JSON.stringify(dataToSend));

      await createPg(formData);

      removeMainImage();
      setData(initialData);

      alert("PG Added Successfully");
      navigate("/admin/allpg");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen rounded-[25px] p-3 transition-all duration-500 sm:p-4 md:rounded-[40px] md:p-6 ${
        darkMode
          ? "bg-linear-to-br from-[#0f172a] via-[#111827] to-[#1e293b]"
          : "bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100"
      } `}
    >
      <div
        className={`mx-auto max-w-7xl rounded-[40px] border backdrop-blur-xl transition-all duration-500 ${
          darkMode
            ? "border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
            : "border-white/30 bg-white/70 shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
        } `}
      >
        {/* HEADER */}
        <div
          className={`relative overflow-hidden rounded-[40px] px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-12 ${
            darkMode
              ? "bg-linear-to-r from-[#111827] via-[#1e293b] to-[#312e81]"
              : "bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600"
          } `}
        >
          {/* Glow Effect */}
          <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10">
            <h1
              className={`text-3xl font-black sm:text-4xl md:text-5xl ${darkMode ? "text-white" : "text-white"} `}
            >
              Add New PG
            </h1>

            <p
              className={`mt-3 text-sm sm:text-base md:text-lg ${darkMode ? "text-gray-300" : "text-blue-100"} `}
            >
              Manage complete PG details with modern dashboard
            </p>
          </div>
        </div>
        <div className="p-4 sm:p-6 md:p-10">
          <form onSubmit={handleSubmit}>
            {/* MAIN IMAGE */}
            <div className="mb-10">
              <label
                className={`mb-2 block font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"} `}
              >
                Main Banner Image
              </label>

              <div className="flex flex-col gap-5 md:flex-row">
                {/* PREVIEW BOX */}
                <div
                  className={`group relative flex h-52 w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed shadow-sm transition-all duration-300 sm:h-64 md:h-70 md:w-200 ${darkMode ? "border-white/10 bg-white/5" : "border-gray-300 bg-gray-50"} `}
                >
                  {mainImage ? (
                    <>
                      {/* IMAGE */}
                      <img
                        src={mainImagePreview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />

                      {/* REMOVE BUTTON */}
                      <button
                        type="button"
                        onClick={removeMainImage}
                        aria-label="Remove main image"
                        className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/90 text-white opacity-100 backdrop-blur-md transition-all duration-300 hover:scale-110 md:opacity-0 md:group-hover:opacity-100"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <div className="text-center text-gray-400">
                      <p
                        className={`text-center ${darkMode ? "text-gray-500" : "text-gray-400"} `}
                      >
                        No Image Selected
                      </p>

                      <p className="mt-1 text-sm">
                        Upload banner image preview
                      </p>
                    </div>
                  )}
                </div>

                {/* UPLOAD SECTION */}
                <div className="flex flex-col justify-center gap-5 lg:flex-row">
                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    accept="image/*"
                    onChange={handleMainImageChange}
                  />

                  {/* BUTTON */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className={`rounded-2xl px-5 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 sm:px-8 sm:py-4 sm:text-lg ${
                      darkMode
                        ? "bg-linear-to-r from-indigo-600 to-purple-600"
                        : "bg-linear-to-r from-blue-600 to-indigo-600"
                    } `}
                  >
                    Upload Image
                  </button>
                </div>
              </div>
            </div>

            {/* BASIC INFO */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* NAME */}
              <div>
                <label
                  className={`mb-2 block font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"} `}
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
                  className={`w-full rounded-2xl border px-4 py-3 shadow-sm transition-all duration-300 outline-none hover:shadow-lg focus:ring-4 sm:px-5 sm:py-4 ${
                    darkMode
                      ? `border-white/10 bg-white/5 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500/30`
                      : `border-gray-200 bg-white/80 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-200`
                  } `}
                />
              </div>

              {/* PHONE */}
              <div>
                <label
                  className={`mb-2 block font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"} `}
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
                  className={`w-full rounded-2xl border px-4 py-3 shadow-sm transition-all duration-300 outline-none hover:shadow-lg focus:ring-4 sm:px-5 sm:py-4 ${
                    darkMode
                      ? `border-white/10 bg-white/5 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500/30`
                      : `border-gray-200 bg-white/80 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-200`
                  } `}
                />
              </div>
            </div>

            {/* LOCATION */}
            <div className="mt-6">
              <label
                className={`mb-2 block font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"} `}
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
                className={`w-full rounded-2xl border px-4 py-3 shadow-sm transition-all duration-300 outline-none hover:shadow-lg focus:ring-4 sm:px-5 sm:py-4 ${
                  darkMode
                    ? `border-white/10 bg-white/5 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500/30`
                    : `border-gray-200 bg-white/80 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-200`
                } `}
              />
            </div>

            {/* GOOGLE MAP */}
            <div className="mt-6">
              <label
                className={`mb-2 block font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"} `}
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
                className={`w-full rounded-2xl border px-4 py-3 shadow-sm transition-all duration-300 outline-none hover:shadow-lg focus:ring-4 sm:px-5 sm:py-4 ${
                  darkMode
                    ? `border-white/10 bg-white/5 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500/30`
                    : `border-gray-200 bg-white/80 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-200`
                } `}
              />
            </div>

            {/* ROOMS */}
            <RoomSection data={data} setData={setData} />

            {/* GALLERY */}
            <GallerySection data={data} setData={setData} />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`relative mt-8 w-full overflow-hidden rounded-3xl py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 sm:mt-12 sm:py-5 sm:text-xl ${
                darkMode
                  ? `bg-linear-to-r from-indigo-700 via-purple-700 to-pink-700 shadow-[0_15px_40px_rgba(139,92,246,0.35)]`
                  : `bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-[0_15px_40px_rgba(79,70,229,0.4)]`
              }`}
            >
              {isSubmitting ? "Adding PG..." : "Add PG"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPg;
