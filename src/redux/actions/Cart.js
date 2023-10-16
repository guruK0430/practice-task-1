import { ADD_PRODUCT_CART, REMOVE_PRODUCT_CART } from "../constants/Cart";

export const addCart = (product) => {
    console.log(product)
    return{
        type: ADD_PRODUCT_CART,
        payLoad : product
    }
}

export const removeCart = (productId) => {
    console.log(productId)
    return{
        type: REMOVE_PRODUCT_CART,
        payLoad : productId
    }
}