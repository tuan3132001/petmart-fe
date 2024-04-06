import Card from "antd/es/card/Card";
import React, { useEffect, useState } from "react";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";
import * as PromotionService from "../../services/PromotionService";
const CardComponent = (props) => {
  const [promotions, setPromotions] = useState([]);

  const {
    selled,
    costPrice,
    countInStock,
    description,
    image,
    name,
    price,
    status,
    type,
    unit,
    id,
    promotion,
  } = props;
  const navigate = useNavigate();

  const handelDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };
  useEffect(() => {
    fetchPromotionAll();
  }, []);
  const fetchPromotionAll = async () => {
    try {
      const res = await PromotionService.getAllPromotion();
      setPromotions(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error(error);
    }
  };

  const findPromotionById = (promotionId) => {
    return promotions.find((promotion) => promotion._id === promotionId);
  };

  // Lấy dữ liệu khuyến mãi cho sản phẩm
  const productPromotion = findPromotionById(promotion);

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
            src={image}
          />
        </div>
      </div>
      <div className="h-1/2 px-2">
        {promotions.length > 0 && productPromotion && (
          <div className="bg-[#ffe97a] w-[40px] h-[20px] py-[2px] px-[4px] absolute top-0 right-0">
            <span className="text-[#bc2848] text-[12px] font-[roboto] font-[500] block">
              -{productPromotion.discount}%
            </span>
          </div>
        )}
        <div className="mt-4">
          <div className="font-[400] font-[roboto] text-[15px] mb-2 leading-[1.4em] text-[#000000]">
            {name}
          </div>
          <span className="text-[#bc2848] text-[1.8rem] font-[roboto] font-bold">
            {convertPrice(price)}
          </span>
        
          <div className="text-[15px] mt-2">
            {" "}
            <span className=" text-[rgb(120,120,120)]">
              {" "}
            Đã bán {selled === 0 ? 0 : selled}+
            </span>
          </div>

         
          <div className="text-[15px] mt-2"><span className="font-[500]">Trạng thái:</span> <span className="text-[green]">{status}</span></div>
        </div>
      </div>
    </Card>
  );
};

export default CardComponent;
