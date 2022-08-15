import express from "express"
import userControllerHandler from "../controllers/user.controller"
import { validateToken } from "../middleware/JWT"

const userRouter = express.Router()



userRouter.route('/register').post(userControllerHandler.register);
userRouter.route('/login').post(userControllerHandler.login);
userRouter.route("/profile").get(validateToken, userControllerHandler.profile);




module.exports = userRouter