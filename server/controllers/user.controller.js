import User from "../models/user.model";
import userServiceHandler from "../services/user.service";




const register = async (req, res) => {
    try {
        const { body } = req
        const user = await userServiceHandler.register(body)
        return res.send(user)
    } catch (e) {
        return res.send({ "msg": e.message }).status(500);
    }
}

const login = async (req, res) => {
    try {
        const { body } = req;
        const accessToken = await userServiceHandler.login(body)
        res.cookie("access-token", accessToken, {
            maxAge: 864000000
        })
        return res.send({ "msg": "User Logged In" })
    }
    catch (e) {
        return res.send({ "msg": e.message }).status(500);
    }
}

const profile = async (req, res) => {
    try {
        return res.send("dwdawd")
    } catch (e) {
        return res.send({ "msg": e.message }).status(500);
    }
}



const userControllerHandler = {
    register,
    login,
    profile

}

export default userControllerHandler;