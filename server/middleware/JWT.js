import {sign, verify} from "jsonwebtoken"

const createTokens = (user) => {
    return sign({username: user.username, id: user._id}, "topsecret")
}

const validateToken = (req, res, next) => {
    try {
        if (!req.headers.authorization) throw Error("Not authenticated")
        const accessToken = req.headers.authorization.split(" ")[ 1 ]

        const validToken = verify(accessToken, "topsecret")
        if (validToken) {
            return next()
        }
    } catch (e) {
        return res.send({ "msg": e.message }).status(500)
    }

}

module.exports = { createTokens, validateToken }