import HttpService from "./http-service";

class UserService extends HttpService {
  static displayName = 'UserService';

  getUsers = async (params) => {
    try {
      return this.get(`/users`, { params });
    } catch (e) {
      console.log(e);
    }
  };

  getUserById = async (id) => {
    try {
      return this.get(`/users/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  getMatches = async () => {
    try {
      return this.get(`/users/matches`);
    } catch (e) {
      console.log(e);
    }
  };

  updateProfile = async (id, data) => {
    try {
      return this.put(`/users/${id}/edit`, data);
    } catch (e) {
      console.log(e);
    }
  };
}

export default UserService;
