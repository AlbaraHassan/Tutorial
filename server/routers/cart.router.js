import express from "express"
import cartControllerHandler from "../controllers/cart.controller"

const cartRouter = express.Router()



cartRouter.route('/').post(cartControllerHandler.create_one_cart);
cartRouter.route('/:id').get(cartControllerHandler.get_one_cart);




module.exports = cartRouter