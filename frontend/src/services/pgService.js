import axios from '../utils/axios';

export const createPg = async (formData) => {
  const response = await axios.post('/api/admin/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getAllPgs = async () => {
  const response = await axios.get('/api/admin/allpg');
  return response.data;
};

export const getSinglePg = async (id) => {
  const response = await axios.get(`/api/admin/singlepg/${id}`);

  return response.data;
};

export const updatePg = async (id, formData) => {
  const response = await axios.put(`/api/admin/update/${id}`, formData);

  return response.data;
};

export const deletePg = async (id) => {
  const response = await axios.delete(`/api/admin/delete/${id}`);

  return response.data;
};
