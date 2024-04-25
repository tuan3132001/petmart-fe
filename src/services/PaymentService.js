import axios from "axios"

export const getConfig = async () => {
  const res = await axios.get(`https://petmart-be.onrender.com/payment/config`)
  return res.data
}