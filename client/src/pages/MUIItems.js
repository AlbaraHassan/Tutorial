import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addCart, cartClear, removeFromCartById, setCart } from '../features/cart'
import { getAll } from '../features/items'
import Grid from '@mui/material/Grid'
import { AppBar, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { loginUser } from '../features/user'
import NavBar from '../components/NavBar'
import { arrayAdd, arrayRemove } from "../features/array"
import { add, remove, subtract } from '../features/counter'


function MUIItems() {
    const items = useSelector((state) => state.items.value)
    const cart = useSelector((state) => state.cart.value)
    const user = useSelector((state) => state.user.value)
    const counter = useSelector((state) => state.counter.value)
    const navigate = useNavigate()
    const dispatch = useDispatch()



    const handleCart = (obj) => {
        if (cart.includes(obj)) return


        dispatch(addCart(obj))
        dispatch(arrayAdd(obj._id))
        dispatch(add([ obj._id, obj.price ]))
    }

    const handleRemove = (obj) => {
        dispatch(removeFromCartById(obj))
        dispatch(arrayRemove(obj._id))
        dispatch(remove({ "id": obj._id, "price": obj.price }))
    }







    const fetchAllItems = async () => {
        const res = await axios.get("http://localhost:5000/item")
        const data = res.data
        dispatch(getAll(data))
    }

    const fetchUser = async () => {
        const res = await axios.post("http://localhost:5000/user/get-me", {}, {
            "headers": {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        dispatch(loginUser(res.data))
    }


    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login")
            return
        }



        if (JSON.stringify(user) === JSON.stringify({})) fetchUser() //Fix for sending unneeded requests


        if (items.length === 0) fetchAllItems()

    }, [])



    return (<>

        <NavBar user={user} />

        <Typography variant="h3" color="text.secondary" align={"center"} margin={5}>Store</Typography>
        <Grid container spacing={0} columns={{ xs: 2, sm: 6, md: 9, lg: 15 }} sx={{ backgroundColor: "whitesmoke", borderRadius: 10, padding: 5, marginTop: 5, minHeight: 600 }}>
            {items.map((el) => {
                return <Grid item xs={3} key={el._id}>
                    <Grid container justifyContent="center" spacing={0}>
                        <Card sx={{ minWidth: 275, marginTop: 5, height: 200, backgroundColor: "#f0f8ff" }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                                    {el.name}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {el.price} $
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {el.category_id.name} ----  {el.subcategory_id.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {!cart.includes(el) ? <Button size="small" variant="outlined" onClick={() => { handleCart(el) }}>Add To Cart</Button> : <Button size="small" sx={{ color: "red", borderColor: "red" }} variant="outlined" onClick={() => { handleRemove(el) }}>Remove From Cart</Button>}
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>

            })}


        </Grid>
    </>
    )
}

export default MUIItems