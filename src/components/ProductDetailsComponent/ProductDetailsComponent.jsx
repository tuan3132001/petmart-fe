import { Col, Image, Row } from "antd";
import React from "react";
import { StarFilled } from "@ant-design/icons";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
const ProductDetailsComponent = () => {
  const onChange = () => {};
  return (
    <Row className="p-[16px] bg-white rounded-[4px]">
      <Col span={10} className="border-r-[1px] border-solid border-[#e5e5e5] pr-[8px]">
        <Image
          src="https://down-vn.img.susercontent.com/file/30be6d3c9a25aeb7403a2b9fad7e2bb2"
          alt=""
          preview={false}
        />
        <Row className="h-[100px] w-[full] flex pt-[10px]">
          <Col span={4} style={{ flexBasis: "unset" }}>
            <Image
              className="h-[64px] w-[64px]"
              src="	https://down-vn.img.susercontent.com/file/1abd769c5cdd3dcb1ea6294aeed2b561_tn"
              alt=""
              preview="false"
            />
          </Col>
          <Col span={4} style={{ flexBasis: "unset" }}>
            <Image
              src="	https://down-vn.img.susercontent.com/file/1abd769c5cdd3dcb1ea6294aeed2b561_tn"
              alt=""
              preview="false"
            />
          </Col>
          <Col span={4} style={{ flexBasis: "unset" }}>
            <Image
              src="	https://down-vn.img.susercontent.com/file/1abd769c5cdd3dcb1ea6294aeed2b561_tn"
              alt=""
              preview="false"
            />
          </Col>
          <Col span={4} style={{ flexBasis: "unset" }}>
            <Image
              src="	https://down-vn.img.susercontent.com/file/1abd769c5cdd3dcb1ea6294aeed2b561_tn"
              alt=""
              preview="false"
            />
          </Col>
          <Col span={4} style={{ flexBasis: "unset" }}>
            <Image
              src="	https://down-vn.img.susercontent.com/file/1abd769c5cdd3dcb1ea6294aeed2b561_tn"
              alt=""
              preview="false"
            />
          </Col>
          <Col span={4} style={{ flexBasis: "unset" }}>
            <Image
              src="	https://down-vn.img.susercontent.com/file/1abd769c5cdd3dcb1ea6294aeed2b561_tn"
              alt=""
              preview="false"
            />
          </Col>
        </Row>
      </Col>
      <Col span={14} className="pl-[10px]">
        <div>
          MASTI Đồ ăn được làm nhuyễn vị cá ngừ dành cho mèo cưng LI0275
        </div>
        <div>
          <StarFilled className="text-[13px] text-yellow-400 ml-1" />
          <StarFilled className="text-[13px] text-yellow-400 ml-1" />
          <StarFilled className="text-[13px] text-yellow-400 ml-1" />
          <span className="ml-1 text-[rgb(120,120,120)]"> | Đã bán 1000+</span>
        </div>
        <div className="bg-[rgb(250,250,250)] rounded-[4px] ">
          <h1 className="text-[32px] mr-[8px] font-[500] leading-10 p-[10px] mt-[10px]">
            110.000
          </h1>
        </div>
        <div>
          <span>Giao đến </span>
          <span className="text-[15px] leading-[24px] font-[500]  underline truncate ">
            96 Định Công, Hoàng Mai, Hà Nội
          </span>{" "}
          -
          <span className=" text-[16px]  leading-[24px] font-[500] text-blue-600">
            {" "}
            Đổi địa chỉ
          </span>
        </div>
        <div className="mt-[10px] mr-0  py-[10px] px-0 border-t-[1px] border-b-[1px] border-solid border-[#e5e5e5] ">
          <div className="text-[15px] text-black ">Số lượng</div>
          <div className="flex  items-center w-[100px]">
            <div className="rounded-[4px] border-[1px] border-solid border-[#ccc] w-[100px] flex mt-[10px]">
              <button className="w-1/3 border-none bg-transparent flex items-center justify-center">
                <PlusOutlined className="text-[#000] text-[20px]" />
              </button>
              <input
                type="number"
                className="w-1/3 border-t-0 border-b-0 border-l-[1px] border-r-[1px]  rounded-none text-center"
                onChange={onChange}
              />
              <button className="w-1/3 border-none bg-transparent flex items-center justify-center">
                <MinusOutlined className="text-[#000] text-[20px]" />
              </button>
            </div>
          </div>
        </div>
        <div className="gap-[30px] flex items-center mt-[30px]">
          <button className="bg-red-500 hover:bg-red-700 text-white text-[15px] leading-[28px] py-2 px-4 rounded-[4px] font-[700] border-none transition duration-300 ease-in-out h-[48px] w-[220px]">
            Chọn mua
          </button>

          <button className="bg-teal-500 hover:bg-teal-700 text-white text-[15px] leading-[28px] font-[700] py-2 px-4 rounded-[4px] border-none transition duration-300 ease-in-out h-[48px] w-[220px]">
            Mua trả sau
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetailsComponent;
