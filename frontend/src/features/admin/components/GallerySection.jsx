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
      <div
        className="
          mt-10
          sm:mt-12
          md:mt-16
        "
      >
        {/* HEADER */}

        <div
          className="
            mb-10
          "
        >
          <h2
            className={`
              text-2xl font-black
              sm:text-3xl
              md:text-4xl
              ${darkMode ? "text-white" : "text-gray-800"}
            `}
          >
            Gallery Images
          </h2>

          <p
            className={`
              mt-3
              text-sm
              sm:text-base
              ${darkMode ? "text-gray-400" : "text-gray-500"}
            `}
          >
            Upload categorized PG gallery images
          </p>
        </div>

        {/* GRID */}

        <div
          className="
            grid
            gap-5
            sm:gap-6
            md:gap-8
          "
        >
          {data.gallery.map((section, index) => (
            <div
              key={index}
              className={`
                overflow-hidden
                p-4
                rounded-3xl border
                transition-all
                relative backdrop-blur-xl duration-500
                sm:p-6
                md:p-8 md:rounded-4xl
                ${
                  darkMode
                    ? `
                      bg-white/5
                      border-white/10
                      shadow-[0_10px_40px_rgba(0,0,0,0.4)]
                    `
                    : `
                      bg-white/80
                      border-white/50
                      shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                    `
                }
              `}
            >
              {/* TOP */}

              <div
                className="
                  flex flex-col
                  gap-4
                  sm:flex-row sm:items-center sm:justify-between
                "
              >
                {/* TITLE */}

                <div>
                  <h3
                    className={`
                      text-lg font-black
                      sm:text-xl
                      md:text-2xl
                      ${darkMode ? "text-white" : "text-gray-800"}
                    `}
                  >
                    {section.title}
                  </h3>

                  <p
                    className={`
                      mt-1
                      text-sm
                      ${darkMode ? "text-gray-400" : "text-gray-500"}
                    `}
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
                  onChange={(e) => handleGalleryImages(index, e.target.files)}
                />

                {/* BUTTON */}

                <button
                  type="button"
                  onClick={() => fileInputRefs.current[index].click()}
                  className={`
                    flex
                    px-4 py-2.5
                    text-xs font-semibold text-white
                    rounded-xl
                    transition-all
                    items-center gap-2 duration-300 hover:scale-105
                    sm:px-5 sm:py-3 sm:text-sm sm:rounded-2xl
                    ${
                      darkMode
                        ? `
                          bg-linear-to-r
                          from-indigo-600
                          to-purple-600
                        `
                        : `
                          bg-linear-to-r
                          from-blue-600
                          to-indigo-600
                        `
                    }
                  `}
                >
                  <ImagePlus
                    size={16}
                    className="
                      sm:w-4.5 sm:h-4.5
                    "
                  />
                  Upload
                </button>
              </div>

              {/* IMAGE LIST */}

              <div
                className="
                  flex flex-wrap
                  mt-5
                  gap-3
                  sm:mt-6 sm:gap-4
                  md:mt-8
                "
              >
                {section.images.length > 0 ? (
                  section.images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className={`
                        overflow-hidden
                        w-16 h-16
                        rounded-xl border
                        cursor-pointer
                        relative group shrink-0
                        sm:w-20 sm:h-20 sm:rounded-2xl
                        ${
                          darkMode
                            ? "border-white/10 bg-white/5"
                            : "border-gray-200 bg-white"
                        }
                      `}
                    >
                      {/* IMAGE */}

                      <img
                        src={
                          image instanceof File
                            ? URL.createObjectURL(image)
                            : getImageUrl(image)
                        }
                        alt="Preview"
                        onClick={() =>
                          setPreviewImage(
                            image instanceof File
                              ? URL.createObjectURL(image)
                              : getImageUrl(image),
                          )
                        }
                        className="
                          object-cover
                          w-full h-full
                          transition-all
                          duration-300
                          md:group-hover:scale-110
                        "
                      />
                      {/* REMOVE BUTTON */}

                      <button
                        type="button"
                        onClick={() => removeImage(index, imageIndex)}
                        className="
                          flex
                          w-4 h-4
                          text-white
                          bg-red-500
                          rounded-full
                          opacity-0 transition-all
                          absolute top-1 right-1 items-center justify-center duration-300 group-hover:opacity-100 hover:scale-110
                          sm:w-5 sm:h-5
                        "
                      >
                        <X
                          size={10}
                          className="
                            sm:w-3 sm:h-3
                          "
                        />
                      </button>
                    </div>
                  ))
                ) : (
                  <div
                    className={`
                      flex flex-col
                      w-full
                      py-6
                      rounded-2xl border-2 border-dashed
                      items-center justify-center
                      sm:py-8 sm:rounded-3xl
                      md:py-10
                      ${
                        darkMode
                          ? `
                            border-white/10
                            bg-white/5
                          `
                          : `
                            border-gray-300
                            bg-gray-50
                          `
                      }
                    `}
                  >
                    <ImagePlus
                      size={26}
                      className={`
                        mb-3
                        sm:w-8.5 sm:h-8.5
                        ${darkMode ? "text-gray-500" : "text-gray-400"}
                      `}
                    />

                    <p
                      className={`
                        text-sm font-semibold
                        sm:text-base
                        ${darkMode ? "text-gray-300" : "text-gray-600"}
                      `}
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
          <div
            className="
              z-999999 flex
              p-3
              bg-black/95
              fixed inset-0 items-center justify-center
              sm:p-5
            "
          >
            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="
                z-50
                text-white
                absolute top-3 right-3
                sm:top-5 sm:right-5
              "
            >
              <X
                size={26}
                className="
                  sm:w-8.75 sm:h-8.75
                "
              />
            </button>

            {/* IMAGE */}
            <img
              src={previewImage}
              alt="Preview"
              className="
                object-contain
                max-w-full max-h-full
                rounded-xl
                select-none
                sm:rounded-2xl
              "
            />
          </div>,
          document.body,
        )}
    </>
  );
};

export default GallerySection;
