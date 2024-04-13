import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slides/userSlide";
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

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      console.log("Interceptor is called"); // Thêm log ở đây
      const currentTime = new Date();
      const { decoded } = handleDecoded();
  
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  

  const handleGetDetailsUser = async (id, token) => {
    
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
    setIsLoading(false);
  };
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