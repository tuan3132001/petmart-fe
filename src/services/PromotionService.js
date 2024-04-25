import axios from "axios";

export const getAllPromotion = async (access_token) => {
    const res = await axios.get(`https://petmart-be.onrender.com/promotion/get-promotion`,
    { 
            headers: {
              token: `Bearer ${access_token}`,
            },     
    })
    return res.data
}