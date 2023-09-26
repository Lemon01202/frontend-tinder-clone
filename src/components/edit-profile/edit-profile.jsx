import { useState } from 'react';
import UserService from "../../services/user-service";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import userPlaceholder from '../../assets/images/user.png';

const EditProfile = ({ user, onUserUpdate }) => {
  const [avatar, setAvatar] = useState(null);
  const userService = new UserService();
  const navigate = useNavigate();

  const handleUpload = async (event) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}upload/avatar`, formData);
      const image = response.data;

      setAvatar(image.url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = async () => {
    const form = new FormData();

    Object.keys(formData).forEach(key => {
      if (key !== "age" || !user?.age) {
        form.append(key, formData[key]);
      }
    });

    try {
      const updatedUser = await userService.updateProfile(user.id, form);
      localStorage.setItem('user', JSON.stringify(updatedUser.data));

      toast.success("Профиль успешно обновлен!");

      navigate("/");

    } catch (error) {
      toast.error("Ошибка при обновлении профиля!");
      console.error("Error updating profile:", error);
    }
  };


  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    avatar: user?.avatar,
    bio: user?.bio,
    gender: user?.gender,
    age: user?.age,
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
      <div className="flex flex-col items-center p-4 space-y-4 min-h-screen">
        <div className="text-2xl font-bold mb-6">Edit Profile</div>
        <img className="w-24 h-24 rounded-full" src={avatar || formData.avatar || userPlaceholder} alt="User avatar" />
        <input
            type="file"
            onChange={handleUpload}
            className="border p-2 w-full max-w-md"
        />
        <input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="border p-2 w-full max-w-md"
            placeholder="First Name"
        />
        <input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="border p-2 w-full max-w-md"
            placeholder="Last Name"
        />
        <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="border p-2 w-full max-w-md"
            placeholder="Bio"
        ></textarea>
        <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="border p-2 w-full max-w-md"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="border p-2 w-full max-w-md"
            placeholder="Age"
            disabled={user?.age}
        />
        <div className="w-full max-w-md">
          <button onClick={handleSubmit} className="bg-blue-500 p-2 w-full text-white hover:bg-blue-600 transition duration-200">
            Update Profile
          </button>
        </div>
      </div>
  );
};

export default EditProfile;
