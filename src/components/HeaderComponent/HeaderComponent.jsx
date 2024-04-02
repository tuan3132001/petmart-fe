import React, { useEffect, useState } from "react";
import { Badge, Col, Popover, Row } from "antd";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/slides/userSlide";
import { searchProduct } from "../../redux/slides/productSlide";
import Loading from "../LoadingComponent/Loading";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import * as UserService from "../../services/UserService";
import backgroundImage from "../../assets/images/headerLogo.jpg";

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user);

  const content = (
    <div>
      <p
        className="cursor-pointer hover:text-blue-400 mb-[7px]"
        onClick={() => handleClickNavigate("profile")}
      >
        Thông tin người dùng
      </p>
      <p
        className="cursor-pointer hover:text-blue-400 mb-[7px]"
        onClick={() => handleClickNavigate(`my-order`)}
      >
        Đơn hàng của tôi
      </p>
      <p
        className="cursor-pointer hover:text-blue-400 mb-[7px]"
        onClick={() => handleClickNavigate()}
      >
        Đăng xuất
      </p>
    </div>
  );

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  const handleLogout = async () => {
    localStorage.removeItem("access_token");
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
    navigate("/sign-in");
  };

  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-user");
    } else if (type === "my-order") {
      navigate(`/my-order`, {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
  };

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const onSearch = (value) => {
    setSearch(value);
    dispatch(searchProduct(value));
  };

  return (
    <div
      className="header-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Row className="pl-20 pr-120 bg-transparent items-center h-[150px] w-full gap-[16px] flex flex-nowrap justify-between">
        <Col span={6}>
          <img
            src="https://www.petmart.vn/wp-content/uploads/2020/09/petmart-logo-trang.png"
            alt=""
            className="w-[250px] h-[66.28px] box-border cursor-pointer transition-transform duration-300 transform hover:scale-110"
            onClick={() => navigate("/")}
          />
        </Col>
        <Col span={10}>
          <ButtonInputSearch
            size="large"
            placeholder="Tìm kiếm thông tin tại đây..."
            textbutton="Tìm kiếm"
            onChange={onSearch}
            className="hover:bg-gray-200 transition-colors duration-300"
          />
        </Col>
        <Col span={8} className="flex items-center ml-[50px]">
          <Loading isPending={loading}>
            <div className="flex items-center text-white text-[12px]">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="avtar"
                  className="h-[30px] w-[30px] rounded-[50%] object-cover mr-[5px] cursor-pointer hover:opacity-80 transition-opacity duration-300"
                />
              ) : (
                <UserOutlined className="text-[30px] ml-6 cursor-pointer font-[500] whitespace-nowrap text-blue-800 hover:text-blue-950 transition-colors duration-300" />
              )}

              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div
                      className="cursor-pointer text-[15px] font-[500] whitespace-nowrap text-blue-800 hover:text-blue-950 transition-colors duration-300"
                      onClick={() => setIsOpenPopup((prev) => !prev)}
                    >
                      {userName?.length ? userName : user?.email}
                    </div>
                  </Popover>
                </>
              ) : (
                <div
                  className="ml-2 cursor-pointer"
                  onClick={handleNavigateLogin}
                >
                  <span className="text-[15px] cursor-pointer font-[500] whitespace-nowrap text-blue-800 hover:text-blue-950 transition-colors duration-300">
                    Đăng nhập/Đăng ký
                  </span>
                  <div>
                    <span className="text-[15px] font-[500] whitespace-nowrap text-blue-800 hover:text-blue-950 transition-colors duration-300">
                      Tài khoản
                    </span>
                    <CaretDownOutlined className=" text-blue-800 hover:text-blue-950 transition-colors duration-300" />
                  </div>
                </div>
              )}
            </div>
          </Loading>
          <div className=" text-[12px] ml-[20px] cursor-pointer text-blue-800 hover:text-blue-950 transition-colors duration-300">
            <div>
            
              <span
                className="font-[500]
                text-[15px] whitespace-nowrap text-blue-800 hover:text-blue-950 transition-colors duration-300"
                onClick={()=> navigate('/post')}
              >
                {" "}
                <SolutionOutlined />
                Bài viết
              </span>
            </div>
          </div>
          <div
            className=" text-[12px] ml-[20px] cursor-pointer text-blue-800 hover:text-blue-950 transition-colors duration-300"
            onClick={() => navigate("/order")}
          >
            <Badge
              count={user?.id ? order?.orderItems?.filter(orderItem => orderItem?.userId === user?.id).length : 0}
              size="small"
            >
              <ShoppingCartOutlined className="text-[30px] text-blue-800 hover:text-blue-950 transition-colors duration-300" />
            </Badge>
            <div>
              <span
                className="font-[500]
                text-[15px] whitespace-nowrap text-blue-800 hover:text-blue-950 transition-colors duration-300"
              >
                {" "}
                Giỏ hàng
              </span>
            </div>
          </div>
          {/* <div className=" text-[12px] ml-[20px] cursor-pointer text-blue-800 hover:text-blue-950 transition-colors duration-300">
            <span
              className="font-[500]
              text-[15px] whitespace-nowrap text-blue-800 hover:text-blue-950 transition-colors duration-300"
            >
              {" "}
              Hotline
            </span>

            <div>
              <span
                className="font-[500]
                text-[15px] whitespace-nowrap text-blue-800 hover:text-blue-950 transition-colors duration-300"
              >
                {" "}
                0362019318
              </span>
            </div>
          </div> */}
        </Col>
      </Row>
    </div>
  );
};

export default HeaderComponent;
