import express from "express"
import categoryControllerHandler from "../controllers/category.controller"
// import { get_all, get_one, add_one } from "../controllers/controller"

const categoryRouter = express.Router()

// router.route("/get_all").get(get_all)
// router.route("/get_one").get(get_one)
// router.route("/add_one").post(add_one)

categoryRouter.route('/').post(categoryControllerHandler.create_one_category);
categoryRouter.route('/:id').patch(categoryControllerHandler.update_one_category);
categoryRouter.route('/:id').delete(categoryControllerHandler.delete_one_category);
categoryRouter.route('/:id').get(categoryControllerHandler.get_one_category);
categoryRouter.route('/').get(categoryControllerHandler.get_all_categories);




module.exports = categoryRouter