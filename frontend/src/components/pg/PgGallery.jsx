import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { getImageUrl } from "../../utils/imageUrl";

const PgGallery = ({ sections }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-12 md:mt-12">
      {/* LOOP ALL SECTIONS */}
      {sections?.map((section, index) => (
        <div key={index}>
          {/* TITLE */}
          <div className="mb-5">
            <h2 className="text-xl font-bold text-blue-500 sm:text-2xl">
              {section.title}
            </h2>

            <div className="mt-2 h-1 w-14 rounded-full bg-blue-500 sm:w-16" />
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {section?.images?.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(getImageUrl(img))}
                className="group relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 active:scale-[0.98] sm:rounded-2xl"
              >
                <img
                  src={getImageUrl(img)}
                  alt={section.title}
                  loading="lazy"
                  className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-40 md:h-44"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/25" />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/95 p-3 backdrop-blur-md sm:p-5">
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-3 left-3 rounded-full bg-white/10 p-2.5 text-white transition-all duration-300 hover:bg-white/20 active:scale-95 sm:top-5 sm:left-5"
          >
            <ArrowLeft size={25} />
          </button>

          {/* IMAGE */}
          <img
            src={selectedImage}
            alt="Gallery"
            className="h-auto max-h-[85vh] w-auto max-w-full rounded-xl object-contain shadow-2xl sm:max-h-[90vh] sm:max-w-[95%] sm:rounded-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default PgGallery;
