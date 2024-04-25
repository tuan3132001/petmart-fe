import { axiosJWT } from "./UserService";

export const createOrder = async (data, access_token) => {
  console.log('data',data?.user)
  const res = await axiosJWT.post(
    `https://petmart-be.onrender.com/order/create/${data.user}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsOrder = async (id,access_token,user) => {
    const res = await axiosJWT.get(`https://petmart-be.onrender.com/order/get-details-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
  }

  export const getOrderByUserId = async (id,access_token) => {
    const res = await axiosJWT.get(`https://petmart-be.onrender.com/order/get-order-user/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
  }
  export const cancelOrder = async (id, access_token, userId ) => { 
    console.log('access',access_token)
    const res = await axiosJWT.delete(`https://petmart-be.onrender.com/order/cancel-order/${userId}/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
  }
