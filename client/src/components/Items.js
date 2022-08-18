import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from "../features/items"
import { addCart, cartClear, removeFromCartById } from '../features/cart'

import { useNavigate } from "react-router-dom";


import "../App.css"

function Items() {

    const items = useSelector((state) => state.items.value)
    const cart = useSelector((state) => state.cart.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ isLogged, setIsLogged ] = useState(false)

    const handleCart = (obj) => {
        if (cart.includes(obj)) return


        dispatch(addCart(obj))
    }

    const handleRemove = (obj) => {
        dispatch(removeFromCartById(obj))
    }

    const login = async () => {
        navigate("/login")
    }

    const signout = async () => {
        localStorage.removeItem("user")
        setIsLogged(false)
        dispatch(cartClear())
    }



    const fetchAllItems = async () => {
        const res = await axios.get("http://localhost:5000/item")
        const data = res.data
        dispatch(getAll(data))
    }

    useEffect(() => {
        console.log([ 1, 2, 3 ] * 2);
        if (items.length === 0) fetchAllItems()
        if (localStorage.getItem("user")) setIsLogged(true)

    }, [])



    return (
        <>
            <div className="w3-bar w3-grey">{
                isLogged ? <button className="w3-bar-item w3-button w3-hover-blue" onClick={signout}>SignOut</button> : <button className="w3-bar-item w3-button" onClick={() => { navigate("/register") }}>Register</button>
            }
                {isLogged ? <></> : <button className="w3-bar-item w3-button w3-hover-blue" onClick={login}>Login</button>}
                <button className="w3-bar-item w3-button w3-hover-blue" onClick={() => { navigate("/cart") }} disabled={!isLogged ? true : false}>Go To Cart</button>
            </div>
            <div className='w3-display-topmiddle'>
                {items.map((el) => {
                    return <div className="w3-panel w3-card-4 w3-center w3-animate-top w3-padding-64" key={el._id}><div className="text" style={{ padding: "50px" }}>
                        #####################
                        <p>Name: {el.name}</p>
                        <p>Price: {el.price}</p>
                        <p>Quantity: {el.quantity}</p>
                        <p>Category: {el.category_id.name}</p>
                        <p>Subcategory: {el.subcategory_id.name}</p>
                        {!cart.includes(el) ? <button className='w3-button w3-round-xxlarge w3-blue w3-hover-aqua' onClick={() => { handleCart(el) }}  disabled={!isLogged ? true : false}>Add To Cart</button> : <></>}
                        <p></p>

                        {cart.includes(el) ? <div>
                            <p>Added To Cart</p>
                            
                            <button className='w3-button w3-round-xxlarge w3-red w3-hover-blue' onClick={() => { handleRemove(el) }}>Remove From Cart</button>
                        </div> : <></>}
                        #####################
                    </div>
                    </div>
                })}
            </div>
        </>
    )

}

export default Items
