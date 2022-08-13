import mongoose from "mongoose"
import Cart from "../models/cart.model"

const get_one_cart = async (id) => {
    return await Cart.findById(id)
}


const create_one_cart = async (data) => {
    return await Cart.create({...data})
}



const cartServiceHandler = {
    get_one_cart,
    create_one_cart,

}

export default cartServiceHandler;