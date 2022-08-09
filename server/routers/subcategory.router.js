import express from "express"
import subcategoryControllerHandler from "../controllers/subcategory.controller"

const subcategoryRouter = express.Router()

subcategoryRouter.route('/').post(subcategoryControllerHandler.create_one_subcategory);
subcategoryRouter.route('/:id').patch(subcategoryControllerHandler.update_one_subcategory);
subcategoryRouter.route('/:id').delete(subcategoryControllerHandler.delete_one_subcategory);
subcategoryRouter.route('/:id').get(subcategoryControllerHandler.get_one_subcategory);
subcategoryRouter.route('/').get(subcategoryControllerHandler.get_all_subcategories);




module.exports = subcategoryRouter