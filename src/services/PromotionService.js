import axios from "axios";

export const getAllPromotion = async (access_token) => {
    const res = await axios.get(`http://localhost:3000/promotion/get-promotion`,
    { 
            headers: {
              token: `Bearer ${access_token}`,
            },     
    })
    return res.data
}