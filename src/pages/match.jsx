import React, { useEffect, useState } from 'react';
import Layout from "../components/layout/layout";
import UserCard from "../components/user-card/user-card";
import userService from "../services/user-service";
import LikesService from "../services/likes-service";
import {useRecoilValue} from "recoil";
import {userState} from "../states/user-state";
import UserService from "../services/user-service";

const MatchPage = () => {
  const [matches, setMatches] = useState([]);
  const currentUser = useRecoilValue(userState);

  const usersService = new UserService();
  const likesService = new LikesService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await usersService.getMatches();
        const users = response.data.filter(user => user.id !== currentUser.id);

        const usersWithLikes = await Promise.all(users.map(user => {
          return likesService.isLikedByUser(user.id)
              .then(isLiked => {
                return { ...user, isLiked: isLiked.data };
              });
        }));

        setMatches(usersWithLikes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(matches)
  return (
      <Layout>
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold my-4">Mutual Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.length > 0 ?
                matches.map(user => <UserCard key={user.id} user={user} setUsers={setMatches} users={matches} />)
                :
                <div className="text-center text-lg font-medium text-gray-500 bg-gray-100 p-6 rounded-md shadow-md">
                  No matches found.
                </div>
            }
          </div>
        </div>
      </Layout>
  );
};

export default MatchPage;
