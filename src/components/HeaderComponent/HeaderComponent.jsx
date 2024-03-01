import { Badge, Col, Popover, Row } from "antd";
import React, { useState } from "react";
import * as UserService from "../../services/UserService";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/Loading";
const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state.user);
  const content = (
    <div>
      <p className="cursor-pointer  hover:text-blue-400" >Thông tin người dùng</p>
      {/* {user?.isAdmin && (

        <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
      )} */}
      {/* <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup> */}
      <p className="cursor-pointer hover:text-blue-400" onClick={() => handleLogout()}>Đăng xuất</p>
    </div>
  );
  // const handleClickNavigate = (type) => {
  //   if(type === 'profile') {
  //     navigate('/profile-user')
  //   }else if(type === 'admin') {
  //     navigate('/system/admin')
  //   }else if(type === 'my-order') {
  //     navigate('/my-order',{ state : {
  //         id: user?.id,
  //         token : user?.access_token
  //       }
  //     })
  //   }else {
  //     handleLogout()
  //   }
  //   setIsOpenPopup(false)
  // }
    
  const handleLogout = async () => {
    localStorage.removeItem('access_token');
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  console.log("user", user);
  return (
    <div>
      <Row className="pl-20 pr-120 bg-[#000df7] items-center h-[100px] w-full gap-[16px] flex flex-nowrap">
        <Col span={6}>
          <img
            src="https://www.petmart.vn/wp-content/uploads/2020/09/petmart-logo-trang.png"
            alt=""
            className="w-[250px] h-[66.28px] box-border"
          />
        </Col>
        <Col span={12}>
          <ButtonInputSearch
            size="large"
            placeholder="Tìm kiếm thông tin tại đây"
            textButton="Tìm kiếm"
          />
        </Col>
        <Col span={6} className="flex items-center gap-8">
        <Loading isPending={loading}>
          <div className="flex items-center text-white text-[12px]">
            <UserOutlined className="text-[30px] ml-6" />
            {user?.name ? (
              <>
              <Popover content={content} trigger="click" >
                    {/* <div style={{ cursor: 'pointer',maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div> */}
                    <div className="cursor-pointer">{user.name}</div>
                  </Popover>
              </>
            ) : (
              <div
                className="ml-2 cursor-pointer"
                onClick={handleNavigateLogin}
              >
                <span className="whitespace-nowrap">Đăng nhập/Đăng ký</span>
                <div>
                  <span>Tài khoản</span>
                  <CaretDownOutlined />
                </div>
              </div>
            )}
          </div>
          </Loading>
          <div className="text-white text-[12px] ml-[20px]">
            <Badge count={4} size="small">
              <ShoppingCartOutlined className="text-[30px] text-white" />
            </Badge>

            <div>
              <span className="whitespace-nowrap">Giỏ hàng</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderComponent;
