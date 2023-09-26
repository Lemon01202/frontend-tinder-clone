import HttpService from "./http-service";

class UploadFilesService extends HttpService {
  static displayName = 'UploadFilesService';

  uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      return this.post('/upload/avatar', formData);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}

export default UploadFilesService;
