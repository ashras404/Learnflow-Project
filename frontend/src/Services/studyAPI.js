import axios from 'axios';

const API_URL = 'http://localhost:5000/api/study/';

const getConfig = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    return {
        headers: { Authorization: `Bearer ${user?.token}` }
    };
};

export const startSession = async (topic) => {
    const response = await axios.post(API_URL + 'start', { topic }, getConfig());
    return response.data;
};

export const endSession = async (id) => {
    const response = await axios.put(API_URL + `end/${id}`, {}, getConfig());
    return response.data;
};

export const fetchStats = async () => {
    const response = await axios.get(API_URL + 'stats', getConfig());
    return response.data;
};