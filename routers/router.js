import express from "express"
import { get_all,get_one, add_one } from "../controllers/controller"

const router = express.Router()

router.route("/get_all").get(get_all)
router.route("/get_one").get(get_one)
router.route("/add_one").post(add_one)


module.exports = router