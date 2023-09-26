import { useEffect } from 'react';
import { setToken } from '../../services/auth-service';
import {Navigate, Route, Routes } from "react-router-dom";
import {useRecoilState} from "recoil";
import {userState} from "../../states/user-state";
import {routes} from "./routes";

const UnauthorizedLayout = () => {
  const [, setUser] = useRecoilState(userState);

  const handleLoginResponse = (event) => {
    const { jwt, user } = event.data;
    if (jwt && user) {
      setToken(jwt);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    }
  };


  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }

    window.addEventListener('message', handleLoginResponse);

    return () => {
      window.removeEventListener('message', handleLoginResponse);
    };
  }, []);

  return (
      <Routes>
        {routes.map((route, index) => {
          if (route.condition && route.redirect) {
            return (
                <Route
                    key={index}
                    path={route.path}
                    element={
                      route.condition()
                          ? route.element
                          : <Navigate to={route.redirect} />
                    }
                />
            );
          } else {
            return (
                <Route
                    key={index}
                    path={route.path}
                    element={route.element || <Navigate to={route.redirect} />}
                />
            );
          }
        })}
      </Routes>
  );
}

export default UnauthorizedLayout;
