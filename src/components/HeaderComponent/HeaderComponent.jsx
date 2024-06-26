import React, { useEffect, useState } from "react";
import { Badge, Col, Popover, Row } from "antd";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  ContactsOutlined,
  HomeOutlined,
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
  const [placeholder, setPlaceholder] = useState(
    "Tìm kiếm thông tin tại đây..."
  );
  const [index, setIndex] = useState(0);
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
    const placeholderText = "Tìm kiếm thông tin tại đây...";
    const timer = setTimeout(() => {
      if (index < placeholderText.length) {
        setPlaceholder(placeholderText.slice(0, index + 1));
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [index]);

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

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  return (
    <div
      className="header-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Row className="pl-20 pr-120 bg-transparent items-center h-[150px] w-full gap-[16px] flex flex-nowrap justify-between">
        <Col span={3}>
          <img
            src="https://www.petmart.vn/wp-content/uploads/2020/09/petmart-logo-trang.png"
            alt=""
            className="w-[250px] h-[66.28px] box-border cursor-pointer transition-transform duration-300 transform hover:scale-110"
            onClick={() => navigate("/")}
          />
        </Col>
        <div className=" text-[12px] cursor-pointer text-blue-800 hover:text-blue-950 transition-colors duration-300">
          <div>
            <span
              className="font-bold
                text-[16px] whitespace-nowrap text-blue-800 hover:text-blue-950 transition-colors duration-300"
              onClick={() => navigate("/")}
            >
              {" "}
              <HomeOutlined />
              Trang chủ
            </span>
          </div>
        </div>
        <div className=" text-[12px] cursor-pointer text-blue-800 hover:text-blue-950 transition-colors duration-300">
          <div>
            <span
              className="font-bold
                text-[16px] whitespace-nowrap text-blue-800 hover:text-blue-950 transition-colors duration-300"
              onClick={() => navigate("/introduction")}
            >
              {" "}
              <ContactsOutlined />
              Giới thiệu
            </span>
          </div>
        </div>

        <Col span={9}>
          <ButtonInputSearch
            size="large"
            placeholder={placeholder}
            textbutton="Tìm kiếm"
            onChange={onSearch}
            className="hover:bg-gray-200 transition-colors duration-300"
          />
        </Col>
        <Col span={7} className="flex items-center ml-[10px] mr-[10px]">
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
                      className="cursor-pointer text-[16px] font-bold whitespace-nowrap text-blue-800 hover:text-blue-950 transition-colors duration-300 truncate"
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
                  <span className="text-[16px] cursor-pointer font-bold whitespace-nowrap text-blue-800 hover:text-blue-950 transition-colors duration-300 truncate">
                    Đăng nhập/Đăng ký
                  </span>
                  <div>
                    <span className="text-[16px] font-bold whitespace-nowrap text-blue-800 hover:text-blue-950 transition-colors duration-300 truncate">
                      Tài khoản
                    </span>
                    <CaretDownOutlined className=" text-blue-800 hover:text-blue-950 transition-colors duration-300" />
                  </div>
                </div>
              )}
            </div>
          </Loading>
          <div className="text-[16px] ml-[20px] cursor-pointer text-blue-800 hover:text-blue-950 transition-colors duration-300">
            <div>
              <span
                className="font-bold
        text-[16px] whitespace-nowrap text-blue-800 hover:text-blue-950 transition-colors duration-300 truncate"
                onClick={() => navigate("/post")}
              >
                {" "}
                <SolutionOutlined />
                Bài viết
              </span>
            </div>
          </div>
          <div
            className="flex items-center ml-[20px] cursor-pointer text-blue-800 hover:text-blue-950 transition-colors duration-300"
            onClick={() => navigate("/order")}
          >
            <Badge
              count={
                user?.id
                  ? order?.orderItems?.filter(
                      (orderItem) => orderItem?.userId === user?.id
                    ).length
                  : 0
              }
              size="small"
            >
              <ShoppingCartOutlined className="text-[30px] text-blue-800 hover:text-blue-950 transition-colors duration-300" />
            </Badge>
            <div className="ml-2">
              <span className="font-bold text-[16px] whitespace-nowrap text-blue-800 hover:text-blue-950 transition-colors duration-300 truncate">
                Giỏ hàng
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderComponent;
