import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
    const[isCartEnable, setIsCartEnable] = useState(false)
    const { cartProducts } = useSelector((state) => state);
    console.log(cartProducts)

    const isCartCLicked = () => {
        setIsCartEnable(!isCartEnable)
    }
  return (
    <div>
        <div onClick={() => isCartCLicked()} className='bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center fixed top-64 left-10'>
            <p className='text-white font-bold'>Cart</p>
        </div>
        {isCartEnable && <div className='fixed bg-white rounded-lg shadow-lg h-5/6 top-10 w-3/6 left-1/4 flex flex-col gap-4 items-center '>
            <h1 className='font-bold text-xl opacity-75 p-5 '>Cart Items</h1>
                {cartProducts.map((item, index) => {
                    return (
                        <div className='bg-slate-100 h-14 flex w-4/5 items-center justify-around rounded-lg' key={index}>
                        <div className='w-20 h-full'><img className='object-fill h-full' src={item.image} /></div>
                        <div>{item.title}</div>
                        <div>{`Qty: ${item.qty}`}</div>
                        </div>
                    )
                })}
        </div>}
    </div>

  )
}

export default Cart
