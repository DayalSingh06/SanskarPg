import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X, Trash2, Save, RefreshCw } from "lucide-react";
import RoomSection from "./RoomSection";
import GallerySection from "./GallerySection";
import { useTheme } from "../../../context/ThemeContext";
import { getSinglePg, updatePg, deletePg } from "../../../services/pgService";
import { getImageUrl } from "../../../utils/imageUrl";

const UpdatePgDetails = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [data, setData] = useState({
    name: "",
    location: "",
    phone: "",
    map: "",
    rooms: [],
    gallery: [],
  });

  // FETCH PG
  useEffect(() => {
    let mounted = true;

    const loadPg = async () => {
      try {
        const res = await getSinglePg(id);

        if (!mounted) return;

        const pg = res.pg;

        setData({
          name: pg?.name || "",
          location: pg?.location || "",
          phone: pg?.phone || "",
          map: pg?.map || "",
          rooms: pg?.rooms || [],
          gallery: pg?.gallery || [],
        });

        setPreviewImage(
          pg?.mainImage
            ? `http://localhost:5000/${pg.mainImage.replace(/\\/g, "/")}`
            : "",
        );
      } catch (error) {
        console.log(error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadPg();

    return () => {
      mounted = false;
    };
  }, [id]);

  // UPDATE PG
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      if (mainImage) {
        formData.append("mainImage", mainImage);
      }

      data.gallery.forEach((section) => {
        section.images?.forEach((img) => {
          if (img instanceof File) {
            formData.append(section.title, img);
          }
        });
      });

      formData.append("data", JSON.stringify(data));

      await updatePg(id, formData);
      navigate("/admin/allpg");
    } catch (error) {
      console.log(error);

      alert("Update Failed");
    }
  };

  // DELETE PG
  const handleDelete = async () => {
    try {
      await deletePg(id);

      navigate("/");
    } catch (error) {
      console.log(error);

      alert("Delete Failed");
    }
  };

  // LOADING
  if (loading) {
    return (
      <div
        className="
          flex
          h-screen
          text-2xl font-bold
          items-center justify-center
        "
      >
        Loading...
      </div>
    );
  }

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
          backdrop-blur-xl
          ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white/70 border-white/30"
          }
        `}
      >
        {/* HEADER */}
        <div
          className={`
            flex flex-col
            px-6 py-8
            rounded-t-[40px]
            gap-5
            md:flex-row md:items-center md:justify-between
            ${
              darkMode
                ? "bg-linear-to-r from-[#111827] via-[#1e293b] to-[#312e81]"
                : "bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600"
            }
          `}
        >
          <div>
            <h1
              className="
                text-4xl font-black text-white
              "
            >
              Update PG Details
            </h1>

            <p
              className="
                mt-2
                text-white/80
              "
            >
              Edit and manage PG information
            </p>
          </div>

          {/* TOP BUTTONS */}
          <div
            className="
              flex
              gap-4
            "
          >
            <button
              onClick={handleUpdate}
              className="
                flex
                px-6 py-3
                font-semibold text-white
                bg-green-600
                rounded-2xl
                transition-all
                duration-300 items-center gap-2 hover:scale-105 hover:bg-green-700
              "
            >
              <RefreshCw size={18} />
              Update
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="
                flex
                px-6 py-3
                font-semibold text-white
                bg-red-600
                rounded-2xl
                transition-all
                duration-300 items-center gap-2 hover:scale-105 hover:bg-red-700
              "
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>

        {/* FORM */}
        <div
          className="
            p-4
            sm:p-6
            md:p-10
          "
        >
          {/* MAIN IMAGE */}
          <div
            className="
              mb-10
            "
          >
            <label
              className={`
                block
                mb-3
                font-semibold
                ${darkMode ? "text-white" : "text-gray-700"}
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
              <div
                className={`
                  overflow-hidden
                  w-full h-64
                  rounded-3xl border-2 border-dashed
                  relative
                  md:w-125
                  ${
                    darkMode
                      ? "bg-white/5 border-white/10"
                      : "bg-gray-100 border-gray-300"
                  }
                `}
              >
                {previewImage ? (
                  <>
                    <img
                      src={
                        mainImage
                          ? URL.createObjectURL(mainImage)
                          : previewImage
                      }
                      alt="Preview"
                      className="
                        object-cover
                        w-full h-full
                      "
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setMainImage(null);

                        setPreviewImage("");

                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      className="
                        flex
                        w-9 h-9
                        text-white
                        bg-red-500
                        rounded-full
                        absolute top-3 right-3 items-center justify-center
                      "
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <div
                    className="
                      flex
                      w-full h-full
                      text-gray-400
                      items-center justify-center
                    "
                  >
                    No Image
                  </div>
                )}
              </div>

              <div
                className="
                  flex
                  items-center
                "
              >
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  onChange={(e) => {
                    setMainImage(e.target.files[0]);
                  }}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="
                    px-8 py-4
                    font-semibold text-white
                    bg-linear-to-r from-blue-600 to-indigo-600
                    rounded-2xl
                    transition-all
                    duration-300 hover:scale-105
                  "
                >
                  Upload New Image
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
            <div>
              <label
                className={`
                  block
                  mb-2
                  font-semibold
                  ${darkMode ? "text-white" : "text-gray-700"}
                `}
              >
                PG Name
              </label>

              <input
                type="text"
                value={data.name}
                onChange={(e) =>
                  setData({
                    ...data,
                    name: e.target.value,
                  })
                }
                className={`
                  w-full
                  px-5 py-4
                  rounded-2xl border
                  outline-none
                  ${
                    darkMode
                      ? "bg-white/5 border-white/10 text-white"
                      : "bg-white border-gray-200 text-gray-700"
                  }
                `}
              />
            </div>

            <div>
              <label
                className={`
                  block
                  mb-2
                  font-semibold
                  ${darkMode ? "text-white" : "text-gray-700"}
                `}
              >
                Phone Number
              </label>

              <input
                type="text"
                value={data.phone}
                onChange={(e) =>
                  setData({
                    ...data,
                    phone: e.target.value,
                  })
                }
                className={`
                  w-full
                  px-5 py-4
                  rounded-2xl border
                  outline-none
                  ${
                    darkMode
                      ? "bg-white/5 border-white/10 text-white"
                      : "bg-white border-gray-200 text-gray-700"
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
                ${darkMode ? "text-white" : "text-gray-700"}
              `}
            >
              Location
            </label>

            <textarea
              rows="2"
              value={data.location}
              onChange={(e) =>
                setData({
                  ...data,
                  location: e.target.value,
                })
              }
              className={`
                w-full
                px-5 py-4
                rounded-2xl border
                outline-none
                ${
                  darkMode
                    ? "bg-white/5 border-white/10 text-white"
                    : "bg-white border-gray-200 text-gray-700"
                }
              `}
            />
          </div>

          {/* MAP */}
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
                ${darkMode ? "text-white" : "text-gray-700"}
              `}
            >
              Google Map Link
            </label>

            <textarea
              rows="2"
              value={data.map}
              onChange={(e) =>
                setData({
                  ...data,
                  map: e.target.value,
                })
              }
              className={`
                w-full
                px-5 py-4
                rounded-2xl border
                outline-none
                ${
                  darkMode
                    ? "bg-white/5 border-white/10 text-white"
                    : "bg-white border-gray-200 text-gray-700"
                }
              `}
            />
          </div>

          {/* ROOMS */}
          <RoomSection data={data} setData={setData} />

          {/* GALLERY */}
          <GallerySection data={data} setData={setData} />

          {/* SAVE BUTTON */}

          <button
            onClick={handleUpdate}
            className={`
              flex
              w-full
              py-5 mt-10
              text-xl font-bold text-white
              rounded-3xl
              transition-all
              duration-300 items-center justify-center gap-3 hover:scale-[1.02]
              ${
                darkMode
                  ? "bg-linear-to-r from-indigo-700 via-purple-700 to-pink-700"
                  : "bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600"
              }
            `}
          >
            <Save size={22} />
            Save Changes
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <div
          className="
            z-99999 flex
            bg-black/60
            fixed inset-0 backdrop-blur-sm items-center justify-center
          "
        >
          <div
            className={`
              w-[90%] max-w-md
              p-8
              rounded-3xl
              shadow-2xl animate-in
              fade-in zoom-in-95 duration-300
              ${darkMode ? "bg-[#151122] border border-white/10" : "bg-white"}
            `}
          >
            {/* ICON */}

            <div
              className="
                flex
                w-18 h-18
                mx-auto
                bg-red-500/15
                rounded-full
                items-center justify-center
              "
            >
              <Trash2
                size={34}
                className="
                  text-red-500
                "
              />
            </div>

            {/* TEXT */}

            <h2
              className={`
                mt-6
                text-2xl font-black text-center
                ${darkMode ? "text-white" : "text-gray-800"}
              `}
            >
              Delete PG ?
            </h2>

            <p
              className={`
                mt-3
                text-center leading-7
                ${darkMode ? "text-gray-400" : "text-gray-600"}
              `}
            >
              Are you sure you want to permanently delete this PG?
            </p>

            {/* BUTTONS */}

            <div
              className="
                flex
                mt-8
                gap-4
              "
            >
              {/* CANCEL */}

              <button
                onClick={() => setShowDeleteModal(false)}
                className={`
                  flex-1
                  py-3
                  font-semibold
                  rounded-2xl
                  transition-all
                  duration-300 hover:scale-105
                  ${
                    darkMode
                      ? "bg-white/10 text-white"
                      : "bg-gray-100 text-gray-700"
                  }
                `}
              >
                No
              </button>

              {/* DELETE */}

              <button
                onClick={async () => {
                  setShowDeleteModal(false);

                  await handleDelete();
                }}
                className="
                  flex-1
                  py-3
                  font-semibold text-white
                  bg-red-600
                  rounded-2xl
                  transition-all
                  duration-300 hover:scale-105 hover:bg-red-700
                "
              >
                Yes Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePgDetails;
