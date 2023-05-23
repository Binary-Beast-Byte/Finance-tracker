import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.everestsound.com',
    withCredentials: true,
});

export default instance;
