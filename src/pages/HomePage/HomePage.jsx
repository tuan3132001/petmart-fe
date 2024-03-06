import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slide1 from "../../assets/images/slide1.webp";
import slide2 from "../../assets/images/slide2.webp";
import slide3 from "../../assets/images/slide3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const refSearch= useRef()
  const [stateProduct, setStateProduct] = useState([])
  const arr = ["Thức ăn", "Quần áo", "Đồ chơi", "Dụng cụ chăm sóc"];
  const fetchProductAll = async (search) => {
    const res = await ProductService.getAllProduct(search);
    if(search.length>0){
     setStateProduct(res?.data)
    }else{
      return res;
    }
  };

  useEffect(()=>{
    if(refSearch.current){
      fetchProductAll(searchProduct)
    }
    refSearch.current = true; // Thay đổi giá trị của thuộc tính current của refSearch
  },[searchProduct])
  
  

  const { isPending, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductAll,
    config: {
      retries: 3,
      retryDelay: 1000,
    },
  });
  useEffect(()=>{
    if(products?.data?.length > 0){
     setStateProduct(products?.data)
    }
  },[products])
  return (
    <>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <div className="flex items-center gap-[24px] justify-start text-[20px] font-bold">
          {arr.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </div>
      </div>
      <div
        id="container"
        className="bg-[#efefef] h-[100%] px-10"
        style={{ boxSizing: "border-box" }}
      >
        <SliderComponent arrImages={[slide1, slide2, slide3]} />
        <div className="mt-[20px] w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[17px]">
          {stateProduct?.map((product) => {
            return (
              <CardComponent
                key={product._id}
                costPrice={product.costPrice}
                countInStock={product.countInStock}
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                status={product.status}
                type={product.type}
                unit={product.unit}
                id={product._id}
              />
            );
          })}
        </div>
        <div className="w-[100%] flex items-center mt-[10px] justify-center">
          <Button
            type="primary"
            ghost
            className="rounded-[4px] w-[240px] h-[38px] hover:bg-blue-500 hover:border-blue-500 hover:text-white"
          >
            Xem thêm
          </Button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
