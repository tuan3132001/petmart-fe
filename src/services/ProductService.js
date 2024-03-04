import axios from "axios";
export const axiosJWT = axios.create();

export const getAllProduct = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`http://localhost:3000/product/get-product?filter=name&filter=${search}&limit=${limit}`)
    } else {
        res = await axios.get(`http://localhost:3000/product/get-product?limit=${limit}`)
    }
    return res.data
}