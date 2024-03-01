import axios from "axios";
export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(`http://localhost:3000/user/sign-in`, data);
  return res.data;
};

export const signupUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-up`,
    data
  );
  return res.data;
};

export const getDetailsUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `http://localhost:3000/user/get-detail/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  console.log(res.data);
  return res.data;
};

export const refreshToken = async () => {
  console.log("refreshToken", refreshToken);
  const res = await axios.post(
    `http://localhost:3000/user/refresh-token`,
    {
      // headers: {
      //     token: `Bearer ${refreshToken}`,
      // }
      withCredentials: true,
    }
  );
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post( `http://localhost:3000/user/log-out`,);
  return res.data;
};
