import { Col, Image, Row } from "antd";
import React, { useEffect, useState } from "react";
import { StarFilled } from "@ant-design/icons";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { isPending } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slides/orderSlide";
import { convertPrice, initFacebookSDK } from "../../utils";
import * as message from "../Message/Message";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import CommentComponent from "../CommentComponent/CommentComponent";

const ProductDetailsComponent = ({ idProduct }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);

  const onChange = (value) => {
    setNumProduct(Number(value));
  };
  useEffect(() => {
    initFacebookSDK()
}, [])
  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };
  const { isPending, data: productDetails } = useQuery({
    queryKey: ["product-details", idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct,
  });

  const handleChangeCount = (type, limited) => {
    if (type === "increase") {
      if (!limited) {
        setNumProduct(numProduct + 1);
      }
    } else {
      if (!limited) {
        setNumProduct(numProduct - 1);
      }
    }
  };

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      if (productDetails?.countInStock === 0) {
        // Hiển thị thông báo đã hết hàng
        message.warning("Sản phẩm đã hết hàng");
      } else {
        // Thêm sản phẩm vào giỏ hàng
        dispatch(
          addOrderProduct({
            orderItem: {
              name: productDetails?.name,
              amount: numProduct,
              image: productDetails?.image,
              price: productDetails?.price,
              product: productDetails?._id,
              countInStock: productDetails?.countInStock,
            },
          })
        );
        message.success("Sản phẩm đã được thêm vào giỏ hàng");
      }
    }
  };
  console.log("countInStock", productDetails?.countInStock);
  return (
    <Loading isPending={isPending}>
      <Row className="p-[16px] bg-white rounded-[4px]">
        <Col
          span={10}
          className="border-r-[1px] border-solid border-[#e5e5e5] pr-[8px]"
        >
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
          <div className="font-[400] font-[roboto] text-[15px] mb-2 leading-[1.4em] text-[#000000]">
            {productDetails?.name}
          </div>
          <div>
            <StarFilled className="text-[13px] text-yellow-400 ml-1" />
            <StarFilled className="text-[13px] text-yellow-400 ml-1" />
            <StarFilled className="text-[13px] text-yellow-400 ml-1" />
            <span className="ml-1 text-[rgb(120,120,120)]">
              {" "}
              | Đã bán{" "}
              {productDetails?.selled === 0 ? 0 : productDetails?.selled}+
            </span>
          </div>
          <div className="bg-[rgb(250,250,250)] rounded-[4px] ">
            <h1 className="text-[32px] mr-[8px] font-[500] leading-10 p-[10px] mt-[10px]">
              {convertPrice(productDetails?.price)}
            </h1>
          </div>
          <div>
            <span>Giao đến </span>
            <span className="text-[15px] leading-[24px] font-[500]  underline truncate ">
              {user?.address} {user?.city}
            </span>{" "}
            
            
          </div>
          <LikeButtonComponent
                     dataHref={ true 
                                ? "https://developers.facebook.com/docs/plugins/" 
                                : window.location.href
                            } 
                    />
          <div className="mt-[10px] mr-0  py-[10px] px-0 border-t-[1px] border-b-[1px] border-solid border-[#e5e5e5] ">
            <div className="text-[15px] text-black ">Số lượng</div>
            <div className="flex  items-center w-[100px]">
              <div className="rounded-[4px] border-[1px] border-solid border-[#ccc] w-[100px] flex mt-[10px]">
                <button
                  onClick={() =>
                    handleChangeCount("decrease", numProduct === 1)
                  }
                  className="cursor-pointer w-1/3 border-none bg-transparent flex items-center justify-center"
                >
                  <MinusOutlined className="text-[#000] text-[15px]" />
                </button>
                <input
                  type="text"
                  className="w-1/3 border-t-0 border-b-0 border-l-[1px] border-r-[1px] rounded-none text-center"
                  onChange={onChange}
                  value={numProduct}
                  style={{ textAlign: "center" }}
                />
                <button
                  onClick={() =>
                    handleChangeCount(
                      "increase",
                      numProduct === productDetails?.countInStock
                    )
                  }
                  className="cursor-pointer w-1/3 border-none bg-transparent flex items-center justify-center"
                >
                  <PlusOutlined className="text-[#000] text-[15px]" />
                </button>
              </div>
            </div>
          </div>
          <div className="gap-[30px] flex items-center mt-[30px]">
            <button
              onClick={handleAddOrderProduct}
              className="bg-red-500 hover:bg-red-700 text-white text-[15px] leading-[28px] py-2 px-4 rounded-[4px] font-[700] border-none transition duration-300 ease-in-out h-[48px] w-[220px]"
            >
              Thêm vào giỏ hàng
            </button>

           
          </div>
        </Col>
        <CommentComponent dataHref={true
                        ? "https://developers.facebook.com/docs/plugins/comments#configurator"
                        : window.location.href
                    }  width='1270' />
      </Row>
    </Loading>
  );
};

export default ProductDetailsComponent;
