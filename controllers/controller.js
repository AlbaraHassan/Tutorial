import fs from "fs"
import data from "../models/data.json"





const get_all = (req, res) => {
    console.log(req.body, req.params, req.query);
    return res.send(
        data
    )
}


const get_one = (req, res) => {
    const id = req.query[ "id" ]

    for (let i of data) {
        if (i[ "id" ] == id) {
            return res.send(
                i
            )
        }
    }

    throw Error("Not Found!")

}

const add_one = (req, res) => {
    let body = {}
    const id = data.length
    body[ "id" ] = id
    body[ "name" ] = req.body[ "name" ]
    body[ "age" ] = req.body[ "age" ]
    data.push(body)

    fs.readFile("./models/data.json", (err, dt) => {
        dt = JSON.parse(dt)
        dt.push(body)
        dt = JSON.stringify(dt)
        fs.writeFile("./models/data.json", dt,()=>{})
    })

    res.send(data)
}

module.exports = { get_all, get_one, add_one }