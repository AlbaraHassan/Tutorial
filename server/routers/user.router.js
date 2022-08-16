import express from "express"
import userControllerHandler from "../controllers/user.controller"
import { validateToken } from "../middleware/JWT"

const userRouter = express.Router()



userRouter.route('/register').post(userControllerHandler.register);
userRouter.route('/login').post(userControllerHandler.login);
userRouter.route("/update/:id").post(validateToken, userControllerHandler.updateUser);




module.exports = userRouter