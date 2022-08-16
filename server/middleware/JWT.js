import { sign, verify } from "jsonwebtoken"

const createTokens = (user) => {
    const accessToken = sign({ username: user.username, id: user._id }, "topsecret")
    return accessToken
}

const validateToken = (req, res, next) => {
    try {
        const accessToken = req.cookies["access-token"]
        if (!accessToken) throw Error("Not authenticated")


        const validToken = verify(accessToken, "topsecret")
        if (validToken) {
            req.authenticated = true
            return next()
        }
    } catch (e) {
        return res.send({ "msg": e.message }).status(500)
    }

}

module.exports = { createTokens, validateToken }