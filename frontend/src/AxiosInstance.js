import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'https://zerodha-7.onrender.com',
  withCredentials: true,
});

export default AxiosInstance;