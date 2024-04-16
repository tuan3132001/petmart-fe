import React, { useEffect, useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import {
  WrapperItemOrder,
  WrapperListOrder,
  WrapperHeaderItem,
  WrapperFooterItem,
  WrapperContainer,
  WrapperStatus,
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";

const MyOrderPage = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(state?.id, state?.token);
    return res.data;
  };
  const user = useSelector((state) => state.user);

  const queryOrder = useQuery({
    queryKey: ["orders"],
    queryFn: fetchMyOrder,
    enabled: !!state?.id && !!state?.token, // Chuyển đổi thành boolean
  });
  const { isPending, data } = queryOrder;
  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token,
      },
    });
  };

  const mutation = useMutationHooks((data) => {
    const { id, token, userId } = data;
    console.log("data", data);
    const res = OrderService.cancelOrder(id, token, userId);
    return res;
  });

  const handleCanceOrder = (order) => {
    mutation.mutate(
      {
        id: order._id,
        token: state?.token,
        orderItems: order?.orderItems,
        userId: user.id,
      },
      {
        onSuccess: () => {
          queryOrder.refetch();
        },
      }
    );
  };
  const {
    isPending: isPendingCancel,
    isSuccess: isSuccessCancel,
    isError: isErrorCancle,
    data: dataCancel,
  } = mutation;

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "OK") {
      message.success("Hủy đơn hàng thành công");
    } else if (isSuccessCancel && dataCancel?.status === "ERR") {
      message.error(dataCancel?.message);
    } else if (isErrorCancle) {
      message.error("Hủy đơn hàng không thành công");
    }
  }, [isErrorCancle, isSuccessCancel]);

  const renderProduct = (data, userId) => {
    return data?.orderItems?.map((order) => {
      // Kiểm tra xem userId của hóa đơn có trùng khớp với userId bạn muốn kiểm tra hay không
      if (data?.user === userId) {
        return (
          <WrapperHeaderItem key={order?._id}>
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
                fontSize: "15px",
                fontWeight: 'bold'
              }}
            >
              {order?.name}
            </div>
            <span
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#242424",
                marginLeft: "auto",
              }}
            >
              {convertPrice(order?.price)}
            </span>
          </WrapperHeaderItem>
        );
      }
    });
  };

  return (
    <Loading isPending={isPending || isPendingCancel}>
      <WrapperContainer>
        <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
          <h4 className="text-center text-[20px] font-bold ">
            Đơn hàng của tôi
          </h4>
          <WrapperListOrder>
            {data?.map((order) => {
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        color: "green",
                      }}
                      className="mb-[10px]"
                    >
                      Trạng thái
                    </span>
                    <div>
                      <span
                        className="text-[15px] font-[500] "
                        style={{ color: "rgb(255, 66, 78)" }}
                      >
                        Giao hàng:{" "}
                      </span>
                      <span
                        className="text-[15px]"
                        style={{
                          color: "rgb(90, 32, 193)",
                          fontWeight: "bold",
                        }}
                      >{`${
                        order.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"
                      }`}</span>
                    </div>
                    <div>
                      <span
                        className="text-[15px] font-[500]"
                        style={{ color: "rgb(255, 66, 78)" }}
                      >
                        Thanh toán:{" "}
                      </span>
                      <span
                        className="text-[15px]"
                        style={{
                          color: "rgb(90, 32, 193)",
                          fontWeight: "bold",
                        }}
                      >{`${
                        order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"
                      }`}</span>
                    </div>
                  </WrapperStatus>
                  {renderProduct(order, user?.id)}
                  <WrapperFooterItem>
                    <div>
                      <span
                        style={{ color: "rgb(255, 66, 78)" }}
                        className="text-[15px]"
                      >
                        Tổng tiền:{" "}
                      </span>
                      <span
                        style={{
                          fontSize: "15px",
                          color: "rgb(56, 56, 61)",
                          fontWeight: 700,
                        }}
                      >
                        {convertPrice(order?.totalPrice)}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <ButtonComponent
                        onClick={() => handleCanceOrder(order)}
                        size={40}
                        styleButton={{
                          height: "36px",
                          border: "1px solid red",
                          borderRadius: "4px",
                        }}
                        textbutton={"Hủy đơn hàng"}
                        styleTextButton={{ color: "red", fontSize: "15px" }}
                      ></ButtonComponent>
                      <ButtonComponent
                        onClick={() => handleDetailsOrder(order?._id, user?.id)}
                        size={40}
                        styleButton={{
                          height: "36px",
                          border: "1px solid green",
                          borderRadius: "4px",
                        }}
                        textbutton={"Xem chi tiết"}
                        styleTextButton={{ color: "green", fontSize: "15px" }}
                      ></ButtonComponent>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              );
            })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </Loading>
  );
};

export default MyOrderPage;
