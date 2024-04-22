import React from "react";
import {
  WrapperAllPrice,
  WrapperContentInfo,
  WrapperHeaderUser,
  WrapperInfoUser,
  WrapperItem,
  WrapperItemLabel,
  WrapperLabel,
  WrapperNameProduct,
  WrapperProduct,
  WrapperStyleContent,
} from "./style";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { orderContant } from "../../contant";
import { convertPrice } from "../../utils";
import { useMemo } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";

const DetailsOrderPage = () => {
  const params = useParams();
  const location = useLocation();
  const { state } = location;
  const { id, user } = params;
  const navigate = useNavigate();
  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token, user);
    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ["orders-details"],
    queryFn: fetchDetailsOrder,
    enabled: id !== undefined,
  });

  const { isPending, data } = queryOrder;
  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [data]);

  const handleGoBack = () => {
    navigate(`/my-order`);
  };

  return (
    <Loading isPending={isPending}>
      <div style={{ width: "100%", height: "100%", background: "#f5f5fa" }}>
        <div style={{ width: "1270px", margin: "0 auto", height: "1270px" }}>
          <h4 className="text-[20px] font-bold  text-center">
            Chi tiết đơn đặt hàng
          </h4>
          <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={handleGoBack}
            className="mb-[20px] "
          >
            Trở về
          </Button>
          <WrapperHeaderUser>
            <WrapperInfoUser>
              <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
              <WrapperContentInfo>
                <div className="mb-[10px]">
                  <span className="font-[500] text-[15px]">Người nhận: </span>{" "}
                  <span className="font-[400] text-[15px] text-[red] ">
                    {data?.shippingAddress?.fullName}
                  </span>
                </div>
                <div className="mb-[10px]">
                  <span className="font-[500] text-[15px]">Địa chỉ: </span>{" "}
                  <span className="font-[400] text-[15px] text-[red] ">{`${data?.shippingAddress?.address}, ${data?.shippingAddress?.district}, ${data?.shippingAddress?.city}`}</span>
                </div>
                <div>
                  <span className="font-[500] text-[15px]">Điện thoại: </span>{" "}
                  <span className="font-[400] text-[15px] text-[red] ">
                    {data?.shippingAddress?.phone}
                  </span>
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Hình thức giao hàng</WrapperLabel>
              <WrapperContentInfo>
                {data?.shippingPrice > 10000 ? (
                  <div className="delivery-info mb-[10px]">
                    <span className="name-delivery text-orange-400 italic">
                      FAST{" "}
                    </span>{" "}
                    <span className=" text-orange-400 font-bold  text-[15px] ">
                      Giao hàng nhanh
                    </span>
                  </div>
                ) : (
                  <div className="delivery-info mb-[10px]">
                    <span className="name-delivery text-orange-400 italic">
                      GO_JEK{" "}
                    </span>
                    <span className=" text-orange-400 font-bold  text-[15px] ">
                      {" "}
                      Giao hàng tiết kiệm
                    </span>
                  </div>
                )}
                <div className="text-[15px]">
                  <span className="font-[500]">Phí giao hàng: </span>{" "}
                  <span className="font-[400] text-[15px] text-[red] ">
                    {convertPrice(data?.shippingPrice)}
                  </span>
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Hình thức thanh toán</WrapperLabel>
              <WrapperContentInfo>
                <div className="text-[15px] font-[500]">
                  {orderContant.payment[data?.paymentMethod]}
                </div>
                <div className="status-payment text-[red]">
                  {data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
          </WrapperHeaderUser>
          <WrapperStyleContent>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ width: "670px", fontWeight: "bold", fontSize: "15px" }}
              >
                Sản phẩm
              </div>
              <WrapperItemLabel>Giá tiền</WrapperItemLabel>
              <WrapperItemLabel>Số lượng</WrapperItemLabel>
              <WrapperItemLabel>Giảm giá</WrapperItemLabel>
            </div>
            {data?.orderItems?.map((order) => {
              // Kiểm tra userId của sản phẩm có trùng khớp với userId được truyền vào không
              const isUserMatched = order.userId === user;

              return (
                <WrapperProduct>
                  <WrapperNameProduct>
                    <img
                      src={order?.image}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        border: "1px solid rgb(238, 238, 238)",
                        padding: "2px",
                      }}
                      alt=""
                    />
                    <div
                      style={{
                        width: 260,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        marginLeft: "10px",
                        height: "70px",
                        fontWeight: 'bold'
                      }}
                    >
                      {order?.name}
                    </div>
                  </WrapperNameProduct>
                  <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                  <WrapperItem className="ml-[20px]">
                    {order?.amount}
                  </WrapperItem>
                  <WrapperItem>
                    {/* Kiểm tra userId trước khi tính giảm giá */}
                    {isUserMatched && order?.discount
                      ? convertPrice(
                          (order.price * order.discount * order?.amount) / 100
                        )
                      : "0 VND"}
                  </WrapperItem>
                </WrapperProduct>
              );
            })}

            <WrapperAllPrice>
              <WrapperItemLabel>Tạm tính</WrapperItemLabel>
              <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
            </WrapperAllPrice>
            <WrapperAllPrice>
              <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
              <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
            </WrapperAllPrice>
            <WrapperAllPrice>
              <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
              <WrapperItem>
                <WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem>
              </WrapperItem>
            </WrapperAllPrice>
          </WrapperStyleContent>
        </div>
      </div>
    </Loading>
  );
};

export default DetailsOrderPage;
