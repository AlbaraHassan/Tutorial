import categoryRouter from "./routers/category.router"
import subcategoryRouter from "./routers/subcategory.router"
import itemRouter from "./routers/item.router"

import express from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"

const server = express()

const PORT = 3000

const init = () => {
    //Connect to DB


    server.use(express.json())

    server.use(cors())

    server.use("/category", categoryRouter)

    server.use("/subcategory", subcategoryRouter)
    
    server.use("/item", itemRouter)


    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
}


const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL, {}, err => {
        if (err) {
            console.log("CANNOT CONNECT");
            return
        }
        console.log("CONNECTED SUCCESFULLY");
        init()

    })
}

connectDB();