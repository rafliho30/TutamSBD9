import axios from 'axios';

const API_URL = 'http://localhost:3000/my-notes';

export const fetchNotes = async () => {
  return axios.get(`${API_URL}/getAllNotes`);
};

export const addNote = async (note) => {
  return axios.post(`${API_URL}/addNote`, note);
};

export const updateNote = async (id, note) => {
  return axios.put(`${API_URL}/editNote/${id}`, note);
};

export const deleteNote = async (id) => {
  return axios.delete(`${API_URL}/deleteNote/${id}`);
};
