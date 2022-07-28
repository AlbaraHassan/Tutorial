server.use("/test", (req,res)=>{
    console.log(req.body,req.query,req.params);
    return res.send({
        "Odgovor":"radi"
    })
})