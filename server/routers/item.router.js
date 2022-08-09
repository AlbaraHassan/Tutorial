import express from "express";
import itemControllerHandler from "../controllers/item.controller";

const itemRouter = express.Router()

itemRouter.route('/').post(itemControllerHandler.create_one_item);
itemRouter.route('/:id').patch(itemControllerHandler.update_one_item);
itemRouter.route('/:id').delete(itemControllerHandler.delete_one_item);
itemRouter.route('/:id').get(itemControllerHandler.get_one_item);
itemRouter.route('/').get(itemControllerHandler.get_all_items);

module.exports = itemRouter