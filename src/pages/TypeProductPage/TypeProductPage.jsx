import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import Loading from "../../components/LoadingComponent/Loading";

const TypeProductPage = () => {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductType = async (type) => {
    try {
      setLoading(true);
      const res = await ProductService.getProductType(type);
      if (res?.status === "OK") {
        setProducts(res?.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state);
    }
  }, [state]);

  const onChange = () => {};

  return (
    <Loading isPending={loading}>
  <div className="h-screen bg-[#efefef] w-full">
    <div style={{ padding: "0 120px", width: "100%", height: "100%" }}>
      <Row style={{ flexWrap: "nowrap", paddingTop: "10px", height: "calc(100% - 20px)" }}>
        <Col span={4} className="bg-[#fff] mr-[50px] p-[10px] rounded-[6px] h-[fit-content] mt-[20px] w-full">
          <NavbarComponent />
        </Col>
        <Col span={20} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div className="flex gap-[15px] mt-[20px] flex-wrap">
            {products?.map((data) => (
              <CardComponent
                key={data._id}
                costPrice={data.costPrice}
                countInStock={data.countInStock}
                description={data.description}
                image={data.image}
                name={data.name}
                price={data.price}
                status={data.status}
                type={data.type}
                unit={data.unit}
                id={data._id}
              />
            ))}
          </div>
          <Pagination
            defaultCurrent={2}
            total={500}
            onChange={onChange}
            className="mt-[10px] text-center "
          />
        </Col>
      </Row>
    </div>
  </div>
</Loading>

  );
};

export default TypeProductPage;
