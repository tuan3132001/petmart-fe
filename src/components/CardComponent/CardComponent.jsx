import Card from "antd/es/card/Card";
import React from "react";
import { StarFilled } from "@ant-design/icons";
const CardComponent = () => {
  return (
    <Card
      className="border border-solid border-gray-300 rounded-lg p-[15px] w-[202.88px] h-[383.78px]"
      hoverable
      bodyStyle={{ padding: "10px" }}
      style={{ width: 240 }}
      cover={
        <img
          className="h-[169.28px] w-[169.28px] mx-auto mb-[10px] relative"
          alt="example"
          src="https://www.petmart.vn/wp-content/uploads/2021/06/thuc-an-cho-meo-truong-thanh-royal-canin-regular-fit-321-400x400.jpg"
        />
      }
    >
    <div className="bg-[#ffe97a] w-[40px] h-[20px] py-[2px] px-[4px] absolute top-0 right-0">
    <span className="text-[#bc2848] text-[12px] font-[roboto] font-[500] block  ">-25%</span>
    </div>
      <div className="mt-[30px]">
        <div className="font-[400] font-[roboto] text-[15px] mt-[1.5px] mb-[8px] leading-[1.4em] text-[#000000]">
          Thức ăn cho mèo trưởng thành ROYAL CANIN Regular Fit 32
        </div>
        <div className="text-[15px] text-[rgb(128,128,137)] flex items-center mb-[8px] ">
          <span>
            4.5<StarFilled className="text-[13px] text-yellow-600" />
          </span>
          <span> | Đã bán 1000+</span>
        </div>
        <span className="text-[#bc2848] text-[1.8rem] font-[roboto] font-bold">
          110.000
          <span className="text-[65%] relative top-[-7px] font-[400]">₫</span>
        
        </span>
      </div>
    </Card>
  );
};

export default CardComponent;
