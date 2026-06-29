export const getImageUrl = (img) => {
  if (!img || typeof img !== 'string') {
    return 'https://via.placeholder.com/400x300?text=No+Image';
  }
  return img;
};
