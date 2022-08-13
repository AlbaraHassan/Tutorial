import mongoose, { Schema } from "mongoose";

const SubCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    }
})

const SubCategory = mongoose.model("Subcategory", SubCategorySchema);

export default SubCategory;