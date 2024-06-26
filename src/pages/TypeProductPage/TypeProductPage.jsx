import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";

const TypeProductPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(30);
  const [loading, setLoading] = useState(false);
  const [panigate, setPanigate] = useState({ page: 0, limit: 10, total: 1 });

 
  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    try {
      setLoading(true);
      const res = await ProductService.getAllProduct(search, limit);
      setProducts(res.data);
      setLoading(false);
      return res.data; 
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
      return []; 
    }
  };
  

  useEffect(() => {
    
  }, []);

  const {
    isPending,
    data: product,
    isFetching,
  } = useQuery({
    queryKey: ["products", limit, searchDebounce],
    queryFn: fetchProductAll, // Truyền hàm fetchProductAll vào queryFn
    config: {
      retries: 3,
      retryDelay: 1000,
      keepPreviousData: true,
    },
  });

  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };

  return (
    <Loading isPending={loading}>
      <div className="h-screen bg-[#efefef] w-full">
        <div style={{ padding: "0 120px", width: "100%", height: "100%" }}>
          <Row
            style={{
              flexWrap: "nowrap",
              paddingTop: "10px",
              height: "calc(100% - 20px)",
            }}
          >
            <Col
              span={5}
              className="bg-[#fff] mr-[50px] p-[10px] rounded-[6px] h-[fit-content] mt-[20px] w-full"
            >
              <NavbarComponent />
            </Col>
            <Col
              span={20}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div className="flex gap-[15px] mt-[20px] flex-wrap" style={{ maxHeight: "calc(100vh - 100px)", overflowY: "scroll" }}>
                {products
                  ?.filter((pro) => {
                    if (searchDebounce === "") {
                      return pro;
                    } else if (
                      pro?.name
                        ?.toLowerCase()
                        ?.includes(searchDebounce?.toLowerCase())
                    ) {
                      return pro;
                    }
                  })
                  ?.map((product) => {
                    if (product.type === state) {                 
                      return (
                        <CardComponent
                          key={product._id}
                          countInStock={product.countInStock}
                          description={product.description}
                          image={product.image}
                          name={product.name}
                          price={product.price}
                          status={product.status}
                          type={product.type}
                          selled={product.selled}
                          discount={product.discount}
                          id={product._id}
                          promotion={product.promotion}
                        />
                      );
                      
                    } else {
                      return null;
                    }
                  })}
              </div>
              <Pagination
                defaultCurrent={panigate.page + 1}
                total={panigate?.total}
                onChange={onChange}
                style={{ textAlign: "center", marginTop: "10px" }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </Loading>
  );
};

export default TypeProductPage;
