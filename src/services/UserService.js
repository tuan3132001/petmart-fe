import axios from "axios";
export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(`https://petmart-be.onrender.com/user/sign-in`, data);
  return res.data;
};

export const signupUser = async (data) => {
  const res = await axios.post(
    `https://petmart-be.onrender.com/user/sign-up`,
    data
  );
  return res.data;
};

export const getDetailsUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `https://petmart-be.onrender.com/user/get-detail/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const refreshToken = async (refreshToken) => {
  console.log('refreshToken', refreshToken)
  const res = await axios.post(`https://petmart-be.onrender.com/user/refresh-token`, {} , {
      headers: {
          token: `Bearer ${refreshToken}`,
      }
  })
  return res.data
}

export const logoutUser = async () => {
  const res = await axios.post( `https://petmart-be.onrender.com/user/log-out`,);
  return res.data;
};

export const updateUser = async (id, data, access_token) => {
  const res = await axiosJWT.put(`https://petmart-be.onrender.com/user/update-user/${id}`, data, {
      headers: {
          token: `Bearer ${access_token}`,
      }
  })
  return res.data
}


export const getUsersInfo = async () => {
  const res = await axiosJWT.get(`https://petmart-be.onrender.com/user/getUsersInfo`)
  return res.data
}
