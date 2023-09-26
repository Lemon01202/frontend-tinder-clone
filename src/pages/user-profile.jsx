import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from "../components/layout/layout";
import UserService from "../services/user-service";
import userPlaceholder from '../assets/images/user.png';

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const userService = new UserService();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await userService.getUserById(id);
        setUserData(user.data);
      } catch (e) {
        console.error("Error fetching user data:", e);
      }
    };

    fetchUserData();
  }, [id, userService]);

  if (!userData) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
      <Layout>
        <div className="container mx-auto px-4 mt-6 bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <img src={userData?.avatar || userPlaceholder} alt={`${userData?.firstName} ${userData?.lastName}`} className="w-40 h-40 object-cover object-center rounded-full mb-4 border-2 border-indigo-500" />
            <h1 className="text-2xl font-bold mb-2">
              {userData?.firstName} {userData?.lastName}
            </h1>
            <p className="text-gray-600 mb-2">Age: {userData?.age} years old</p>
            <p className="text-gray-600 mb-2">Gender: {userData?.gender}</p>
            <p className="text-gray-600 mb-2">Email: {userData?.email}</p>
            {userData?.bio && <p className="text-gray-600 mt-2 mb-2">Bio: {userData?.bio}</p>}
            {userData?.location && <p className="text-gray-600">Location: {userData?.location}</p>}
          </div>
        </div>
      </Layout>
  );
};

export default UserProfile;
