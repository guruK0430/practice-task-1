import React, { useEffect, useRef, useState } from 'react'
import UseApi from '../../Api/UseApi'
import { addCart, removeCart } from '../../redux/actions/Cart'
import { useSelector, useDispatch } from 'react-redux'

const Products = () => {
    const {
        data : productsData, 
        isLoading, 
        error, 
        fetchData : productsFetch
    } = UseApi("https://fakestoreapi.com/products", 'GET')

    const [allProducts,setAllProducts] =  useState([])

    const dispatch = useDispatch();
    const { cartProducts } = useSelector((state) => state);
    console.log(cartProducts)
    useEffect(() => {
        if(productsData){
            const allProductsData = productsData?.data?.map((product)=> {
                return {...product, qty: 1, isAddCartEnable: false}
            })
            setAllProducts(allProductsData)
        }
    },[JSON.stringify(productsData)])

    const qtyDecrement = (id) => {
        const updatedData = allProducts?.map((product)=> {
            if(id === product?.id){
                return {...product, qty: (product?.qty !== 1)  ? product?.qty - 1 : 1}
            }
            return {...product}
        })
        setAllProducts(updatedData)
    }

    const qtyIncrement = (id) => {
        const updatedData = allProducts?.map((product)=> {
            if(id === product?.id){
                return {...product, qty: (product?.qty + 1)}
            }
            return {...product}
        })
        setAllProducts(updatedData)
    }
    
    const addToCart = (item) => {
        dispatch(addCart(item))
        const updatedData = allProducts?.map((product)=> {
            if(item.id === product?.id){
                return {...product, isAddCartEnable: true}
            }
            return {...product}
        })
        setAllProducts(updatedData)
    }

    const removeFromCart = (id) => {
        dispatch(removeCart(id))
        const updatedData = allProducts?.map((product)=> {
            if(id === product?.id){
                return {...product, isAddCartEnable: false}
            }
            return {...product}
        })
        setAllProducts(updatedData)
    }

    const call = () => {
        //dispatch(addCart([{id : 1, title: "underwear"}]))
        //productsFetch()
    }

  return (
    <>
        {allProducts && <div className='h-full px-32 pt-20 flex-wrap flex gap-14 justify-center items-center'>
            {allProducts.map((item, index) => 
                (<div key={index} className='bg-white w-60 rounded-lg h-96 flex flex-col items-center justify-center'>
                <div><img className='h-52 w-full object-contain rounded-t-lg' src={item?.image}/></div>
                <p className='font-semibold text-base px-4 text-center pt-2'>{item?.title}</p>
                <div className='flex justify-around items-center px-2 pt-2 w-full pb-3'>
                    <p className='text-sm text-blue-700 font-semibold '>{`Price: $${item?.price}`}</p>
                    <div className='flex justify-around items-center' >
                            <button disabled={item?.isAddCartEnable} onClick={() => qtyDecrement(item.id)} className='bg-slate-200 font-bold text-xl px-3 pb-1 hover:bg-slate-400 rounded-lg'>-</button>
                            <div className='px-2'>{item?.qty}</div>
                            <button disabled={item?.isAddCartEnable} onClick={() => qtyIncrement(item.id)} className='bg-blue-600 text-white hover:opacity-70 font-bold text-xl px-2 pb-1 rounded-lg'>+</button>
                    </div>                 
                </div>
                {
                !item?.isAddCartEnable ? <button onClick={() => addToCart(item)} className='bg-gray-800 font-semibold px-6 py-2 rounded-lg hover:opacity-70 text-white'>Add to cart</button>
                 : <button onClick={() => removeFromCart(item.id)} className='bg-gray-800 font-semibold px-6 py-2 rounded-lg hover:opacity-70 text-white'>Remove from cart</button>
                }               
            </div>
            )
            )}
        </div>    
        }
    </>
  )
}

export default Products
