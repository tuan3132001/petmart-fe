import React from "react";
import {
  Lable,
  WrapperInfo,
  WrapperContainer,
  WrapperValue,
  WrapperItemOrder,
  WrapperItemOrderInfo,
  WrapperValueTotal
} from "./style";
import Loading from "../../components/LoadingComponent/Loading";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../contant";
import { convertPrice } from "../../utils";
import { useSelector } from "react-redux";

const OrderSucess = () => {
  const location = useLocation();
  const { state } = location;
  console.log("state", state);
  const user = useSelector((state) => state.user);
  return (
    <div style={{ background: "#f5f5fa", with: "100%", height: "100%" }}>
      <Loading isPending={false}>
        <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
          <h3 className="text-center font-bold text-[20px]  mb-[10px]">
            Đơn hàng đặt thành công
          </h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức giao hàng</Lable>
                  <WrapperValue>
                    <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                      {state?.delivery &&
                      orderContant.delivery[state?.delivery] === "FAST"
                        ? "Giao hàng nhanh"
                        : "Giao hàng tiết kiệm"}
                    </span>
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức thanh toán</Lable>

                  <WrapperValue>
                    {orderContant.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Thông tin nhận hàng</Lable>
                  <WrapperValue>
                    <p class="mb-2">Người nhận: {state?.name}</p>
                    <p class="mb-2">Số điện thoại: {state?.phone}</p>
                    <p class="mb-2">
                      {" "}
                      Địa chỉ: {state?.address}, {state?.city}
                    </p>
                  </WrapperValue>
                </div>
              </WrapperInfo>

              <WrapperItemOrderInfo>
                <h1 className="text-[15px] font-bold">Đơn hàng</h1>
                {state.orders?.map((order) => {
                  // Kiểm tra xem order có thuộc người dùng hiện tại không
                  if (order.userId === user?.id) {
                    return (
                      <WrapperItemOrder key={order?.name}>
                        <div
                          style={{
                            width: "500px",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <img
                            src={order.image}
                            style={{
                              width: "77px",
                              height: "79px",
                              objectFit: "cover",
                            }}
                            alt=""
                          />
                          <div
                            style={{
                              width: 260,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              fontWeight:'bold'
                            }}
                          >
                            {order?.name}
                          </div>
                        </div>
                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <span>
                            <span
                              style={{ fontSize: "14px", color: "#242424" }}
                              className="font-bold mr-[120px]"
                            >
                              Giá tiền: {convertPrice(order?.price)}
                            </span>
                          </span>
                          <span>
                            <span
                              style={{ fontSize: "14px", color: "#242424" }}
                              className="font-bold"
                            >
                              Số lượng: {order?.amount}
                            </span>
                          </span>
                        </div>
                      </WrapperItemOrder>
                    );
                  }
                })}
                {/* <div className="mt-[30px]">
                  <span
                    style={{ fontSize: "16px", color: "red" }}
                    className="font-bold "
                  >
                    Tổng tiền: {convertPrice(state?.totalPriceMemo)}
                  </span>
                </div> */}
                
              </WrapperItemOrderInfo>
              <WrapperInfo>
                <div>
                  {/* <Lable>Thông tin nhận hàng</Lable> */}
                  <WrapperValueTotal >
                     Tổng tiền: {convertPrice(state?.totalPriceMemo)}
                  </WrapperValueTotal>
                </div>
              </WrapperInfo>
            </WrapperContainer>
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default OrderSucess;
