import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'

const ProductDetailsPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  return (
    <div className='w-full bg-[#efefef] h-full' >
      <div className="w-[1270px] h-full mx-auto" >
        <h1 className='text-[20px]  mb-[15px]'><span className='cursor-pointer font-bold' onClick={() => {navigate('/')}}>Trang chủ</span> - Chi tiết sản phẩm</h1>
        <ProductDetailsComponent idProduct={id} />
      </div>
    </div>
  )
}

export default ProductDetailsPage
