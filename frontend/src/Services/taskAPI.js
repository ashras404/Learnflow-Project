import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks/';

const getConfig = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    return {
        headers: { Authorization: `Bearer ${user?.token}` }
    };
};

export const fetchTasks = async () => {
    const response = await axios.get(API_URL, getConfig());
    return response.data;
};

export const createTask = async (taskData) => {
    const response = await axios.post(API_URL, taskData, getConfig());
    return response.data;
};

export const updateTaskStatus = async (id, status) => {
    const response = await axios.put(API_URL + id, { status }, getConfig());
    return response.data;
};

export const deleteTask = async (id) => {
    const response = await axios.delete(API_URL + id, getConfig());
    return response.data;
};