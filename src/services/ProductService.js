import axios from "axios";
export const axiosJWT = axios.create();

export const getAllProduct = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`https://petmart-be.onrender.com/product/get-product?filter=name&filter=${search}&limit=${limit}`)
    } else {
        res = await axios.get(`https://petmart-be.onrender.com/product/get-product?limit=${limit}`)
    }
    return res.data
}

export const getProductType = async ( page, limit) => {
   
        // const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-product?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        const res = await axios.get(`https://petmart-be.onrender.com/product/get-product?limit=${limit}&page=${page}`)
        return res.data
    
}

export const getDetailsProduct = async (id) => {
    const res = await axios.get(`https://petmart-be.onrender.com/product/get-detail-product/${id}`)
    return res.data
}

export const getAllTypeProduct = async () => {
    const res = await axios.get(`https://petmart-be.onrender.com/type-product/get-type-product`)
    return res.data
}

export const getAllProductSelled = async () => {
    
     const res = await axios.get(`https://petmart-be.onrender.com/product/get-product`)
    
    return res.data
}