import categoryServiceHandler from "../services/category.service";

const get_one_category = async(req, res) => {
    try {
        const { params } = req
        const category = await categoryServiceHandler.get_one_category(params.id)
        return res.send(category)
    } catch (e) {
        return res.send({ "msg": "ERROR" }).status(500);
    }
}

const get_all_categories = async(req,res) => {
    try {
        const categories = await categoryServiceHandler.get_all_categories()
        return res.send(categories)
    } catch (e) {
        return res.send({ "msg": "ERROR" }).status(500);
    }
}

const create_one_category = async (req, res) => {
    try {
        const { body } = req;
        const category = await categoryServiceHandler.create_one_category(body)
        return res.send(category)
    }
    catch (e) {
        console.log(e);
        return res.send({ "msg": "ERROR" }).status(500);
    }
}

const update_one_category = async (req, res) => {
    try {
        const { params, body } = req;
        const category = await categoryServiceHandler.update_one_category(params.id, body);
        return res.send(category)
    }
    catch (e) {
        return res.send({ "msg": "ERROR" }).status(500);
    }
}
const delete_one_category = async (req, res) => {
    try {
        const { params } = req;
        const delete_category = await categoryServiceHandler.delete_one_category(params.id)
        return res.send(delete_category)
    } catch (e) {
        return res.send({ "msg": "ERROR" }).status(500);
    }
}


const categoryControllerHandler = {
    get_one_category,
    get_all_categories,
    create_one_category,
    update_one_category,
    delete_one_category
}

export default categoryControllerHandler;