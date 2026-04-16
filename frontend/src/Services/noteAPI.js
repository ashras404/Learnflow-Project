import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes/';

const getConfig = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    return {
        headers: { Authorization: `Bearer ${user?.token}` }
    };
};

export const fetchNotes = async () => {
    const response = await axios.get(API_URL, getConfig());
    return response.data;
};

export const createNote = async (noteData) => {
    const response = await axios.post(API_URL, noteData, getConfig());
    return response.data;
};

export const deleteNote = async (id) => {
    const response = await axios.delete(API_URL + id, getConfig());
    return response.data;
};