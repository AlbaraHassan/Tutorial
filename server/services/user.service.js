import mongoose from "mongoose"
import User from "../models/user.model"
import bcrypt from "bcrypt"
import {createTokens} from "../middleware/JWT"
import Cart from "../models/cart.model"
import {verify} from "jsonwebtoken"


const usernameValidator = async (username) => {
    const user = await User.findOne({ username: username }).then((obj) => obj)
    if (!user) return
    throw Error("Username is already used")
}


const register = async (data) => {
    const { username, password } = data
    await usernameValidator(username)
    const hash = await bcrypt.hash(password, 10)
    return await User.create({ ...{ "username": username, "password": hash } })
}


const login = async (data) => {
    const { username, password } = data
    const user = await User.findOne({ username: username }).then((obj) => obj)
    if (!user) throw Error("User Does Not Exist")

    const dbPass = user.password
    const isCorrect = await bcrypt.compare(password, dbPass).then((match) => match)
    if (!isCorrect) throw Error("Wrong username and password combination")


    const accessToken = createTokens(user)

    return { "accessToken": accessToken }
}


const updateUser = async (id, data) => {

    const cart = data[ "cart" ]
    console.log(cart);

    const val = await Cart.findById(cart)
    if (!val) throw Error("Cart Does not exist")

    const user = await User.findById(id)
    let newCart = user[ "cart" ]
    newCart = [ ...newCart, cart ]

    const objectToUpdate = { "cart": newCart };
    console.log(newCart);

    return User.updateOne({
        _id: mongoose.Types.ObjectId(id)
    }, {
        $set: {
            ...objectToUpdate
        }
    }, {
        upsert: true
    });
};

const getUser = async (authorization) => {
    const id = verify(authorization, "topsecret").id;
    console.log(id);
    return User.findById(id).populate("cart")
}


const userServiceHandler = {
    register,
    login,
    updateUser,
    getUser

}

export default userServiceHandler;