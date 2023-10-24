import React from 'react'
import Products from './products/Products'
import Cart from './cart/Cart'

const ShoppingCart = () => {
  return (
    <div className='h-full bg-gray-200 box-border'>
      <Products />
      <Cart />
    </div>
  )
}

export default ShoppingCart
