import { Col, Row } from "antd";
import React from "react";

import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";

const HeaderComponent = () => {
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
          size = 'large'
          placeholder = 'Tìm kiếm thông tin tại đây'
          textButton = 'Tìm kiếm'
          />
        </Col>
        <Col span={6} className="flex items-center gap-8">
          <div className="flex items-center text-white text-[12px]">
            <UserOutlined className="text-[30px] ml-6" />
            <div className="ml-2">
              <span className="whitespace-nowrap">Đăng nhập/Đăng ký</span>
              <div>
                <span>Tài khoản</span>
                <CaretDownOutlined />
              </div>
            </div>
          </div>
          <div className="text-white text-[12px] ml-[20px]">
            <ShoppingCartOutlined className="text-[30px] " />
            <div><span className="whitespace-nowrap">Giỏ hàng</span></div>
            
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderComponent;
