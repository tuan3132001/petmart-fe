import React, { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductService";
import TypeProduct from "../TypeProduct/TypeProduct";
import "./style.css";
const NavbarComponent = () => {
  const [typeProducts, setTypeProducts] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  useEffect(() => {
    const fetchProductAll = async () => {
      try {
        setLoading(true);
        const res = await ProductService.getAllProduct();
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProductAll();
  }, []);

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  return (
    <div>
      <h4 className="text-[rgb(56,56,61)] text-[20px] font-bold text-center mb-[10px]">
        Loại sản phẩm
      </h4>
      <div className="flex flex-col gap-[15px] mt-[30px]">
        {typeProducts.map((item, index) => (
          <div
            key={item}
            className={`font-[500] text-[15px] relative cursor-pointer transition duration-300 ease-in-out ${
              selectedType === item ? "text-blue-500" : "text-[rgb(56,56,61)]"
            } flex items-center mb-4`}
            onClick={() => setSelectedType(item)}
            style={{
              animation: `blink-color 1.5s infinite ${index * 0.2}s`,
              borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
              paddingBottom: "20px",
            }}
          >
            <TypeProduct name={item.name} id={item._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavbarComponent;
