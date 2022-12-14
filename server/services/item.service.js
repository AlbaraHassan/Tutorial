import mongoose from "mongoose"
import SubCategory from "../models/subcategory.model"
import Category from "../models/catagory.model"
import Item from "../models/item.model"


const validate_category_subcategory = async (category_id, subcategory_id) => {
    const category = await Category.findOne({_id: category_id})
    const subcategory = await SubCategory.findOne({_id: subcategory_id})

    if (!category || !subcategory) throw Error(`Category or subcategory does not exist with the id ${category_id} or ${subcategory_id}`)

    return {
        "cat_id": category_id,
        "sub_id": subcategory_id
    }
}


const get_one_item = async (id) => {
    return Item.findById(id).populate("category_id").populate("subcategory_id");
}

const get_all_items = async (page, limit) => {
    if (!page) page = 1
    if (!limit) limit = 10
    const totalPages = await Item.count()
    if (page > Math.ceil(totalPages / limit)) throw Error("Page Does Not Exist")
    const data = await Item.find().limit(limit).skip(limit * (page - 1)).populate("category_id").populate("subcategory_id");
    return {
        totalPages: Math.ceil(totalPages / limit),
        data: data
    }
}


const create_one_item = async (data) => {

    const {cat_id, sub_id} = await validate_category_subcategory(data.category_id, data.subcategory_id)

    return await Item.create({
        ...data,
        category_id: cat_id,
        subcategory_id: sub_id
    })
}

const update_one_item = async (id, data) => {

    const {category_id, subcategory_id, ...rest_of_data} = data;

    if (category_id && subcategory_id) {
        await validate_category_subcategory(data.category_id, data.subcategory_id);
    }

    const objectToUpdate = category_id && subcategory_id ? data : rest_of_data;

    return Item.updateOne({
        _id: mongoose.Types.ObjectId(id)
    }, {
        $set: {
            ...objectToUpdate
        }
    }, {
        upsert: true
    });
};

const delete_one_item = async (id) => {
    return Item.deleteOne({
        _id: mongoose.Types.ObjectId(id)
    });
}


const itemServiceHandler = {
    get_one_item,
    get_all_items,
    create_one_item,
    update_one_item,
    delete_one_item
}

export default itemServiceHandler;