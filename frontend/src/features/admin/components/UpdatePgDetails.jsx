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

        // UPDATE THIS PART:
        // Pura URL backend se mil raha hai, local path fix karne ki zaroorat nahi
        setPreviewImage(pg?.mainImage || "");
      } catch (error) {
        console.log(error);
      } finally {
        if (mounted) setLoading(false);
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
      <div className="flex h-screen items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen rounded-[25px] p-3 transition-all duration-500 sm:p-4 md:rounded-[40px] md:p-6 ${
        darkMode
          ? "bg-linear-to-br from-[#0f172a] via-[#111827] to-[#1e293b]"
          : "bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100"
      } `}
    >
      <div
        className={`mx-auto max-w-7xl rounded-[40px] border backdrop-blur-xl ${
          darkMode
            ? "border-white/10 bg-white/5"
            : "border-white/30 bg-white/70"
        } `}
      >
        {/* HEADER */}
        <div
          className={`flex flex-col gap-5 rounded-t-[40px] px-6 py-8 md:flex-row md:items-center md:justify-between ${
            darkMode
              ? "bg-linear-to-r from-[#111827] via-[#1e293b] to-[#312e81]"
              : "bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600"
          } `}
        >
          <div>
            <h1 className="text-4xl font-black text-white">
              Update PG Details
            </h1>

            <p className="mt-2 text-white/80">Edit and manage PG information</p>
          </div>

          {/* TOP BUTTONS */}
          <div className="flex gap-4">
            <button
              onClick={handleUpdate}
              className="flex items-center gap-2 rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-green-700"
            >
              <RefreshCw size={18} />
              Update
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className="p-4 sm:p-6 md:p-10">
          {/* MAIN IMAGE */}
          <div className="mb-10">
            <label
              className={`mb-3 block font-semibold ${darkMode ? "text-white" : "text-gray-700"} `}
            >
              Main Banner Image
            </label>

            <div className="flex flex-col gap-5 md:flex-row">
              <div
                className={`relative h-64 w-full overflow-hidden rounded-3xl border-2 border-dashed md:w-125 ${
                  darkMode
                    ? "border-white/10 bg-white/5"
                    : "border-gray-300 bg-gray-100"
                } `}
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
                      className="h-full w-full object-cover"
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
                      className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white"
                    >
                      <X size={18} />
                    </button>
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <div className="flex items-center">
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
                  className="rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105"
                >
                  Upload New Image
                </button>
              </div>
            </div>
          </div>

          {/* BASIC INFO */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                className={`mb-2 block font-semibold ${darkMode ? "text-white" : "text-gray-700"} `}
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
                className={`w-full rounded-2xl border px-5 py-4 outline-none ${
                  darkMode
                    ? "border-white/10 bg-white/5 text-white"
                    : "border-gray-200 bg-white text-gray-700"
                } `}
              />
            </div>

            <div>
              <label
                className={`mb-2 block font-semibold ${darkMode ? "text-white" : "text-gray-700"} `}
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
                className={`w-full rounded-2xl border px-5 py-4 outline-none ${
                  darkMode
                    ? "border-white/10 bg-white/5 text-white"
                    : "border-gray-200 bg-white text-gray-700"
                } `}
              />
            </div>
          </div>

          {/* LOCATION */}
          <div className="mt-6">
            <label
              className={`mb-2 block font-semibold ${darkMode ? "text-white" : "text-gray-700"} `}
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
              className={`w-full rounded-2xl border px-5 py-4 outline-none ${
                darkMode
                  ? "border-white/10 bg-white/5 text-white"
                  : "border-gray-200 bg-white text-gray-700"
              } `}
            />
          </div>

          {/* MAP */}
          <div className="mt-6">
            <label
              className={`mb-2 block font-semibold ${darkMode ? "text-white" : "text-gray-700"} `}
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
              className={`w-full rounded-2xl border px-5 py-4 outline-none ${
                darkMode
                  ? "border-white/10 bg-white/5 text-white"
                  : "border-gray-200 bg-white text-gray-700"
              } `}
            />
          </div>

          {/* ROOMS */}
          <RoomSection data={data} setData={setData} />

          {/* GALLERY */}
          <GallerySection data={data} setData={setData} />

          {/* SAVE BUTTON */}

          <button
            onClick={handleUpdate}
            className={`mt-10 flex w-full items-center justify-center gap-3 rounded-3xl py-5 text-xl font-bold text-white transition-all duration-300 hover:scale-[1.02] ${
              darkMode
                ? "bg-linear-to-r from-indigo-700 via-purple-700 to-pink-700"
                : "bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600"
            } `}
          >
            <Save size={22} />
            Save Changes
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            className={`animate-in fade-in zoom-in-95 w-[90%] max-w-md rounded-3xl p-8 shadow-2xl duration-300 ${darkMode ? "border border-white/10 bg-[#151122]" : "bg-white"} `}
          >
            {/* ICON */}

            <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-red-500/15">
              <Trash2 size={34} className="text-red-500" />
            </div>

            {/* TEXT */}

            <h2
              className={`mt-6 text-center text-2xl font-black ${darkMode ? "text-white" : "text-gray-800"} `}
            >
              Delete PG ?
            </h2>

            <p
              className={`mt-3 text-center leading-7 ${darkMode ? "text-gray-400" : "text-gray-600"} `}
            >
              Are you sure you want to permanently delete this PG?
            </p>

            {/* BUTTONS */}

            <div className="mt-8 flex gap-4">
              {/* CANCEL */}

              <button
                onClick={() => setShowDeleteModal(false)}
                className={`flex-1 rounded-2xl py-3 font-semibold transition-all duration-300 hover:scale-105 ${
                  darkMode
                    ? "bg-white/10 text-white"
                    : "bg-gray-100 text-gray-700"
                } `}
              >
                No
              </button>

              {/* DELETE */}

              <button
                onClick={async () => {
                  setShowDeleteModal(false);

                  await handleDelete();
                }}
                className="flex-1 rounded-2xl bg-red-600 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700"
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
