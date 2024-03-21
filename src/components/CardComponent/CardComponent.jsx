import Card from "antd/es/card/Card";
import React from "react";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";

const CardComponent = (props) => {
  const { costPrice, countInStock, description, image, name, price, status, type, unit, id } = props;
  const navigate = useNavigate();

  const handelDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <Card
      className="border border-solid border-gray-300 rounded-lg p-4 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 relative"
      hoverable
      bodyStyle={{ padding: "10px" }}
      style={{ height: "400px", width: "281px" }}
      onClick={() => handelDetailsProduct(id)}
    >
      <div className="h-1/2 w-full relative overflow-hidden">
        <div className="w-full h-full bg-gray-200 relative">
          <img
            className="object-center h-full w-full"
            alt="example"
            src="https://www.petmart.vn/wp-content/uploads/2021/06/thuc-an-cho-meo-truong-thanh-royal-canin-regular-fit-321-400x400.jpg"
          />
        </div>
      </div>
      <div className="h-1/2 px-2">
        <div className="bg-[#ffe97a] w-[40px] h-[20px] py-[2px] px-[4px] absolute top-0 right-0">
          <span className="text-[#bc2848] text-[12px] font-[roboto] font-[500] block">-25%</span>
        </div>
        <div className="mt-4">
          <div className="font-[400] font-[roboto] text-[15px] mb-2 leading-[1.4em] text-[#000000]">
            {name}
          </div>
          <span className="text-[#bc2848] text-[1.8rem] font-[roboto] font-bold">
            {convertPrice(price)}
           
          </span>
          {/* Hiển thị phần description */}
          <div className="text-[15px] mt-2">Mô tả: {description}</div>
          {/* Hiển thị phần status */}
          <div className="text-[15px] mt-2">Tình trạng: {status}</div>
        </div>
      </div>
    </Card>
  );
};

export default CardComponent;
