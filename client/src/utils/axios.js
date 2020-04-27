import axios from 'axios';

export const request = axios.create({
 baseURL: 'http://localhost:4000/',
 withCredentials: true,
});