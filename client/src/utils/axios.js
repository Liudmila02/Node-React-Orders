import axios from 'axios';

export const request = axios.create({
 baseURL: 'http://localhost:5000/',
 withCredentials: true,
});