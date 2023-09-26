import SignIn from "../sign-in/sign-in";
import Profile from "../../pages/profile";
import {isAuthenticated} from "../../services/auth-service";
import MainPage from "../../pages/main";
import MatchPage from "../../pages/match";
import UserProfile from "../../pages/user-profile";

export const routes = [
  {
    path: '/sign-in',
    element: <SignIn />,
    condition: () => !isAuthenticated(),
    redirect: '/profile',
  },
  {
    path: '/profile',
    element: <Profile />,
    condition: () => isAuthenticated(),
    redirect: '/sign-in',
  },
  {
    path: '/',
    element: <MainPage />,
    condition: () => isAuthenticated(),
    redirect: '/sign-in',
  },
  {
    path: '/matches',
    element: <MatchPage />,
    condition: () => isAuthenticated(),
    redirect: '/sign-in',
  },
  {
    path: '/profile/:id',
    element: <UserProfile />,
    condition: () => isAuthenticated(),
    redirect: '/sign-in',
  },
  {
    path: '/?page=:page',
    element: <MainPage />,
    condition: () => isAuthenticated(),
    redirect: '/sign-in',
  },
  {
    path: '*',
    element: <MainPage />,
    condition: () => isAuthenticated(),
    redirect: '/sign-in',
  },
];
