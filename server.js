import router from "./routers/router"
import express from "express"
import cors from "cors"

const server = express()

const PORT = 3000

const init = () => {
    //Connect to DB

    server.use(express.json())

    server.use(cors())

    server.use("/test", router)

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
}

init()