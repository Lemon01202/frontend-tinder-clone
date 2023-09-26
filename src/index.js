import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UnauthorizedLayout from "./components/unauthorized-layout/unauthorized-layout";
import {RecoilRoot} from "recoil";
import {BrowserRouter} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <RecoilRoot>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
          <ToastContainer />
          <UnauthorizedLayout />
        </GoogleOAuthProvider>
      </RecoilRoot>
    </BrowserRouter>
);
