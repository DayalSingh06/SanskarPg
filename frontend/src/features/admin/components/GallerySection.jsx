import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ImagePlus, X } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import { getImageUrl } from "../../../utils/imageUrl";

const GallerySection = ({ data, setData }) => {
  const { darkMode } = useTheme();

  const fileInputRefs = useRef([]);

  // IMAGE PREVIEW MODAL

  const [previewImage, setPreviewImage] = useState(null);

  // =========================
  // HANDLE GALLERY IMAGES
  // =========================

  const handleGalleryImages = (index, files) => {
    const updatedGallery = [...data.gallery];

    updatedGallery[index].images = [
      ...updatedGallery[index].images,
      ...Array.from(files),
    ];

    setData({
      ...data,
      gallery: updatedGallery,
    });
  };

  // REMOVE IMAGE

  const removeImage = (sectionIndex, imageIndex) => {
    const updatedGallery = [...data.gallery];

    updatedGallery[sectionIndex].images.splice(imageIndex, 1);

    setData({
      ...data,
      gallery: updatedGallery,
    });
  };

  return (
    <>
      <div className="mt-10 sm:mt-12 md:mt-16">
        {/* HEADER */}

        <div className="mb-10">
          <h2
            className={`text-2xl font-black sm:text-3xl md:text-4xl ${darkMode ? "text-white" : "text-gray-800"} `}
          >
            Gallery Images
          </h2>

          <p
            className={`mt-3 text-sm sm:text-base ${darkMode ? "text-gray-400" : "text-gray-500"} `}
          >
            Upload categorized PG gallery images
          </p>
        </div>

        {/* GRID */}

        <div className="grid gap-5 sm:gap-6 md:gap-8">
          {data.gallery.map((section, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-3xl border p-4 backdrop-blur-xl transition-all duration-500 sm:p-6 md:rounded-4xl md:p-8 ${
                darkMode
                  ? `border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.4)]`
                  : `border-white/50 bg-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.08)]`
              } `}
            >
              {/* TOP */}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* TITLE */}

                <div>
                  <h3
                    className={`text-lg font-black sm:text-xl md:text-2xl ${darkMode ? "text-white" : "text-gray-800"} `}
                  >
                    {section.title}
                  </h3>

                  <p
                    className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} `}
                  >
                    {section.images.length} image uploaded
                  </p>
                </div>

                {/* HIDDEN INPUT */}

                <input
                  type="file"
                  multiple
                  hidden
                  ref={(el) => (fileInputRefs.current[index] = el)}
                  onChange={(e) =>
                    handleGalleryImages(index, e.target.files)
                  }
                />

                {/* BUTTON */}

                <button
                  type="button"
                  onClick={() => fileInputRefs.current[index].click()}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:scale-105 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm ${
                    darkMode
                      ? `bg-linear-to-r from-indigo-600 to-purple-600`
                      : `bg-linear-to-r from-blue-600 to-indigo-600`
                  } `}
                >
                  <ImagePlus
                    size={16}
                    className="sm:h-4.5 sm:w-4.5"
                  />
                  Upload
                </button>
              </div>

              {/* IMAGE LIST */}

              <div className="mt-5 flex flex-wrap gap-3 sm:mt-6 sm:gap-4 md:mt-8">
                {section.images.length > 0 ? (
                  section.images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className={`group relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border sm:h-20 sm:w-20 sm:rounded-2xl ${
                        darkMode
                          ? "border-white/10 bg-white/5"
                          : "border-gray-200 bg-white"
                      } `}
                    >
                      {/* IMAGE */}

                      <img
                        src={
                          image instanceof File
                            ? URL.createObjectURL(image)
                            : getImageUrl(image) // Yahan ab seedha Cloudinary URL ja raha hai
                        }
                        alt="Preview"
                        onClick={() =>
                          setPreviewImage(
                            image instanceof File
                              ? URL.createObjectURL(image)
                              : getImageUrl(image),
                          )
                        }
                        className="h-full w-full object-cover transition-all duration-300 md:group-hover:scale-110"
                      />
                      {/* REMOVE BUTTON */}

                      <button
                        type="button"
                        onClick={() => removeImage(index, imageIndex)}
                        className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110 sm:h-5 sm:w-5"
                      >
                        <X size={10} className="sm:h-3 sm:w-3" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div
                    className={`flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed py-6 sm:rounded-3xl sm:py-8 md:py-10 ${
                      darkMode
                        ? `border-white/10 bg-white/5`
                        : `border-gray-300 bg-gray-50`
                    } `}
                  >
                    <ImagePlus
                      size={26}
                      className={`mb-3 sm:h-8.5 sm:w-8.5 ${darkMode ? "text-gray-500" : "text-gray-400"} `}
                    />

                    <p
                      className={`text-sm font-semibold sm:text-base ${darkMode ? "text-gray-300" : "text-gray-600"} `}
                    >
                      No Images Uploaded
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {previewImage &&
        createPortal(
          <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black/95 p-3 sm:p-5">
            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 z-50 text-white sm:top-5 sm:right-5"
            >
              <X size={26} className="sm:h-8.75 sm:w-8.75" />
            </button>

            {/* IMAGE */}
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-full max-w-full rounded-xl object-contain select-none sm:rounded-2xl"
            />
          </div>,
          document.body,
        )}
    </>
  );
};

export default GallerySection;
