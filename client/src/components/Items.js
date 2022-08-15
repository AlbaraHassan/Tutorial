import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from "../features/items"
import { addCart, removeFromCart } from '../features/cart'
import { useNavigate } from "react-router-dom";


import "../App.css"

function Items() {
    const items = useSelector((state) => state.items.value)
    const cart = useSelector((state) => state.cart.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCart = (obj) => {
        if (cart.includes(obj)) return
        dispatch(addCart(obj))
    }

    const handleRemove = (obj) => {
        dispatch(removeFromCart(obj))
    }

    const login = async () => {
        axios.defaults.withCredentials = true;
        const res = await axios.post("http://localhost:5000/user/login", { username: "Albara", password: "braa1234" })
        console.log(res.data);
    }

    const profile = async () => {
        const res = await axios.get("http://localhost:5000/user/profile", {
            withCredentials: true
        })
        console.log(res.data);
    }



    const fetchAllItems = async () => {
        const res = await axios.get("http://localhost:5000/item")
        const data = res.data
        dispatch(getAll(data))
    }

    useEffect(() => {
        console.log([ 1, 2, 3 ] * 2);
        if (items.length === 0) fetchAllItems()

    }, [])



    return (
        <>
            <button onClick={profile}>Profile</button>
            <button onClick={login}>Login</button>
            <button onClick={() => { navigate("/cart") }}>Go To Cart</button>

            {items.map((el) => {
                return <div className="center" key={el._id}><div className="text" style={{ padding: "50px" }}>
                    #####################
                    <p>Name: {el.name}</p>
                    <p>Price: {el.price}</p>
                    <p>Quantity: {el.quantity}</p>
                    <p>Category: {el.category_id.name}</p>
                    <p>Subcategory: {el.subcategory_id.name}</p>
                    <button onClick={() => { handleCart(el) }}>Add To Cart</button>
                    <p></p>

                    {cart.includes(el) ? <div>
                        <p>Added To Cart</p>
                        <button onClick={() => { handleRemove(el) }}>Remove From Cart</button>
                    </div> : <></>}
                    #####################
                </div>
                </div>
            })}
        </>
    )

}

export default Items
