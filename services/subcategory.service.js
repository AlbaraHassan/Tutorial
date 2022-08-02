import mongoose from "mongoose"
import SubCategory from "../models/subcategory.model"
import Category from "../models/catagory.model"

const validate_category = async (category_id) => {
    const category = await Category.findOne({ _id: category_id })

    if (!category) throw Error(`Category does not exist with the id ${category_id}`)

    return category._id
}


const get_one_subcategory = async (id) => {
    return await SubCategory.findById(id)
}

const get_all_subcategories = async () => {
    return await SubCategory.find()
}




const create_one_subcategory = async (data) => {

    const id = await validate_category(data.category_id)

    return await SubCategory.create({
        ...data,
        category_id: id
    })
}

const update_one_subcategory = async (id, data) => {

    const { category_id, ...rest_of_data } = data;

    if (category_id) {
        await validate_category(data.category_id);
    }

    const objectToUpdate = category_id ? data : rest_of_data;

    return await SubCategory.updateOne({
        _id: mongoose.Types.ObjectId(id)
    }, {
        $set: {
            ...objectToUpdate
        }
    }, {
        upsert: true
    });
};

const delete_one_subcategory = async (id) => {
    return await SubCategory.deleteOne({
        _id: mongoose.Types.ObjectId(id)
    })
}


const SubCategoryServiceHandler = {
    get_one_subcategory,
    get_all_subcategories,
    create_one_subcategory,
    update_one_subcategory,
    delete_one_subcategory
}

export default SubCategoryServiceHandler;