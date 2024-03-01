import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isJsonString } from "./utils";
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/slides/userSlide";
import * as UserService from "../src/services/UserService";
function App() {
  
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  useEffect(()=>{
    const {storageData, decoded} = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded.id, storageData);
    } else {
      console.log("Người dùng chưa đăng nhập hoặc đã logout. Không thể lấy dữ liệu.");
    }
  },[])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return { decoded, storageData }
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const {decoded} = handleDecoded()

      if(decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken()
        config.headers['token'] = `Bearer ${data?.access_token}`
      }
    return config;
  }, (err) => {
    return Promise.reject(err)
  })

  const handleGetDetailsUser = async (id, token) => {
    // const storage = localStorage.getItem('refresh_token')
    // console.log(storage, 'storage')
    // const refreshToken = JSON.parse(storage)
    const res = await UserService.getDetailsUser(id, token)
    console.log('res', res)
    dispatch(updateUser({ ...res?.data, access_token:token}))
  }
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
