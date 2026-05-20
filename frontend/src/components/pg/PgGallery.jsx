import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { getImageUrl } from "../../utils/imageUrl";

const PgGallery = ({ sections }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div
      className="
        mt-8 space-y-10
        sm:mt-10 sm:space-y-12
        md:mt-12
      "
    >
      {/* LOOP ALL SECTIONS */}
      {sections?.map((section, index) => (
        <div key={index}>
          {/* TITLE */}
          <div
            className="
              mb-5
            "
          >
            <h2
              className="
                text-xl font-bold text-blue-500
                sm:text-2xl
              "
            >
              {section.title}
            </h2>

            <div
              className="
                w-14 h-1
                mt-2
                bg-blue-500
                rounded-full
                sm:w-16
              "
            />
          </div>

          {/* GRID */}
          <div
            className="
              grid grid-cols-2
              gap-3
              sm:grid-cols-3 sm:gap-4
              md:grid-cols-4
              lg:grid-cols-5
            "
          >
            {section?.images?.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(getImageUrl(img))}
                className="
                  overflow-hidden
                  rounded-xl
                  cursor-pointer transition-all
                  relative group duration-300 active:scale-[0.98]
                  sm:rounded-2xl
                "
              >
                <img
                  src={getImageUrl(img)}
                  alt={section.title}
                  loading="lazy"
                  className="
                    object-cover
                    w-full h-32
                    transition-transform
                    duration-500 group-hover:scale-110
                    sm:h-40
                    md:h-44
                  "
                />

                {/* OVERLAY */}
                <div
                  className="
                    bg-black/0
                    transition-all
                    absolute inset-0 duration-300 group-hover:bg-black/25
                  "
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* MODAL */}
      {selectedImage && (
        <div
          className="
            z-999 flex
            p-3
            bg-black/95
            fixed inset-0 items-center justify-center backdrop-blur-md
            sm:p-5
          "
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setSelectedImage(null)}
            className="
              p-2.5
              text-white
              bg-white/10
              rounded-full
              transition-all
              absolute top-3 left-3 duration-300 hover:bg-white/20 active:scale-95
              sm:top-5 sm:left-5
            "
          >
            <ArrowLeft size={25} />
          </button>

          {/* IMAGE */}
          <img
            src={selectedImage}
            alt="Gallery"
            className="
              object-contain
              w-auto h-auto max-w-full max-h-[85vh]
              rounded-xl
              shadow-2xl
              sm:max-w-[95%] sm:max-h-[90vh] sm:rounded-2xl
            "
          />
        </div>
      )}
    </div>
  );
};

export default PgGallery;
