import axios from "axios";

export const getAllPromotion = async (access_token) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/promotion/get-promotion`,
    { 
            headers: {
              token: `Bearer ${access_token}`,
            },     
    })
    return res.data
}