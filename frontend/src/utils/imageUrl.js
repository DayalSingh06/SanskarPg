const BASE_URL = import.meta.env.VITE_API_URL;

export const getImageUrl = (img) => {
  if (!img) {
    return "https://via.placeholder.com/400x300?text=No+Image";
  }

  const cleanPath = img.replace(/\\/g, "/");

  return `${BASE_URL}/${cleanPath}`;
};
