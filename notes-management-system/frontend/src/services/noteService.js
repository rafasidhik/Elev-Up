import axios from 'axios';

const rawBase = (import.meta.env.VITE_API_URL || '/api').trim().replace(/\/+$/, '');
const API_URL = rawBase.endsWith('/api/notes')
  ? rawBase
  : rawBase.endsWith('/notes')
  ? rawBase
  : rawBase.endsWith('/api')
  ? `${rawBase}/notes`
  : `${rawBase}/api/notes`;

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const getNotes = async (search = '') => {
  const params = search && search.trim() ? { search: search.trim() } : {};
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const getNoteById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createNote = async (noteData) => {
  const response = await axios.post(API_URL, noteData);
  return response.data;
};

export const updateNote = async (id, noteData) => {
  const response = await axios.put(`${API_URL}/${id}`, noteData);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
