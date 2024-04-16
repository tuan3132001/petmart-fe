import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import {resetUser, updateUser } from "./redux/slides/userSlide";
import * as UserService from "../src/services/UserService";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
 
  useEffect(() => {
    setIsLoading(true);
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded.id, storageData);
    } else {
      console.log(
        "Người dùng chưa đăng nhập hoặc đã logout. Không thể lấy dữ liệu."
      );
    }
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date();
    const { decoded } = handleDecoded();
    if (decoded?.exp < currentTime.getTime() / 1000) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const data = await UserService.refreshToken(refreshToken);
          config.headers['token'] = `Bearer ${data?.access_token}`;
          localStorage.setItem('access_token', data.access_token);
        } catch (error) {
          console.error("Lỗi khi làm mới token:", error);
          dispatch(resetUser());
        }
      } else {
        dispatch(resetUser());
      }
    }
    return config;
  }, (err) => {
    return Promise.reject(err);
  });

  

  const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken}))
  }
  return (
    
      <BrowserRouter>
      {/* <Loading isPending={isPending}> */}
        <Routes>
          {routes.map((route) => {
            const isChechAuth =
              !route.isPrivate ||
              user?.role === "admin" ||
              user?.role === "manage";
            const Page = route.page;
            const Layout = route.isShowHeader || route.isShowFooter ? DefaultComponent : Fragment;
            return (
              <Route
                key={route.path}
                path={
                  typeof route.path === "string" && isChechAuth
                    ? route.path
                    : null
                }
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
        {/* </Loading> */}
      </BrowserRouter>
   
  );
}
export default App;