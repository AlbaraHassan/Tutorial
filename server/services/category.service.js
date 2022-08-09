import mongoose from "mongoose"
import Category from "../models/catagory.model"

const get_one_category = async (id) => {
    return await Category.findById(id)
}

const get_all_categories = async() => {
    return await Category.find()
}

const create_one_category = async (data) => {
    return await Category.create({...data})
}

const update_one_category = async (id, data) => {
    return await Category.updateOne({
        _id: mongoose.Types.ObjectId(id)
    },
        { ...data }, {
        upsert: true
    })
}
const delete_one_category = async (id) => {
    return await Category.deleteOne({
        _id:mongoose.Types.ObjectId(id)
    })
}


const categoryServiceHandler = {
    get_one_category,
    get_all_categories,
    create_one_category,
    update_one_category,
    delete_one_category
}

export default categoryServiceHandler;