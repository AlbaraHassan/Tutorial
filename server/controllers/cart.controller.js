import cartServiceHandler from "../services/cart.service";

const get_one_cart = async(req, res) => {
    try {
        const { params } = req
        const category = await cartServiceHandler.get_one_cart(params.id)
        return res.send(category)
    } catch (e) {
        return res.send({ "msg": e.message }).status(500);
    }
}

const create_one_cart = async (req, res) => {
    try {
        const { body } = req;
        const category = await cartServiceHandler.create_one_cart(body)
        return res.send(category)
    }
    catch (e) {
        console.log(e);
        return res.send({ "msg": e.message }).status(500);
    }
}



const cartControllerHandler = {
    get_one_cart,
    create_one_cart,

}

export default cartControllerHandler;