const BASE_URL = import.meta.env.DEV
  ? "http://localhost:5000"
  : import.meta.env.VITE_API_URL;
  
export const getImageUrl = (img) => {
  if (!img) {
    return "https://via.placeholder.com/400x300?text=No+Image";
  }

  return `${BASE_URL}/${img.replace(/\\/g, "/")}`;
};
