import { Checkbox, Rate } from "antd";
import React, { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductService";
import TypeProduct from "../TypeProduct/TypeProduct";

const NavbarComponent = () => {
  const onChange = () => {};
  const [typeProducts, setTypeProducts] = useState([]);
  const [selectedType, setSelectedType] = useState(""); 

  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          return (
            <h1 className="text-[rgb(56,56,61)] text-[12px] font-[400]">
              {option}
            </h1>
          );
        });
      case "checkbox":
        return (
          <Checkbox.Group className="w-full flex flex-col" onChange={onChange}>
            {options.map((option) => {
              return (
                <Checkbox className="ml-0" value={option.value}>
                  {option.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case "star":
        return options.map((option) => {
          return (
            <div className="flex gap-[4px]">
              <Rate className="text-[12px]" disabled defaultValue={option} />
              <span>Từ {option} sao</span>
            </div>
          );
        });
      case "price":
        return options.map((option) => {
          return (
            <div className={`rounded-[10px] text-[rgb(56,56,61)] bg-[rgb(238,238,238)] w-fit p-[4px] ${selectedType === option ? 'bg-blue-200' : ''}`}>
              {option}
            </div>
          );
        });
      default:
        return {};
    }
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const typeProductIcons = {
    "Thức ăn": "🍖",
    "Đồ chơi": "🎾",
    "Dụng cụ chăm sóc": "🛁",
    "Phụ kiện": "🐾",
    "Đồ dùng sinh hoạt": "🏠",
  };

  return (
    <div>
      <h4 className="text-[rgb(56,56,61)] text-[15px] font-bold text-center mb-[10px]">
        Loại sản phẩm
      </h4>
      <div className="flex flex-col gap-[12px]">
        {typeProducts.map((item) => (
          <div
            key={item}
            className={`relative cursor-pointer transition duration-300 ease-in-out ${selectedType === item ? 'text-blue-500' : 'text-[rgb(56,56,61)]'} flex items-center mb-4`}
            onClick={() => setSelectedType(item)}
          >
            <TypeProduct name={item} />
            <span className="ml-1">{typeProductIcons[item]}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-[12px]">
        {renderContent("price", ["dưới 100.000", "trên 100.000"])}
      </div>
    </div>
  );
};

export default NavbarComponent;
