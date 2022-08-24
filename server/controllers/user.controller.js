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
        const { accessToken, username, id } = await userServiceHandler.login(body)
        res.cookie("access-token", accessToken, {
            maxAge: 864000000,
            httpOnly: true
        })
        return res.send({ "username": username, "id": id })
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



const userControllerHandler = {
    register,
    login,
    updateUser

}

export default userControllerHandler;