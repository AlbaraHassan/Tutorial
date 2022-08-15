import categoryRouter from "./routers/category.router"
import subcategoryRouter from "./routers/subcategory.router"
import itemRouter from "./routers/item.router"
import cartRouter from "./routers/cart.router"
import userRouter from './routers/user.router'

import express from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"



const server = express()

const PORT = 5000

const init = () => {
    //Connect to DB

    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true,            //access-control-allow-credentials:true
        optionSuccessStatus: 200
    }


    server.use(express.json())

    server.use(cors(corsOptions))

    server.use(cookieParser())

    server.use("/category", categoryRouter)

    server.use("/subcategory", subcategoryRouter)

    server.use("/item", itemRouter)

    server.use("/cart", cartRouter)

    server.use("/user", userRouter)



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