import mongoose from "mongoose"
import User from "../models/user.model"
import bcrypt from "bcrypt"
import { createTokens } from "../middleware/JWT"

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






    return { "accessToken": accessToken, "username": user.username, "id": user._id }
}



const userServiceHandler = {
    register,
    login,

}

export default userServiceHandler;