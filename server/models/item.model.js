import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }, 
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    subcategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Subcategory'
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

const Item = mongoose.model('Item', ItemSchema);

export default Item;