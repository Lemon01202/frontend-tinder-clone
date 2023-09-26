import React from 'react';
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useRecoilValue} from "recoil";
import {userState} from "../../states/user-state";
import LikesService from "../../services/likes-service";
import {Link} from "react-router-dom";
import userPlaceholder from '../../assets/images/user.png';

const UserCard = ({ user, users, setUsers }) => {
  const currentUser = useRecoilValue(userState);
  const likesService = new LikesService();

  const handleLike = async (userId) => {
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) return;
    if (users[userIndex].isLiked) {
      await likesService.unlikeUser(userId);
      setUsers(prevUsers => {
        const newUsers = [...prevUsers];
        newUsers[userIndex].isLiked = false;
        return newUsers;
      });
    } else {
      await likesService.likeUser(userId);
      setUsers(prevUsers => {
        const newUsers = [...prevUsers];
        newUsers[userIndex].isLiked = true;
        return newUsers;
      });
    }
  };

  return (
      <div key={user.id} className="border p-4 rounded">
        <img src={user.avatar || userPlaceholder} alt={`${user.firstName} ${user.lastName}`} className="w-40 h-40 object-cover object-center rounded-full" />
        <div className="mt-2">
          <Link to={`/profile/${user.id}`} className={`text-xl ${user.gender === 'female' ? 'text-pink-500' : user.gender === 'male' ? 'text-blue-500' : ''}`}>
            {user.firstName} {user.lastName}
          </Link>
          <p>{user.age} years old</p>
        </div>
        {user.id !== currentUser.id ? <>
              <button onClick={() => handleLike(user.id)} className="mt-2">
                {user.isLiked ?
                    <FaHeart color="red" size="24px" /> :
                    <FaRegHeart color="red" size="24px" />
                }
              </button>
            </> :
            <>You</>
        }
      </div>
  );
};

export default UserCard;
