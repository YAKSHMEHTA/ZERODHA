import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:3002',
  withCredentials: true,
});

export default AxiosInstance;