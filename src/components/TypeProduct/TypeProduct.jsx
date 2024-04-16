import React from 'react'
import { useNavigate } from 'react-router-dom'

const TypeProduct = ({ name, id }) => {
  const navigate = useNavigate()
  const handleNavigateType = (type) => {
    if (type) {
      // Check if type is not undefined or null before calling replace
      const cleanType = type.replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_');
      navigate(`/product/${cleanType}`, { state: type })
    }
  }
  return (
    <div className="cursor-pointer" onClick={() => handleNavigateType(id)}>{name}</div>
  )
}

export default TypeProduct
