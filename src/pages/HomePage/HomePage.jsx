import React, { useEffect, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slide1 from "../../assets/images/slide1.webp";
import slide2 from "../../assets/images/slide2.webp";
import slide3 from "../../assets/images/slide3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Button, BackTop, Menu, Collapse } from "antd";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import Footer from "../../components/FooterComponent/FooterComponent";
import {
  SmileOutlined
} from '@ant-design/icons';
const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const [typeProducts, setTypeProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6);
  const [openMenu, setOpenMenu] = useState(false);
  const { Panel } = Collapse;
  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    try {
      const res = await ProductService.getAllProduct(search, limit);
      return res;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error(error);
    }
  };

  const {
    isPending,
    data: products,
    isFetching,
  } = useQuery({
    queryKey: ["products", limit, searchDebounce],
    queryFn: fetchProductAll,
    config: {
      retries: 3,
      retryDelay: 1000,
      keepPreviousData: true,
    },
  });

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
    <Loading isPending={isPending || loading}>
      <div style={{ width: "100%", margin: "0 auto" }}>
        <div className="flex items-center justify-around text-[20px] font-bold flex-wrap">
        
          {typeProducts.map((item) => (
            <div
              key={item}
              className="relative cursor-pointer transition duration-300 ease-in-out hover:text-blue-500 flex items-center mb-4"
            >
              <TypeProduct name={item} />
              <span className="ml-1">{typeProductIcons[item]}</span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 opacity-0 transition duration-300 ease-in-out"></div>
            </div>
          ))}
        </div>
      </div>
      <div
        id="container"
        className="bg-[#efefef] h-[full] w-full overflow-y-auto px-10 relative"
        style={{ boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center" }}
      >
         {/* <Collapse
          bordered={false}
          defaultActiveKey={[]}
          style={{ width: '100%' }}
          className="mt-4"
          onChange={() => setOpenMenu(!openMenu)}
        >
          <Panel header="Menu" key="1">
            {typeProducts.map((item, index) => (
              <div
                key={index}
                className="relative cursor-pointer transition duration-300 ease-in-out hover:text-blue-500 flex items-center mb-4"
              >
                <TypeProduct name={item} />
                <span className="ml-1">{typeProductIcons[item]}</span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 opacity-0 transition duration-300 ease-in-out"></div>
              </div>
            ))}
          </Panel>
        </Collapse> */}
        <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
          <SliderComponent
            arrImages={[slide1, slide2, slide3]}
            style={{ width: "100%", minWidth: "300px", maxWidth: "100%" }}
          />
          
          <div
            className="mt-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px]"
            style={{ width: "100%", minWidth: "300px", maxWidth: "100%" }}
          >
            
            {products?.data?.map((product) => (
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
                style={{ minWidth: "200px" }}
              />
            ))}
          </div>
        </div>
        <div className="w-[100%] flex items-center mt-[10px] justify-center mb-[50px]">
          <Button
            type="primary"
            ghost
            className="rounded-[4px] w-[240px] h-[38px] hover:bg-blue-500 hover:border-blue-500 hover:text-white"
            onClick={() => setLimit((prevLimit) => prevLimit + 6)}
            disabled={products && products.data && products.data.length < limit}
          >
            Xem thêm
          </Button>
        </div>
      </div>
      <Footer/>
    </Loading>
  );
};

export default HomePage;
