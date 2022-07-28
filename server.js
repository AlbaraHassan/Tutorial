const express = require("express")
const cors = require("cors")


const server = express()

const PORT = 3000

const init = () => {
    //Connect to DB

    server.use(express.json())

    server.use(cors())

    

    server.listen(PORT, ()=>{
        console.log(`Listening on port ${PORT}`);
    })
}

init()