import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
});

apiClient.interceptors.response.use(

response => {
      return response;
    },
    error => {
      if (error.response && error.response.status === 401) {
        useNavigate()('/sign-in');
      }
      return Promise.reject(error);
    }
);

export default apiClient;
