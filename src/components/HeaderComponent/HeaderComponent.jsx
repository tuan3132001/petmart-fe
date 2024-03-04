import { Badge, Col, Popover, Row } from "antd";
import React, { useEffect, useState } from "react";
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
import { searchProduct } from "../../redux/slides/productSlide";
const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search,setSearch] = useState('')
  const user = useSelector((state) => state.user);
  const content = (
    <div>
      <p
        className="cursor-pointer  hover:text-blue-400 mb-[4px]"
        onClick={() => navigate("/profile-user")}
      >
        Thông tin người dùng
      </p>
      {/* {user?.isAdmin && (

        <p className="cursor-pointer hover:text-blue-400 mb-[4px]" onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</p>
      )} */}
      {/* <p className="cursor-pointer hover:text-blue-400 mb-[4px]" onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</p> */}
      <p
        className="cursor-pointer hover:text-blue-400 mb-[4px]"
        onClick={() => handleLogout()}
      >
        Đăng xuất
      </p>
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

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar)
    setLoading(false);
  }, [user?.name, user?.avatar]);

  const handleLogout = async () => {
    localStorage.removeItem("access_token");
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
    navigate("/");
  };

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  
  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value));
  }
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
            textbutton="Tìm kiếm"
            onChange={onSearch}
          />
        </Col>
        <Col span={6} className="flex items-center gap-8">
          <Loading isPending={loading}>
            <div className="flex items-center text-white text-[12px]">
              {userAvatar ? (
                <img src={userAvatar} alt='avtar' className="h-[30px] w-[30px] rounded-[50%] object-cover mr-[5px]"/>
              ) : (
                <UserOutlined className="text-[30px] ml-6" />
              )}
             
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click">
                    {/* <div style={{ cursor: 'pointer',maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div> */}
                    <div className="cursor-pointer">
                      {userName?.length ? userName : user?.email}
                    </div>
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
