import { ADD_PRODUCT_CART, REMOVE_PRODUCT_CART } from "../constants/Cart" 

const intialState = []

export const cartReducer = (state = intialState, action) => {
    switch(action.type){
        case ADD_PRODUCT_CART : {
            return [
                ...state, action.payLoad
            ]
        } 
        case REMOVE_PRODUCT_CART : {
            return state.filter((item) => (item.id !== action.payLoad))
        } 
        default:
            return state;
    }
}