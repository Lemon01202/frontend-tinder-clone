import React, { useEffect, useState } from 'react';
import Layout from "../components/layout/layout";
import UserService from "../services/user-service";
import LikesService from "../services/likes-service";
import {FaFilter } from 'react-icons/fa';
import {usersPerPage} from "../constants/users.contstants";
import { useLocation } from "react-router-dom";
import Pagination from "../components/pagination/pagination";
import UserCard from "../components/user-card/user-card";

const MainPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const usersService = new UserService();
  const likesService = new LikesService();
  const [showFilters, setShowFilters] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageFromURL = queryParams.get('page');

  const [page, setPage] = useState(pageFromURL ? parseInt(pageFromURL, 10) : 0);
  const [filters, setFilters] = useState({
    location: null,
    tags: [],
    gender: null,
    ageStart: 0,
    ageEnd: 100,
  });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    usersService.getUsers({
      search,
      page,
      offset: page * usersPerPage,
      limit: usersPerPage,
      ...filters,
    }).then(data => {
          const user = data;
          setTotalPages(user.data.totalPages);

          return Promise.all(user.data.items.map(user => {
            return likesService.isLikedByUser(user.id)
                .then(isLiked => {
                  return { ...user, isLiked: isLiked.data };
                });
          }));
        })
        .then(usersWithLikes => {
          setUsers(usersWithLikes);
        });
  }, [search, filters, page]);

  return (
      <Layout>
        <div className="container mx-auto px-4">
          <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-5 mb-4 px-3 py-2 border rounded w-full shadow focus:outline-none focus:border-blue-500"
          />

          <div className="mb-4">
            <button
                onClick={() => setShowFilters(!showFilters)}
                className="mb-4 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded focus:outline-none flex items-center"
            >
              <FaFilter className="mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            {showFilters && <>
              <div className="mb-3">

                <label className="block text-sm font-bold mb-2">Gender:</label>
                <select
                    value={filters.gender || ""}
                    onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:border-blue-500"
                >
                  <option value="">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-bold mb-2">Age Range:</label>
                <div className="flex justify-between">
                  <input
                      type="number"
                      value={filters.ageStart}
                      onChange={(e) => setFilters(prev => ({ ...prev, ageStart: parseInt(e.target.value) }))}
                      placeholder="Min"
                      className="w-1/2 mr-2 px-3 py-2 border rounded shadow focus:outline-none focus:border-blue-500"
                  />
                  <input
                      type="number"
                      value={filters.ageEnd}
                      onChange={(e) => setFilters(prev => ({ ...prev, ageEnd: parseInt(e.target.value) }))}
                      placeholder="Max"
                      className="w-1/2 px-3 py-2 border rounded shadow focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users?.map(user => (
                <UserCard user={user} users={users} setUsers={setUsers} />
            ))}
          </div>

          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </Layout>
  );
};

export default MainPage;
