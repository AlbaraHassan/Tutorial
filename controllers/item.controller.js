import itemServiceHandler from "../services/item.service";

const get_one_item = async(req, res) => {
    try {
        const { params } = req
        const item = await itemServiceHandler.get_one_item(params.id)
        return res.send(item)
    } catch (e) {
        return res.send({ "msg": e.message }).status(500);
    }
}

const get_all_items = async(req,res) => {
    try {
        const subcategories = await itemServiceHandler.get_all_items()
        return res.send(subcategories)
    } catch (e) {
        return res.send({ "msg": e.message }).status(500);
    }
}

const create_one_item = async (req, res) => {
    try {
        const { body } = req;
        const item = await itemServiceHandler.create_one_item(body);
        return res.send(item)
    }
    catch (e) {
        return res.send({ "msg": e.message }).status(500);
    }
}

const update_one_item = async (req, res) => {
    try {
        const { params, body } = req;
        const item = await itemServiceHandler.update_one_item(params.id, body);
        return res.send(item)
    }
    catch (e) {
        return res.send({ "msg": e.message }).status(500);
    }
}
const delete_one_item = async (req, res) => {
    try {
        const { params } = req;
        const delete_item = await itemServiceHandler.delete_one_item(params)
        return res.send(delete_item)
    } catch (e) {
        return res.send({ "msg": e.message }).status(500);
    }
}


const itemControllerHandler = {
    get_one_item,
    get_all_items,
    create_one_item,
    update_one_item,
    delete_one_item
}

export default itemControllerHandler;