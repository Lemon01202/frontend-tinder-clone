import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/auth/google/callback';

const sendGoogleTokenToServer = async (token) => {
  try {
    const response = await axios.post(SERVER_URL, {
      token: token,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default sendGoogleTokenToServer;
