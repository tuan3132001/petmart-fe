import { Col, Row } from "antd";
import Search from "antd/es/input/Search";
import React from "react";
import "../../../src/index.css";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const HeaderComponent = () => {
  return (
    <div>
      <Row className="pl-20 pr-120 bg-[#000df7] items-center h-[150px]">
        <Col span={6}>
          <img
            src="https://www.petmart.vn/wp-content/uploads/2020/09/petmart-logo-trang.png"
            alt=""
            className="w-[250px] h-[66.28px] box-border"
          />
        </Col>
        <Col span={12}>
          <Search
            placeholder="Tìm kiếm thông tin tại đây"
            enterButton="Tìm kiếm"
            size="large"
            className="custom-search"
          />
        </Col>
        <Col span={6} className="flex items-center gap-8">
          <div className="flex items-center text-white text-12">
            <UserOutlined className="text-[30px] ml-6" />
            <div className="ml-2">
              <span>Đăng nhập/Đăng ký</span>
              <div>
                <span>Tài khoản</span>
                <CaretDownOutlined />
              </div>
            </div>
          </div>
          <div className="text-white text-12">
            <ShoppingCartOutlined className="text-[30px]" />
            <span>Giỏ hàng</span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderComponent;
