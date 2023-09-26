import React, { useState } from 'react';
import {useRecoilState} from "recoil";
import {userState} from "../../states/user-state";
import {useNavigate} from "react-router-dom";
import {logout} from "../../services/auth-service";

const Layout = ({ children }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const onLogoClick = () => {
    navigate('/');
  }

  const handleLogoutClick = () => {
    logout();
    setUser(null);
    navigate('/sign-in');
  };

  return (
      <div className="flex flex-col h-screen bg-gray-200">
        <header className="bg-gray-700 px-4 py-2 flex justify-between items-center">
          <div className="text-white font-bold cursor-pointer" onClick={onLogoClick}>Your Logo</div>

          <div className="relative">
            <img
                onClick={handleAvatarClick}
                className="h-10 w-10 rounded-full cursor-pointer"
                src={user.avatar}
                alt="User Avatar"
            />

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-xl">
                  <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Перейти в профиль
                  </a>
                  <a href="/matches" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Совпадения
                  </a>
                  <button onClick={handleLogoutClick} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Выйти
                  </button>
                </div>
            )}
          </div>
        </header>

        <main className="flex-grow bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>
  );
};

export default Layout;
