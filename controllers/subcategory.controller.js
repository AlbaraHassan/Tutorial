import subcategoryServiceHandler from "../services/subcategory.service";

const get_one_subcategory = async(req, res) => {
    try {
        const { params } = req
        const subcategory = await subcategoryServiceHandler.get_one_subcategory(params.id)
        return res.send(subcategory)
    } catch (e) {
        return res.send({ "msg": e.message }).status(500);
    }
}

const get_all_subcategories = async(req,res) => {
    try {
        const subcategories = await subcategoryServiceHandler.get_all_subcategories()
        return res.send(subcategories)
    } catch (e) {
        return res.send({ "msg": e.message }).status(500);
    }
}

const create_one_subcategory = async (req, res) => {
    try {
        const { body } = req;
        const subcategory = await subcategoryServiceHandler.create_one_subcategory(body);
        return res.send(subcategory)
    }
    catch (e) {
        return res.send({ "msg": e.message }).status(500);
    }
}

const update_one_subcategory = async (req, res) => {
    try {
        const { params, body } = req;
        const subcategory = await subcategoryServiceHandler.update_one_subcategory(params.id, body);
        return res.send(subcategory)
    }
    catch (e) {
        return res.send({ "msg": e.message }).status(500);
    }
}
const delete_one_subcategory = async (req, res) => {
    try {
        const { params } = req;
        const delete_subcategory = await subcategoryServiceHandler.delete_one_subcategory(params)
        return res.send(delete_subcategory)
    } catch (e) {
        return res.send({ "msg": e.message }).status(500);
    }
}


const subcategoryControllerHandler = {
    get_one_subcategory,
    get_all_subcategories,
    create_one_subcategory,
    update_one_subcategory,
    delete_one_subcategory
}

export default subcategoryControllerHandler;