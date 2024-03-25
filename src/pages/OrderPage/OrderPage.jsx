import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/slides/orderSlide";
import { DeleteOutlined, MinusOutlined, PlusOutlined, LeftOutlined} from "@ant-design/icons";
import { Button, Checkbox, Form } from "antd";
import { convertPrice } from "../../utils";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import Loading from "../../components/LoadingComponent/Loading";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import { updateUser } from "../../redux/slides/userSlide";
import * as message from "../../components/Message/Message";
import { useNavigate } from "react-router-dom";
import StepComponent from "../../components/StepComponent/StepComponent";
const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const dispatch = useDispatch();
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    id: "",
  });

  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  
  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  const handleChangeCount = (type, idProduct, limited) => {
    if (type === 'increase') {
      if (!limited) {
        const orderItem = order?.orderItems.find(item => item.product === idProduct);
        if (orderItem.amount < orderItem.countInStock) { 
          dispatch(increaseAmount({ idProduct }));
        } else {
          message.warning('Số lượng sản phẩm đạt tối đa')
        }
      }
    } else {
      if (!limited) {
        dispatch(decreaseAmount({ idProduct }));
      }
    }
  };


  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);
  
  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0;
      return total + (priceMemo * (totalDiscount * cur.amount)) / 100;
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo >= 20000 && priceMemo < 500000) {
      return 10000;
    } else if (priceMemo >= 500000 || order?.orderItemsSlected?.length === 0) {
      return 0;
    } else {
      return 20000;
    }
  }, [priceMemo]);
  const totalPriceMemo = useMemo(() => {
    return (
      Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    );
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = order?.orderItems?.map((item) => item?.product);
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);


  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true)
  }

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const { isPending } = mutationUpdate;

  const handleAddCard = () => {
    if (!order?.orderItemsSlected?.length) {
      message.error("Vui lòng chọn sản phẩm");
    } else if (!user?.phone || !user.address || !user.name || !user.city) {
      setIsOpenModalUpdateInfo(true);
    } else {
      navigate("/payment");
    }
  };

  const handleCancelUpdate = () => {
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      city: "",
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };

  const handleUpdateInfoUser = () => {
    const { id, access_token, ...restUserDetails } = user;

    const { image, ...updatedUserDetails } = stateUserDetails;

    const updatedInformation = {
      ...restUserDetails, // Bao gồm tất cả thông tin người dùng, kể cả những thông tin không thay đổi
      ...updatedUserDetails, // Thông tin mới mà người dùng đã cập nhật
    };

    mutationUpdate.mutate(
      { id: id, token: access_token, information: updatedInformation },
      {
        onSuccess: () => {
          dispatch(updateUser({ information: updatedInformation }));
          setIsOpenModalUpdateInfo(false);
          window.location.reload();
        },
      }
    );
  };

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const itemsDelivery = [
    {
      title: '20.000 VND',
      description: 'Dưới 200.000 VND',
    },
    {
      title: '10.000 VND',
      description: 'Từ 200.000 VND đến dưới 500.000 VND',
    },
    {
      title: 'Free ship',
      description : 'Trên 500.000 VND',
    },
  ]
  const handleGoBack = () => {
    navigate('/')
  };

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3 className="text-[20px] font-bold mb-[10px] text-center">Giỏ hàng của tôi</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          
          <div className="w-[910px]">
          <div className="absolute top-[150px] left-[2px]">
        <Button
          type="text"
          icon={<LeftOutlined />}
          onClick={handleGoBack}
        >
          Trở về 
        </Button>
      </div>
            <div className="bg-white px-[16px] py-[9px] rounded-md flex items-center justify-between mb-[4px]">
            <StepComponent items={itemsDelivery} current={diliveryPriceMemo === 10000 
                ? 2 : diliveryPriceMemo === 20000 ? 1 
                : order.orderItemsSlected.length === 0 ? 0:  3}/>
            </div>
            <div className="bg-white px-[16px] py-[9px] rounded-md flex items-center justify-between">
              <div style={{ width: "390px" }}>
                <Checkbox
                  onChange={handleOnchangeCheckAll}
                  checked={listChecked?.length === order?.orderItems?.length}
                />
                <span className="text-gray-700 font-bold text-[13px] ml-[5px] ">
                  {" "}
                  Tất cả ({order?.orderItems?.length} sản phẩm)
                </span>
              </div>
              <div className="flex-1 flex items-center justify-between">
                <span className="text-[14px] font-bold">Đơn giá</span>
                <span className="text-[14px] font-bold">Số lượng</span>
                <span className="text-[14px] font-bold">Thành tiền</span>
                <DeleteOutlined
                  style={{ cursor: "pointer", fontSize: "15px" }}
                  onClick={handleRemoveAllOrder}
                />
              </div>
            </div>
            <div>
              {order?.orderItems?.map((orderItem) => (
                <div className="flex items-center px-[16px] py-[9px] bg-white mt-[12px] justify-between">
                  <div
                    style={{ width: "390px" }}
                    className="flex items-center gap-4"
                  >
                    <Checkbox
                      onChange={onChange}
                      value={orderItem?.product}
                      checked={listChecked.includes(orderItem?.product)}
                    />
                    <img
                      src={orderItem?.image}
                      style={{
                        width: "77px",
                        height: "79px",
                        objectFit: "cover",
                      }}
                      alt="sản phẩm"
                    />
                    <div className="overflow-hidden text-[14px] whitespace-nowrap overflow-ellipsis w-[260px]">
                      {orderItem?.name}
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span>
                      <span style={{ fontSize: "14px", color: "#242424" }}>
                        {convertPrice(orderItem?.price)}
                      </span>
                    </span>
                    <div className="flex items-center justify-center w-[84px] border border-gray-300 rounded-[4px]">
                      <div className="flex items-center justify-center w-[84px] border border-gray-300 rounded-[4px]">
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            width: "50%",
                          }}
                          onClick={() =>
                            handleChangeCount("decrease",orderItem?.product, orderItem?.amount === 1)

                          }
                        >
                          <MinusOutlined
                            style={{
                              color: "#000",
                              fontSize: "10px",
                              textAlign: "center",
                            }}
                          />
                        </button>
                        <input
                          className="w-[30px] border-l-[1px] border-r-[1px] border-solid border-gray-300 rounded-none text-center"
                          defaultValue={orderItem?.amount} value={orderItem?.amount}
                          size="small"
                          style={{ textAlign: "center" }}
                          min={1}
                          max={orderItem?.countInStock}
                        />
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            width: "50%",
                          }}
                          onClick={() =>
                            handleChangeCount("increase", orderItem?.product ,orderItem?.amount === orderItem.countInstock, orderItem?.amount === 1)
                          }
                        >
                          <PlusOutlined
                            style={{
                              color: "#000",
                              fontSize: "10px",
                              textAlign: "center",
                            }}
                           
                          />
                        </button>
                      </div>
                    </div>

                    <span
                      style={{
                        color: "rgb(255, 66, 78)",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {convertPrice(orderItem?.price * orderItem?.amount)}
                    </span>
                    <DeleteOutlined
                      style={{ cursor: "pointer", fontSize: "15px" }}
                      onClick={() => handleDeleteOrder(orderItem?.product)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[320px] ml-[20px] flex flex-col gap-[10px] items-center">
            <div style={{ width: "100%" }}>
              <div className="py-[17px] px-[20px] border-b-[1px] rounded-l-[6px] border-solid border-gray-200 bg-white rounded-t-[6px] w-full">
                <div>
                  <span className="text-[14px]">Địa chỉ: </span>
                  <span className="text-[14px]" style={{ fontWeight: "bold" }}>
                    {`${user?.address} ${user?.city}`}{" "}
                  </span>
                  <span
                    onClick={handleChangeAddress}
                    style={{ color: "#9255FD", cursor: "pointer" , fontSize: '14px'}}
                  >
                    Thay đổi
                  </span>
                </div>
              </div>
              <div className="py-[17px] px-[20px] border-b-[1px] rounded-l-[6px] border-solid border-gray-200 bg-white rounded-t-[6px] w-full">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] ">Tạm tính</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(priceMemo)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] ">Giảm giá</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] ">Phí giao hàng</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(diliveryPriceMemo)}
                  </span>
                </div>
              </div>
              <div className="flex items-start justify-between px-[20px] py-[17px] bg-white rounded-bl-[6px] rounded-br-[6px]">
                <span className="text-[14px] ">Tổng tiền</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      color: "rgb(254, 56, 52)",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    0213
                  </span>
                  <span style={{ color: "#000", fontSize: "11px" }}>
                    (Đã bao gồm VAT nếu có)
                  </span>
                </span>
              </div>
            </div>

            <button
              onClick={() => handleAddCard()}
              className="bg-red-500 hover:bg-red-700 text-white text-[15px] leading-[28px] py-[2px] px-[4px] rounded-[4px] font-[700] border-none transition duration-300 ease-in-out h-[48px] w-[320px]"
            >
              Mua hàng
            </button>
          </div>
        </div>
      </div>
      <ModalComponent
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancelUpdate}
        onOk={handleUpdateInfoUser}
      >
        <Loading isPending={isPending}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            // onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên người dùng"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent
                value={stateUserDetails["name"]}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: "Please input your  phone!" }]}
            >
              <InputComponent
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>

            <Form.Item
              label="Số nhà, đường"
              name="address"
              rules={[
                { required: true, message: "Please input your  address!" },
              ]}
            >
              <InputComponent
                value={stateUserDetails.address}
                onChange={handleOnchangeDetails}
                name="address"
              />
            </Form.Item>
            <Form.Item
              label="Thành phố"
              name="city"
              rules={[{ required: true, message: "Please input your  city!" }]}
            >
              <InputComponent
                value={stateUserDetails.city}
                onChange={handleOnchangeDetails}
                name="city"
              />
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default OrderPage;
