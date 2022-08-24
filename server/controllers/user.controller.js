import User from "../models/user.model";
import userServiceHandler from "../services/user.service";




const register = async (req, res) => {
    try {
        const { body } = req
        const user = await userServiceHandler.register(body)
        return res.send(user)
    } catch (e) {
        return res.status(500).send({ "msg": e.message });
    }
}

const login = async (req, res) => {
    try {
        const { body } = req;
        const accessToken = await userServiceHandler.login(body)
        return res.send(accessToken)
    }
    catch (e) {
        return res.status(500).send({ "msg": e.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { params, body } = req;
        const user = await userServiceHandler.updateUser(params.id, body);
        return res.send(user)
    }
    catch (e) {
        return res.status(500).send({ "msg": e.message });
    }
}


const getUser = async (req, res) => {
    try {
        const authorization = req.headers.authorization.split(' ')[ 1 ]
        const user = await userServiceHandler.getUser(authorization)
        return res.send(user)
    } catch (e) {
        return res.status(500).send({ "msg": "Not authenticated" });
    }
}


const userControllerHandler = {
    register,
    login,
    updateUser,
    getUser

}

export default userControllerHandler;