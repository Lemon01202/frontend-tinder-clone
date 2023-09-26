import HttpService from "./http-service";

class LikesService extends HttpService {
  static displayName = 'LikesService';

  getLikes = async () => {
    try {
      return this.get(`/likes/matches`);
    } catch (e) {
      console.log(e);
    }
  };

  likeUser = async (likedUserId) => {
    try {
      return this.post(`/likes/${likedUserId}`);
    } catch (e) {
      console.log(e);
    }
  };

  unlikeUser = async (likedUserId) => {
    try {
      return this.post(`/likes/unlike/${likedUserId}`);
    } catch (e) {
      console.log(e);
    }
  };

  isLikedByUser = async (likedUserId) => {
    try {
      return this.get(`/likes/check/${likedUserId}`);
    } catch (e) {
      console.log(e);
    }
  };
}

export default LikesService;
