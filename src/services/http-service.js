import axios from 'axios';

class Http {
  constructor(navigate) {
    this.navigate = navigate;

    this.instance = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.instance.interceptors.request.use(
        (config) => {
          const token = this.getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
    );

    this.instance.interceptors.response.use(
        response => {
          return response;
        },
        error => {
          if (error.response && error.response.status === 401) {
            this.navigate('/sign-in');
          }
          return Promise.reject(error);
        }
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  get(url, config) {
    return this.instance.get(url, config);
  }

  patch(url, data, config) {
    return this.instance.patch(url, data, config);
  }

  put(url, data, config) {
    return this.instance.put(url, data, config);
  }

  post(url, data, config) {
    return this.instance.post(url, data, config);
  }

  delete(url, config) {
    return this.instance.delete(url, config);
  }
}

export default Http;
